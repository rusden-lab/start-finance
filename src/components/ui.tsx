import Link from "next/link";
import { site } from "@/lib/site";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-lilac pt-[72px]">
      <Container className="grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
        <div>
          {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
          <h1 className="display text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-lg text-ink-soft">{intro}</p>}
        </div>
        {children && <div className="flex justify-center md:justify-end">{children}</div>}
      </Container>
    </section>
  );
}

export function CtaBand({
  title = "Are you ready to Start Finance?",
  text = "Thank yourself later and get started with our online and simple process today.",
  label = "Apply Now",
}: {
  title?: string;
  text?: string;
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden grad-purple text-white">
      <div className="brand-stripe" />
      <Container className="relative grid items-center gap-8 py-16 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <h2 className="display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-white/85">{text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={site.applyUrl} className="btn btn-primary">
              {label}
            </Link>
            <a href={site.phoneHref} className="btn btn-white">
              Call {site.phone}
            </a>
          </div>
        </div>
        <div className="hidden justify-end md:flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/illustrations/step-6-settlement.svg" alt="" className="max-h-[300px] w-auto" loading="lazy" />
        </div>
      </Container>
    </section>
  );
}

export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <p className="mt-6 text-xs leading-relaxed text-muted">
      {children ??
        "This calculator provides general estimates only, based on the information you enter and the assumptions shown. It does not take into account your personal circumstances and is not an offer of credit. Lender policies, rates and fees vary. Speak to Start Finance for a personalised assessment."}
    </p>
  );
}
