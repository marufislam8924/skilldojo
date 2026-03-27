import Link from "next/link";
import ConversationCard from "../../components/ConversationCard";
import {
  conversationLessons,
  getConversationLessonBySlug,
  totalConversationLessons,
} from "../../../data/conversationLessons";

export function generateStaticParams() {
  return conversationLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export function generateMetadata({ params }) {
  const lesson = getConversationLessonBySlug(params.lesson) || conversationLessons[0];

  return {
    title: `Lesson ${lesson.id} - Basic Japanese Conversation`,
    description: `${lesson.description} Practice ${lesson.conversations.length} beginner Japanese conversation lines with romaji, English meaning, and audio support.`,
    alternates: {
      canonical: `/conversation/${lesson.slug}`,
    },
  };
}

export default function ConversationLessonPage({ params }) {
  const lesson = getConversationLessonBySlug(params.lesson) || conversationLessons[0];
  const nextLesson = conversationLessons.find((item) => item.id === lesson.id + 1);
  const progress = Math.round((lesson.id / totalConversationLessons) * 100);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(230,51,41,0.08),_transparent_24%),radial-gradient(circle_at_top_left,_rgba(245,166,35,0.16),_transparent_30%),linear-gradient(180deg,#faf7f2_0%,#fffdf9_100%)] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between gap-4 rounded-full border border-stone-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <Link href="/conversation" className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 transition hover:text-stone-900">
            ← All Lessons
          </Link>
          <Link href="/" className="text-lg font-bold tracking-tight text-stone-900">
            Skill<span className="text-red-600">Dojo</span> 道場
          </Link>
        </nav>

        <section className="mb-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,14,13,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-800">
                Lesson {lesson.id} / {totalConversationLessons}
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
                {lesson.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                {lesson.description}
              </p>
            </div>
            <div className="min-w-52 rounded-[1.5rem] bg-stone-900 p-5 text-white">
              <div className="text-xs uppercase tracking-[0.24em] text-stone-400">Progress</div>
              <div className="mt-3 text-3xl font-black text-amber-300">{progress}%</div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {lesson.conversations.map((item, index) => (
            <ConversationCard key={`${lesson.slug}-${index + 1}`} item={item} index={index + 1} />
          ))}
        </section>

        <section className="mt-8 flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,14,13,0.05)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-400">Keep Going</div>
            <p className="mt-2 text-base text-stone-600">
              Finish this set, replay the lines, and move on to the next beginner conversation topic.
            </p>
          </div>
          {nextLesson ? (
            <Link
              href={`/conversation/${nextLesson.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-700 active:scale-95"
            >
              Next Lesson →
            </Link>
          ) : (
            <Link
              href="/conversation"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-amber-500 hover:text-stone-900 active:scale-95"
            >
              Back to Course
            </Link>
          )}
        </section>
      </div>
    </main>
  );
}