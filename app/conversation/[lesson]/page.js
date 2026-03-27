import Link from "next/link";
import ConversationCard from "../../components/ConversationCard";
import styles from "./lesson.module.css";
import {
  conversationLessons,
  getConversationLessonBySlug,
  totalConversationLessons,
} from "../../../data/conversationLessons";

export function generateStaticParams() {
  return conversationLessons.map((lesson) => ({ lesson: lesson.slug }));
}

export function generateMetadata({ params }) {
  const lesson = getConversationLessonBySlug(params.lesson) || conversationLessons[0];

  return {
    title: `Lesson ${lesson.id} - Basic Japanese Conversation`,
    description: `${lesson.description} Practice ${lesson.conversations.length} beginner Japanese conversation lines with romaji, English meaning, and audio support.`,
    alternates: {
      canonical: `/conversation/${lesson.slug}`,
    },
  };
}

export default function ConversationLessonPage({ params }) {
  const lesson = getConversationLessonBySlug(params.lesson) || conversationLessons[0];
  const nextLesson = conversationLessons.find((item) => item.id === lesson.id + 1);
  const progress = Math.round((lesson.id / totalConversationLessons) * 100);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/conversation" className={styles.backBtn}>
          ← All Lessons
        </Link>
        <span className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </span>
      </nav>

      <div className={styles.content}>
        <div className={styles.lessonHeader}>
          <div className={styles.lessonTag}>
            Basic Conversation · Lesson {lesson.id}
          </div>
          <h1 className={styles.lessonTitle}>{lesson.title}</h1>
          <p className={styles.lessonSubtitle}>
            {lesson.conversations.length} phrases · Tap the speaker to hear each line
          </p>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>
            {lesson.id} / {totalConversationLessons}
          </span>
        </div>

        <div className={styles.cards}>
          {lesson.conversations.map((item, index) => (
            <ConversationCard key={`${lesson.slug}-${index + 1}`} item={item} index={index + 1} />
          ))}
        </div>

        <div className={styles.footer}>
          <div>
            <div className={styles.footerLabel}>Keep Going</div>
            <p className={styles.footerText}>
              Replay the lines, then move to the next lesson.
            </p>
          </div>
          {nextLesson ? (
            <Link href={`/conversation/${nextLesson.slug}`} className={styles.btnNext}>
              Next Lesson →
            </Link>
          ) : (
            <Link href="/conversation" className={styles.btnBack}>
              ← Back to Course
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}