/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// Shared with the AI site (Start Finance AI/assets/motion-core.js) – keep the two in sync.
/* Start Finance – shared motion layer (GSAP). Used by both sites:
 *   AI site:  assets/motion.js wraps this with the CDN globals.
 *   www site: src/lib/motion-core.ts is this same file as an ES module.
 * Brief: felt, not noticed. Nothing bounces, nothing over ~0.6s, everything off under prefers-reduced-motion.
 *
 * initMotion(gsap, ScrollTrigger, {
 *   reveal:   selectors that fade-up once when scrolled into view (grids stagger)
 *   count:    selectors whose numeric text counts up on first view ("5,000+", "$2.1B+", "98.2%", "4.9★")
 *   hero:     { items: [selectors in order], visual: selector }   – staggered entrance on load
 *   parallax: [{ el: selector, y: px }]
 *   buttons:  selector for magnetic/press/sweep buttons
 *   coins:    selector for buttons that puff coins on hover (default "[data-coins]")
 * })
 */
export function initMotion(gsap, ScrollTrigger, o) {
  if (typeof window === "undefined" || !gsap) return () => {};
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const q = (s, root = document) => (s ? Array.from(root.querySelectorAll(s)) : []);
  const fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  const cleanups = [];
  const on = (el, ev, fn, opts) => { el.addEventListener(ev, fn, opts); cleanups.push(() => el.removeEventListener(ev, fn, opts)); };

  /* ── Hero entrance ─────────────────────────────────────────────────────── */
  if (o.hero) {
    const items = (o.hero.items || []).flatMap((s) => q(s)).filter(Boolean);
    if (items.length) {
      gsap.set(items, { opacity: 0, y: 22 });
      gsap.to(items, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08, delay: 0.05, clearProps: "transform" });
    }
    const vis = q(o.hero.visual);
    if (vis.length) {
      gsap.set(vis, { opacity: 0, x: 28 });
      gsap.to(vis, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay: 0.25, clearProps: "transform" });
    }
  }

  /* ── Launch strip: one small tilt of the emoji ─────────────────────────── */
  q(o.stripEmoji || ".promo-emoji").forEach((el) => {
    gsap.fromTo(el, { rotate: -12, display: "inline-block" }, { rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.5)", delay: 0.6 });
  });

  /* ── Scroll reveals ────────────────────────────────────────────────────── */
  if (ScrollTrigger && o.reveal) {
    const seen = new Set();
    o.reveal.forEach((sel) => {
      const els = q(sel).filter((el) => !seen.has(el));
      els.forEach((el) => seen.add(el));
      if (!els.length) return;
      gsap.set(els, { opacity: 0, y: 24 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.06, overwrite: true, clearProps: "transform" }),
      });
    });
    // anything still hidden if ScrollTrigger never fires (e.g. print) – safety net
    cleanups.push(() => gsap.set(Array.from(seen), { clearProps: "all" }));
    ScrollTrigger.refresh();
  }

  /* ── Counters ──────────────────────────────────────────────────────────── */
  if (ScrollTrigger && o.count) {
    q(o.count).forEach((el) => {
      const text = el.textContent.trim();
      const m = text.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
      if (!m) return;
      const [, pre, numStr, post] = m;
      const target = parseFloat(numStr.replace(/,/g, ""));
      const decimals = (numStr.split(".")[1] || "").length;
      const grouped = numStr.includes(",");
      const fmt = (v) => {
        let s = v.toFixed(decimals);
        if (grouped) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return pre + s + post;
      };
      const state = { v: 0 };
      el.textContent = fmt(0);
      const run = () => gsap.to(state, { v: target, duration: 1.1, ease: "power2.out", onUpdate: () => { el.textContent = fmt(state.v); }, onComplete: () => { el.textContent = text; } });
      const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: run });
      // Elements already in view when the page loads (hero stats) – the trigger has nothing to enter
      if (el.getBoundingClientRect().top < window.innerHeight) { st.kill(); run(); }
    });
  }

  /* ── Parallax ──────────────────────────────────────────────────────────── */
  if (ScrollTrigger && o.parallax) {
    o.parallax.forEach(({ el, y }) => q(el).forEach((node) => {
      gsap.to(node, { y: y, ease: "none", scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }));
  }

  /* ── Buttons: press, magnetic, arrow nudge, gradient sweep ─────────────── */
  q(o.buttons || ".btn-primary, .btn-outline, .btn-ghost, .nav-cta").forEach((btn) => {
    // press
    on(btn, "pointerdown", () => gsap.to(btn, { scale: 0.97, duration: 0.12, ease: "power2.out" }));
    const release = () => gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.out" });
    on(btn, "pointerup", release); on(btn, "pointerleave", release); on(btn, "pointercancel", release);
    if (!fine) return;
    // magnetic (desktop only)
    const strength = 6;
    on(btn, "pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      gsap.to(btn, { x: dx * strength, y: dy * strength, duration: 0.3, ease: "power2.out" });
    });
    on(btn, "pointerleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: "power3.out" }));
    // arrow nudge – last text node ending in an arrow gets wrapped once
    const last = Array.from(btn.childNodes).reverse().find((n) => n.nodeType === 3 && /→\s*$/.test(n.textContent));
    if (last) {
      const txt = last.textContent.replace(/\s*→\s*$/, "");
      const span = document.createElement("span");
      span.className = "btn-arrow"; span.textContent = "→"; span.style.display = "inline-block";
      last.textContent = txt + " ";
      btn.insertBefore(span, last.nextSibling);
    }
    const arrow = btn.querySelector(".btn-arrow");
    if (arrow) {
      on(btn, "pointerenter", () => gsap.to(arrow, { x: 3, duration: 0.25, ease: "power2.out" }));
      on(btn, "pointerleave", () => gsap.to(arrow, { x: 0, duration: 0.3, ease: "power2.out" }));
    }
    // gradient sweep (primary only; CSS supplies the ::after highlight via .btn-sweep)
    if (btn.matches(o.sweep || ".btn-primary, .nav-cta")) {
      btn.classList.add("btn-sweep");
      let busy = false;
      on(btn, "pointerenter", () => {
        if (busy) return; busy = true;
        gsap.fromTo(btn, { "--sweep": "-120%" }, { "--sweep": "120%", duration: 0.7, ease: "power2.inOut", onComplete: () => { busy = false; } });
      });
    }
  });

  /* ── Coins out of the hero CTA ─────────────────────────────────────────── */
  const COIN = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#EDAF14"/><circle cx="12" cy="12" r="8" fill="none" stroke="#C98D06" stroke-width="1.5"/><text x="12" y="16" text-anchor="middle" font-size="11" font-weight="800" font-family="Syne,sans-serif" fill="#7A5200">$</text></svg>';
  q(o.coins || "[data-coins]").forEach((btn) => {
    let last = 0;
    on(btn, "pointerenter", () => {
      const now = Date.now();
      if (now - last < 1400) return; last = now;
      const r = btn.getBoundingClientRect();
      const n = 5;
      for (let i = 0; i < n; i++) {
        const c = document.createElement("span");
        c.className = "sf-coin";
        c.innerHTML = COIN;
        c.style.cssText = `position:fixed;left:${r.left + r.width * (0.25 + 0.5 * Math.random())}px;top:${r.top + r.height / 2}px;pointer-events:none;z-index:9999;will-change:transform;line-height:0`;
        document.body.appendChild(c);
        const dir = i % 2 ? 1 : -1;
        const dx = dir * (20 + Math.random() * 50), up = -(40 + Math.random() * 40), fall = 60 + Math.random() * 30;
        gsap.timeline({ onComplete: () => c.remove() })
          .fromTo(c, { scale: 0.4, opacity: 0, rotate: 0 }, { scale: 1, opacity: 1, duration: 0.12, ease: "power1.out" }, 0)
          .to(c, { x: dx, rotate: dir * 200, duration: 0.85, ease: "power1.out" }, 0)
          .to(c, { y: up, duration: 0.35, ease: "power2.out" }, 0)
          .to(c, { y: up + fall, duration: 0.5, ease: "power2.in" }, 0.35)
          .to(c, { opacity: 0, duration: 0.25 }, 0.6);
      }
    });
  });

  /* ── Floating launcher entrance ────────────────────────────────────────── */
  q(o.fab || ".mia-fab").forEach((el) => gsap.from(el, { y: 24, opacity: 0, duration: 0.5, ease: "power3.out", delay: 1.2 }));

  return () => { cleanups.forEach((f) => f()); if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill()); };
}
