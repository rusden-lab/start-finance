import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import LendricIntake from "@/components/LendricIntake";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply Now – Start Your Online Finance Application",
  description:
    "Ready, set, go! Start your online finance application with Start Finance. Tell us what you need and a loan specialist will take it from there.",
  alternates: { canonical: "/apply" },
};

/**
 * Application page – embeds the Lendric Intake widget. Every "Apply Now" on the site
 * lands here (site.applyUrl). The ContactForm is only shown if the widget can't load.
 */
export default function Apply() {
  return (
    <>
      <PageHero eyebrow="Apply Now" title="Ready, set, go! Start your online finance application" intro="Answer a few quick questions and we'll match you to lenders that fit – then a broker takes it from there. Takes about two minutes, no paperwork to get started.">
        <Image src="/assets/illustrations/step-4-apply-online.svg" alt="" width={360} height={280} className="w-full max-w-[360px]" priority />
      </PageHero>
      <section>
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-20">
          <div>
            <h2 className="text-2xl">What happens next</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["Answer a few questions", "What you're after, roughly how much, and a bit about your situation – two minutes."],
                ["See your matches", "We check lender policy and show you options that fit, not just the cheapest headline rate."],
                ["Talk to a broker or continue online", "Request a call back below, or keep going and upload documents securely."],
                ["Settle", "We handle the lender, the paperwork and the chasing through to settlement."],
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
              Prefer to talk first? <a href="#callback" className="font-semibold text-purple">Request a call back</a> or call{" "}
              <a href={site.phoneHref} className="font-semibold text-purple">{site.phone}</a>, Monday to Friday 9am–5pm.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            {site.promo.active && (
              <div className="mb-6 rounded-xl bg-pinktint p-4 text-sm">
                <p className="font-heading font-bold text-deep">{site.promo.headline}</p>
                <p className="mt-1 text-ink-soft">{site.promo.detail}</p>
              </div>
            )}
            <h2 className="text-2xl">Start a new application</h2>
            <div className="mt-6">
              <LendricIntake fallback={<ContactForm subjectDefault="Home loan" />} />
            </div>
          </div>
        </Container>
      </section>
      <section id="callback" className="scroll-mt-28 bg-pale/50">
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-20">
          <div>
            <h2 className="text-2xl">Rather talk it through first?</h2>
            <p className="mt-4 text-ink-soft">
              Leave your number and a broker – not a call centre – will ring you back within one business day. No obligation, and nothing is lodged with a lender until you say so.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              <li>• A 10–15 minute chat about what you&apos;re trying to do</li>
              <li>• A straight answer on whether it&apos;s doable and roughly what it would cost</li>
              <li>• Then you decide whether to start the online application</li>
            </ul>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl">Request a call back</h2>
            <div className="mt-6">
              <ContactForm mode="callback" />
            </div>
          </div>
        </Container>
      </section>
      {site.promo.active && (
        <section id="promo-terms" className="scroll-mt-28 border-t border-line">
          <Container className="py-12">
            <h2 className="text-xl">Settlement bonus – terms and conditions</h2>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-ink-soft">
              <li>A {site.promo.amount} settlement bonus is payable on eligible home, investment and refinance loans where the application is started through this website on or before {new Date(site.promo.endsOn + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })} and the loan subsequently settles.</li>
              <li>Minimum eligible loan amount is $400,000. One bonus per settled loan, paid to the primary borrower&apos;s nominated account within 30 days of settlement.</li>
              <li>The offer is limited to the first 20 eligible loans to settle. Once the cap is reached the offer closes and this page will be updated.</li>
              <li>Not available on personal, car or business loans, construction loans, or loans with a lender that pays no broker commission.</li>
              <li>If the loan is refinanced, discharged or substantially reduced within 24 months of settlement, Start Finance may request repayment of the bonus.</li>
              <li>Start Finance may vary or withdraw this offer at any time; applications already lodged will be honoured. The bonus is paid by Start Finance and is independent of any lender cashback.</li>
              <li>Credit criteria, fees and charges apply. Start Finance Pty Ltd, credit representative {site.compliance.corporateCrn} of {site.compliance.licensee}, Australian Credit Licence {site.compliance.acl}.</li>
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
