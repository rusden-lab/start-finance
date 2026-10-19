import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog – Home Loan Guides, Rates & Property Insights",
  description:
    "Plain-English guides on buying your first home, comparing home loan rates, understanding loan types and where the Australian property market is heading.",
  alternates: { canonical: "/blog" },
};

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="Blog" title="Finance, explained" intro="Guides and insights from the Start Finance team to help you borrow smarter.">
        <Image src="/assets/illustrations/blog-fast-approval-phone.svg" alt="" width={380} height={300} className="w-full max-w-[380px]" priority />
      </PageHero>
      <section>
        <Container className="py-16 md:py-20">
          <Link href={`/blog/${first.slug}`} className="card group grid overflow-hidden md:grid-cols-2">
            <div className="grad-purple flex min-h-[240px] items-center justify-center p-10">
              <Image src="/assets/logo/start-finance-logo-white.svg" alt="" width={220} height={56} className="opacity-90 transition-transform group-hover:scale-105" />
            </div>
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {fmtDate(first.date)} · {first.readMinutes} min read
              </p>
              <h2 className="mt-3 text-2xl transition-colors group-hover:text-purple">{first.title}</h2>
              <p className="mt-3 text-ink-soft">{first.excerpt}</p>
              <span className="mt-5 inline-block font-semibold text-purple">Read article →</span>
            </div>
          </Link>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card group flex flex-col overflow-hidden">
                <div className={`flex h-36 items-center justify-center ${i % 2 ? "bg-pinktint" : "bg-pale"}`}>
                  <Image src="/assets/logo/brand-mark-tint.svg" alt="" width={56} height={56} className="opacity-70" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {fmtDate(p.date)} · {p.readMinutes} min
                  </p>
                  <h2 className="mt-2 text-lg transition-colors group-hover:text-purple">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{p.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-purple">Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
