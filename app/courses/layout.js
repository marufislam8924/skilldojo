const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export const metadata = {
  title: "Japanese Courses",
  description:
    "Browse structured Japanese beginner courses on SkillDojo, including the 30-day plan and complete JLPT N5 curriculum.",
  alternates: {
    canonical: "/courses",
  },
};

export default function CoursesLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Japanese in 30 Days",
            url: `${siteUrl}/courses/30-days`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "JLPT N5 Course",
            url: `${siteUrl}/courses/n5`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which course should I start with?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start with the 30-day course if you want a daily roadmap. Choose the JLPT N5 course for skill-based exam preparation.",
            },
          },
          {
            "@type": "Question",
            name: "Are these courses suitable for beginners?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Both courses are designed for beginners and include foundational reading, vocabulary, grammar, and practice.",
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
