import { site } from "@/lib/site";

/**
 * Normal / AI mode switch. "Normal" is this site; "AI" links across to ai.startfinance.com.au.
 * Mirror this component on the AI site with the states flipped.
 */
export default function ModeToggle({ dark }: { dark: boolean }) {
  const shell = dark ? "bg-white/15 text-white" : "bg-lilac text-ink-soft";
  return (
    <div
      className={`inline-flex items-center rounded-full p-1 text-xs font-semibold ${shell}`}
      role="group"
      aria-label="Site mode"
    >
      <span className="rounded-full bg-white px-3 py-1.5 text-deep shadow-sm" aria-current="true">
        Normal
      </span>
      <a
        href={site.aiUrl}
        className="rounded-full px-3 py-1.5 transition-colors hover:text-fuchsia"
        title="Switch to AI mode"
      >
        AI mode ✦
      </a>
    </div>
  );
}
