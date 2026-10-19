"use client";

import { useState } from "react";
import type { Faq } from "@/content/faqs";

export default function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-lilac/60 sm:px-7"
            >
              <span className={`font-heading text-[17px] font-bold ${isOpen ? "text-purple" : "text-ink"}`}>{f.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lilac text-purple transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-6 text-[15.5px] text-ink-soft sm:px-7">
                {f.a.map((p, j) => (
                  <p key={j} className={j ? "mt-3" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
