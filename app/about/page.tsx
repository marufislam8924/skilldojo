import Link from "next/link";

export const metadata = {
  title: "About SkillDojo - Free Japanese Learning for Bengali Speakers",
  description:
    "Learn about SkillDojo, a free Japanese language learning platform built by Maruf Islam from Dhaka, Bangladesh for Bengali-speaking learners worldwide.",
};

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About SkillDojo
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Free Japanese learning for Bengali speakers — Hiragana, Katakana,
            JLPT N5, and more.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-start">
          <section className="lg:col-span-2 space-y-8 prose prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              SkillDojo (skilldojojp.com) is a free Japanese language learning
              platform built for Bengali-speaking learners. Our goal is to make
              Japanese learning accessible to Bangladeshi and Bengali-speaking
              audiences worldwide by offering clear, practical lessons and a
              friendly study path.
            </p>

            <h3>Why we exist</h3>
            <p>
              Many learners in Bangladesh and other Bengali-speaking communities
              lack high-quality resources in their native language. SkillDojo
              fills that gap with free, beginner-focused content and a
              30-day course to get learners started fast.
            </p>

            <h3>What You Can Learn</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Hiragana — read & write the basic Japanese syllabary</li>
              <li>Katakana — foreign words, loanwords, and pronunciation</li>
              <li>JLPT N5 Vocabulary — essential words for beginners</li>
              <li>Grammar — core patterns for everyday conversation</li>
              <li>Quizzes — test your progress with interactive checks</li>
              <li>30-Day Course — a guided study plan to build momentum</li>
            </ul>

            <h3>Key Facts</h3>
            <p>
              Everything is <strong>100% free</strong> — no paywalls, no
              subscriptions. The platform is built with Next.js, Tailwind CSS,
              and Supabase.
            </p>

            <h3>About the Creator</h3>
            <p>
              <strong>Maruf Islam</strong> — based in Dhaka, Bangladesh — is the
              solo founder and developer of SkillDojo. Maruf built SkillDojo
              because there were no good Japanese learning resources in Bangla.
              He also documents his personal Japanese learning journey (target:
              JLPT N5) on YouTube and Instagram. He believes language learning
              should be free and fun for everyone.
            </p>

            <p className="text-sm text-slate-600">
              Want to get in touch or suggest content? Visit the contact page
              below.
            </p>
          </section>

          <aside className="bg-slate-50 p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold">Creator</h4>
            <div className="mt-4 space-y-2 text-slate-800">
              <p className="font-medium">Maruf Islam</p>
              <p className="text-sm text-slate-600">Dhaka, Bangladesh</p>
              <p className="text-sm">Solo founder & developer</p>
              <p className="mt-3 text-sm text-slate-700">
                Built SkillDojo to provide Bengali speakers a free path to
                learning Japanese, with practical lessons and community-focused
                content.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium shadow-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
