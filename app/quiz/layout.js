export const metadata = {
  title: "Quiz — Test Your Japanese Knowledge | JLPT N5 Practice",
  description:
    "Take quizzes on Hiragana, Katakana, Vocabulary, and Grammar to test your Japanese knowledge with multiple choice, instant feedback, and XP rewards for learners in the United States.",
  keywords: [
    "Japanese quiz",
    "JLPT N5 practice test",
    "hiragana quiz",
    "katakana quiz",
    "Japanese vocabulary quiz",
  ],
  alternates: {
    canonical: "/quiz",
    languages: {
      "en-us": "/quiz",
    },
  },
  openGraph: {
    title: "Quiz — Test Your Japanese Knowledge",
    description:
      "Take quizzes on Hiragana, Katakana, Vocabulary, and Grammar with instant feedback and XP rewards for learners in the United States.",
    url: "/quiz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Quiz — JLPT N5 Practice",
    description:
      "Test your Hiragana, Katakana, Vocabulary, and Grammar knowledge with interactive quizzes designed for learners in the United States.",
  },
};

export default function QuizLayout({ children }) {
  return children;
}
