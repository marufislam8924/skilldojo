export const metadata = {
  title: "Japanese Vocabulary Lessons — Interactive Word Cards",
  description:
    "Browse all Japanese vocabulary lessons with interactive flashcards, audio pronunciation, and category-based learning for JLPT N5 preparation.",
  keywords: [
    "Japanese vocabulary",
    "JLPT N5 vocabulary",
    "Japanese word cards",
    "learn Japanese words",
  ],
  alternates: {
    canonical: "/vocabulary",
  },
  openGraph: {
    title: "Japanese Vocabulary Lessons — Interactive Word Cards",
    description:
      "Browse all Japanese vocabulary lessons with interactive flashcards, audio pronunciation, and category-based learning for JLPT N5 preparation.",
    url: "/vocabulary",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Vocabulary Lessons",
    description:
      "Practice JLPT N5 vocabulary with interactive word cards and audio.",
  },
};

export default function VocabularyLayout({ children }) {
  return children;
}
