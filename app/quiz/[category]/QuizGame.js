"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quizCategories } from "../../../data/quizData";
import { hiraganaLessons, katakanaLessons } from "../../data";
import { vocabularyLessons } from "../../vocabData";
import { grammarLessons } from "../../grammarData";
import { updateStreakAndXP, getStudentSession } from "../../lib/studentProgress";
import StudentNavAction from "../../components/StudentNavAction";
import Confetti from "../../components/Confetti";
import styles from "./quizgame.module.css";

/* ─── Helpers ─── */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(pool, correct, count = 3) {
  return shuffle(pool.filter((o) => o !== correct)).slice(0, count);
}

function buildKanaBank(lessons, type) {
  const allChars = lessons.flatMap((l) => l.chars);
  const allReadings = [...new Set(allChars.map((c) => c.r))];
  return allChars.map((c) => ({
    type,
    question: `What is the reading of this character?`,
    display: c.k,
    correct: c.r,
    pool: allReadings,
  }));
}

function buildVocabBank() {
  const allWords = vocabularyLessons.flatMap((l) => l.chars);
  const allMeanings = [...new Set(allWords.map((w) => w.meaning || w.r))];
  return allWords.map((w) => ({
    type: "vocab",
    question: `What does this word mean?`,
    display: w.k,
    subtitle: w.reading,
    correct: w.meaning || w.r,
    pool: allMeanings,
  }));
}

function buildGrammarBank() {
  const allPatterns = grammarLessons.flatMap((l) => l.chars);
  const allMeanings = [...new Set(allPatterns.map((p) => p.meaning))];
  return allPatterns.map((p) => ({
    type: "grammar",
    question: `What does this pattern mean?`,
    display: p.k,
    subtitle: p.reading,
    correct: p.meaning,
    pool: allMeanings,
  }));
}

function generateQuiz(categoryId) {
  let bank = [];
  if (categoryId === "hiragana") bank = buildKanaBank(hiraganaLessons, "hiragana");
  else if (categoryId === "katakana") bank = buildKanaBank(katakanaLessons, "katakana");
  else if (categoryId === "vocab") bank = buildVocabBank();
  else if (categoryId === "grammar") bank = buildGrammarBank();
  else {
    bank = [
      ...buildKanaBank(hiraganaLessons, "hiragana"),
      ...buildKanaBank(katakanaLessons, "katakana"),
      ...buildVocabBank(),
      ...buildGrammarBank(),
    ];
  }

  const cat = quizCategories.find((c) => c.id === categoryId);
  const count = cat?.questionCount || 15;
  const selected = shuffle(bank).slice(0, count);

  return selected.map((q) => {
    const distractors = pickDistractors(q.pool, q.correct, 3);
    const options = shuffle([q.correct, ...distractors]);
    return {
      question: q.question,
      display: q.display,
      subtitle: q.subtitle || null,
      type: q.type,
      options,
      correctIndex: options.indexOf(q.correct),
    };
  });
}

const MAX_HEARTS = 3;

/* ─── Component ─── */

export default function QuizGame({ categoryId }) {
  const router = useRouter();
  const category = quizCategories.find((c) => c.id === categoryId);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [xpResult, setXpResult] = useState(null);
  const [shake, setShake] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const startQuiz = useCallback(() => {
    setQuestions(generateQuiz(categoryId));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setHearts(MAX_HEARTS);
    setAnswered(false);
    setDone(false);
    setGameOver(false);
    setXpResult(null);
    setShake(false);
  }, [categoryId]);

  useEffect(() => {
    startQuiz();
  }, [startQuiz]);

  function handleSelect(index) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (newHearts <= 0) {
        setTimeout(() => setGameOver(true), 1200);
      }
    }
  }

  function handleContinue() {
    if (gameOver) return;
    const nextIndex = current + 1;
    if (nextIndex >= questions.length) {
      setDone(true);
      const session = getStudentSession();
      if (session && score > 0) {
        const result = updateStreakAndXP(score);
        setXpResult(result);
      }
    } else {
      setCurrent(nextIndex);
      setSelected(null);
      setAnswered(false);
    }
  }

  /* ─── Nav Bar ─── */
  function NavBar() {
    return (
      <nav className={styles.nav}>
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start">
          <span className={styles.logo}>
            Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
          </span>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-xl md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        <div className={`${styles.navActions} ${menuOpen ? "flex" : "hidden"} w-full flex-col gap-2 md:flex md:w-auto md:flex-row md:gap-4`}>
          <StudentNavAction className={styles.navLink} dashboardLabel="My Progress" />
          <button className={styles.backBtn} onClick={() => router.push("/quiz")}>
            ← Back
          </button>
        </div>
      </nav>
    );
  }

  /* ─── Not found ─── */
  if (!category) {
    return (
      <main className={styles.main}>
        <NavBar />
        <div className={styles.notFound}>
          <p className={styles.notFoundText}>Quiz not found</p>
          <Link href="/quiz" className={styles.notFoundLink}>
            ← Back to Quizzes
          </Link>
        </div>
      </main>
    );
  }

  /* ─── Loading ─── */
  if (questions.length === 0) {
    return (
      <main className={`${styles.main} ${styles.loading}`}>
        <NavBar />
        <div className={styles.spinner} />
      </main>
    );
  }

  /* ─── GAME OVER (lost all hearts) ─── */
  if (gameOver) {
    return (
      <main className={styles.main}>
        <NavBar />
        <div className={styles.doneScreen}>
          <div className={styles.doneEmoji}>💔</div>
          <h2 className={styles.doneTitle}>Out of Hearts!</h2>
          <p className={styles.doneDesc}>
            You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct.
            Practice your lessons and try again.
          </p>
          <div className={styles.doneBtns}>
            <button className={styles.btnPrimary} onClick={startQuiz}>
              Try Again
            </button>
            <Link href="/quiz" className={styles.btnSecondary}>
              All Quizzes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── DONE SCREEN (completed quiz) ─── */
  if (done) {
    const percent = Math.round((score / questions.length) * 100);
    const perfect = percent === 100;

    return (
      <main className={styles.main}>
        <Confetti show={perfect} />
        <NavBar />
        <div className={styles.doneScreen}>
          <div className={styles.doneEmoji}>{perfect ? "🏆" : percent >= 80 ? "⭐" : "🎉"}</div>
          <h2 className={styles.doneTitle}>
            {perfect ? "Perfect Score!" : percent >= 80 ? "Great Work!" : "Quiz Complete!"}
          </h2>
          <p className={styles.doneDesc}>
            You completed the <strong>{category.title}</strong>.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statValue} style={{ color: "var(--red)" }}>{percent}%</div>
              <div className={styles.statLabel}>Score</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue} style={{ color: "#28a745" }}>{score}</div>
              <div className={styles.statLabel}>Correct</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statValue} style={{ color: "#dc3545" }}>{hearts}</div>
              <div className={styles.statLabel}>Hearts</div>
            </div>
          </div>

          {xpResult && (
            <div className={styles.xpReward}>
              <span className={styles.xpIcon}>✨</span>
              <span className={styles.xpText}>+{score * 10} XP</span>
              {xpResult.currentStreak > 0 && (
                <span className={styles.streakText}>
                  🔥 {xpResult.currentStreak}-day streak!
                </span>
              )}
            </div>
          )}

          <div className={styles.doneBtns}>
            <button className={styles.btnPrimary} onClick={startQuiz}>
              Play Again
            </button>
            <Link href="/quiz" className={styles.btnSecondary}>
              All Quizzes
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── QUESTION SCREEN ─── */
  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);
  const isCorrect = selected === q.correctIndex;

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.content}>
        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.progressLabel}>
            {current + 1} / {questions.length}
          </div>
        </div>

        {/* Hearts */}
        <div className={`${styles.hearts} ${shake ? styles.heartsShake : ""}`}>
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <span key={i} className={i >= hearts ? styles.heartLost : ""}>❤️</span>
          ))}
        </div>

        {/* Question Card */}
        <div className={styles.questionCard}>
          <div className={styles.questionText}>{q.question}</div>
          <div className={styles.questionDisplay}>{q.display}</div>
          {q.subtitle && (
            <div className={styles.questionSubtitle}>{q.subtitle}</div>
          )}
        </div>

        {/* Options */}
        <div className={styles.optionsGrid}>
          {q.options.map((option, i) => {
            let className = styles.optionBtn;
            if (answered) {
              if (i === q.correctIndex) {
                className += ` ${styles.optionCorrect}`;
              } else if (i === selected && !isCorrect) {
                className += ` ${styles.optionWrong}`;
              } else {
                className += ` ${styles.optionDisabled}`;
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`${className} w-full min-h-12`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`${styles.feedbackBar} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
            <div className={styles.feedbackIcon}>{isCorrect ? "✅" : "❌"}</div>
            <div className={styles.feedbackTextWrap}>
              <div className={styles.feedbackTitle}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </div>
              <div className={styles.feedbackDetail}>
                {isCorrect ? "+10 XP" : `Correct answer: ${q.options[q.correctIndex]}`}
              </div>
            </div>
          </div>
        )}

        {/* Continue */}
        {answered && (
          <button onClick={handleContinue} className={styles.continueBtn}>
            {current + 1 >= questions.length ? "See Results" : "Continue →"}
          </button>
        )}
      </div>
    </main>
  );
}
