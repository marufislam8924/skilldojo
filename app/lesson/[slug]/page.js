"use client";

import { useParams } from "next/navigation";
import { useState, useRef } from "react";

export default function LessonPage() {

  const { slug } = useParams();

  const hiragana = [
    { jp:"あ", en:"a", ex:"like 'a' in father" },
    { jp:"い", en:"i", ex:"like 'ee' in feet" },
    { jp:"う", en:"u", ex:"like 'oo' (flat lips)" },
    { jp:"え", en:"e", ex:"like 'e' in bed" },
    { jp:"お", en:"o", ex:"like 'o' in old" },
    { jp:"か", en:"ka", ex:"like 'ka' in card" },
    { jp:"き", en:"ki", ex:"like 'key'" },
    { jp:"く", en:"ku", ex:"like 'coo' in cool" },
    { jp:"け", en:"ke", ex:"like 'kettle'" },
    { jp:"こ", en:"ko", ex:"like 'coat'" },
    { jp:"さ", en:"sa", ex:"like 'saga'" },
    { jp:"し", en:"shi", ex:"like 'she'" },
    { jp:"す", en:"su", ex:"like 'sushi'" },
    { jp:"せ", en:"se", ex:"like 'set'" },
    { jp:"そ", en:"so", ex:"like 'song'" },
    { jp:"た", en:"ta", ex:"like 'talk'" },
    { jp:"ち", en:"chi", ex:"like 'cheese'" },
    { jp:"つ", en:"tsu", ex:"press tongue to teeth" },
    { jp:"て", en:"te", ex:"like 'ten'" },
    { jp:"と", en:"to", ex:"like 'toe'" },
    { jp:"な", en:"na", ex:"like 'name'" },
    { jp:"に", en:"ni", ex:"like 'knee'" },
    { jp:"ぬ", en:"nu", ex:"like 'new'" },
    { jp:"ね", en:"ne", ex:"like 'net'" },
    { jp:"の", en:"no", ex:"like 'no'" },
    { jp:"は", en:"ha", ex:"like 'happy'" },
    { jp:"ひ", en:"hi", ex:"like 'he'" },
    { jp:"ふ", en:"fu", ex:"soft breath sound" },
    { jp:"へ", en:"he", ex:"like 'help'" },
    { jp:"ほ", en:"ho", ex:"like 'home'" },
    { jp:"ま", en:"ma", ex:"like 'mama'" },
    { jp:"み", en:"mi", ex:"like 'me'" },
    { jp:"む", en:"mu", ex:"like 'moon'" },
    { jp:"め", en:"me", ex:"like 'met'" },
    { jp:"も", en:"mo", ex:"like 'more'" },
    { jp:"や", en:"ya", ex:"like 'yard'" },
    { jp:"ゆ", en:"yu", ex:"like 'you'" },
    { jp:"よ", en:"yo", ex:"like 'yoga'" },
    { jp:"ら", en:"ra", ex:"between r/l" },
    { jp:"り", en:"ri", ex:"light r + ee" },
    { jp:"る", en:"ru", ex:"light r + oo" },
    { jp:"れ", en:"re", ex:"light r + e" },
    { jp:"ろ", en:"ro", ex:"light r + o" },
    { jp:"わ", en:"wa", ex:"like 'water'" },
    { jp:"を", en:"o", ex:"written wo" },
    { jp:"ん", en:"n", ex:"like 'ramen n'" },
  ];

  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const startX = useRef(0);

  const next = () => {
    setIndex((index + 1) % hiragana.length);
    setFlip(false);
  };

  const prev = () => {
    setIndex((index - 1 + hiragana.length) % hiragana.length);
    setFlip(false);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  const playSound = () => {
    const u = new SpeechSynthesisUtterance(hiragana[index].jp);
    u.lang = "ja-JP";
    u.rate = 0.9;
    speechSynthesis.speak(u);
  };

  if (slug !== "hiragana") {
    return <div className="lesson-container">Coming soon...</div>;
  }

  return (
    <main className="quizlet-container">

      <div className="topbar">
        <p>{index + 1} / {hiragana.length}</p>
        <button className="audio-btn" onClick={playSound}>🔊</button>
      </div>

      <div
        className={`quizlet-card ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="inner">

          <div className="front">
            {hiragana[index].jp}
          </div>

          <div className="back">
            <div className="back-content">
              <h1>{hiragana[index].en}</h1>
              <p>{hiragana[index].ex}</p>
            </div>
          </div>

        </div>

        <div className="hint">Tap or Swipe</div>
      </div>

      <div className="nav-controls">
        <button onClick={prev}>←</button>
        <button onClick={next}>→</button>
      </div>

    </main>
  );
}