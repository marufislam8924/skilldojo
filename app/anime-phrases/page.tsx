import Link from "next/link";
import animePhrasesCourse from "@/src/data/animePhrases";

export const metadata = {
  title: "Anime Phrases Course (1000 Phrases)",
  description:
    "Master 1000 commonly used Japanese anime phrases in 20 themed lessons with romaji, English meaning, and usage context.",
  alternates: {
    canonical: "/anime-phrases",
  },
};

export default function AnimePhrasesCoursePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white px-4 py-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-3xl border border-orange-200 bg-white/90 p-6 shadow-sm md:p-8">
          <p className="inline-flex rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-orange-700">
            Anime Japanese Track
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            {animePhrasesCourse.title}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-700">{animePhrasesCourse.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Total phrases</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{animePhrasesCourse.totalPhrases}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Lessons</p>
              <p className="mt-1 text-2xl font-black text-slate-900">{animePhrasesCourse.lessons.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Phrases per lesson</p>
              <p className="mt-1 text-2xl font-black text-slate-900">50</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/anime-phrases/1"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Start Lesson 1
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900"
            >
              Back to Home
            </Link>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">All Lessons</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {animePhrasesCourse.lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/anime-phrases/${lesson.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">Lesson {lesson.id}</p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">{lesson.title}</h3>
                  </div>
                  <span className="text-2xl" aria-hidden>
                    {lesson.emoji}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{lesson.description}</p>
                <p className="mt-4 text-sm font-bold text-orange-700">50 phrases →</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
