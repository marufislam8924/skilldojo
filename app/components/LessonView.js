"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import styles from "./LessonView.module.css";
import StudentNavAction from "./StudentNavAction";
import { markLessonComplete } from "../lib/studentProgress";

export default function LessonView({ lessonId, data, courseSlug, totalLessons }) {
  const router = useRouter();
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const synthRef = useRef(null);

  const isVocabulary = courseSlug === "vocab";
  const current = data.chars[cardIndex];
  const progress = Math.round((cardIndex / data.chars.length) * 100);
  const currentVoice = current.voice || current.reading || current.k;
  const courseLabel =
    courseSlug === "hiragana"
      ? "Hiragana"
      : courseSlug === "katakana"
        ? "Katakana"
        : "JLPT N5 Vocabulary";

  // ── AI VOICE via Web Speech API (Japanese) ──
  const speak = useCallback((text) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.85;
    utter.pitch = 1.1;

    // Try to pick a Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(
      (v) => v.lang === "ja-JP" || v.lang.startsWith("ja")
    );
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
      if (autoVoice) speak(currentVoice);
    }
  }

  function next(result) {
    const earned = result === "good" ? 1 : 0;
    const nextIndex = cardIndex + 1;
    if (nextIndex >= data.chars.length) {
      const finalScore = score + earned;
      setScore(finalScore);
      markLessonComplete(courseSlug, lessonId, finalScore, data.chars.length);
      setDone(true);
    } else {
      if (earned) setScore((s) => s + 1);
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
        <NavBar courseSlug={courseSlug} router={router} />
        <div className={styles.doneScreen}>
          <div className={styles.doneEmoji}>{perfect ? "🏆" : "🎉"}</div>
          <h2 className={styles.doneTitle}>
            {perfect ? "Perfect Score!" : "Lesson Complete!"}
          </h2>
          <p className={styles.doneDesc}>
            You got <strong>{score}</strong> out of{" "}
            <strong>{data.chars.length}</strong> correct.
          </p>
          <div className={styles.doneBtns}>
            <button className={styles.btnPrimary} onClick={restart}>
              Practice Again
            </button>
            {lessonId < totalLessons ? (
              <button
                className={styles.btnSecondary}
                onClick={() => router.push(`/${courseSlug}/${lessonId + 1}`)}
              >
                Next Lesson →
              </button>
            ) : (
              <button
                className={styles.btnSecondary}
                onClick={() => router.push(`/${courseSlug}`)}
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
      <NavBar courseSlug={courseSlug} router={router} />

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.lessonHeader}>
          <div className={styles.lessonTag}>
            {courseLabel} · Lesson {lessonId}
          </div>
          <h1 className={styles.lessonTitle}>{data.name}</h1>
          <p className={styles.lessonSubtitle}>
            {data.chars.length} {isVocabulary ? "words" : "characters"} · Tap the card to reveal
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

        {/* Auto-voice toggle */}
        <div className={styles.voiceToggle}>
          <label className={styles.toggleLabel}>
            <span>🔊 Auto-speak on reveal</span>
            <div
              className={`${styles.toggleSwitch} ${autoVoice ? styles.toggleOn : ""}`}
              onClick={() => setAutoVoice((v) => !v)}
            >
              <div className={styles.toggleThumb} />
            </div>
          </label>
        </div>

        {/* Flashcard */}
        <div
          className={`${styles.flashcard} ${revealed ? styles.revealed : ""} ${speaking ? styles.speaking : ""} ${isVocabulary ? styles.wordFlashcard : ""}`}
          onClick={reveal}
        >
          {/* Sound waves when speaking */}
          {speaking && (
            <div className={styles.waves}>
              <span /><span /><span /><span /><span />
            </div>
          )}

          <div className={`${styles.fcKana} ${isVocabulary ? styles.fcWord : ""}`}>{current.k}</div>
          <div className={`${styles.fcHint} ${isVocabulary ? styles.fcHintVisible : ""}`}>{isVocabulary ? current.reading : current.r}</div>
          {revealed && isVocabulary && (
            <>
              <div className={styles.fcRoman}>{current.r}</div>
              <div className={styles.fcMeaning}>{current.meaning}</div>
              <div className={styles.fcExampleBox}>
                <div className={styles.fcExampleLabel}>Example</div>
                <div className={styles.fcExampleJa}>{current.exampleJa}</div>
                <div className={styles.fcExampleKana}>{current.exampleJaHiragana}</div>
                <div className={styles.fcExampleEn}>{current.exampleEn}</div>
              </div>
            </>
          )}

          {!revealed && (
            <div className={styles.fcTap}>tap to reveal &amp; hear</div>
          )}

          {/* Manual speak button (after reveal) */}
          {revealed && (
            <button
              className={`${styles.speakBtn} ${speaking ? styles.speakBtnActive : ""}`}
              onClick={(e) => { e.stopPropagation(); speak(currentVoice); }}
              title="Hear pronunciation"
            >
              {speaking ? "🔊" : "🔈"} {speaking ? "Speaking..." : "Hear again"}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {revealed ? (
          <div className={styles.fcBtns}>
            <button className={styles.btnAgain} onClick={() => next("again")}>
              Again
            </button>
            <button className={styles.btnGood} onClick={() => next("good")}>
              Good ✓
            </button>
          </div>
        ) : (
          <div className={styles.fcBtnsPlaceholder} />
        )}

        {/* All chars grid */}
        <div className={styles.allChars}>
          <h3 className={styles.allCharsTitle}>All {isVocabulary ? "words" : "characters"} — Lesson {lessonId}</h3>
          <div className={`${styles.allCharsGrid} ${isVocabulary ? styles.wordGrid : ""}`}>
            {data.chars.map((c, i) => (
              <div
                key={`${c.k}-${i}`}
                className={`${styles.charCell}
                  ${isVocabulary ? styles.wordCell : ""}
                  ${i < cardIndex ? styles.charDone : ""}
                  ${i === cardIndex ? styles.charActive : ""}`}
                onClick={() => speak(c.voice || c.reading || c.k)}
                title={isVocabulary ? `Hear: ${c.meaning}` : `Hear: ${c.r}`}
              >
                <div className={`${styles.charKana} ${isVocabulary ? styles.wordPrimary : ""}`}>{c.k}</div>
                <div className={styles.charRom}>{isVocabulary ? c.reading : c.r}</div>
                {isVocabulary && <div className={styles.charMeaning}>{c.meaning}</div>}
                {isVocabulary && <div className={styles.charReading}>[{c.reading}]</div>}
                {isVocabulary && <div className={styles.charExample}>{c.exampleJa}</div>}
                <div className={styles.charSpeakIcon}>🔈</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function NavBar({ courseSlug, router }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>
        Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
      </span>
      <div className={styles.navActions}>
        <StudentNavAction className={styles.navLink} dashboardLabel="My Dashboard" />
        <button
          className={styles.backBtn}
          onClick={() => router.push(`/${courseSlug}`)}
        >
          ← All Lessons
        </button>
      </div>
    </nav>
  );
}
