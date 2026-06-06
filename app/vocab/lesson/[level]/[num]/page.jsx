import VocabLessonShell from '../../../../components/vocab/VocabLessonShell';
import { getLesson } from '../../../../lib/vocabUtils';

export default function LessonPage({ params }) {
  const { level, num } = params;
  const lessonNumber = Number(num || 1);
  const lesson = getLesson(level, lessonNumber, 10);

  if (!lesson) {
    return (
      <main className="py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-xl font-bold">Lesson not found</h1>
          <p className="mt-2 text-sm text-gray-600">This lesson does not exist.</p>
        </div>
      </main>
    );
  }

  const data = {
    name: lesson.title || `${level} Lesson ${lessonNumber}`,
    chars: lesson.words.map((w) => ({
      id: w.id,
      k: w.kanji,
      reading: w.furigana,
      r: w.romaji,
      meaning: w.meaning_en,
      exampleJa: w.example_sentence,
      exampleJaHiragana: w.exampleJaHiragana || "",
      exampleEn: w.exampleEn || "",
      voice: w.furigana || w.kanji,
    })),
  };

  const totalLessons = getLesson(level, 1, 10) ? Math.ceil(getLesson(level, 9999, 10) ? getLesson(level, 9999, 10).length : 0) : 0;

  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl px-4">
        <VocabLessonShell
          level={level}
          lessonNumber={lessonNumber}
          data={data}
          totalLessons={Math.max(1, Math.ceil( (lesson.words.length || 10) ))}
        />
      </div>
    </div>
  );
}
