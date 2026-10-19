import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply Now – Start Your Online Finance Application",
  description:
    "Ready, set, go! Start your online finance application with Start Finance. Tell us what you need and a loan specialist will take it from there.",
  alternates: { canonical: "/apply" },
};

/**
 * Interim application page. Once the Lendric intake is live, set NEXT_PUBLIC_APPLY_URL
 * and every Apply Now button on the site will point there instead of this page.
 */
export default function Apply() {
  return (
    <>
      <PageHero eyebrow="Apply Now" title="Ready, set, go! Start your online finance application" intro="Tell us a little about what you need. A loan specialist will be in touch within one business day to get your application moving – no paperwork required to get started.">
        <Image src="/assets/illustrations/step-4-apply-online.svg" alt="" width={360} height={280} className="w-full max-w-[360px]" priority />
      </PageHero>
      <section>
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-20">
          <div>
            <h2 className="text-2xl">What happens next</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Tell us what you need", "Home, refinance, investment, business, car or personal – and roughly how much."],
                ["We call you", "A loan specialist confirms the details and asks a few questions about your situation."],
                ["We find your match", "We compare thousands of products and come back with options that fit."],
                ["Apply online", "Upload documents securely and track progress through to settlement."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deep font-heading text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-heading font-bold">{t}</p>
                    <p className="text-sm text-ink-soft">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-ink-soft">
              Prefer to talk? Call <a href={site.phoneHref} className="font-semibold text-purple">{site.phone}</a>, Monday to Friday 9am–5pm.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl">Start a new application</h2>
            <div className="mt-6">
              <ContactForm subjectDefault="Home loan" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
