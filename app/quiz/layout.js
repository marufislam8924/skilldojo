export const metadata = {
  title: "Quiz — Test Your Japanese Knowledge | JLPT N5 Practice",
  description:
    "Take quizzes on Hiragana, Katakana, Vocabulary, and Grammar to test your Japanese knowledge. Multiple choice with instant feedback and XP rewards.",
  keywords: [
    "Japanese quiz",
    "JLPT N5 practice test",
    "hiragana quiz",
    "katakana quiz",
    "Japanese vocabulary quiz",
  ],
  alternates: {
    canonical: "/quiz",
  },
  openGraph: {
    title: "Quiz — Test Your Japanese Knowledge",
    description:
      "Take quizzes on Hiragana, Katakana, Vocabulary, and Grammar with instant feedback and XP rewards.",
    url: "/quiz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Quiz — JLPT N5 Practice",
    description:
      "Test your Hiragana, Katakana, Vocabulary, and Grammar knowledge with interactive quizzes.",
  },
};

export default function QuizLayout({ children }) {
  return children;
}
