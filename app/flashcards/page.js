export const metadata = {
  title: "Japanese Flashcards — Spaced Repetition Practice",
  description:
    "Japanese flashcard practice is coming soon to SkillDojo. Continue with Hiragana, Katakana, Vocabulary, Grammar, and Conversation in the meantime.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/flashcards",
  },
};

export default function Flashcards() {
  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-3xl">Flashcards Coming Soon 🚀</h1>
        <h2 className="mt-4 text-lg text-gray-300">Continue with Hiragana, Katakana, Vocabulary, and Grammar in the meantime.</h2>
      </div>
    </main>
  );
}