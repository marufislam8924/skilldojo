"use client";
import Link from "next/link";
import {
  getDailyVocabularyLesson,
  totalVocabularyWords,
  vocabularyLessons,
} from "../vocabData";
import StudentNavAction from "../components/StudentNavAction";

export default function VocabularyPage() {
  const dailyLesson = getDailyVocabularyLesson();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-[-200px] h-[420px] bg-gradient-to-b from-cyan-100 via-indigo-50 to-transparent" />
        <div className="absolute -left-20 top-16 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl" />
        <div className="absolute -right-10 top-10 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-5 sm:px-6 lg:px-8 lg:pt-7">
          <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-md backdrop-blur md:px-6">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-indigo-600"
            >
              Skill<span className="text-indigo-600">Dojo</span>
              <span className="ml-2 text-base text-slate-500">道場</span>
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <StudentNavAction
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
                dashboardLabel="My Progress"
              />
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-700"
              >
                ← Back to Home
              </Link>
            </div>
          </nav>

          <header className="mb-8 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-lg sm:p-8 lg:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                JLPT N5 Course
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Beginner
              </span>
            </div>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Daily Vocabulary, Structured Lessons, and JLPT-Ready Practice
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Build your Japanese core with {totalVocabularyWords}+ essential words across {vocabularyLessons.length} lesson sets. Every card includes reading and meaning so your memory sticks.
            </p>
          </header>

          <section className="group mb-8 rounded-3xl border border-indigo-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                Auto-picked for today
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
                Daily Vocabulary
              </span>
            </div>

            <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">
                  Lesson {dailyLesson.id}
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  {dailyLesson.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  Practice 20 high-frequency words with reveal-to-hear flashcards, then lock them in with quick review scoring and spaced repetition.
                </p>
              </div>
              <Link
                href={`/vocab/${dailyLesson.id}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
              >
                Start Today →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dailyLesson.chars.slice(0, 6).map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm"
                >
                  <div className="text-2xl font-semibold leading-none text-slate-900">
                    {item.k}
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-500">{item.reading}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-400">
                    {item.meaning}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  All Vocabulary Lessons
                </h3>
                <p className="mt-1 text-sm text-slate-600 sm:text-base">
                  Choose any lesson and continue at your own pace.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vocabularyLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/vocab/${lesson.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Lesson {lesson.id}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                      {lesson.chars.length} words
                    </span>
                  </div>

                  <div className="mb-2 text-4xl font-semibold leading-none text-slate-900">
                    {lesson.kana}
                  </div>

                  <div className="mb-3 text-base font-semibold text-slate-900">
                    {lesson.name}
                  </div>

                  <div className="mb-4 text-sm leading-relaxed text-slate-600">
                    {lesson.chars
                      .slice(0, 3)
                      .map((item) => (item.k === item.reading ? item.k : `${item.k} (${item.reading})`))
                      .join(" · ")}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                      Beginner
                    </span>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo-700">
                      JLPT N5
                    </span>
                  </div>

                  <div className="mt-5 text-sm font-medium text-indigo-600 transition-colors group-hover:text-indigo-700">
                    Open lesson →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}