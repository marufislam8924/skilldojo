const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export const metadata = {
  title: "Learn Japanese in 30 Days — Structured JLPT N5 Study Plan",
  description:
    "Follow a free 30-day study plan to learn Japanese from scratch. Daily lessons covering Hiragana, Katakana, vocabulary, grammar, and conversation for JLPT N5.",
  keywords: [
    "learn Japanese in 30 days",
    "JLPT N5 study plan",
    "Japanese 30-day challenge",
    "beginner Japanese plan",
    "learn japanese online",
    "japanese n5 course",
  ],
  alternates: {
    canonical: "/courses/30-days",
  },
  openGraph: {
    title: "Learn Japanese in 30 Days — JLPT N5 Study Plan",
    description:
      "Free 30-day study plan to learn Japanese from scratch with daily lessons.",
    url: "/courses/30-days",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Japanese in 30 Days",
    description:
      "Free 30-day JLPT N5 study plan covering Hiragana, Katakana, vocabulary, grammar, and conversation.",
  },
};

export default function ThirtyDaysLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "Learn Japanese in 30 Days",
        description:
          "A structured 30-day study plan to learn Japanese from scratch for JLPT N5 preparation.",
        provider: {
          "@type": "EducationalOrganization",
          name: "SkillDojo",
          url: siteUrl,
        },
        educationalLevel: "Beginner",
        timeRequired: "P30D",
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much time should I study each day?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most learners follow the plan in 30 to 60 minutes per day.",
            },
          },
          {
            "@type": "Question",
            name: "Does this plan include JLPT N5 topics?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The plan covers Hiragana, Katakana, vocabulary, grammar, conversation, and quizzes aligned with JLPT N5 fundamentals.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
