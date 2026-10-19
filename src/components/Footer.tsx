import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

const YEAR = new Date().getFullYear(); // evaluated at build time

const Social = ({ href, label, path }: { href: string; label: string; path: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-fuchsia"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/assets/logo/start-finance-logo-white.svg" alt="Start Finance" width={140} height={36} />
          <p className="mt-4 max-w-sm text-sm text-white/70">
            Melbourne-based mortgage and finance brokers. Home loans, refinancing, investment, business, car and
            personal loans – anyone can Start Finance.
          </p>
          <div className="mt-6 flex gap-3">
            <Social href={site.social.facebook} label="Facebook" path="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z" />
            <Social href={site.social.instagram} label="Instagram" path="M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm5.9-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM21 8.1c-.1-1.5-.4-2.8-1.5-3.9S17.1 2.8 15.6 2.7C14 2.6 10 2.6 8.4 2.7 6.9 2.8 5.6 3.1 4.5 4.2S3.1 6.6 3 8.1C2.9 9.7 2.9 13.7 3 15.3c.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.6.1 5.6.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.6.1-5.6 0-7.2zm-2 8.8a3 3 0 01-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 01-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a3 3 0 011.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a3 3 0 011.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z" />
            <Social href={site.social.linkedin} label="LinkedIn" path="M6.9 21H3.2V8.9h3.7V21zM5.1 7.3a2.2 2.2 0 110-4.3 2.2 2.2 0 010 4.3zM21 21h-3.7v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.3V8.9h3.6v1.7h.1c.5-.9 1.7-2 3.5-2 3.8 0 4.5 2.5 4.5 5.7V21z" />
            <Social href={site.social.tiktok} label="TikTok" path="M16.6 5.8A4.3 4.3 0 0115.5 3h-3.1v12.4a2.6 2.6 0 11-1.8-2.5V9.7a5.7 5.7 0 104.9 5.7V9.2a7.3 7.3 0 004.3 1.4V7.5a4.3 4.3 0 01-3.2-1.7z" />
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-base">Start Finance</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link href="/about-us" className="hover:text-fuchsia">About</Link></li>
            <li><Link href="/calculators" className="hover:text-fuchsia">Calculators</Link></li>
            <li><Link href="/blog" className="hover:text-fuchsia">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-fuchsia">FAQ</Link></li>
            <li><Link href="/contact-us" className="hover:text-fuchsia">Contact Us</Link></li>
            <li><Link href={site.applyUrl} className="hover:text-fuchsia">Apply Now</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base">Find Us</h4>
          <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-fuchsia">
            {site.address.line1},<br />
            {site.address.suburb} {site.address.state} {site.address.postcode}
          </a>
        </div>

        <div>
          <h4 className="mb-4 text-base">Contact Us</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><a href={site.phoneHref} className="hover:text-fuchsia">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-fuchsia">{site.email}</a></li>
            <li className="pt-2 text-white/60">Mon–Fri 9am–5pm AEST</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {YEAR} {site.legalName}. All rights reserved. Credit Representative {site.compliance.corporateCrn} of {site.compliance.licensee}, Australian Credit Licence {site.compliance.acl}.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy &amp; Credit Guide</Link>
            <a href={site.aiUrl} className="hover:text-white">Switch to AI mode</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
