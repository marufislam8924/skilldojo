import type { Metadata } from "next";
import { jlptN5Course } from "../../../../data/jlptN5Course";
import LessonClient from "./LessonClient";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const lessonId = Number(params.id);
  const lesson = jlptN5Course.find((l) => l.id === lessonId);

  if (!lesson) {
    return { title: "Lesson Not Found" };
  }

  return {
    title: `Lesson ${lessonId}: ${lesson.title} — JLPT N5 Course`,
    description: `Study ${lesson.title} (${lesson.titleJapanese}) with vocabulary, grammar patterns, practice sentences, and an interactive quiz. ${lesson.description}`,
    alternates: { canonical: `/courses/n5/${lessonId}` },
    openGraph: {
      title: `Lesson ${lessonId}: ${lesson.title} — JLPT N5 Course`,
      description: lesson.description,
      url: `/courses/n5/${lessonId}`,
      type: "article",
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return <LessonClient params={params} />;
}
