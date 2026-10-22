import Link from "next/link";
import { site } from "@/lib/site";

export function promoLive() {
  if (!site.promo.active) return false;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(new Date());
  return today <= site.promo.endsOn;
}

/** Slim launch-offer strip shown above the header while the promo is live. */
export default function PromoBanner() {
  if (!promoLive()) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-fuchsia text-white">
      <Link href={site.promo.termsAnchor} className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[13px] font-semibold leading-tight sm:text-sm">
        <span className="hidden sm:inline">🎉</span>
        <span>
          <strong>{site.promo.headline}</strong> {site.promo.detail}
        </span>
        <span className="underline underline-offset-2 whitespace-nowrap">Terms →</span>
      </Link>
    </div>
  );
}
