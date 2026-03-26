import { hiraganaLessons } from "../../data";
import LessonView from "../../components/LessonView";

export function generateStaticParams() {
  return hiraganaLessons.map((item) => ({ lesson: String(item.id) }));
}

export function generateMetadata({ params }) {
  const lessonId = Number(params.lesson);
  const data = hiraganaLessons.find((entry) => entry.id === lessonId) || hiraganaLessons[0];

  return {
    title: `Hiragana Lesson ${lessonId}: ${data.name}`,
    description: `Practice Hiragana lesson ${lessonId} (${data.name}) with guided characters and pronunciation support.`,
    alternates: {
      canonical: `/hiragana/${lessonId}`,
    },
  };
}

export default function HiraganaLessonPage({ params }) {
  const lessonId = Number(params.lesson);
  const data = hiraganaLessons.find((l) => l.id === lessonId) || hiraganaLessons[0];

  return (
    <LessonView
      lessonId={lessonId}
      data={data}
      courseSlug="hiragana"
      totalLessons={21}
    />
  );
}
