import { vocabularyLessons, totalVocabularyWords, getDailyVocabularyLesson } from "../vocabData";

const LEVEL_WORD_LIMITS = {
  N5: 100,
  N4: 200,
  N3: 300,
};

function flattenWords() {
  const words = [];
  let id = 1;
  for (const lesson of vocabularyLessons) {
    for (let i = 0; i < lesson.chars.length; i++) {
      const c = lesson.chars[i];
      words.push({
        id: id++,
        kanji: c.k,
        furigana: c.reading || "",
        romaji: c.r || "",
        meaning_en: c.meaning || "",
        meaning_bn: "",
        example_sentence: c.exampleJa || c.exampleEn || "",
        exampleJaHiragana: c.exampleJaHiragana || null,
        exampleEn: c.exampleEn || null,
        jlpt_level: null,
        lesson_source: lesson.id,
        raw: c,
      });
    }
  }
  return words;
}

function assignLevels(words) {
  const total = words.length;
  const limits = LEVEL_WORD_LIMITS;
  return words.map((w, idx) => {
    const index = idx + 1;
    let level = "N3";
    if (index <= Math.min(limits.N5, total)) level = "N5";
    else if (index <= Math.min(limits.N4, total)) level = "N4";
    else level = "N3";
    return { ...w, jlpt_level: level };
  });
}

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) chunks.push(array.slice(i, i + size));
  return chunks;
}

export function getLessonsForLevel(level = "N5", perLesson = 10) {
  const flat = flattenWords();
  const assigned = assignLevels(flat).filter((w) => w.jlpt_level === level);
  const lessons = chunkArray(assigned, perLesson).map((words, idx) => ({
    lessonNumber: idx + 1,
    title: `${level} Lesson ${idx + 1}`,
    words,
  }));
  return lessons;
}

export function getLesson(level = "N5", lessonNumber = 1, perLesson = 10) {
  const lessons = getLessonsForLevel(level, perLesson);
  return lessons[lessonNumber - 1] || null;
}

export function getWordOfTheDay(date = new Date()) {
  // Use existing helper to get a lesson and pick a random word
  const lesson = getDailyVocabularyLesson(date);
  if (!lesson || !lesson.chars || lesson.chars.length === 0) return null;
  const idx = Math.floor(Math.random() * lesson.chars.length);
  const c = lesson.chars[idx];
  return {
    id: `${lesson.id}-${idx}`,
    kanji: c.k,
    furigana: c.reading || "",
    romaji: c.r || "",
    meaning_en: c.meaning || "",
    example_sentence: c.exampleJa || c.exampleEn || "",
    lesson: lesson.name,
  };
}

export function getAllWords() {
  return assignLevels(flattenWords());
}
