import Link from "next/link";
import { quizCategories } from "../../data/quizData";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[rgba(250,247,242,0.93)] backdrop-blur-md border-b border-[#d9d0c3]">
        <Link
          href="/"
          className="font-black text-xl text-[#0f0e0d] no-underline"
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
        >
          Skill<span className="text-[#e63329]">Dojo</span> 道場
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/hiragana" className="text-sm font-bold text-[#0f0e0d] no-underline hover:text-[#e63329] hidden sm:inline">
            Hiragana
          </Link>
          <Link href="/vocab" className="text-sm font-bold text-[#0f0e0d] no-underline hover:text-[#e63329] hidden sm:inline">
            Vocabulary
          </Link>
          <Link href="/grammar" className="text-sm font-bold text-[#0f0e0d] no-underline hover:text-[#e63329] hidden sm:inline">
            Grammar
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[rgba(230,51,41,0.1)] text-[#b1221b] text-xs font-extrabold tracking-widest uppercase mb-4">
            Quiz
          </div>
          <h1
            className="text-3xl md:text-4xl font-black text-[#0f0e0d] mb-3"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            Test Your Knowledge
          </h1>
          <p className="text-[#7a7067] text-base leading-relaxed max-w-md mx-auto">
            Choose a quiz category. 4 options per question, instant feedback, and XP for every correct answer.
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-4">
          {quizCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/quiz/${cat.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-[#e9dfd2] no-underline text-inherit hover:shadow-lg hover:border-[#d8cab7] hover:-translate-y-1 transition-all group"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-black shrink-0 transition-transform group-hover:scale-110"
                style={{
                  background: cat.color,
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg text-[#0f0e0d]">{cat.title}</div>
                <p className="text-sm text-[#7a7067] mt-0.5">{cat.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs font-bold text-[#7a7067] uppercase tracking-wide">
                    {cat.questionCount} questions
                  </span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: cat.color, color: cat.accent }}
                  >
                    +{cat.questionCount * 10} XP
                  </span>
                </div>
              </div>
              <div className="text-[#d9d0c3] group-hover:text-[#e63329] text-xl transition-colors shrink-0">
                →
              </div>
            </Link>
          ))}
        </div>

        {/* Info */}
        <div className="mt-10 bg-[#fffdf9] border border-[#e9dfd2] rounded-2xl p-6 text-center">
          <p className="text-sm text-[#7a7067] leading-relaxed">
            <strong className="text-[#0f0e0d]">How it works:</strong> Each quiz has multiple-choice questions pulled
            from your lessons. Answer correctly to earn XP. Questions are shuffled every time for a fresh challenge.
          </p>
        </div>
      </div>
    </main>
  );
}
