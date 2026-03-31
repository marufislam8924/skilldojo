import { getVocabularyLessonById, totalVocabularyLessons } from '../../../data/vocabularyLessons';
import VocabularyCard from '../../components/VocabularyCard';
import { notFound } from 'next/navigation';

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

export const metadata = {
  title: 'Vocabulary Lesson | SkillDojo',
  description: 'Learn Japanese vocabulary with interactive flashcards',
};

export default function VocabularyLessonPage({ params }: Props) {
  const lesson = getVocabularyLessonById(params.id);

  if (!lesson) {
    notFound();
  }

  return <VocabularyCard lesson={lesson} totalLessons={totalVocabularyLessons} />;
}
