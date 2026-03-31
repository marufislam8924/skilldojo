'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { vocabularyLessons } from '../../data/vocabularyLessons';

interface LessonProgress {
  lessonId: number;
  gotIt: number;
  total: number;
  percentage: number;
}

const categoryIcons: Record<string, string> = {
  'Greetings': '👋',
  'Numbers': '🔢',
  'Time': '⏰',
  'People': '👥',
  'Food': '🍜',
  'Body': '💪',
  'Home': '🏠',
  'Transport': '🚂',
  'Shopping': '🛍️',
  'Education': '📚',
  'Nature': '🌳',
  'Animals': '🐾',
  'Adjectives': '✨',
  'Verbs': '🎯',
  'Places': '🗺️',
  'Hobbies': '🎮',
  'Technology': '💻',
  'Culture': '🎌',
  'Grammar': '📝',
};

export default function VocabularyHome() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const progress = useMemo(() => {
    const progressMap: Record<number, LessonProgress> = {};
    vocabularyLessons.forEach(lesson => {
      const key = `vocab_progress_${lesson.id}`;
      const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      const gotIt = stored ? parseInt(stored, 10) : 0;
      const total = lesson.words.length;
      progressMap[lesson.id] = {
        lessonId: lesson.id,
        gotIt,
        total,
        percentage: total > 0 ? Math.round((gotIt / total) * 100) : 0,
      };
    });
    return progressMap;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b-4 border-red-900 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-red-900">Vocabulary Lessons</h1>
              <p className="text-gray-600 mt-1">Master 50 words per lesson</p>
            </div>
            <Link
              href="/student/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="mb-12 p-6 bg-white rounded-2xl shadow-md border-2 border-red-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-red-900">
                {vocabularyLessons.length}
              </div>
              <div className="text-gray-600 text-sm mt-1">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-600">
                {vocabularyLessons.length * 50}
              </div>
              <div className="text-gray-600 text-sm mt-1">Words Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600">
                {Object.values(progress).reduce((sum, p) => sum + p.gotIt, 0)}
              </div>
              <div className="text-gray-600 text-sm mt-1">Learned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-amber-600">
                {Math.round(
                  (Object.values(progress).reduce((sum, p) => sum + p.gotIt, 0) /
                    (vocabularyLessons.length * 50)) *
                    100
                )}
                %
              </div>
              <div className="text-gray-600 text-sm mt-1">Overall Progress</div>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocabularyLessons.map(lesson => {
            const lessonProgress = progress[lesson.id];
            const icon = categoryIcons[lesson.category] || '📖';

            return (
              <Link
                key={lesson.id}
                href={`/vocabulary/${lesson.id}`}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-red-100 hover:border-red-300 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2">
                  {/* Card header with icon and category */}
                  <div className="bg-gradient-to-r from-red-900 to-orange-800 p-6 text-white">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-5xl mb-2">{icon}</div>
                        <h3 className="text-xl font-bold">{lesson.title}</h3>
                        <p className="text-red-100 text-sm mt-1">{lesson.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black opacity-80">
                          {lesson.id}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    {/* Word count */}
                    <div className="mb-6 p-3 bg-amber-50 rounded-xl border-2 border-amber-200">
                      <div className="text-2xl font-black text-amber-900">
                        50 Words
                      </div>
                      <div className="text-sm text-amber-700 mt-1">Japanese vocabulary</div>
                    </div>

                    {/* Progress ring */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">Progress</span>
                        <span className="text-lg font-black text-green-600">
                          {lessonProgress.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border-2 border-gray-300">
                        <div
                          className="bg-gradient-to-r from-green-400 to-emerald-600 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${lessonProgress.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        {lessonProgress.gotIt} / {lessonProgress.total} words mastered
                      </div>
                    </div>

                    {/* Action button */}
                    <button className="w-full py-3 px-4 bg-red-900 hover:bg-red-800 text-white font-bold rounded-xl transition-colors group-hover:shadow-lg">
                      {lessonProgress.percentage === 0
                        ? 'Start Lesson'
                        : lessonProgress.percentage === 100
                        ? 'Review Lesson'
                        : 'Continue'}
                      →
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer message */}
        <div className="mt-16 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 text-center">
          <p className="text-gray-700 text-lg">
            💡 Master all lessons to unlock advanced courses!
          </p>
        </div>
      </div>
    </div>
  );
}
