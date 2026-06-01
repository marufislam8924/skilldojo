export const metadata = {
  title: "Basic Japanese Conversation Practice — Beginner Dialogue Lessons",
  description:
    "15 beginner Japanese conversation lessons covering greetings, travel phrases, shopping, cafes, and daily life with romaji and audio support for Bengali-speaking learners.",
  keywords: [
    "basic Japanese conversation",
    "beginner Japanese phrases",
    "Japanese greetings",
    "learn Japanese online",
    "Japanese for beginners",
    "japanese conversation practice",
  ],
  alternates: {
    canonical: "/conversation",
    languages: {
      "en-us": "/conversation",
    },
  },
  openGraph: {
    title: "Basic Japanese Conversation Practice — Dialogue Lessons",
    description:
      "15 beginner Japanese conversation lessons covering greetings, travel phrases, shopping, and daily life for Bengali-speaking learners.",
    url: "/conversation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Basic Japanese Conversation Practice",
    description:
      "Beginner Japanese conversation lessons with romaji and audio support for Bengali-speaking learners.",
  },
};

export default function ConversationLayout({ children }) {
  return children;
}
