"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { markLessonComplete } from "../lib/studentProgress";

type Speaker = "A" | "B";

type DialogueLine = {
  speaker: Speaker;
  japanese: string;
  romaji: string;
  english: string;
};

export type ConversationLessonData = {
  id: number;
  title: string;
  phraseCount: number;
  dialogue: DialogueLine[];
};

type ConversationLessonProps = {
  lesson: ConversationLessonData;
  className?: string;
};

export default function ConversationLesson({
  lesson,
  className = "",
}: ConversationLessonProps) {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [speakerFilter, setSpeakerFilter] = useState<"ALL" | Speaker>("ALL");
  const [supported, setSupported] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("skilldojo.progress");
      if (!raw) return;
      const progress = JSON.parse(raw);
      const ids: number[] = progress?.conversation?.completedLessons || [];
      if (ids.includes(lesson.id)) setCompleted(true);
    } catch {
      // ignore malformed storage
    }
  }, [lesson.id]);

  function handleMarkComplete() {
    markLessonComplete("conversation", lesson.id, lesson.phraseCount, lesson.phraseCount);
    setCompleted(true);
  }

  const speakerNames = useMemo(
    () => ({
      A: "Person A",
      B: "Person B",
    }),
    []
  );

  const filteredDialogue = useMemo(() => {
    if (speakerFilter === "ALL") {
      return lesson.dialogue;
    }

    return lesson.dialogue.filter((line) => line.speaker === speakerFilter);
  }, [lesson.dialogue, speakerFilter]);

  const speakJapanese = useCallback((text: string, index: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const japaneseVoice = voices.find(
      (voice) => voice.lang === "ja-JP" || voice.lang.startsWith("ja")
    );

    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex((current) => (current === index ? null : current));
    utterance.onerror = () => setSpeakingIndex((current) => (current === index ? null : current));

    synth.speak(utterance);
  }, []);

  return (
    <section className={`w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 ${className}`}>
      <header className="mb-6 border-b border-slate-100 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Lesson {lesson.id}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">{lesson.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{lesson.phraseCount} phrases</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSpeakerFilter("ALL")}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              speakerFilter === "ALL"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setSpeakerFilter("A")}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              speakerFilter === "A"
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            Person A
          </button>
          <button
            type="button"
            onClick={() => setSpeakerFilter("B")}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              speakerFilter === "B"
                ? "border-green-700 bg-green-700 text-white"
                : "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            Person B
          </button>
        </div>
      </header>

      {completed && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 border border-green-200">
          <span className="text-base">✓</span> Lesson complete! Great work.
        </div>
      )}

      <div className="space-y-4">
        {filteredDialogue.map((line, index) => {
          const isSpeakerA = line.speaker === "A";
          const isSpeaking = speakingIndex === index;

          return (
            <article
              key={`${lesson.id}-${index}-${line.japanese}`}
              className={`flex ${isSpeakerA ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[75%] ${
                  isSpeakerA
                    ? "rounded-bl-md bg-blue-100 text-blue-950"
                    : "rounded-br-md bg-green-100 text-green-950"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                    {speakerNames[line.speaker]}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakJapanese(line.japanese, index)}
                    disabled={!supported}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      isSpeakerA
                        ? "border-blue-300 bg-white/80 text-blue-800 hover:bg-white"
                        : "border-green-300 bg-white/80 text-green-800 hover:bg-white"
                    } ${!supported ? "cursor-not-allowed opacity-60" : ""}`}
                    aria-label={`Read line ${index + 1} in Japanese`}
                  >
                    {isSpeaking ? "Speaking" : "Speak"}
                  </button>
                </div>

                <p className="text-2xl font-bold leading-relaxed md:text-3xl">{line.japanese}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-85">{line.romaji}</p>
                <p className="mt-1 text-sm leading-relaxed opacity-80">{line.english}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        {completed ? (
          <div className="flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white">
            ✓ Completed
          </div>
        ) : (
          <button
            type="button"
            onClick={handleMarkComplete}
            className="rounded-full border-2 border-green-700 bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-800"
          >
            Mark as Complete ✓
          </button>
        )}
      </div>
    </section>
  );
}