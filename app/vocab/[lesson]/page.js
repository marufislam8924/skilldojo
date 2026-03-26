"use client";
import { useParams } from "next/navigation";
import LessonView from "../../components/LessonView";
import { vocabularyLessons } from "../../vocabData";

export default function VocabularyLessonPage() {
  const { lesson } = useParams();
  const lessonId = parseInt(lesson, 10);
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