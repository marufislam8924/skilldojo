import Link from "next/link";
import UserProgressBanner from "./components/UserProgressBanner";
import HomeClient from "./components/HomeClient";

export const metadata = {
  title: "Learn Japanese Fast (Beginner Guide 2026)",
  description:
    "Learn Japanese N5 from scratch with vocabulary lists, easy grammar explanations, listening practice, and a practical 30-day JLPT N5 study plan for learners in the United States.",
  keywords: [
    "Japanese N5",
    "JLPT N5",
    "Learn Japanese N5",
    "Japanese beginner course",
    "Japanese language basics",
    "learn Japanese in USA",
    "United States Japanese learning",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-us": "/",
    },
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";
  const faqItems = [
    {
      question: "Can I learn Japanese N5 for free on SkillDojo?",
      answer:
        "Yes. SkillDojo offers free beginner lessons for Hiragana, Katakana, vocabulary, grammar, conversation, and quizzes.",
    },
    {
      question: "How long does it take to complete the 30-day course?",
      answer:
        "The 30-day plan is designed for daily study. Most learners spend 30 to 60 minutes per day.",
    },
    {
      question: "Is SkillDojo suitable for complete beginners?",
      answer:
        "Yes. Lessons start from zero and gradually build up to JLPT N5 level skills.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "SkillDojo",
        url: siteUrl,
        inLanguage: "en-US",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        description:
          "Free Japanese learning website with Hiragana, Katakana, and JLPT N5 vocabulary lessons for learners in the United States.",
      },
      {
        "@type": "EducationalOrganization",
        name: "SkillDojo",
        url: siteUrl,
        sameAs: ["https://youtube.com/@skilldojo-b2t"],
      },
      {
        "@type": "Course",
        name: "Learn Japanese N5 from Scratch",
        provider: {
          "@type": "EducationalOrganization",
          name: "SkillDojo",
          url: siteUrl,
        },
        educationalLevel: "Beginner",
        inLanguage: "en-US",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: siteUrl,
        },
        about: [
          "Japanese N5 vocabulary list with meaning",
          "JLPT N5 grammar explained easy",
          "Japanese N5 listening practice with answers",
          "Japanese N5 conversation practice",
          "interactive Japanese grammar flashcards",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <UserProgressBanner />

      <HomeClient />
    </main>
  );
}
