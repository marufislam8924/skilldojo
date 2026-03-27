"use client";
import { useRouter } from "next/navigation";
import { conversationLessons, totalConversationLessons } from "../../data/conversationLessons";
import styles from "./conversation.module.css";
import StudentNavAction from "../components/StudentNavAction";

export default function ConversationPage() {
  const router = useRouter();
  const firstLesson = conversationLessons[0];

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
        <div className={styles.navActions}>
          <StudentNavAction className={styles.navLink} dashboardLabel="My Progress" />
          <button className={styles.backBtn} onClick={() => router.push("/")}>
            ← Back
          </button>
        </div>
      </nav>

      <div className={styles.header}>
        <div className={styles.headerTag}>Beginner Course</div>
        <h1 className={styles.headerTitle}>Basic Japanese Conversation</h1>
        <p className={styles.headerDesc}>
          {totalConversationLessons} lessons covering greetings, travel, shopping, and daily life
          with Japanese phrases, romaji support, and tap-to-hear audio.
        </p>
      </div>

      <section className={styles.featuredCard}>
        <div className={styles.featuredMeta}>Start here</div>
        <div className={styles.featuredTop}>
          <div>
            <div className={styles.featuredLessonNum}>Lesson {firstLesson.id}</div>
            <h2 className={styles.featuredTitle}>{firstLesson.title}</h2>
            <p className={styles.featuredDesc}>
              Begin with the most common greetings and introductions used every day in Japan.
            </p>
          </div>
          <button
            className={styles.featuredBtn}
            onClick={() => router.push(`/conversation/${firstLesson.slug}`)}
          >
            Start Here →
          </button>
        </div>
        <div className={styles.featuredPhrases}>
          {firstLesson.conversations.slice(0, 6).map((item) => (
            <div key={item.romaji} className={styles.phraseChip}>
              <span className={styles.phraseJapanese}>{item.japanese}</span>
              <span className={styles.phraseRomaji}>{item.romaji}</span>
              <span className={styles.phraseMeaning}>{item.meaning}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        {conversationLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={styles.lessonCard}
            onClick={() => router.push(`/conversation/${lesson.slug}`)}
          >
            <div className={styles.lessonTopRow}>
              <div className={styles.lessonNum}>Lesson {lesson.id}</div>
              <div className={styles.lessonCount}>{lesson.conversations.length} phrases</div>
            </div>
            <div className={styles.lessonKana}>{lesson.conversations[0].japanese}</div>
            <div className={styles.lessonName}>{lesson.title}</div>
            <div className={styles.lessonChars}>
              {lesson.conversations
                .slice(0, 3)
                .map((c) => c.romaji)
                .join(" · ")}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}