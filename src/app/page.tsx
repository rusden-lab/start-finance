import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand } from "@/components/ui";
import FaqAccordion from "@/components/FaqAccordion";
import { faqs } from "@/content/faqs";
import { loanTypes, steps, features, testimonials } from "@/content/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Finance | Mortgage Brokers Melbourne – Home, Car, Business & Personal Loans",
  alternates: { canonical: "/" },
};

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export default function Home() {
  const homeFaqs = faqs.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden grad-hero pt-[72px] text-white">
        <div className="brand-stripe" />
        <Image src="/assets/icons/deco-coin-dollar.svg" alt="" width={44} height={44} className="absolute left-[6%] top-[28%] hidden opacity-90 lg:block" />
        <Image src="/assets/icons/deco-coin-tilted.svg" alt="" width={36} height={36} className="absolute right-[8%] top-[22%] hidden opacity-90 lg:block" />
        <Image src="/assets/icons/deco-coin-squiggle.svg" alt="" width={40} height={40} className="absolute left-[12%] bottom-[16%] hidden opacity-80 lg:block" />

        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-[1.15fr_1fr] md:py-24 lg:py-28">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="h-2 w-2 rounded-full bg-fuchsia" /> Start smart, Start Finance
            </p>
            <h1 className="display text-4xl leading-[1.02] sm:text-5xl lg:text-[64px]">
              The loan you want.
              <br />
              <span className="text-pinktint">Without the bank</span>
              <br />
              runaround.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Melbourne mortgage brokers with thousands of loan products from 40+ lenders. We find the right one,
              handle the paperwork and keep you in the loop – 100% online, or in person if you prefer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={site.applyUrl} className="btn btn-primary text-base">
                Apply Now
              </Link>
              <Link href="/calculators/borrowing-power" className="btn btn-white text-base">
                How much can I borrow?
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/90">
              {["Fast online platform", "Boost low credit scores", "Thousands of loan products"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-deep">
                    <Check />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual: real person + floating proof cards (static, decorative) */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute inset-x-8 bottom-0 top-10 rounded-[32px] bg-white/10 backdrop-blur-sm" />
            <div className="absolute -left-2 top-6 z-20 rounded-2xl bg-white px-4 py-3 text-ink shadow-xl sm:-left-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Status</p>
              <p className="flex items-center gap-2 font-heading text-sm font-bold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-white">
                  <Check />
                </span>
                Loan approved
              </p>
            </div>
            <div className="absolute -right-2 top-[38%] z-20 rounded-2xl bg-white px-4 py-3 text-ink shadow-xl sm:-right-6">
              <p className="font-heading text-2xl font-extrabold leading-none text-purple">5,000+</p>
              <p className="text-xs font-semibold text-muted">loan products compared</p>
            </div>
            <div className="absolute bottom-6 left-0 z-20 rounded-2xl bg-fuchsia px-4 py-3 text-white shadow-xl sm:-left-4">
              <p className="font-heading text-lg font-extrabold leading-none">{site.promo.amount}</p>
              <p className="text-xs font-semibold text-white/90">settlement bonus*</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/photos/cta-person-with-phone.webp"
              alt="Customer checking their loan approval on their phone"
              className="relative z-10 mx-auto max-h-[520px] w-auto drop-shadow-[0_30px_40px_rgba(30,0,70,0.45)]"
              fetchPriority="high"
            />
          </div>
        </Container>
      </section>

      {/* LOAN TYPES */}
      <section className="bg-gradient-to-b from-pale/60 to-white">
        <Container className="py-16 md:py-20">
          <div className="text-center">
            <h2 className="display text-3xl sm:text-4xl">We offer you what the banks won&apos;t</h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
              With our personalised attention, flexible terms and customised loan options – anyone can Start Finance.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {loanTypes.map((l) => (
              <div key={l.name} className="card flex flex-col p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pale">
                  <Image src={l.icon} alt="" width={22} height={22} />
                </span>
                <h3 className="mt-4 text-[15px]">{l.name}</h3>
                <p className="mb-4 mt-1 text-xs text-muted">{l.blurb}</p>
                <Link href={site.applyUrl} className="btn btn-primary mt-auto !px-4 !py-2 text-xs">
                  Apply now
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* STEPS */}
      <section>
        <Container className="py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="display text-3xl sm:text-4xl">Skip the queue</h2>
              <p className="mt-4 max-w-xl text-ink-soft">
                With the use of our technology and 100% online process, we&apos;ll push your application through faster –
                so you don&apos;t have to wait in line.
              </p>
            </div>
            <Link href={site.applyUrl} className="btn btn-primary">
              Let&apos;s Get Started
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl bg-pinktint p-7 text-center">
                <Image src={s.img} alt="" width={180} height={140} className="mx-auto h-[140px] w-auto" />
                <h3 className="mt-5 text-lg">Step {s.n}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section className="bg-lilac/50">
        <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "What we do", d: "5,000+ loan products. 100% online.", i: "M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" },
              { t: "Who we are", d: "Fast and easy digital loan service.", i: "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-8 1.7-8 4v2h16v-2c0-2.3-4.7-4-8-4z" },
              { t: "Why we do it", d: "Save time. Save money.", i: "M5 3v18h2v-7h9l-1.5-3L16 8H7V3H5z" },
            ].map((c, idx) => (
              <div key={c.t} className={`card p-6 ${idx === 0 ? "row-span-2 self-center" : ""}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-deep text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={c.i} /></svg>
                </span>
                <h3 className="mt-5 text-lg">{c.t}</h3>
                <p className="mt-2 text-sm text-ink-soft">{c.d}</p>
              </div>
            ))}
          </div>
          <div>
            <span className="eyebrow mb-3">About Us</span>
            <h2 className="display text-3xl sm:text-4xl">Anyone can Start Finance</h2>
            <p className="mt-5 text-ink-soft">
              At Start Finance we believe loans should be stress-free and accessible to all. We take the time to understand
              your needs and find a loan that&apos;s right for you – then keep you informed at every step through to
              settlement.
            </p>
            <Link href="/about-us" className="btn btn-outline mt-7">
              Get to know Start Finance
            </Link>
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="relative overflow-hidden grad-purple text-white">
        <div className="brand-stripe" />
        <Container className="relative py-16 md:py-20">
          <div className="text-center">
            <h2 className="display text-3xl sm:text-4xl">Do yourself a solid</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">
              Help yourself by choosing the trusted finance provider for young Australians and take away the uncertainty.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title}>
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} alt="" className="aspect-[4/3] w-full object-cover grayscale transition duration-300 hover:grayscale-0" loading="lazy" />
                </div>
                <h3 className="mt-4 text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-white/80">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={site.applyUrl} className="btn btn-primary">
              Let&apos;s Start Finance
            </Link>
          </div>
        </Container>
      </section>

      {/* SERVICES + CALCULATORS */}
      <section className="bg-pinktint/60">
        <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="display text-3xl sm:text-4xl">Our services</h2>
            <ul className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
              {[
                { t: "Refinancing", i: "/assets/icons/service-refinancing.svg", h: "/calculators/loan-comparison" },
                { t: "Buying", i: "/assets/icons/service-buying-cart.svg", h: "/calculators/borrowing-power" },
                { t: "Investing", i: "/assets/icons/service-investing-plant.svg", h: "/calculators/rent-vs-buy" },
              ].map((s) => (
                <li key={s.t}>
                  <Link href={s.h} className="flex items-center gap-4 py-5 font-heading text-lg font-bold transition-colors hover:text-purple">
                    <Image src={s.i} alt="" width={28} height={28} />
                    {s.t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <h2 className="display text-3xl sm:text-4xl">Start Finance calculators</h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Want to calculate repayments, borrowing power, stamp duty or savings? Use our calculators and print your
              results.
            </p>
            <Link href="/calculators" className="btn btn-primary mt-6">
              Let&apos;s do it
            </Link>
            <Image src="/assets/illustrations/calculators.svg" alt="" width={420} height={280} className="mt-6 w-full max-w-[420px]" />
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-lilac/60">
        <Container className="py-16 md:py-20">
          <div className="text-center">
            <span className="eyebrow mb-3">Testimonials</span>
            <h2 className="display text-3xl sm:text-4xl">What do our customers reckon?</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card p-7">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Image key={i} src="/assets/illustrations/review-star.svg" alt="" width={18} height={18} />
                  ))}
                </div>
                <blockquote className="mt-4 text-ink-soft">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <Image src={t.img} alt="" width={44} height={44} className="rounded-full" />
                  <div>
                    <p className="font-heading text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted">{t.where}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section>
        <Container className="py-16 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-3xl sm:text-4xl">Got questions?</h2>
            <Link href="/faq" className="font-semibold text-purple hover:underline">
              View all FAQs →
            </Link>
          </div>
          <div className="mt-8">
            <FaqAccordion items={homeFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand title="Present you, future phew" />
    </>
  );
}
