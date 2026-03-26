import LessonView from "../../components/LessonView";
import { vocabularyLessons } from "../../vocabData";

export function generateStaticParams() {
  return vocabularyLessons.map((item) => ({ lesson: String(item.id) }));
}

export function generateMetadata({ params }) {
  const lessonId = Number(params.lesson);
  const data = vocabularyLessons.find((entry) => entry.id === lessonId) || vocabularyLessons[0];

  return {
    title: `JLPT N5 Vocabulary Lesson ${lessonId}: ${data.name}`,
    description: `Study JLPT N5 vocabulary lesson ${lessonId} (${data.name}) with interactive word cards and pronunciation.`,
    alternates: {
      canonical: `/vocab/${lessonId}`,
    },
  };
}

export default function VocabularyLessonPage({ params }) {
  const lessonId = Number(params.lesson);
  const data = vocabularyLessons.find((entry) => entry.id === lessonId) || vocabularyLessons[0];

  return (
    <LessonView
      lessonId={lessonId}
      data={data}
      courseSlug="vocab"
      totalLessons={vocabularyLessons.length}
    />
  );
}