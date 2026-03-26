"use client";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import styles from "./LessonView.module.css";

export default function LessonView({ lessonId, data, courseSlug, totalLessons }) {
  const router = useRouter();
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const synthRef = useRef(null);

  const current = data.chars[cardIndex];
  const progress = Math.round((cardIndex / data.chars.length) * 100);

  const speak = useCallback((text) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.rate = 0.85;
    utter.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang === "ja-JP" || v.lang.startsWith("ja"));
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
      if (autoVoice) speak(current.k);
    }
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

  if (done) {
    const perfect = score === data.chars.length;
    return (
      <main className={styles.main}>
        <nav className={styles.nav}>
          <span className={styles.logo}>Skill<span style={{color:"var(--red)"}}>Dojo</span> 道場</span>
          <button className={styles.backBtn} onClick={() => router.push(`/${courseSlug}`)}>← All Lessons</button>
        </nav>
        <div className={styles.doneScreen}>
          <div className={styles.doneEmoji}>{perfect ? "🏆" : "🎉"}</div>
          <h2 className={styles.doneTitle}>{perfect ? "Perfect Score!" : "Lesson Complete!"}</h2>
          <p className={styles.doneDesc}>You got <strong>{score}</strong> out of <strong>{data.chars.length}</strong> correct.</p>
          <div className={styles.doneBtns}>
            <button className={styles.btnPrimary} onClick={restart}>Practice Again</button>
            {lessonId < totalLessons ? (
              <button className={styles.btnSecondary} onClick={() => router.push(`/${courseSlug}/${lessonId+1}`)}>Next Lesson →</button>
            ) : (
              <button className={styles.btnSecondary} onClick={() => router.push(`/${courseSlug}`)}>All Lessons</button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>Skill<span style={{color:"var(--red)"}}>Dojo</span> 道場</span>
        <button className={styles.backBtn} onClick={() => router.push(`/${courseSlug}`)}>← All Lessons</button>
      </nav>
      <div className={styles.content}>
        <div className={styles.lessonHeader}>
          <div className={styles.lessonTag}>{courseSlug === "hiragana" ? "Hiragana" : "Katakana"} · Lesson {lessonId}</div>
          <h1 className={styles.lessonTitle}>{data.name}</h1>
          <p className={styles.lessonSubtitle}>{data.chars.length} characters · Tap the card to reveal</p>
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{width:`${progress}%`}}/>
          </div>
          <span className={styles.progressLabel}>{cardIndex} / {data.chars.length}</span>
        </div>
        <div className={styles.voiceToggle}>
          <label className={styles.toggleLabel}>
            <span>🔊 Auto-speak on reveal</span>
            <div className={`${styles.toggleSwitch} ${autoVoice ? styles.toggleOn : ""}`} onClick={() => setAutoVoice(v => !v)}>
              <div className={styles.toggleThumb}/>
            </div>
          </label>
        </div>
        <div className={`${styles.flashcard} ${revealed ? styles.revealed:""} ${speaking ? styles.speaking:""}`} onClick={reveal}>
          {speaking && <div className={styles.waves}><span/><span/><span/><span/><span/></div>}
          <div className={styles.fcKana}>{current.k}</div>
          <div className={styles.fcHint}>{current.r}</div>
          {!revealed && <div className={styles.fcTap}>tap to reveal &amp; hear</div>}
          {revealed && (
            <button className={`${styles.speakBtn} ${speaking ? styles.speakBtnActive:""}`}
              onClick={(e) => { e.stopPropagation(); speak(current.k); }}>
              {speaking ? "🔊 Speaking..." : "🔈 Hear again"}
            </button>
          )}
        </div>
        {revealed ? (
          <div className={styles.fcBtns}>
            <button className={styles.btnAgain} onClick={() => next("again")}>Again</button>
            <button className={styles.btnGood} onClick={() => next("good")}>Good ✓</button>
          </div>
        ) : (
          <div className={styles.fcBtnsPlaceholder}/>
        )}
        <div className={styles.allChars}>
          <h3 className={styles.allCharsTitle}>All characters — Lesson {lessonId}</h3>
          <div className={styles.allCharsGrid}>
            {data.chars.map((c, i) => (
              <div key={c.k}
                className={`${styles.charCell} ${i<cardIndex?styles.charDone:""} ${i===cardIndex?styles.charActive:""}`}
                onClick={() => speak(c.k)}>
                <div className={styles.charKana}>{c.k}</div>
                <div className={styles.charRom}>{c.r}</div>
                <div className={styles.charSpeakIcon}>🔈</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
