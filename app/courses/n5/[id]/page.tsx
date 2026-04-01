"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jlptN5Course } from "../../../../data/jlptN5Course";
import type { N5Lesson } from "../../../../data/jlptN5Course";
import styles from "./lesson.module.css";

const skillClass: Record<string, string> = {
  vocabulary: styles.skillVocabulary,
  grammar: styles.skillGrammar,
  reading: styles.skillReading,
  listening: styles.skillListening,
};

type Tab = "vocabulary" | "grammar" | "practice" | "quiz";

export default function N5LessonPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const lessonId = Number(params.id);
  const lesson: N5Lesson | undefined = jlptN5Course.find((l) => l.id === lessonId);

  const [activeTab, setActiveTab] = useState<Tab>("vocabulary");

  if (!lesson) {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <p>Lesson not found.</p>
          <button className={styles.backBtn} onClick={() => router.push("/courses/n5")}>
            ← Back to Course
          </button>
        </div>
      </main>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "vocabulary", label: "Vocabulary" },
    { key: "grammar", label: "Grammar" },
    { key: "practice", label: "Practice" },
    { key: "quiz", label: "Quiz" },
  ];

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
        <button className={styles.backBtn} onClick={() => router.push("/courses/n5")}>
          ← Back
        </button>
      </nav>

      <div className={styles.content}>
        <div className={styles.lessonTag}>Lesson {lesson.id}</div>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <div className={styles.lessonJapanese}>{lesson.titleJapanese}</div>
        <span className={`${styles.skillBadge} ${skillClass[lesson.skill] || ""}`}>
          {lesson.skill}
        </span>

        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "vocabulary" && <VocabularySection lesson={lesson} />}
        {activeTab === "grammar" && <GrammarSection lesson={lesson} />}
        {activeTab === "practice" && <PracticeSection lesson={lesson} />}
        {activeTab === "quiz" && <QuizSection lesson={lesson} />}
      </div>
    </main>
  );
}

/* ─── VOCABULARY ─── */
function VocabularySection({ lesson }: { lesson: N5Lesson }) {
  return (
    <div className={styles.vocabGrid}>
      {lesson.vocabulary.map((v, i) => (
        <div key={i} className={styles.vocabCard}>
          <div className={styles.vocabJapanese}>{v.japanese}</div>
          <div className={styles.vocabRomaji}>{v.romaji}</div>
          <div className={styles.vocabEnglish}>{v.english}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── GRAMMAR ─── */
function GrammarSection({ lesson }: { lesson: N5Lesson }) {
  return (
    <div className={styles.grammarList}>
      {lesson.grammarPoints.map((gp, i) => (
        <div key={i} className={styles.grammarCard}>
          <div className={styles.grammarPattern}>{gp.pattern}</div>
          <div className={styles.grammarMeaning}>{gp.meaning}</div>
          <div className={styles.grammarExLabel}>Example</div>
          <div className={styles.grammarExJp}>{gp.example.japanese}</div>
          <div className={styles.grammarExRomaji}>{gp.example.romaji}</div>
          <div className={styles.grammarExEn}>{gp.example.english}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── PRACTICE ─── */
function PracticeSection({ lesson }: { lesson: N5Lesson }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className={styles.practiceList}>
      {lesson.practiceSentences.map((s, i) => (
        <div key={i} className={styles.practiceCard}>
          <div className={styles.practiceJp}>{s.japanese}</div>
          <button className={styles.practiceToggle} onClick={() => toggle(i)}>
            {revealed.has(i) ? "Hide romaji" : "Show romaji"}
          </button>
          {revealed.has(i) && <div className={styles.practiceRomaji}>{s.romaji}</div>}
          <div className={styles.practiceEn}>{s.english}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── QUIZ ─── */
function QuizSection({ lesson }: { lesson: N5Lesson }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = lesson.quiz;
  const q = quiz[current];

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quiz.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className={styles.quizDone}>
        <div className={styles.quizDoneTitle}>Quiz Complete!</div>
        <div className={styles.quizScore}>
          You got {score} out of {quiz.length} correct.
        </div>
        <button className={styles.quizNext} onClick={handleRestart}>
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizWrap}>
      <div className={styles.quizProgress}>
        Question {current + 1} of {quiz.length}
      </div>
      <div className={styles.quizQuestion}>{q.question}</div>
      <div className={styles.quizOptions}>
        {q.options.map((opt) => {
          let cls = styles.quizOption;
          if (selected) {
            if (opt === q.answer) cls += ` ${styles.quizOptionCorrect}`;
            else if (opt === selected) cls += ` ${styles.quizOptionWrong}`;
          }
          return (
            <button
              key={opt}
              className={cls}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected && (
        <>
          <div className={styles.quizExplanation}>{q.explanation}</div>
          <button className={styles.quizNext} onClick={handleNext}>
            {current + 1 >= quiz.length ? "See Results" : "Next →"}
          </button>
        </>
      )}
    </div>
  );
}
