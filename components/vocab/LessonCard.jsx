"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LessonCard({ level, lesson }) {
  const [progress, setProgress] = useState({ mastered: 0, total: lesson.words.length });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const raw = window.localStorage.getItem('skilldojo.student');
        const session = raw ? JSON.parse(raw) : null;
        const userId = session?.uid || null;

        if (!userId) {
          setProgress({ mastered: 0, total: lesson.words.length });
          return;
        }

        const ids = lesson.words.map((w) => w.id).filter(Boolean);
        if (ids.length === 0) {
          setProgress({ mastered: 0, total: lesson.words.length });
          return;
        }

        const { data, error } = await supabase
          .from('vocabulary_progress')
          .select('word_id,correct_count')
          .eq('user_id', userId)
          .in('word_id', ids);

        if (error) {
          console.warn('progress fetch', error);
          setProgress({ mastered: 0, total: lesson.words.length });
          return;
        }

        const mastered = (data || []).filter((r) => Number(r.correct_count || 0) > 0).length;
        if (mounted) setProgress({ mastered, total: lesson.words.length });
      } catch (e) {
        console.warn(e);
      }
    }

    load();
    return () => { mounted = false; };
  }, [lesson]);

  const percent = Math.round((progress.mastered / Math.max(1, progress.total)) * 100);

  return (
    <Link href={`/vocab/lesson/${level}/${lesson.lessonNumber}`} className="block rounded border border-gray-100 px-3 py-2 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Lesson {lesson.lessonNumber}</div>
          <div className="text-xs text-gray-500">{lesson.words.length} words</div>
        </div>
        <div className="text-sm text-gray-500">{percent}%</div>
      </div>

      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: `${percent}%` }} />
      </div>
    </Link>
  );
}
