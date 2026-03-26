import { katakanaLessons } from "../../data";
import LessonView from "../../components/LessonView";

export function generateStaticParams() {
  return katakanaLessons.map((item) => ({ lesson: String(item.id) }));
}

export function generateMetadata({ params }) {
  const lessonId = Number(params.lesson);
  const data = katakanaLessons.find((entry) => entry.id === lessonId) || katakanaLessons[0];

  return {
    title: `Katakana Lesson ${lessonId}: ${data.name}`,
    description: `Practice Katakana lesson ${lessonId} (${data.name}) with audio-friendly flashcards and reading drills.`,
    alternates: {
      canonical: `/katakana/${lessonId}`,
    },
  };
}

export default function KatakanaLessonPage({ params }) {
  const lessonId = Number(params.lesson);
  const data = katakanaLessons.find((l) => l.id === lessonId) || katakanaLessons[0];

  return (
    <LessonView
      lessonId={lessonId}
      data={data}
      courseSlug="katakana"
      totalLessons={21}
    />
  );
}
