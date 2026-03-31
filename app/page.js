import AppHome from "./components/HomeClient";

export const metadata = {
  title: "SkillDojo — Learn Japanese Free",
  description:
    "Learn Japanese N5 from scratch with vocabulary lists, easy grammar explanations, listening practice, and a practical 30-day JLPT N5 study plan.",
  keywords: [
    "Japanese N5",
    "JLPT N5",
    "Learn Japanese N5",
    "Japanese beginner course",
    "Japanese language basics",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "SkillDojo",
        url: siteUrl,
        inLanguage: "en",
        description:
          "Free Japanese learning website with Hiragana, Katakana, and JLPT N5 vocabulary lessons.",
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
        about: [
          "Japanese N5 vocabulary list with meaning",
          "JLPT N5 grammar explained easy",
          "Japanese N5 listening practice with answers",
          "Japanese N5 conversation practice",
          "interactive Japanese grammar flashcards",
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AppHome />
    </main>
  );
}
