"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import ModeToggle from "./ModeToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const bar = dark
    ? scrolled
      ? "bg-[#7a1fe6]/95 backdrop-blur text-white shadow-lg"
      : "bg-transparent text-white"
    : "bg-white/95 backdrop-blur text-ink border-b border-line";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${bar}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Start Finance home" className="flex items-center">
          <Image
            src={dark ? "/assets/logo/start-finance-logo-white.svg" : "/assets/logo/start-finance-logo-black.svg"}
            alt="Start Finance"
            width={132}
            height={34}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-[15px] font-medium transition-colors ${
                  active ? "text-fuchsia" : dark ? "text-white/90 hover:text-white" : "text-ink-soft hover:text-purple"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ModeToggle dark={dark} />
          <Link href={site.applyUrl} className="btn btn-primary !py-2.5 !px-5 text-sm">
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-lg p-2"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-white text-ink shadow-xl">
          <nav className="flex flex-col px-4 py-3" aria-label="Mobile">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="py-3 text-base font-medium border-b border-line last:border-0">
                {n.label}
              </Link>
            ))}
            <div className="flex items-center justify-between py-4">
              <ModeToggle dark={false} />
              <Link href={site.applyUrl} className="btn btn-primary !py-2.5 !px-5 text-sm">
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
