import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, PageHero } from "@/components/ui";
import FaqAccordion from "@/components/FaqAccordion";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Home Loan FAQs – Borrowing, LMI, Stamp Duty & Refinancing Answered",
  description:
    "Straight answers to the questions Australians ask most about home loans: how much you can borrow, LVR and LMI, stamp duty in Victoria, fixed vs variable, refinancing and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const categories = ["Borrowing", "Buying", "Refinancing", "Business"] as const;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="Got questions? We've got answers."
        intro="The questions people ask us most – answered plainly. Can't find yours? Call us or send a message and a loan specialist will get back to you."
      />
      <section>
        <Container className="grid gap-12 py-16 md:grid-cols-[220px_1fr] md:py-20">
          <nav className="md:sticky md:top-24 md:self-start" aria-label="FAQ sections">
            <ul className="flex flex-wrap gap-2 md:flex-col">
              {categories.map((c) => (
                <li key={c}>
                  <a href={`#${c.toLowerCase()}`} className="inline-block rounded-full bg-lilac px-4 py-2 text-sm font-semibold text-deep hover:bg-pale">
                    {c}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <Link href="/calculators" className="text-sm font-semibold text-purple hover:underline">
                  Try our calculators →
                </Link>
              </li>
            </ul>
          </nav>
          <div className="space-y-12">
            {categories.map((c) => (
              <div key={c} id={c.toLowerCase()} className="scroll-mt-28">
                <h2 className="display mb-5 text-2xl">{c}</h2>
                <FaqAccordion items={faqs.filter((f) => f.category === c)} defaultOpen={null} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Still have a question?" text="Talk to a loan specialist – no obligation, no jargon." label="Apply Now" />
    </>
  );
}
