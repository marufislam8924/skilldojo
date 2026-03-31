import Link from "next/link";
import { quizCategories } from "../../data/quizData";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-[#131f24]">
      {/* Top bar */}
      <div className="bg-[#131f24] border-b border-[#2b3d45] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-[#4b6b78] hover:text-white text-xl no-underline">
            ←
          </Link>
          <h1 className="text-white font-extrabold text-lg flex-1">Quiz</h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            Test Your Knowledge
          </h2>
          <p className="text-[#7b9ba6] text-sm leading-relaxed max-w-sm mx-auto">
            Pick a category. Earn XP for every correct answer. Don&apos;t lose all your hearts!
          </p>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-3">
          {quizCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/quiz/${cat.id}`}
              className="group flex items-center gap-4 rounded-2xl p-4 no-underline transition-all active:scale-[0.98] bg-[#1a2e35] border-2 border-[#2b3d45] border-b-4 hover:border-[#4b6b78]"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black shrink-0"
                style={{
                  background: cat.color,
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-base text-white">{cat.title}</div>
                <p className="text-xs text-[#7b9ba6] mt-0.5">{cat.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] font-bold text-[#7b9ba6] uppercase tracking-wider">
                    {cat.questionCount} Q
                  </span>
                  <span className="text-[10px] font-bold text-[#fbbf24]">
                    +{cat.questionCount * 10} XP
                  </span>
                  <span className="text-[10px] font-bold text-[#ef4444]">
                    ❤️ 3 lives
                  </span>
                </div>
              </div>
              <div className="text-[#4b6b78] group-hover:text-white text-lg transition-colors shrink-0">
                ▶
              </div>
            </Link>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-8 rounded-2xl p-4 text-center bg-[#1a2e35] border-2 border-[#2b3d45]">
          <p className="text-xs text-[#7b9ba6] leading-relaxed">
            <span className="text-white font-bold">Tip:</span> Questions are pulled from your lessons and shuffled every time. Keep practicing to improve!
          </p>
        </div>
      </div>
    </main>
  );
}
