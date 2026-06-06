"use client";

import React, { useEffect, useState } from "react";

export default function WordOfTheDay() {
  const [word, setWord] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/vocab/word-of-day')
      .then((r) => r.json())
      .then((d) => { if (mounted) setWord(d); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  if (!word) return null;

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="text-xs font-semibold text-slate-600">Word of the Day</div>
      <div className="mt-2">
        <div className="text-2xl font-black">{word.kanji}</div>
        <div className="text-sm text-gray-500">{word.furigana} • {word.romaji}</div>
        <div className="mt-2 text-sm">{word.meaning_en}</div>
        {word.example_sentence ? <div className="mt-2 text-xs text-gray-500">{word.example_sentence}</div> : null}
      </div>
    </div>
  );
}
