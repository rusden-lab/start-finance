import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us – Melbourne Mortgage Brokers",
  description:
    "Since 2021 Start Finance has helped Australians get finance the stress-free way: a seamless online platform, transparent communication and loan specialists who work around you.",
  alternates: { canonical: "/about-us" },
};

const pillars = [
  {
    img: "/assets/illustrations/about-growing-money.svg",
    title: "Finance for your needs",
    text: "Start your journey faster and more effortlessly – our technology platform takes care of the paperwork and regulatory requirements while our brokers focus on finding you the right loan.",
  },
  {
    img: "/assets/illustrations/about-target-goals.svg",
    title: "Transparent communication",
    text: "Stay informed every step of the way, whether you're an online-only applicant or working with a dedicated loan specialist.",
  },
  {
    img: "/assets/illustrations/about-cashflow.svg",
    title: "We're about you",
    text: "Whether it's a first home, a refinance, a car or a business loan, we take the time to understand your situation and find a lender whose policy fits it.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Anyone can Start Finance"
        intro="Since 2021, our mission has been to provide a loan service that supports Australians on their finance journey through accessible, stress-free loans and a seamless, efficient online platform."
      >
        <Image src="/assets/illustrations/about-growing-money.svg" alt="" width={420} height={320} className="w-full max-w-[420px]" priority />
      </PageHero>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="card p-8">
                <Image src={p.img} alt="" width={160} height={120} className="h-[120px] w-auto" />
                <h2 className="mt-6 text-xl">{p.title}</h2>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-lilac/60">
        <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="display text-3xl sm:text-4xl">We offer what the banks won&apos;t</h2>
            <p className="mt-5 text-ink-soft">
              A bank can only offer you its own products. As brokers we compare thousands of loans across more than 40
              lenders – majors, non-banks and specialists – and negotiate on your behalf. Personalised attention,
              flexible terms and customised loan options.
            </p>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {[
                "100% online process, or in person at South Yarra",
                "Dedicated loan specialist from enquiry to settlement",
                "Help for low credit scores and self-employed borrowers",
                "$1,000 settlement bonus on eligible loans that start online*",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Image src="/assets/icons/deco-tick-pink.svg" alt="" width={20} height={20} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={site.applyUrl} className="btn btn-primary">Apply Now</Link>
              <Link href="/contact-us" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["5,000+", "loan products"],
              ["40+", "lenders on panel"],
              ["2021", "helping Australians since"],
              ["100%", "online if you want it"],
            ].map(([n, l]) => (
              <div key={l} className="card p-6 text-center">
                <p className="font-heading text-3xl font-extrabold text-purple">{n}</p>
                <p className="mt-1 text-sm text-muted">{l}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
