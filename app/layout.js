import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

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
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
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
          {children}
        </main>
      </body>
    </html>
  );
}
