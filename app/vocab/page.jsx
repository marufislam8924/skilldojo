import Link from "next/link";
import { getLessonsForLevel } from "../lib/vocabUtils";
import LessonCard from "../../components/vocab/LessonCard";

export const metadata = {
  title: "Vocabulary — JLPT Lessons",
  description: "JLPT vocabulary lessons: flashcards, MCQs, and quizzes.",
};

export default function VocabIndex() {
  const levels = ["N5", "N4", "N3"];

  return (
    <main className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-2xl font-bold">JLPT Vocabulary</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Choose a JLPT level and start lessons (10 words per lesson).</p>

        <div className="mt-6 space-y-6">
          {levels.map((lvl) => {
            const lessons = getLessonsForLevel(lvl, 10);
            return (
              <section key={lvl} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold">{lvl}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lessons.length} lessons • {lessons.length * 10} words</p>
                  </div>
                  <div>
                    <Link href={`/vocab/lesson/${lvl}/1`} className="rounded bg-emerald-500 px-3 py-2 text-sm font-semibold text-white">Start</Link>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {lessons.slice(0, 6).map((l) => (
                    <LessonCard key={l.lessonNumber} level={lvl} lesson={l} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
