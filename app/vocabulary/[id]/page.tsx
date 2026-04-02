import { getVocabularyLessonById, totalVocabularyLessons } from '../../../data/vocabularyLessons';
import VocabularyCard from '../../components/VocabularyCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const ids = Array.from({ length: totalVocabularyLessons }, (_, i) => ({
    id: String(i + 1),
  }));
  return ids;
}

export function generateMetadata({ params }: Props): Metadata {
  const lesson = getVocabularyLessonById(params.id);
  const title = lesson ? `${lesson.title} — Japanese Vocabulary Lesson ${params.id}` : 'Vocabulary Lesson';
  const description = lesson
    ? `Learn ${lesson.title} in Japanese with interactive flashcards, audio pronunciation, and spaced repetition.`
    : 'Learn Japanese vocabulary with interactive flashcards';
  return {
    title,
    description,
    alternates: {
      canonical: `/vocabulary/${params.id}`,
    },
  };
}

export default function VocabularyLessonPage({ params }: Props) {
  const lesson = getVocabularyLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  return <VocabularyCard lesson={lesson} totalLessons={totalVocabularyLessons} />;
}
