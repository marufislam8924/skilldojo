import LessonView from "../../components/LessonView";
import { vocabularyLessons, totalVocabularyLessons } from "../../../data/vocabularyLessons";

export function generateStaticParams() {
  return vocabularyLessons.map((item) => ({ lesson: String(item.id) }));
}

export function generateMetadata({ params }) {
  const lessonId = Number(params.lesson);
  const lesson = vocabularyLessons.find((l) => l.id === lessonId) || vocabularyLessons[0];

  return {
    title: `Vocabulary Lesson ${lessonId}: ${lesson.title} – SkillDojo`,
    description: `Learn ${lesson.words.length} Japanese ${lesson.category.toLowerCase()} words with interactive flashcards and pronunciation.`,
    alternates: {
      canonical: `/vocabulary/${lessonId}`,
    },
  };
}

function adaptLesson(lesson) {
  return {
    id: lesson.id,
    kana: lesson.category,
    name: lesson.title,
    chars: lesson.words.map((word) => ({
      k: word.japanese,
      reading: word.japanese,
      r: word.romaji,
      meaning: word.english,
      voice: word.japanese,
    })),
  };
}

export default function VocabularyLessonPage({ params }) {
  const lessonId = Number(params.lesson);
  const raw = vocabularyLessons.find((l) => l.id === lessonId) || vocabularyLessons[0];
  const data = adaptLesson(raw);

  return (
    <LessonView
      lessonId={lessonId}
      data={data}
      courseSlug="vocabulary"
      totalLessons={totalVocabularyLessons}
    />
  );
}
