"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getContinueLesson } from "../../lib/studentProgress";

type ContinueInfo = {
  courseSlug: string;
  courseLabel: string;
  lessonId: number;
  href: string;
  completedPercent: number;
} | null;

export default function ContinueCard() {
  const [info, setInfo] = useState<ContinueInfo>(null);

  useEffect(() => {
    const refresh = () => setInfo(getContinueLesson());
    refresh();
    window.addEventListener("skilldojo-progress-changed", refresh);
    return () => window.removeEventListener("skilldojo-progress-changed", refresh);
  }, []);

  if (!info) return null;

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Continue Learning</p>
        <h3 className="mt-1 text-xl font-bold text-slate-900">
          Continue {info.courseLabel} Lesson {info.lessonId}
        </h3>
        <p className="mt-2 text-sm text-slate-500">You are {info.completedPercent}% done in this course.</p>
        <Link
          href={info.href}
          className="mt-4 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Continue Lesson {info.lessonId} →
        </Link>
      </section>

      <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
        <Link
          href={info.href}
          className="flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Continue Learning →
        </Link>
      </div>
    </>
  );
}
