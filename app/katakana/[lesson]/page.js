"use client";
import { useParams } from "next/navigation";
import { katakanaLessons } from "../../../data";
import LessonView from "../../../components/LessonView";

export default function KatakanaLessonPage() {
  const { lesson } = useParams();
  const lessonId = parseInt(lesson);
  const data = katakanaLessons.find((l) => l.id === lessonId) || katakanaLessons[0];
  return <LessonView lessonId={lessonId} data={data} courseSlug="katakana" totalLessons={21} />;
}
