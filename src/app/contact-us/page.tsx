import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us – South Yarra Mortgage Brokers",
  description:
    "Contact Start Finance in South Yarra, Melbourne. Call 1800 569 090, email info@startfinance.com.au or send us a message about home loans, refinancing, car, business and personal loans.",
  alternates: { canonical: "/contact-us" },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We want to hear from you!" intro="We're committed to providing the best loan experience for everyone, no matter your situation. Call, email, or send us a message and a loan specialist will get back to you.">
        <Image src="/assets/illustrations/contact-relaxed-on-coin.svg" alt="" width={380} height={300} className="w-full max-w-[380px]" priority />
      </PageHero>

      <section>
        <Container className="grid gap-10 py-16 md:grid-cols-[1fr_1.3fr] md:py-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg">Email address</h2>
              <a href={`mailto:${site.email}`} className="mt-1 block text-xl font-semibold text-purple hover:underline">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="text-lg">Contact number</h2>
              <a href={site.phoneHref} className="mt-1 block text-xl font-semibold text-purple hover:underline">
                {site.phone}
              </a>
            </div>
            <div>
              <h2 className="text-lg">Address</h2>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xl font-semibold text-purple hover:underline">
                {site.address.line1}, {site.address.suburb} {site.address.state} {site.address.postcode}
              </a>
            </div>
            <div>
              <h2 className="text-lg">Operating hours</h2>
              <dl className="mt-2 grid grid-cols-2 gap-y-1 text-ink-soft">
                {site.hours.map((h) => (
                  <div key={h.day} className="contents">
                    <dt>{h.day}</dt>
                    <dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Map – Start Finance, 11 Wilson Street South Yarra"
                src="https://www.google.com/maps?q=11+Wilson+Street,+South+Yarra+VIC+3141&output=embed"
                className="h-[260px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl">Send us a message</h2>
            <p className="mt-2 text-sm text-ink-soft">Fill in the form below if you have any questions or feedback.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
