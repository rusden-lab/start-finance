import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import { Container, CtaBand } from "@/components/ui";
import { posts, getPost } from "@/content/blog";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, title: post.title, description: post.description },
  };
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const md = await fs.readFile(path.join(process.cwd(), "src/content/posts", `${slug}.md`), "utf8");
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-lilac pt-[72px]">
        <Container className="py-12 md:py-16">
          <Link href="/blog" className="text-sm font-semibold text-purple hover:underline">← All articles</Link>
          <h1 className="mt-4 max-w-4xl text-3xl leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted">
            {fmtDate(post.date)} · {post.readMinutes} min read · {post.author}
          </p>
        </Container>
      </section>
      <section>
        <Container className="grid gap-12 py-12 md:grid-cols-[1fr_280px] md:py-16">
          <article className="prose-sf max-w-3xl">
            <ReactMarkdown>{md}</ReactMarkdown>
            <p className="mt-10 border-t border-line pt-6 text-xs text-muted">
              This article is general information only and does not take into account your objectives, financial
              situation or needs. Consider whether it is appropriate for you and seek professional advice before acting
              on it. {site.legalName} is a credit representative ({site.compliance.corporateCrn}) of {site.compliance.licensee}, Australian Credit Licence {site.compliance.acl}.
            </p>
          </article>
          <aside className="space-y-6 md:sticky md:top-24 md:self-start">
            <div className="rounded-2xl grad-purple p-6 text-white">
              <h2 className="text-lg">Ready to Start Finance?</h2>
              <p className="mt-2 text-sm text-white/85">Get a personalised assessment from a Melbourne broker.</p>
              <Link href={site.applyUrl} className="btn btn-primary mt-4 w-full">Apply Now</Link>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <h2 className="text-base">Handy calculators</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/calculators/borrowing-power" className="text-purple hover:underline">Borrowing Power</Link></li>
                <li><Link href="/calculators/loan-repayment" className="text-purple hover:underline">Loan Repayments</Link></li>
                <li><Link href="/calculators/stamp-duty" className="text-purple hover:underline">Stamp Duty</Link></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <h2 className="text-base">More articles</h2>
              <ul className="mt-3 space-y-3 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="font-medium hover:text-purple">{r.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
