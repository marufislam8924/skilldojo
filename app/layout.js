import "./globals.css";
import Navbar from "./components/Navbar";
import Breadcrumbs from "./components/Breadcrumbs";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Learn Japanese Fast (Beginner Guide 2026)",
    template: "%s | SkillDojo",
  },
  description:
    "Learn Japanese N5 from scratch with JLPT N5 vocabulary, grammar basics, listening practice, and beginner-friendly study plans for learners in the United States.",
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
    "learn Japanese in USA",
    "United States Japanese learners",
    "USA JLPT N5 preparation",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-us": "/",
    },
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "content-language": "en-US",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Learn Japanese Fast (Beginner Guide 2026)",
    description:
      "Master Japanese language basics with Hiragana, Katakana, JLPT N5 vocabulary, and interactive beginner lessons built for learners in the United States.",
    siteName: "SkillDojo",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Japanese Fast (Beginner Guide 2026)",
    description:
      "Japanese beginner course with Hiragana, Katakana, JLPT N5 vocabulary, and listening practice for learners in the United States.",
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
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const ADSENSE_ACCOUNT = "ca-pub-4162671176823641";

  return (
    <html lang="en-US">
      <head>
        <link rel="alternate" hrefLang="en-us" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <meta name="language" content="en-US" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <meta
          name="google-adsense-account"
          content={ADSENSE_ACCOUNT}
        />
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
                console.log("GA ACTIVE:", '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          {children}
        </main>
      </body>
    </html>
  );
}
