import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, Disclaimer } from "@/components/ui";
import { calculators, getCalc } from "@/lib/calc/registry";
import CalculatorSwitch from "@/components/calculators/CalculatorSwitch";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCalc(slug);
  if (!c) return {};
  return { title: `${c.name} (Australia)`, description: c.description, alternates: { canonical: `/calculators/${c.slug}` } };
}

export default async function CalculatorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCalc(slug);
  if (!c) notFound();
  const others = calculators.filter((o) => o.group === c.group && o.slug !== c.slug).slice(0, 4);

  return (
    <>
      <section className="bg-lilac pt-[72px]">
        <Container className="py-10 md:py-14">
          <Link href="/calculators" className="text-sm font-semibold text-purple hover:underline">← All calculators</Link>
          <div className="mt-4 flex items-start gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:flex">
              <Image src={c.icon} alt="" width={34} height={34} />
            </span>
            <div>
              <h1 className="display text-3xl sm:text-4xl">{c.name}</h1>
              <p className="mt-3 max-w-2xl text-ink-soft">{c.description}</p>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 md:py-14">
          <CalculatorSwitch slug={c.slug} />
          <Disclaimer />
          {others.length > 0 && (
            <div className="no-print mt-12">
              <h2 className="text-lg">More {c.group.toLowerCase()} calculators</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {others.map((o) => (
                  <Link key={o.slug} href={`/calculators/${o.slug}`} className="rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-purple hover:text-purple">
                    {o.short}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <CtaBand title="Want the real numbers?" text="Calculators estimate. A Start Finance broker checks actual lender policy for your situation – free, no obligation." label="Apply Now" />
    </>
  );
}
