# Start Finance – www.startfinance.com.au

The traditional (non-AI) Start Finance website, rebuilt in Next.js 16 + Tailwind 4 to replace the MoWorks-hosted WordPress site. The AI site lives separately at ai.startfinance.com.au; the header toggle links between the two.

## Pages

| Route | Notes |
|---|---|
| `/` | Home – new hero, loan types, 6 steps, about, features, services, calculators, testimonials, FAQ, CTA |
| `/about-us` | About |
| `/calculators` + `/calculators/[slug]` | 16 working calculators (see below) |
| `/blog` + `/blog/[slug]` | 6 articles carried over from WordPress (`src/content/posts/*.md`) |
| `/faq` | 14 SEO-focused FAQs with FAQPage schema (`src/content/faqs.ts`) |
| `/contact-us` | Contact details + form (Resend) |
| `/apply` | Interim application page – replace with Lendric intake via `NEXT_PUBLIC_APPLY_URL` |
| `/privacy-policy` | Credit Guide & Privacy Statement (licensee details are **[placeholders]**) |
| `/sitemap.xml`, `/robots.txt` | Generated; site is indexable (the old site was `noindex`) |

Old WordPress URLs (`/apply-now`, `/full-loan-application/calculators`, the six blog slugs) 308-redirect to the new paths – see `next.config.ts`.

## Calculators

Borrowing Power · Loan Repayment · Extra Repayment · Home Loan Offset · How Long to Repay · Interest Only · Split Loan · Loan Comparison · Comparison Rate · Stamp Duty (all 8 states/territories, FY2026-27) · Rent vs Buy · Car Loan · Personal Loan · Leasing · Budget Planner · Income Tax (FY2026-27).

All maths lives in `src/lib/calc/finance.ts`; UI in `src/components/calculators/`. Run `npx tsx scripts/verify-calcs.mts` to check the maths against known figures. Update stamp duty scales and tax brackets each July.

## Things to fill in

Edit `src/lib/site.ts`:

- `compliance.*` – ACL, licensee, CRNs, aggregator (currently `[placeholders]`, shown in the footer and Credit Guide)
- `phone` – swap for the new AI-answered number if you get one
- Address is already **11 Wilson Street, South Yarra VIC 3141**

## Environment variables

Copy `.env.example` to `.env.local` locally, and add the same in Vercel → Project → Settings → Environment Variables.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Contact/apply form delivery. Verify `startfinance.com.au` in Resend first. |
| `CONTACT_TO_EMAIL` | Where enquiries go (default `info@startfinance.com.au`) |
| `CONTACT_FROM_EMAIL` | Sender, must be on a verified Resend domain |
| `NEXT_PUBLIC_APPLY_URL` | Lendric intake URL. Until set, Apply Now goes to `/apply`. |
| `NEXT_PUBLIC_AI_URL` | Defaults to `https://ai.startfinance.com.au` |
| `NEXT_PUBLIC_SITE_URL` | Defaults to `https://www.startfinance.com.au` (used for canonical/sitemap) |

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build – must pass before pushing
```

## Deploy (first time)

1. Create an empty GitHub repo `rusden-lab/start-finance`, then from this folder:
   ```bash
   git remote add origin https://github.com/rusden-lab/start-finance.git
   git push -u origin main
   ```
2. Vercel → Add New Project → import `rusden-lab/start-finance` (team: rusden-lab's projects). Framework is auto-detected. Add the env vars above. Deploy.
3. Vercel → Project → Settings → Domains → add `www.startfinance.com.au` and `startfinance.com.au` (set www as primary; Vercel will redirect the apex).

## DNS cutover (GoDaddy)

Do this only once the Vercel preview URL looks right and `RESEND_API_KEY` is set.

1. In GoDaddy DNS for `startfinance.com.au`, **delete** the existing `A` record for `@` and the `CNAME` for `www` that point at MoWorks/WP Engine.
2. Add: `A  @  76.76.21.21` and `CNAME  www  cname.vercel-dns.com` (Vercel shows the exact values on the Domains page – use those if they differ).
3. Leave `ai` (already on Vercel) and all **MX / TXT / SPF / DKIM** records untouched so email keeps working.
4. Propagation is usually under an hour. Vercel issues the SSL certificate automatically.
5. Afterwards, cancel MoWorks hosting and ask them for a final export of the WordPress site for your records.

## AI-mode toggle on the AI site

To mirror the switch on ai.startfinance.com.au, drop this into its nav (states flipped):

```html
<div class="mode-toggle">
  <a href="https://www.startfinance.com.au">Normal</a>
  <span class="active">AI mode ✦</span>
</div>
```
