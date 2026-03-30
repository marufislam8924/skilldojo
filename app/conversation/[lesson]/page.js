import LessonView from "../../components/LessonView";
import {
  conversationLessons,
  getConversationLessonBySlug,
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
  const transformedLesson = {
    id: lesson.id,
    name: lesson.title,
    chars: lesson.conversations.map((item) => ({
      k: item.japanese,
      reading: item.romaji,
      r: item.romaji,
      meaning: item.meaning,
      voice: item.japanese,
      exampleJa: item.japanese,
      exampleJaHiragana: item.romaji,
      exampleEn: item.meaning,
    })),
  };

  return (
    <LessonView
      lessonId={lesson.id}
      data={transformedLesson}
      courseSlug="conversation"
      totalLessons={conversationLessons.length}
      nextLessonHref={nextLesson ? `/conversation/${nextLesson.slug}` : null}
      allLessonsHref="/conversation"
    />
  );
}