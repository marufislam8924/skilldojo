"use client";
import { useParams } from "next/navigation";
import { hiraganaLessons } from "../../data";
import LessonView from "../../components/LessonView";

export default function HiraganaLessonPage() {
  const { lesson } = useParams();
  const lessonId = parseInt(lesson);
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
