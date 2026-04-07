import Link from "next/link";
import { notFound } from "next/navigation";
import animePhrasesCourse from "@/src/data/animePhrases";

interface Props {
  params: {
    lesson: string;
  };
}

export function generateStaticParams() {
  return animePhrasesCourse.lessons.map((lesson) => ({ lesson: String(lesson.id) }));
}

export function generateMetadata({ params }: Props) {
  const lessonId = Number(params.lesson);
  const lesson = animePhrasesCourse.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return {
      title: "Anime Phrase Lesson",
      description: "Japanese anime phrase lesson",
    };
  }

  return {
    title: `Anime Phrases Lesson ${lesson.id}: ${lesson.title}`,
    description: `${lesson.description} Learn ${lesson.phrases.length} anime phrases with romaji and usage context.`,
    alternates: {
      canonical: `/anime-phrases/${lesson.id}`,
    },
  };
}

export default function AnimePhraseLessonPage({ params }: Props) {
  const lessonId = Number(params.lesson);
  const lesson = animePhrasesCourse.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    notFound();
  }

  const prevHref = lesson.id > 1 ? `/anime-phrases/${lesson.id - 1}` : null;
  const nextHref = lesson.id < animePhrasesCourse.lessons.length ? `/anime-phrases/${lesson.id + 1}` : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Anime Phrases Course</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 md:text-3xl">
              Lesson {lesson.id}: {lesson.title}
            </h1>
            <span className="text-2xl" aria-hidden>
              {lesson.emoji}
            </span>
          </div>
          <p className="mt-2 text-slate-600">{lesson.description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/anime-phrases"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-900"
            >
              All Lessons
            </Link>
            {prevHref ? (
              <Link
                href={prevHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-900"
              >
                Previous Lesson
              </Link>
            ) : null}
            {nextHref ? (
              <Link
                href={nextHref}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                Next Lesson
              </Link>
            ) : null}
          </div>
        </header>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600">#</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600">Japanese</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600">Romaji</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600">English</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600">Context</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-slate-600">Anime Example</th>
                </tr>
              </thead>
              <tbody>
                {lesson.phrases.map((phrase, index) => (
                  <tr key={phrase.id} className="border-t border-slate-200 align-top hover:bg-orange-50/40">
                    <td className="px-4 py-3 text-sm font-bold text-slate-700">{index + 1}</td>
                    <td className="px-4 py-3 text-base font-semibold text-slate-900">{phrase.japanese}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{phrase.romaji}</td>
                    <td className="px-4 py-3 text-sm text-slate-800">{phrase.english}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{phrase.context}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{phrase.animeExample || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
