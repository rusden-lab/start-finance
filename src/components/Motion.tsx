"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initMotion } from "@/lib/motion-core";

/**
 * Site-wide motion layer (GSAP). Runs after hydration and re-runs on every route change.
 * Everything is opt-in by selector / data attribute and switches off under prefers-reduced-motion.
 *   data-reveal  – fade-up once when scrolled into view (siblings stagger)
 *   data-count   – numeric text counts up on first view
 *   data-coins   – coins puff out of this button on hover
 */
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const cleanup = initMotion(gsap, ScrollTrigger, {
      hero: pathname === "/" ? { items: ["[data-hero-item]"], visual: "[data-hero-visual]" } : null,
      reveal: ["[data-reveal]", "h2.display", ".card", "article"],
      count: "[data-count]",
      parallax: [{ el: "[data-parallax]", y: 40 }],
      buttons: ".btn",
      sweep: ".btn-primary",
      coins: "[data-coins]",
    });
    return cleanup;
  }, [pathname]);
  return null;
}
