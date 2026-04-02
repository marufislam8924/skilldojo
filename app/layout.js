import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-TX9MPZFMDT";
const GA_SCRIPT_SRC = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
const GA_INLINE_SCRIPT = [
  "window.dataLayer = window.dataLayer || [];",
  "function gtag(){dataLayer.push(arguments);}",
  "window.gtag = gtag;",
  "gtag('js', new Date());",
  "gtag('config', '" + GA_MEASUREMENT_ID + "', { send_page_view: false });",
].join("\n");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Learn Japanese N5 from Scratch | SkillDojo",
    template: "%s | SkillDojo",
  },
  description:
    "Learn Japanese N5 from scratch with JLPT N5 vocabulary, grammar basics, listening practice, and beginner-friendly study plans.",
  applicationName: "SkillDojo",
  keywords: [
    "Japanese N5",
    "JLPT N5",
    "Learn Japanese N5",
    "Japanese beginner course",
    "Japanese language basics",
    "Learn Japanese N5 from scratch",
    "Japanese N5 vocabulary list with meaning",
    "JLPT N5 grammar explained easy",
    "Japanese N5 listening practice with answers",
    "How to pass JLPT N5 in 30 days",
    "Japanese N5 study plan for beginners",
    "Hiragana and Katakana full course",
    "Japanese N5 conversation practice",
    "JLPT N5 mock test free",
    "Japanese N5 verbs list with examples",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Learn Japanese N5 from Scratch | SkillDojo",
    description:
      "Master Japanese language basics with Hiragana, Katakana, JLPT N5 vocabulary, and interactive beginner lessons.",
    siteName: "SkillDojo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Japanese N5 from Scratch | SkillDojo",
    description:
      "Japanese beginner course with Hiragana, Katakana, JLPT N5 vocabulary, and listening practice.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={GA_SCRIPT_SRC}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {GA_INLINE_SCRIPT}
        </Script>
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Navbar />
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
