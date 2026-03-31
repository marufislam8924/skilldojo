'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { VocabularyLesson, VocabularyWord } from '../../data/vocabularyLessons';
import { markLessonComplete } from '../lib/studentProgress';

interface VocabularyCardProps {
  lesson: VocabularyLesson;
  totalLessons: number;
}

interface ResultCounts {
  gotIt: number;
  review: number;
  dontKnow: number;
}

export default function VocabularyCard({ lesson, totalLessons }: VocabularyCardProps) {
  const router = useRouter();
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState<ResultCounts>({ gotIt: 0, review: 0, dontKnow: 0 });
  const [speaking, setSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesisUtterance | null>(null);

  const current = lesson.words[cardIndex];
  const progress = Math.round(((cardIndex + 1) / lesson.words.length) * 100);
  const score = results.gotIt;
  const total = lesson.words.length;

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      // Try to find a Japanese voice
      const voices = window.speechSynthesis.getVoices();
      const jpVoice = voices.find(
        v => v.lang.startsWith('ja') || v.name.includes('Japanese')
      );
      if (jpVoice) utterance.voice = jpVoice;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);

      synth.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const handleFlip = () => {
    setFlipped(true);
    if (!speaking) {
      speak(current.japanese);
    }
  };

  const handleResult = (type: 'gotIt' | 'review' | 'dontKnow') => {
    const newResults = { ...results };
    newResults[type]++;

    if (cardIndex === lesson.words.length - 1) {
      // Last card - show summary
      setResults(newResults);
      setDone(true);
      markLessonComplete('vocabulary', lesson.id, results.gotIt, total);
    } else {
      // Move to next card
      setResults(newResults);
      setCardIndex(cardIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      setFlipped(false);
    }
  };

  const handleNext = () => {
    if (cardIndex < lesson.words.length - 1) {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
    }
  };

  const handleRestart = () => {
    setCardIndex(0);
    setFlipped(false);
    setDone(false);
    setResults({ gotIt: 0, review: 0, dontKnow: 0 });
  };

  const handleNextLesson = () => {
    const nextLessonId = lesson.id + 1;
    if (nextLessonId <= totalLessons) {
      router.push(`/vocabulary/${nextLessonId}`);
    } else {
      router.push('/vocabulary');
    }
  };

  // Done screen
  if (done) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Lesson Complete!</h1>
            <p className="text-gray-600">{lesson.title}</p>
          </div>

          {/* Score Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-4 border-blue-200">
            <div className="text-center mb-8">
              <div className="text-6xl mb-2">🏆</div>
              <p className="text-4xl font-bold text-blue-900 mb-2">
                {results.gotIt} / {total}
              </p>
              <p className="text-gray-600 text-lg">You got it!</p>
            </div>

            {/* Results breakdown */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border-2 border-green-200">
                <span className="text-lg">✅ Got it</span>
                <span className="text-2xl font-bold text-green-600">{results.gotIt}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <span className="text-lg">🔁 Review again</span>
                <span className="text-2xl font-bold text-yellow-600">{results.review}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border-2 border-red-200">
                <span className="text-lg">❌ Don't know</span>
                <span className="text-2xl font-bold text-red-600">{results.dontKnow}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRestart}
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-colors"
              >
                Practice Again
              </button>
              {lesson.id < totalLessons && (
                <button
                  onClick={handleNextLesson}
                  className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg rounded-xl transition-colors"
                >
                  Next Lesson →
                </button>
              )}
              <button
                onClick={() => router.push('/vocabulary')}
                className="w-full py-4 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-lg rounded-xl transition-colors"
              >
                All Lessons
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-4 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{lesson.title}</h1>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-600">
            {cardIndex + 1} / {lesson.words.length}
          </span>
          <span className="text-sm font-semibold text-gray-600">{results.gotIt} correct</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main card container */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div
          className="w-full max-w-md h-80 cursor-pointer perspective"
          onClick={handleFlip}
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className="relative w-full h-full transition-transform duration-500 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front - Japanese */}
            <div
              className="absolute w-full h-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-blue-200"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">
                Japanese
              </p>
              <p className="text-5xl font-bold text-blue-900 text-center mb-8 leading-relaxed">
                {current.japanese}
              </p>
              <p className="text-lg text-gray-600 text-center italic">{current.romaji}</p>
              <p className="text-sm text-gray-400 mt-6">Tap to flip</p>
            </div>

            {/* Back - English */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center border-4 border-green-300"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <p className="text-sm text-white mb-4 uppercase tracking-wider font-semibold opacity-90">
                English
              </p>
              <p className="text-4xl font-bold text-white text-center mb-6 leading-relaxed">
                {current.english}
              </p>
              <p className="text-sm text-white text-center opacity-75">{current.romaji}</p>
              <p className="text-sm text-white mt-6 opacity-70">Tap to show Japanese</p>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker button */}
      {flipped && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => speak(current.japanese)}
            disabled={speaking}
            className={`p-4 rounded-full transition-all ${
              speaking
                ? 'bg-yellow-400 text-white scale-110'
                : 'bg-white border-2 border-blue-400 text-blue-600 hover:bg-blue-50'
            }`}
          >
            <span className="text-3xl">🔊</span>
          </button>
        </div>
      )}

      {/* Action buttons - only show after flip */}
      {flipped && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => handleResult('dontKnow')}
            className="py-4 px-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors text-sm sm:text-base"
          >
            ❌<br />
            Don't Know
          </button>
          <button
            onClick={() => handleResult('review')}
            className="py-4 px-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-colors text-sm sm:text-base"
          >
            🔁<br />
            Review
          </button>
          <button
            onClick={() => handleResult('gotIt')}
            className="py-4 px-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm sm:text-base"
          >
            ✅<br />
            Got It
          </button>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handlePrevious}
          disabled={cardIndex === 0}
          className={`py-3 px-6 font-bold rounded-xl transition-colors ${
            cardIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border-2 border-blue-400 text-blue-600 hover:bg-blue-50'
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={cardIndex === lesson.words.length - 1}
          className={`py-3 px-6 font-bold rounded-xl transition-colors ${
            cardIndex === lesson.words.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border-2 border-blue-400 text-blue-600 hover:bg-blue-50'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
