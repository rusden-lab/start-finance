import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { calculators } from "@/lib/calc/registry";

export const metadata: Metadata = {
  title: "Home Loan Calculators – Repayments, Borrowing Power, Stamp Duty & More",
  description:
    "Free Australian finance calculators: loan repayments, borrowing power, stamp duty for every state, extra repayments, offset, rent vs buy, car and personal loans, income tax and more. Print your results.",
  alternates: { canonical: "/calculators" },
};

export default function Calculators() {
  const groups = ["Home loans", "Buying", "Other loans", "Planning"] as const;
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="Start Finance calculators"
        intro="Want to calculate repayments, borrowing power, stamp duty or savings? Use our calculators and print your details and results. All figures are instant and nothing is stored."
      >
        <Image src="/assets/illustrations/calculators.svg" alt="" width={440} height={300} className="w-full max-w-[440px]" priority />
      </PageHero>

      <section>
        <Container className="space-y-14 py-16 md:py-20">
          {groups.map((g) => (
            <div key={g}>
              <h2 className="display mb-6 text-2xl">{g}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {calculators
                  .filter((c) => c.group === g)
                  .map((c) => (
                    <Link key={c.slug} href={`/calculators/${c.slug}`} className="card group flex gap-4 p-6 transition-shadow hover:shadow-xl">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pale">
                        <Image src={c.icon} alt="" width={26} height={26} />
                      </span>
                      <span>
                        <span className="block font-heading text-[17px] font-bold transition-colors group-hover:text-purple">{c.name}</span>
                        <span className="mt-1 block text-sm text-ink-soft">{c.description}</span>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CtaBand title="Are you ready to Start Finance?" text="Calculators give you a ballpark. We give you real lender numbers for your situation." label="Let's Get Started" />
    </>
  );
}
