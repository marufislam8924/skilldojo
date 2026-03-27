import Link from "next/link";
import { conversationLessons, totalConversationLessons } from "../../data/conversationLessons";

export const metadata = {
  title: "Basic Japanese Conversation Lessons",
  description:
    "Study 15 beginner Japanese conversation lessons with greetings, travel phrases, daily expressions, and tap-to-play audio cards.",
  alternates: {
    canonical: "/conversation",
  },
};

export default function ConversationIndexPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,166,35,0.16),_transparent_30%),linear-gradient(180deg,#faf7f2_0%,#fffdf9_100%)] px-4 pb-16 pt-6 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between gap-4 rounded-full border border-stone-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <Link href="/" className="text-lg font-bold tracking-tight text-stone-900">
            Skill<span className="text-red-600">Dojo</span> 道場
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/vocab"
              className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-amber-500 hover:text-stone-900"
            >
              Vocabulary
            </Link>
            <Link
              href="/"
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Home
            </Link>
          </div>
        </nav>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-stone-200 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,14,13,0.08)] backdrop-blur sm:p-8">
          <div className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-amber-800">
            New Course
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
                Basic Conversation for Real Beginner Japanese
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                Move beyond isolated words. Practice greetings, names, travel phrases, shopping, cafes, and daily life with short Japanese lines, romaji support, English meaning, and instant audio playback.
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-stone-900 p-6 text-white shadow-[0_16px_40px_rgba(15,14,13,0.22)]">
              <div className="text-sm uppercase tracking-[0.28em] text-stone-300">Course Snapshot</div>
              <div className="mt-5 text-5xl font-black text-amber-300">15</div>
              <p className="mt-2 text-sm leading-6 text-stone-200">
                mobile-first lessons with between 5 and 10 conversation cards each
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/3 rounded-full bg-amber-400" />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-stone-400">Start at Lesson 1</div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {conversationLessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/conversation/${lesson.slug}`}
              className="group rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,14,13,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-[0_24px_70px_rgba(15,14,13,0.10)] active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">
                    Lesson {lesson.id}
                  </div>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-stone-900">
                    {lesson.title}
                  </h2>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {lesson.conversations.length} lines
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-600">{lesson.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 text-sm font-semibold text-stone-500 group-hover:text-stone-900">
                <span>
                  Lesson {lesson.id} / {totalConversationLessons}
                </span>
                <span>Open →</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}