"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function LessonPage() {

  const { slug } = useParams();

  const hiragana = [
    { jp: "あ", en: "a", sound: "like 'a' in father" },
    { jp: "い", en: "i", sound: "like 'ee' in feet" },
    { jp: "う", en: "u", sound: "like 'oo' but lips flat" },
    { jp: "え", en: "e", sound: "like 'e' in bed" },
    { jp: "お", en: "o", sound: "like 'o' in old" },

    { jp: "か", en: "ka", sound: "like 'ka' in card" },
    { jp: "き", en: "ki", sound: "like 'key'" },
    { jp: "く", en: "ku", sound: "like 'coo' in cool" },
    { jp: "け", en: "ke", sound: "like 'ke' in kettle" },
    { jp: "こ", en: "ko", sound: "like 'co' in coat" },

    { jp: "さ", en: "sa", sound: "like 'sa' in saga" },
    { jp: "し", en: "shi", sound: "like 'she'" },
    { jp: "す", en: "su", sound: "like 'su' in sushi" },
    { jp: "せ", en: "se", sound: "like 'se' in set" },
    { jp: "そ", en: "so", sound: "like 'so' in song" },

    { jp: "た", en: "ta", sound: "like 'ta' in talk" },
    { jp: "ち", en: "chi", sound: "like 'chee' in cheese" },
    { jp: "つ", en: "tsu", sound: "press tongue, say 'tsu'" },
    { jp: "て", en: "te", sound: "like 'te' in ten" },
    { jp: "と", en: "to", sound: "like 'toe'" },

    { jp: "な", en: "na", sound: "like 'na' in name" },
    { jp: "に", en: "ni", sound: "like 'knee'" },
    { jp: "ぬ", en: "nu", sound: "like 'new'" },
    { jp: "ね", en: "ne", sound: "like 'net'" },
    { jp: "の", en: "no", sound: "like 'no'" },

    { jp: "は", en: "ha", sound: "like 'ha' in happy" },
    { jp: "ひ", en: "hi", sound: "like 'he'" },
    { jp: "ふ", en: "fu", sound: "soft breath sound" },
    { jp: "へ", en: "he", sound: "like 'help'" },
    { jp: "ほ", en: "ho", sound: "like 'home'" },

    { jp: "ま", en: "ma", sound: "like 'mama'" },
    { jp: "み", en: "mi", sound: "like 'me'" },
    { jp: "む", en: "mu", sound: "like 'moon'" },
    { jp: "め", en: "me", sound: "like 'met'" },
    { jp: "も", en: "mo", sound: "like 'more'" },

    { jp: "や", en: "ya", sound: "like 'yard'" },
    { jp: "ゆ", en: "yu", sound: "like 'you'" },
    { jp: "よ", en: "yo", sound: "like 'yoga'" },

    { jp: "ら", en: "ra", sound: "between 'r' and 'l'" },
    { jp: "り", en: "ri", sound: "light 'r' + ee" },
    { jp: "る", en: "ru", sound: "light 'r' + oo" },
    { jp: "れ", en: "re", sound: "light 'r' + e" },
    { jp: "ろ", en: "ro", sound: "light 'r' + o" },

    { jp: "わ", en: "wa", sound: "like 'water'" },
    { jp: "を", en: "o", sound: "written wo, sounds 'o'" },
    { jp: "ん", en: "n", sound: "like 'n' in ramen" },
  ];

  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  if (slug !== "hiragana") {
    return (
      <main className="lesson-container">
        <h1>{slug}</h1>
        <p>Content coming soon...</p>
      </main>
    );
  }

  return (
    <main className="lesson-container">

      <h1>Hiragana Pronunciation</h1>

      {/* FLASHCARD */}
      <div 
        className={`flashcard ${flip ? "flip" : ""}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="inner">

          <div className="front">
            {hiragana[index].jp}
          </div>

          <div className="back">
            <h2>{hiragana[index].en}</h2>
            <p style={{fontSize:"14px", marginTop:"10px"}}>
              {hiragana[index].sound}
            </p>
          </div>

        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls">

        <button onClick={() => {
          setIndex((index - 1 + hiragana.length) % hiragana.length);
          setFlip(false);
        }}>
          ← Prev
        </button>

        <button onClick={() => {
          setIndex((index + 1) % hiragana.length);
          setFlip(false);
        }}>
          Next →
        </button>

      </div>

    </main>
  );
}