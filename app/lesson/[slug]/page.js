"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function LessonPage() {

  const { slug } = useParams();

  const hiragana = [
    { jp: "あ", en: "a", sound: "ah" },
    { jp: "い", en: "i", sound: "ee" },
    { jp: "う", en: "u", sound: "oo" },
    { jp: "え", en: "e", sound: "eh" },
    { jp: "お", en: "o", sound: "oh" },
  ];

  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  // 🔊 AUDIO FUNCTION
  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(hiragana[index].jp);
    utterance.lang = "ja-JP";
    speechSynthesis.speak(utterance);
  };

  if (slug !== "hiragana") {
    return <div className="lesson-container">Coming soon...</div>;
  }

  return (
    <main className="quizlet-container">

      {/* TOP BAR */}
      <div className="topbar">
        <p>{index + 1} / {hiragana.length}</p>

        <button onClick={playSound} className="audio-btn">
          🔊
        </button>
      </div>

      {/* FLASHCARD */}
      <div 
        className={`quizlet-card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="inner">

          <div className="front">
            {hiragana[index].jp}
          </div>

          <div className="back">
            <h1>{hiragana[index].en}</h1>
          </div>

        </div>

        <div className="hint">Tap the card to flip</div>
      </div>

      {/* CONTROLS */}
      <div className="nav-controls">

        <button onClick={() => {
          setIndex((index - 1 + hiragana.length) % hiragana.length);
          setFlip(false);
        }}>
          ←
        </button>

        <button onClick={() => {
          setIndex((index + 1) % hiragana.length);
          setFlip(false);
        }}>
          →
        </button>

      </div>

    </main>
  );
}