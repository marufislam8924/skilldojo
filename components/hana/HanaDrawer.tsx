"use client";

import { useState, useEffect, useRef } from "react";

interface GrammarPattern {
  k: string;
  reading: string;
  r: string;
  meaning: string;
  exampleJa: string;
  exampleJaHiragana: string;
  exampleEn: string;
  hanaExplanation: string;
}

interface HanaDrawerProps {
  lessonTitle: string;
  patterns: GrammarPattern[];
  activePatternIndex: number;
}

export default function HanaDrawer({
  lessonTitle,
  patterns,
  activePatternIndex,
}: HanaDrawerProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(activePatternIndex);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Sync with external active card changes
  useEffect(() => {
    setSelectedIndex(activePatternIndex);
  }, [activePatternIndex]);

  // Scroll the active pill into view
  useEffect(() => {
    if (pillsRef.current) {
      const activePill = pillsRef.current.children[selectedIndex] as HTMLElement;
      if (activePill) {
        activePill.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const pattern = patterns[selectedIndex];
  if (!pattern) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.12)] rounded-t-2xl"
      style={{
        transform: open ? "translateY(0)" : "translateY(calc(100% - 56px))",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "400px",
      }}
    >
      {/* Collapsed bar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 px-5 h-14 shrink-0 cursor-pointer bg-transparent border-none w-full text-left"
      >
        <span className="w-9 h-9 rounded-full bg-[#c84b2f] flex items-center justify-center text-lg leading-none">
          🌸
        </span>
        <span className="text-sm font-bold tracking-wide text-[#1a1a1a] flex-1">
          Ask Hana
        </span>
        <svg
          className={`w-5 h-5 text-[#999] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Expanded content */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden border-t border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="text-xs font-bold text-[#c84b2f] tracking-wide uppercase">
              {lessonTitle}
            </p>
            <p className="text-sm font-bold text-[#1a1a1a] mt-0.5">
              Hana — Japanese Tutor
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer bg-transparent border-none"
          >
            <svg
              className="w-5 h-5 text-[#999]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Pattern pills */}
        <div
          ref={pillsRef}
          className="flex gap-2 px-5 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {patterns.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border-none ${
                i === selectedIndex
                  ? "bg-[#c84b2f] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {p.k}
            </button>
          ))}
        </div>

        {/* Explanation area */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {/* Speech bubble */}
          <div className="flex gap-3 items-start">
            <span className="w-8 h-8 rounded-full bg-[#c84b2f] flex items-center justify-center text-sm leading-none shrink-0 mt-1">
              🌸
            </span>
            <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-md px-4 py-3">
              <p className="text-sm font-bold text-[#1a1a1a] mb-1">
                {pattern.k}{" "}
                <span className="font-normal text-gray-500">({pattern.reading})</span>
                {" — "}
                <span className="font-normal text-gray-600">{pattern.meaning}</span>
              </p>
              <p className="text-sm text-[#333] leading-relaxed">
                {pattern.hanaExplanation}
              </p>
            </div>
          </div>

          {/* Example card */}
          <div className="mt-3 ml-11 border-l-[3px] border-[#c84b2f] bg-gray-50 rounded-lg px-4 py-3">
            <p className="text-xs font-bold text-[#c84b2f] uppercase tracking-wide mb-1.5">
              Example
            </p>
            <p className="text-base font-bold text-[#1a1a1a]">
              {pattern.exampleJa}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {pattern.exampleJaHiragana}
            </p>
            <p className="text-sm text-gray-600 mt-0.5">
              {pattern.exampleEn}
            </p>
          </div>

          {/* Bottom note */}
          <p className="text-center text-xs text-gray-400 mt-4">
            💡 Tap any pattern above to see Hana&apos;s explanation
          </p>
        </div>
      </div>
    </div>
  );
}
