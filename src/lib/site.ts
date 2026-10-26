export const site = {
  name: "Start Finance",
  legalName: "Start Finance Pty Ltd",
  tagline: "Start smart, Start Finance",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.startfinance.com.au",
  aiUrl: process.env.NEXT_PUBLIC_AI_URL || "https://ai.startfinance.com.au",
  /** Where the Apply Now button sends people. Point this at the Lendric intake when ready. */
  applyUrl: process.env.NEXT_PUBLIC_APPLY_URL || "/apply",
  phone: "1800 569 090",
  phoneHref: "tel:1800569090",
  email: "info@startfinance.com.au",
  address: {
    line1: "11 Wilson Street",
    suburb: "South Yarra",
    state: "VIC",
    postcode: "3141",
    full: "11 Wilson Street, South Yarra VIC 3141",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=11+Wilson+Street+South+Yarra+VIC+3141",
  },
  /** Launch promotion – flip `active` to false (or let `endsOn` pass) to switch it off everywhere. */
  promo: {
    active: true,
    amount: "$1,000",
    headline: "AI launch offer: $1,000 settlement bonus",
    detail: "when an eligible home, investment or refinance loan over $400k starts online and settles. First 20 only.",
    endsOn: "2026-11-30", // ISO date, Melbourne time; banner auto-hides after this
    termsAnchor: "/apply#promo-terms",
  },
  hours: [
    { day: "Monday to Friday", time: "9am – 5pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "https://www.facebook.com/people/Start-Finance/100091856954282/",
    instagram: "https://www.instagram.com/startfinance_/",
    linkedin: "https://www.linkedin.com/company/startfinance1/about/",
    tiktok: "https://www.tiktok.com/@start_finance",
  },
  /** Fill these in once accreditation is confirmed. Bracketed values render as-is. */
  compliance: {
    acl: "[ACL Number]",
    licensee: "[Licensee Name]",
    licenseeAcn: "[Licensee ACN]",
    corporateCrn: "[Corporate CRN]",
    individualCrn: "[Individual CRN]",
    aggregator: "[Aggregator / Broker Group]",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact-us", label: "Contact" },
];
