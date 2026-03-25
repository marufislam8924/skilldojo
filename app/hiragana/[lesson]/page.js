"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { hiraganaLessons } from "../../data";
import styles from "./lesson.module.css";

export default function LessonPage() {
  const router = useRouter();
  const { lesson } = useParams();
  const lessonId = parseInt(lesson);

  const data = hiraganaLessons.find((l) => l.id === lessonId) || hiraganaLessons[0];

  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const current = data.chars[cardIndex];
  const progress = Math.round((cardIndex / data.chars.length) * 100);

  function reveal() {
    if (!revealed) setRevealed(true);
  }

  function next(result) {
    if (result === "good") setScore((s) => s + 1);
    const nextIndex = cardIndex + 1;
    if (nextIndex >= data.chars.length) {
      setDone(true);
    } else {
      setCardIndex(nextIndex);
      setRevealed(false);
    }
  }

  function restart() {
    setCardIndex(0);
    setRevealed(false);
    setDone(false);
    setScore(0);
  }

  // ── DONE SCREEN ──
  if (done) {
    const perfect = score === data.chars.length;
    return (
      <main className={styles.main}>
        <nav className={styles.nav}>
          <span className={styles.logo}>
            Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
          </span>
          <button className={styles.backBtn} onClick={() => router.push("/hiragana")}>
            ← All Lessons
          </button>
        </nav>

        <div className={styles.doneScreen}>
          <div className={styles.doneEmoji}>{perfect ? "🏆" : "🎉"}</div>
          <h2 className={styles.doneTitle}>
            {perfect ? "Perfect Score!" : "Lesson Complete!"}
          </h2>
          <p className={styles.doneDesc}>
            You got <strong>{score}</strong> out of <strong>{data.chars.length}</strong> correct.
          </p>
          <div className={styles.doneBtns}>
            <button className={styles.btnPrimary} onClick={restart}>
              Practice Again
            </button>
            {lessonId < 21 ? (
              <button
                className={styles.btnSecondary}
                onClick={() => router.push(`/hiragana/${lessonId + 1}`)}
              >
                Next Lesson →
              </button>
            ) : (
              <button
                className={styles.btnSecondary}
                onClick={() => router.push("/hiragana")}
              >
                All Lessons
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  // ── FLASHCARD SCREEN ──
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
        <button className={styles.backBtn} onClick={() => router.push("/hiragana")}>
          ← All Lessons
        </button>
      </nav>

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.lessonHeader}>
          <div className={styles.lessonTag}>Lesson {lessonId}</div>
          <h1 className={styles.lessonTitle}>{data.name}</h1>
          <p className={styles.lessonSubtitle}>
            {data.chars.length} characters · Tap the card to reveal
          </p>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>
            {cardIndex} / {data.chars.length}
          </span>
        </div>

        {/* Flashcard */}
        <div
          className={`${styles.flashcard} ${revealed ? styles.revealed : ""}`}
          onClick={reveal}
        >
          <div className={styles.fcKana}>{current.k}</div>
          <div className={styles.fcHint}>{current.r}</div>
          {!revealed && (
            <div className={styles.fcTap}>tap to reveal</div>
          )}
        </div>

        {/* Action Buttons */}
        {revealed ? (
          <div className={styles.fcBtns}>
            <button
              className={styles.btnAgain}
              onClick={() => next("again")}
            >
              Again
            </button>
            <button
              className={styles.btnGood}
              onClick={() => next("good")}
            >
              Good ✓
            </button>
          </div>
        ) : (
          <div className={styles.fcBtnsPlaceholder} />
        )}

        {/* All chars in this lesson */}
        <div className={styles.allChars}>
          <h3 className={styles.allCharsTitle}>All characters in Lesson {lessonId}</h3>
          <div className={styles.allCharsGrid}>
            {data.chars.map((c, i) => (
              <div
                key={c.k}
                className={`${styles.charCell} ${i < cardIndex ? styles.charDone : ""} ${i === cardIndex ? styles.charActive : ""}`}
              >
                <div className={styles.charKana}>{c.k}</div>
                <div className={styles.charRom}>{c.r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
