import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const syne = localFont({
  src: "../../public/fonts/syne-variable-latin.woff2",
  variable: "--font-syne",
  weight: "400 800",
  display: "swap",
});

const publicSans = localFont({
  src: [
    { path: "../../public/fonts/public-sans-variable-latin.woff2", style: "normal", weight: "100 900" },
    { path: "../../public/fonts/public-sans-variable-italic-latin.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Start Finance | Mortgage Brokers Melbourne – Home, Car, Business & Personal Loans",
    template: "%s | Start Finance",
  },
  description:
    "Start your financial journey the smart way with Start Finance. Melbourne mortgage brokers offering home loans, refinancing, investment, business, car and personal loans – 100% online, with personalised attention.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Start Finance",
    images: [{ url: "/assets/logo/og-image.png", width: 1200, height: 631, alt: "Start Finance" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/assets/logo/favicon.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${syne.variable} ${publicSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
