"use client";

import React, { useEffect, useMemo, useState } from "react";

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function reportResult(wordId, correct) {
  try {
    let userId = null;
    try {
      const raw = window.localStorage.getItem("skilldojo.student");
      const parsed = raw ? JSON.parse(raw) : null;
      userId = parsed?.uid || null;
    } catch {}

    await fetch("/api/vocab/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word_id: wordId, correct, user_id: userId }),
    });
  } catch (e) {
    console.warn("reportResult failed", e);
  }
}

export default function MCQ({ words = [], onComplete = () => {} }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = words[index];

  const options = useMemo(() => {
    if (!current) return [];
    const distractors = shuffle(words.filter((w) => w.id !== current.id)).slice(0, 3);
    const opts = shuffle([current, ...distractors]);
    return opts;
  }, [current, words]);

  useEffect(() => {
    setSelected(null);
    setShowAnswer(false);
  }, [index]);

  if (!current) return null;

  async function choose(opt) {
    if (showAnswer) return;
    setSelected(opt.id);
    const correct = opt.id === current.id;
    setShowAnswer(true);
    if (correct) setScore((s) => s + 1);
    reportResult(current.id, correct).catch(() => {});

    setTimeout(() => {
      if (index + 1 >= words.length) {
        onComplete(score + (correct ? 1 : 0));
      } else {
        setIndex((i) => i + 1);
      }
    }, 800);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Quiz — MCQ</div>
          <div className="text-xs text-gray-500">Question {index + 1} of {words.length}</div>
        </div>
        <div className="text-sm text-gray-500">Score: {score}</div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-black">{current.kanji}</div>
        <div className="text-sm text-gray-500">{current.furigana} • {current.romaji}</div>
      </div>

      <div className="grid gap-2">
        {options.map((o) => {
          const isSelected = selected === o.id;
          const isCorrect = o.id === current.id;
          const bg = showAnswer ? (isCorrect ? "bg-emerald-100" : isSelected ? "bg-rose-100" : "bg-white") : "bg-white";
          const border = isSelected ? "border-emerald-300" : "border-gray-100";
          return (
            <button
              key={o.id}
              onClick={() => choose(o)}
              className={`text-left rounded-lg border ${border} ${bg} px-4 py-3 text-sm font-medium`}
            >
              {o.meaning_en}
            </button>
          );
        })}
      </div>
    </div>
  );
}
