"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./gamification/ProgressBar";
import AchievementPopup from "./gamification/AchievementPopup";
import { markLessonComplete, recordMistake } from "../lib/studentProgress";
import styles from "./ConversationLesson.module.css";

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

type Props = {
  lesson: ConversationLessonData;
  totalLessons: number;
};

export default function ConversationLesson({ lesson, totalLessons }: Props) {
  const router = useRouter();
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [toast, setToast] = useState({ show: false, text: "", variant: "success" as "success" | "reward" | "badge" });
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const total = lesson.dialogue.length;
  const current = lesson.dialogue[cardIndex];
  const isA = current?.speaker === "A";

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.85;
    utter.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang === "ja-JP" || v.lang.startsWith("ja"));
    if (jaVoice) utter.voice = jaVoice;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synthRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, []);

  function reveal() {
    if (!revealed) {
      setRevealed(true);
      if (autoVoice) speak(current.japanese);
    }
  }

  function next(result: "good" | "again") {
    const earned = result === "good" ? 1 : 0;
    if (result === "again") {
      recordMistake("conversation", lesson.id, {
        prompt: current.japanese,
        answer: "again",
        expected: current.english,
      });
    } else {
      setToast({ show: true, text: "Correct! 🎉", variant: "success" });
    }

    const nextIndex = cardIndex + 1;
    if (nextIndex >= total) {
      const finalScore = score + earned;
      const resultStats = markLessonComplete("conversation", lesson.id, finalScore, total);
      if (resultStats?.xpGained) {
        setToast({ show: true, text: `Lesson Complete! +${resultStats.xpGained} XP`, variant: "reward" });
      }
      if (resultStats?.unlockedBadges?.length) {
        const first = resultStats.unlockedBadges[0];
        setTimeout(() => {
          setToast({ show: true, text: `Badge Unlocked: ${first.title} 🏅`, variant: "badge" });
        }, 900);
      }
      setScore(finalScore);
      setDone(true);
    } else {
      if (earned) setScore(s => s + 1);
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
    const perfect = score === total;
    return (
      <div className={styles.doneScreen}>
        <AchievementPopup
          show={toast.show}
          text={toast.text}
          variant={toast.variant}
          onDone={() => setToast({ show: false, text: "", variant: "success" })}
        />
        <div className={styles.doneEmoji}>{perfect ? "🏆" : "🎉"}</div>
        <h2 className={styles.doneTitle}>{perfect ? "Perfect Score!" : "Lesson Complete!"}</h2>
        <p className={styles.doneDesc}>
          You got <strong>{score}</strong> out of <strong>{total}</strong> correct.
        </p>
        <div className={styles.doneBtns}>
          <button className={styles.btnPrimary} onClick={restart}>Practice Again</button>
          {lesson.id < totalLessons ? (
            <button className={styles.btnSecondary} onClick={() => router.push(`/conversation/${lesson.id + 1}`)}>
              Next Lesson →
            </button>
          ) : (
            <button className={styles.btnSecondary} onClick={() => router.push("/conversation")}>
              All Lessons
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── FLASHCARD SCREEN ──
  return (
    <div className={styles.lessonWrap}>
      <AchievementPopup
        show={toast.show}
        text={toast.text}
        variant={toast.variant}
        onDone={() => setToast({ show: false, text: "", variant: "success" })}
      />
      {/* Header */}
      <div className={styles.lessonHeader}>
        <div className={styles.lessonTag}>Conversation · Lesson {lesson.id}</div>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <p className={styles.lessonSubtitle}>{total} lines · Tap the card to reveal</p>
      </div>

      {/* Progress bar */}
      <ProgressBar current={cardIndex + 1} total={total} label="Lesson" />

      {/* Auto-speak toggle */}
      <div className={styles.voiceToggle}>
        <label className={styles.toggleLabel}>
          <span>🔊 Auto-speak on reveal</span>
          <div
            className={`${styles.toggleSwitch} ${autoVoice ? styles.toggleOn : ""}`}
            onClick={() => setAutoVoice(v => !v)}
          >
            <div className={styles.toggleThumb} />
          </div>
        </label>
      </div>

      {/* Flashcard */}
      <div
        className={`${styles.card} ${revealed ? styles.revealed : ""} ${speaking ? styles.speaking : ""} ${isA ? styles.cardA : styles.cardB} min-h-[200px] px-4 sm:px-6`}
        onClick={reveal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            reveal();
          }
        }}
      >
        {speaking && (
          <div className={styles.waves}>
            <span /><span /><span /><span /><span />
          </div>
        )}

        <span className={`${styles.speakerBadge} ${isA ? styles.badgeA : styles.badgeB}`}>
          Person {current.speaker}
        </span>

        <p className={styles.japanese}>{current.japanese}</p>

        {revealed && (
          <>
            <p className={styles.romaji}>{current.romaji}</p>
            <p className={styles.english}>{current.english}</p>
            <button
              className={`${styles.speakBtn} ${speaking ? styles.speakBtnActive : ""}`}
              onClick={e => { e.stopPropagation(); speak(current.japanese); }}
            >
              {speaking ? "🔊 Speaking..." : "🔈 Hear again"}
            </button>
          </>
        )}

        {!revealed && <div className={styles.tapHint}>tap to reveal &amp; hear</div>}
      </div>

      {/* Action buttons */}
      {revealed ? (
        <div className={styles.fcBtns}>
          <button className={styles.btnAgain} onClick={() => next("again")}>Again</button>
          <button className={styles.btnGood} onClick={() => next("good")}>Good ✓</button>
        </div>
      ) : (
        <div className={styles.fcBtnsPlaceholder} />
      )}

      {/* View all dialogue */}
      <button className={styles.viewAllBtn} onClick={() => setViewAll(v => !v)}>
        {viewAll ? "▲ Hide all lines" : "▼ View all lines"}
      </button>

      {viewAll && (
        <div className={styles.allLines}>
          <h2 className={styles.allLinesTitle}>All lines — Lesson {lesson.id}</h2>
          <div className={styles.linesGrid}>
            {lesson.dialogue.map((line, i) => (
              <div
                key={i}
                className={`${styles.lineRow} ${i < cardIndex ? styles.lineDone : ""} ${i === cardIndex ? styles.lineActive : ""}`}
                onClick={() => speak(line.japanese)}
                title={`Hear: ${line.japanese}`}
              >
                <span className={`${styles.lineBadge} ${line.speaker === "A" ? styles.badgeA : styles.badgeB}`}>
                  {line.speaker}
                </span>
                <div className={styles.lineContent}>
                  <div className={styles.lineJa}>{line.japanese}</div>
                  <div className={styles.lineRomaji}>{line.romaji}</div>
                  <div className={styles.lineEn}>{line.english}</div>
                </div>
                <span className={styles.lineSpeakIcon}>🔈</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

