import Link from "next/link";
import ConversationLesson from "../../components/ConversationLesson";
import {
  conversationLessons,
  getConversationLessonById,
  totalConversationLessons,
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
        <ConversationLesson lesson={lesson} totalLessons={totalConversationLessons} />
      </div>
    </main>
  );
}