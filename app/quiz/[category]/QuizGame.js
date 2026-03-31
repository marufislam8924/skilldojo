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
    question: `What is the reading of "${c.k}"?`,
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
    question: `What does "${w.k}" (${w.reading}) mean?`,
    display: w.k,
    correct: w.meaning || w.r,
    pool: allMeanings,
  }));
}

function buildGrammarBank() {
  const allPatterns = grammarLessons.flatMap((l) => l.chars);
  const allMeanings = [...new Set(allPatterns.map((p) => p.meaning))];
  return allPatterns.map((p) => ({
    type: "grammar",
    question: `What does "${p.k}" (${p.reading}) mean?`,
    display: p.k,
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
      type: q.type,
      options,
      correctIndex: options.indexOf(q.correct),
    };
  });
}

/* ─── Component ─── */

export default function QuizGame({ categoryId }) {
  const category = quizCategories.find((c) => c.id === categoryId);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [xpResult, setXpResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const startQuiz = useCallback(() => {
    setQuestions(generateQuiz(categoryId));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setDone(false);
    setXpResult(null);
    setTimeLeft(15);
  }, [categoryId]);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  // Timer
  useEffect(() => {
    if (done || answered || questions.length === 0) return;
    if (timeLeft <= 0) {
      setAnswered(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, done, answered, questions.length]);

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[current].correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    const nextIndex = current + 1;
    if (nextIndex >= questions.length) {
      setDone(true);
      // Award XP
      const session = getStudentSession();
      if (session) {
        const finalScore = selected === questions[current]?.correctIndex ? score : score;
        const correctCount = selected === questions[current]?.correctIndex ? score + 1 : score;
        // XP: only for correct answers
        if (correctCount > 0) {
          const result = updateStreakAndXP(correctCount);
          setXpResult(result);
        }
      }
    } else {
      setCurrent(nextIndex);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(15);
    }
  }

  if (!category) {
    return (
      <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#7a7067]">Quiz not found</p>
          <Link href="/quiz" className="text-[#e63329] font-bold mt-4 inline-block">
            ← Back to Quizzes
          </Link>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#e63329] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  /* ─── DONE SCREEN ─── */
  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    const emoji = percent >= 80 ? "🎉" : percent >= 50 ? "👏" : "💪";
    const message =
      percent >= 80
        ? "Excellent!"
        : percent >= 50
          ? "Good job!"
          : "Keep practicing!";

    return (
      <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#e9dfd2] p-8 text-center shadow-xl">
          <div className="text-6xl mb-4">{emoji}</div>
          <h1
            className="text-2xl font-black text-[#0f0e0d] mb-2"
            style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            {message}
          </h1>
          <p className="text-[#7a7067] mb-6">{category.title} complete</p>

          {/* Score Circle */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#ede8df" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={category.accent}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(percent / 100) * 327} 327`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[#0f0e0d]">{score}/{questions.length}</span>
              <span className="text-xs text-[#7a7067] font-bold">{percent}%</span>
            </div>
          </div>

          {xpResult && (
            <div className="bg-[#fef3c7] border border-[#fbbf24] rounded-xl p-3 mb-6 text-sm font-bold text-[#92400e]">
              ⭐ {xpResult.message}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={startQuiz}
              className="w-full py-4 bg-[#0f0e0d] text-white font-bold rounded-2xl text-base hover:bg-[#2a2826] transition-colors"
              style={{ boxShadow: "4px 4px 0 #e63329" }}
            >
              Try Again
            </button>
            <Link
              href="/quiz"
              className="block w-full py-4 bg-white text-[#0f0e0d] font-bold rounded-2xl text-base border-2 border-[#d9d0c3] hover:border-[#0f0e0d] transition-colors no-underline text-center"
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
  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <main className="min-h-screen bg-[#faf7f2] flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#e9dfd2] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/quiz" className="text-[#7a7067] hover:text-[#0f0e0d] text-xl font-bold no-underline shrink-0">
            ✕
          </Link>
          <div className="flex-1 h-3 bg-[#ede8df] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: category.accent }}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: timeLeft <= 5 ? "#fee2e2" : "#ede8df",
                color: timeLeft <= 5 ? "#ef4444" : "#7a7067",
              }}
            >
              {timeLeft}
            </span>
            <span className="text-sm font-bold text-[#7a7067]">
              {current + 1}/{questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-lg mx-auto w-full">
        {/* Character Display */}
        <div
          className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl font-black mb-6"
          style={{
            background: category.color,
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          {q.display}
        </div>

        <h2 className="text-lg font-bold text-[#0f0e0d] text-center mb-8 px-2">
          {q.question}
        </h2>

        {/* Options */}
        <div className="w-full space-y-3">
          {q.options.map((option, i) => {
            let bg = "bg-white";
            let border = "border-[#e9dfd2]";
            let textColor = "text-[#0f0e0d]";
            let shadow = "";

            if (answered) {
              if (i === q.correctIndex) {
                bg = "bg-[#dcfce7]";
                border = "border-[#22c55e]";
                textColor = "text-[#15803d]";
              } else if (i === selected && i !== q.correctIndex) {
                bg = "bg-[#fee2e2]";
                border = "border-[#ef4444]";
                textColor = "text-[#b91c1c]";
              }
            } else if (i === selected) {
              border = "border-[#0f0e0d]";
              shadow = "shadow-md";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 ${bg} ${border} ${textColor} ${shadow} font-semibold text-base transition-all disabled:cursor-default hover:border-[#0f0e0d] hover:shadow-sm`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0 opacity-60">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback + Next */}
        {answered && (
          <div className="w-full mt-6 space-y-3">
            {selected === q.correctIndex ? (
              <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-xl p-3 text-center text-sm font-bold text-[#15803d]">
                ✅ Correct! +10 XP
              </div>
            ) : (
              <div className="bg-[#fee2e2] border border-[#fecaca] rounded-xl p-3 text-center text-sm font-bold text-[#b91c1c]">
                {selected === null ? "⏰ Time's up!" : "❌ Wrong!"} The answer is: <strong>{q.options[q.correctIndex]}</strong>
              </div>
            )}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-[#0f0e0d] text-white font-bold rounded-2xl text-base hover:bg-[#2a2826] transition-colors"
              style={{ boxShadow: "4px 4px 0 #e63329" }}
            >
              {current + 1 >= questions.length ? "See Results" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
