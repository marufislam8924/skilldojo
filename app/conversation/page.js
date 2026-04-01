"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { conversationLessons, totalConversationLessons } from "../../data/conversationLessons";
import { getStudentProgress } from "../lib/studentProgress";
import styles from "./conversation.module.css";

export default function ConversationPage() {
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const load = () => {
      const progress = getStudentProgress();
      setCompletedLessons(progress?.conversation?.completedLessons || []);
    };
    load();
    window.addEventListener("skilldojo-progress-changed", load);
    return () => window.removeEventListener("skilldojo-progress-changed", load);
  }, []);

  const nextLesson =
    conversationLessons.find((l) => !completedLessons.includes(l.id)) ||
    conversationLessons[0];
  const completedCount = completedLessons.length;

  return (
    <main className={styles.main}>

      <div className={styles.menu}>
        <div className={styles.menuLinks}>
          <Link href="/hiragana" className={styles.menuLink}>Hiragana</Link>
          <Link href="/katakana" className={styles.menuLink}>Katakana</Link>
          <Link href="/vocab" className={styles.menuLink}>Vocabulary</Link>
          <Link href="/grammar" className={styles.menuLink}>Grammar</Link>
          <Link href="/conversation" className={`${styles.menuLink} ${styles.menuLinkActive}`}>Conversation</Link>
          <Link href="/quiz" className={styles.menuLink}>Quiz</Link>
        </div>
        <div className={styles.headerTag}>Beginner Course</div>
        <h1 className={styles.headerTitle}>Basic Japanese Conversation</h1>
        <p className={styles.headerDesc}>
          {totalConversationLessons} lessons covering greetings, travel, shopping, and daily life
          with full dialogues, romaji support, English meaning, and Japanese voice playback.
        </p>
      </div>

      <section className={styles.featuredCard}>
        <div className={styles.featuredMeta}>
          {completedCount > 0
            ? `${completedCount} / ${totalConversationLessons} done · Continue`
            : "Start here"}
        </div>
        <div className={styles.featuredTop}>
          <div>
            <div className={styles.featuredLessonNum}>Lesson {nextLesson.id}</div>
            <h2 className={styles.featuredTitle}>{nextLesson.title}</h2>
            <p className={styles.featuredDesc}>
              {completedCount > 0
                ? "Pick up where you left off with realistic dialogue practice."
                : "Begin with realistic beginner dialogue lines and practice line by line with chat-style conversation bubbles."}
            </p>
          </div>
          <button
            className={styles.featuredBtn}
            onClick={() => router.push(`/conversation/${nextLesson.id}`)}
          >
            {completedCount > 0 ? "Continue →" : "Start Here →"}
          </button>
        </div>
        <div className={styles.featuredPhrases}>
          {nextLesson.dialogue.slice(0, 6).map((item) => (
            <div key={item.romaji} className={styles.phraseChip}>
              <span className={styles.phraseJapanese}>{item.japanese}</span>
              <span className={styles.phraseRomaji}>{item.romaji}</span>
              <span className={styles.phraseMeaning}>
                {item.speaker} · {item.english}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        {conversationLessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`${styles.lessonCard} ${isDone ? styles.lessonCardDone : ""}`}
              onClick={() => router.push(`/conversation/${lesson.id}`)}
            >
              <div className={styles.lessonTopRow}>
                <div className={styles.lessonNum}>Lesson {lesson.id}</div>
                {isDone ? (
                  <div className={styles.doneBadge}>✓ Done</div>
                ) : (
                  <div className={styles.lessonCount}>{lesson.phraseCount} phrases</div>
                )}
              </div>
              <div className={styles.lessonKana}>{lesson.dialogue[0].japanese}</div>
              <div className={styles.lessonName}>{lesson.title}</div>
              <div className={styles.lessonChars}>
                {lesson.dialogue
                  .slice(0, 3)
                  .map((c) => c.romaji)
                  .join(" · ")}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}