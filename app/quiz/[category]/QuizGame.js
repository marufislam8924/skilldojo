"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { quizCategories } from "../../../data/quizData";
import { hiraganaLessons, katakanaLessons } from "../../data";
import { vocabularyLessons } from "../../vocabData";
import { grammarLessons } from "../../grammarData";
import { updateStreakAndXP, getStudentSession } from "../../lib/studentProgress";

/* ─── Helpers ─── */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool, correct, count = 3) {
  return shuffle(pool.filter((o) => o !== correct)).slice(0, count);
}

function buildKanaBank(lessons, type) {
  const allChars = lessons.flatMap((l) => l.chars);
  const allReadings = [...new Set(allChars.map((c) => c.r))];
  return allChars.map((c) => ({
    type,
    question: `What is the reading of this character?`,
    display: c.k,
    correct: c.r,
    pool: allReadings,
  }));
}

function buildVocabBank() {
  const allWords = vocabularyLessons.flatMap((l) => l.chars);
  const allMeanings = [...new Set(allWords.map((w) => w.meaning || w.r))];
  return allWords.map((w) => ({
    type: "vocab",
    question: `What does this word mean?`,
    display: w.k,
    subtitle: w.reading,
    correct: w.meaning || w.r,
    pool: allMeanings,
  }));
}

function buildGrammarBank() {
  const allPatterns = grammarLessons.flatMap((l) => l.chars);
  const allMeanings = [...new Set(allPatterns.map((p) => p.meaning))];
  return allPatterns.map((p) => ({
    type: "grammar",
    question: `What does this pattern mean?`,
    display: p.k,
    subtitle: p.reading,
    correct: p.meaning,
    pool: allMeanings,
  }));
}

function generateQuiz(categoryId) {
  let bank = [];
  if (categoryId === "hiragana") bank = buildKanaBank(hiraganaLessons, "hiragana");
  else if (categoryId === "katakana") bank = buildKanaBank(katakanaLessons, "katakana");
  else if (categoryId === "vocab") bank = buildVocabBank();
  else if (categoryId === "grammar") bank = buildGrammarBank();
  else {
    bank = [
      ...buildKanaBank(hiraganaLessons, "hiragana"),
      ...buildKanaBank(katakanaLessons, "katakana"),
      ...buildVocabBank(),
      ...buildGrammarBank(),
    ];
  }

  const cat = quizCategories.find((c) => c.id === categoryId);
  const count = cat?.questionCount || 15;
  const selected = shuffle(bank).slice(0, count);

  return selected.map((q) => {
    const distractors = pickDistractors(q.pool, q.correct, 3);
    const options = shuffle([q.correct, ...distractors]);
    return {
      question: q.question,
      display: q.display,
      subtitle: q.subtitle || null,
      type: q.type,
      options,
      correctIndex: options.indexOf(q.correct),
    };
  });
}

const MAX_HEARTS = 3;

/* ─── Component ─── */

export default function QuizGame({ categoryId }) {
  const category = quizCategories.find((c) => c.id === categoryId);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [xpResult, setXpResult] = useState(null);
  const [shake, setShake] = useState(false);

  const startQuiz = useCallback(() => {
    setQuestions(generateQuiz(categoryId));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setHearts(MAX_HEARTS);
    setAnswered(false);
    setDone(false);
    setGameOver(false);
    setXpResult(null);
    setShake(false);
  }, [categoryId]);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (newHearts <= 0) {
        setTimeout(() => setGameOver(true), 1200);
      }
    }
  }

  function handleContinue() {
    if (gameOver) return;
    const nextIndex = current + 1;
    if (nextIndex >= questions.length) {
      setDone(true);
      const session = getStudentSession();
      if (session && score > 0) {
        const result = updateStreakAndXP(score);
        setXpResult(result);
      }
    } else {
      setCurrent(nextIndex);
      setSelected(null);
      setAnswered(false);
    }
  }

  if (!category) {
    return (
      <main className="min-h-screen bg-[#131f24] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#7b9ba6]">Quiz not found</p>
          <Link href="/quiz" className="text-[#58cc02] font-bold mt-4 inline-block no-underline">
            ← Back to Quizzes
          </Link>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#131f24] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#58cc02] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  /* ─── GAME OVER (lost all hearts) ─── */
  if (gameOver) {
    return (
      <main className="min-h-screen bg-[#131f24] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-7xl mb-6 animate-bounce">💔</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Out of Hearts!
          </h1>
          <p className="text-[#7b9ba6] mb-2">
            You got <span className="text-white font-bold">{score}</span> out of {questions.length} correct
          </p>
          <p className="text-sm text-[#4b6b78] mb-8">
            Practice your lessons and try again
          </p>

          <div className="space-y-3">
            <button
              onClick={startQuiz}
              className="w-full py-4 font-extrabold text-base rounded-2xl text-white uppercase tracking-wider transition-all active:scale-95"
              style={{
                background: "#58cc02",
                border: "none",
                borderBottom: "4px solid #46a302",
              }}
            >
              Try Again
            </button>
            <Link
              href="/quiz"
              className="block w-full py-4 font-extrabold text-base rounded-2xl text-[#7b9ba6] uppercase tracking-wider text-center no-underline transition-all active:scale-95"
              style={{
                background: "#1a2e35",
                border: "2px solid #2b3d45",
                borderBottom: "4px solid #2b3d45",
              }}
            >
              Quit
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── DONE SCREEN (completed quiz) ─── */
  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    const isGreat = percent >= 80;
    const isGood = percent >= 50;

    return (
      <main className="min-h-screen bg-[#131f24] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          {/* Trophy animation */}
          <div className="relative inline-block mb-6">
            <div className="text-7xl animate-bounce">
              {isGreat ? "🏆" : isGood ? "⭐" : "📚"}
            </div>
            {isGreat && (
              <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-1">
            {isGreat ? "Amazing!" : isGood ? "Nice work!" : "Keep going!"}
          </h1>
          <p className="text-[#7b9ba6] text-sm mb-6">{category.title} complete</p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Score */}
            <div className="text-center">
              <div className="text-4xl font-extrabold" style={{ color: category.accent }}>
                {percent}%
              </div>
              <div className="text-[10px] text-[#7b9ba6] font-bold uppercase tracking-wider mt-1">
                Score
              </div>
            </div>
            {/* Correct */}
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#58cc02]">
                {score}
              </div>
              <div className="text-[10px] text-[#7b9ba6] font-bold uppercase tracking-wider mt-1">
                Correct
              </div>
            </div>
            {/* Hearts remaining */}
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#ff4b4b]">
                {hearts}
              </div>
              <div className="text-[10px] text-[#7b9ba6] font-bold uppercase tracking-wider mt-1">
                Hearts
              </div>
            </div>
          </div>

          {/* XP reward */}
          {xpResult && (
            <div className="rounded-2xl p-3 mb-6 text-sm font-bold text-[#fbbf24]"
              style={{ background: "rgba(251,191,36,0.1)", border: "2px solid rgba(251,191,36,0.2)" }}>
              ⚡ {xpResult.message}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={startQuiz}
              className="w-full py-4 font-extrabold text-base rounded-2xl text-white uppercase tracking-wider transition-all active:scale-95"
              style={{
                background: "#58cc02",
                border: "none",
                borderBottom: "4px solid #46a302",
              }}
            >
              Play Again
            </button>
            <Link
              href="/quiz"
              className="block w-full py-4 font-extrabold text-base rounded-2xl text-[#7b9ba6] uppercase tracking-wider text-center no-underline transition-all active:scale-95"
              style={{
                background: "#1a2e35",
                border: "2px solid #2b3d45",
                borderBottom: "4px solid #2b3d45",
              }}
            >
              All Quizzes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── QUESTION SCREEN ─── */
  const q = questions[current];
  const progress = ((current) / questions.length) * 100;
  const isCorrect = selected === q.correctIndex;

  return (
    <main className="min-h-screen bg-[#131f24] flex flex-col">
      {/* ── Top Bar: progress + hearts ── */}
      <div className="px-4 pt-4 pb-2">
        <div className="max-w-xl mx-auto flex items-center gap-3">
          <Link href="/quiz" className="text-[#4b6b78] hover:text-white text-lg no-underline shrink-0">
            ✕
          </Link>
          {/* Progress bar */}
          <div className="flex-1 h-4 bg-[#2b3d45] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: "#58cc02" }}
            />
          </div>
          {/* Hearts */}
          <div className={`flex items-center gap-0.5 shrink-0 ${shake ? "animate-shake" : ""}`}>
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <span key={i} className="text-lg" style={{ opacity: i < hearts ? 1 : 0.25 }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Question Area ── */}
      <div className="flex-1 flex flex-col items-center px-4 pt-8 pb-4 max-w-xl mx-auto w-full">
        {/* Question text */}
        <h2 className="text-[#7b9ba6] text-sm font-bold mb-6 text-center">
          {q.question}
        </h2>

        {/* Big character display */}
        <div
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex flex-col items-center justify-center mb-2 transition-transform"
          style={{
            background: "#1a2e35",
            border: "2px solid #2b3d45",
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          <span className="text-5xl md:text-6xl font-black text-white">{q.display}</span>
          {q.subtitle && (
            <span className="text-sm text-[#7b9ba6] mt-1">{q.subtitle}</span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Options Grid (2×2) */}
        <div className="w-full grid grid-cols-2 gap-3 mb-4">
          {q.options.map((option, i) => {
            let bg = "#1a2e35";
            let borderColor = "#2b3d45";
            let bottomBorder = "#2b3d45";
            let textColor = "#e8e8e8";

            if (answered) {
              if (i === q.correctIndex) {
                bg = "#1b3a2a";
                borderColor = "#58cc02";
                bottomBorder = "#46a302";
                textColor = "#58cc02";
              } else if (i === selected && !isCorrect) {
                bg = "#3a1b1b";
                borderColor = "#ff4b4b";
                bottomBorder = "#cc3b3b";
                textColor = "#ff4b4b";
              }
            } else {
              bg = "#1a2e35";
              borderColor = "#2b3d45";
              bottomBorder = "#2b3d45";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className="w-full text-center px-3 py-4 rounded-xl font-bold text-sm transition-all disabled:cursor-default active:scale-95"
                style={{
                  background: bg,
                  border: `2px solid ${borderColor}`,
                  borderBottom: `4px solid ${bottomBorder}`,
                  color: textColor,
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Feedback Bar ── */}
      {answered && (
        <div
          className="px-4 py-5 animate-slideUp"
          style={{
            background: isCorrect ? "#1b3a2a" : selected === null ? "#2b3300" : "#3a1b1b",
            borderTop: `2px solid ${isCorrect ? "#58cc02" : selected === null ? "#fbbf24" : "#ff4b4b"}`,
          }}
        >
          <div className="max-w-xl mx-auto flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <>
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-extrabold text-[#58cc02]">Correct!</div>
                    <div className="text-xs text-[#58cc02] opacity-70">+10 XP</div>
                  </div>
                </>
              ) : selected === null ? (
                <>
                  <span className="text-2xl">⏰</span>
                  <div>
                    <div className="font-extrabold text-[#fbbf24]">Time&apos;s up!</div>
                    <div className="text-xs text-[#fbbf24] opacity-70">
                      Answer: {q.options[q.correctIndex]}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl">❌</span>
                  <div>
                    <div className="font-extrabold text-[#ff4b4b]">Incorrect</div>
                    <div className="text-xs text-[#ff4b4b] opacity-70">
                      Correct answer: {q.options[q.correctIndex]}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleContinue}
              className="w-full py-3.5 font-extrabold text-sm rounded-2xl text-white uppercase tracking-wider transition-all active:scale-95"
              style={{
                background: isCorrect ? "#58cc02" : "#ff4b4b",
                border: "none",
                borderBottom: `4px solid ${isCorrect ? "#46a302" : "#cc3b3b"}`,
              }}
            >
              {current + 1 >= questions.length ? "See Results" : "Continue"}
            </button>
          </div>
        </div>
      )}

      {/* Inline animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </main>
  );
}
