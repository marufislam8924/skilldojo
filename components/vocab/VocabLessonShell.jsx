"use client";

import React, { useMemo, useState } from "react";
import LessonView from "../../app/components/LessonView";
import MCQ from "./MCQ";

export default function VocabLessonShell({ level, lessonNumber, data, totalLessons }) {
  const [mode, setMode] = useState("flashcard");

  const words = useMemo(() => {
    return (data.chars || []).map((c, i) => ({
      id: c.id || `${level}-${lessonNumber}-${i}`,
      kanji: c.k,
      furigana: c.reading,
      romaji: c.r,
      meaning_en: c.meaning,
    }));
  }, [data, level, lessonNumber]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setMode("flashcard")}
          className={`rounded px-3 py-2 text-sm font-semibold ${mode === "flashcard" ? "bg-emerald-500 text-white" : "bg-white border"}`}
        >
          Flashcards
        </button>
        <button
          onClick={() => setMode("mcq")}
          className={`rounded px-3 py-2 text-sm font-semibold ${mode === "mcq" ? "bg-emerald-500 text-white" : "bg-white border"}`}
        >
          MCQ Quiz
        </button>
      </div>

      {mode === "flashcard" ? (
        <LessonView
          lessonId={lessonNumber}
          data={data}
          courseSlug="vocab"
          totalLessons={totalLessons}
          nextLessonHref={`/vocab/lesson/${level}/${lessonNumber + 1}`}
          allLessonsHref={`/vocab`}
        />
      ) : (
        <MCQ words={words} onComplete={(score) => { /* you can show summary or route */ }} />
      )}
    </div>
  );
}
