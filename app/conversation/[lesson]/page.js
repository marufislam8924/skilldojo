import Link from "next/link";
import ConversationLesson from "../../components/ConversationLesson";
import {
  conversationLessons,
  getConversationLessonById,
} from "../../../data/conversationLessons";
import styles from "./lesson.module.css";

export function generateStaticParams() {
  return conversationLessons.map((lesson) => ({ lesson: String(lesson.id) }));
}

export function generateMetadata({ params }) {
  const lesson = getConversationLessonById(params.lesson) || conversationLessons[0];

  return {
    title: `Lesson ${lesson.id} - Basic Japanese Conversation`,
    description: `Practice ${lesson.phraseCount} beginner Japanese dialogue lines with romaji, English meaning, speaker turns, and voice playback.`,
    alternates: {
      canonical: `/conversation/${lesson.id}`,
    },
  };
}

export default function ConversationLessonPage({ params }) {
  const lesson = getConversationLessonById(params.lesson) || conversationLessons[0];
  const nextLesson = conversationLessons.find((item) => item.id === lesson.id + 1);

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
        </Link>
        <Link href="/conversation" className={styles.backBtn}>
          ← All Lessons
        </Link>
      </nav>

      <div className={styles.content}>
        <ConversationLesson lesson={lesson} />

        <div className={styles.footer}>
          <div>
            <div className={styles.footerLabel}>Progress</div>
            <div className={styles.footerText}>
              Lesson {lesson.id} of {conversationLessons.length}
            </div>
          </div>

          {nextLesson ? (
            <Link href={`/conversation/${nextLesson.id}`} className={styles.btnNext}>
              Next Lesson →
            </Link>
          ) : (
            <Link href="/conversation" className={styles.btnBack}>
              Back to Lessons
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}