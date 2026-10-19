import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/content/blog";
import { calculators } from "@/lib/calc/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const statics = ["", "/about-us", "/calculators", "/blog", "/faq", "/contact-us", "/apply", "/privacy-policy"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const calcs = calculators.map((c) => ({ url: `${base}/calculators/${c.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 }));
  const blog = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 }));
  return [...statics, ...calcs, ...blog];
}
