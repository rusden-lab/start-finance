"use client";

import { useEffect, useRef, useState } from "react";

const WIDGET_SRC = process.env.NEXT_PUBLIC_LENDRIC_WIDGET_SRC || "https://www.lendric.com.au/intake-widget.js";
const WIDGET_KEY = process.env.NEXT_PUBLIC_LENDRIC_WIDGET_KEY || "lk_WQ8N8QBd6RkAMX11-Nqy6_e7";

/**
 * Lendric Intake widget (light theme) – the question flow, matching and lead capture
 * run inside Lendric. The widget key is public by design; rotate it in Lendric if needed.
 * Lendric must list this site's origin under the key's allowed origins.
 */
export default function LendricIntake({ fallback }: { fallback: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "slow" | "ready" | "failed">("loading");

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const s = document.createElement("script");
    s.src = WIDGET_SRC;
    s.async = true;
    s.dataset.key = WIDGET_KEY;
    s.dataset.target = "#lendric-intake";
    s.dataset.theme = "light";
    s.dataset.accent = "#B329FF";
    s.onerror = () => setState("failed");
    el.appendChild(s);

    // Lendric's first load can take a while on a cold start (script → flow → resume saved lead).
    // Show a "still loading" note after 6s and only fall back to the plain form after 30s.
    const isMounted = () => (document.querySelector("#lendric-intake")?.childElementCount ?? 0) > 0;
    const slow = setTimeout(() => setState((s) => (s === "loading" ? "slow" : s)), 6000);
    const t = setTimeout(() => setState(isMounted() ? "ready" : "failed"), 30000);
    const obs = new MutationObserver(() => {
      if (isMounted()) {
        setState("ready");
        clearTimeout(t);
        clearTimeout(slow);
        obs.disconnect();
      }
    });
    const target = document.querySelector("#lendric-intake");
    if (target) obs.observe(target, { childList: true });
    return () => {
      clearTimeout(t);
      clearTimeout(slow);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={host}>
      <div
        id="lendric-intake"
        data-lendric-intake
        style={
          {
            "--li-accent": "#B329FF",
            "--li-accent2": "#FF29E7",
            "--li-btn-text": "#fff",
            "--li-text": "#231f20",
            "--li-muted": "#6f6a72",
            "--li-border": "#e6dbf5",
            "--li-card": "#f6f0ff",
            "--li-card-hover": "#eee0ff",
            "--li-input": "#ffffff",
            "--li-radius": "12px",
            "--li-font": "var(--font-body)",
          } as React.CSSProperties
        }
      />
      {(state === "loading" || state === "slow") && (
        <div className="py-10 text-center text-sm text-muted">
          <span className="mx-auto mb-3 block h-6 w-6 animate-spin rounded-full border-2 border-lilac border-t-purple" aria-hidden="true" />
          {state === "slow" ? "Still loading – this can take a few seconds the first time…" : "Loading your application…"}
        </div>
      )}
      {state === "failed" && (
        <div>
          <div className="mb-5 rounded-xl bg-lilac p-4 text-sm text-ink-soft">
            <p>Our online application didn&apos;t load. You can try again, or leave your details below and a broker will get you started.</p>
            <button type="button" onClick={() => window.location.reload()} className="btn btn-primary mt-3 !px-4 !py-2 text-xs">
              Try again
            </button>
          </div>
          {fallback}
        </div>
      )}
    </div>
  );
}
