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
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

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

    // If the widget hasn't rendered anything within 8s (blocked origin, outage), show the fallback form.
    const t = setTimeout(() => {
      const mounted = document.querySelector("#lendric-intake")?.childElementCount ?? 0;
      setState(mounted > 0 ? "ready" : "failed");
    }, 8000);
    const obs = new MutationObserver(() => {
      if ((document.querySelector("#lendric-intake")?.childElementCount ?? 0) > 0) {
        setState("ready");
        clearTimeout(t);
        obs.disconnect();
      }
    });
    const target = document.querySelector("#lendric-intake");
    if (target) obs.observe(target, { childList: true });
    return () => {
      clearTimeout(t);
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
      {state === "loading" && (
        <p className="py-10 text-center text-sm text-muted">Loading your application…</p>
      )}
      {state === "failed" && (
        <div>
          <p className="mb-5 rounded-xl bg-lilac p-4 text-sm text-ink-soft">
            Our online application is taking a moment to load. Leave your details below and a broker will get you started.
          </p>
          {fallback}
        </div>
      )}
    </div>
  );
}
