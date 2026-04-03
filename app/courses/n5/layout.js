const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export const metadata = {
  title: "JLPT N5 Course — Complete Beginner Japanese Curriculum",
  description:
    "Study for the JLPT N5 exam with structured lessons covering vocabulary, grammar, reading, and listening. Interactive exercises with XP tracking.",
  keywords: [
    "JLPT N5 course",
    "JLPT N5 study guide",
    "Japanese N5 exam prep",
    "beginner Japanese course",
    "japanese n5 course",
    "learn japanese online",
  ],
  alternates: {
    canonical: "/courses/n5",
  },
  openGraph: {
    title: "JLPT N5 Course — Beginner Japanese Curriculum",
    description:
      "Study for JLPT N5 with structured lessons covering vocabulary, grammar, reading, and listening.",
    url: "/courses/n5",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JLPT N5 Course — Beginner Japanese",
    description:
      "Complete JLPT N5 curriculum with vocabulary, grammar, reading, and listening exercises.",
  },
};

export default function N5Layout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "JLPT N5 Course — Complete Beginner Japanese Curriculum",
        description:
          "Study for the JLPT N5 exam with structured lessons covering vocabulary, grammar, reading, and listening.",
        provider: {
          "@type": "EducationalOrganization",
          name: "SkillDojo",
          url: siteUrl,
        },
        educationalLevel: "Beginner",
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is this JLPT N5 course for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This course is designed for beginners preparing for the JLPT N5 exam.",
            },
          },
          {
            "@type": "Question",
            name: "What skills are covered in the N5 course?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Lessons cover vocabulary, grammar, reading, listening, and quiz practice.",
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
