import GrammarLessonClient from "./GrammarLessonClient";
import { grammarLessons } from "../../grammarData";

export function generateStaticParams() {
  return grammarLessons.map((item) => ({ lesson: String(item.id) }));
}

export function generateMetadata({ params }) {
  const lessonId = Number(params.lesson);
  const data = grammarLessons.find((entry) => entry.id === lessonId) || grammarLessons[0];

  return {
    title: `JLPT N5 Grammar Lesson ${lessonId}: ${data.name}`,
    description: `Practice JLPT N5 grammar lesson ${lessonId} (${data.name}) with interactive flashcards and spoken examples.`,
    alternates: {
      canonical: `/grammar/${lessonId}`,
    },
  };
}

export default function GrammarLessonPage({ params }) {
  const lessonId = Number(params.lesson);
  const data = grammarLessons.find((entry) => entry.id === lessonId) || grammarLessons[0];

  return (
    <GrammarLessonClient
      lessonId={lessonId}
      data={data}
      totalLessons={grammarLessons.length}
    />
  );
}
