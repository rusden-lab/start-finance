import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Preserve old WordPress URLs
    return [
      { source: "/full-loan-application/calculators", destination: "/calculators", permanent: true },
      { source: "/apply-now", destination: "/apply", permanent: true },
      { source: "/reset-password", destination: "/apply", permanent: true },
      { source: "/is-your-first-home-buying-guide-right-mate", destination: "/blog/is-your-first-home-buying-guide-right-mate", permanent: true },
      { source: "/mull-over-home-loan-rate-factors-2", destination: "/blog/mull-over-home-loan-rate-factors-2", permanent: true },
      { source: "/mull-over-home-loan-rate-factors", destination: "/blog/mull-over-home-loan-rate-factors", permanent: true },
      { source: "/australia-2024-economic-outlook", destination: "/blog/australia-2024-economic-outlook", permanent: true },
      { source: "/australian-real-estate-future-shines", destination: "/blog/australian-real-estate-future-shines", permanent: true },
      { source: "/ai-potential-to-replace-mortgage-brokers", destination: "/blog/ai-potential-to-replace-mortgage-brokers", permanent: true },
    ];
  },
};

export default nextConfig;
