"use client";

import Link from "next/link";
import React from "react";

export default function ContinueButton({ href = null }) {
  if (!href) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="text-sm font-semibold">Continue where you left off</div>
        <div className="mt-2 text-gray-500 dark:text-gray-400">No recent module found. Try a new lesson.</div>
        <div className="mt-3">
          <Link href="/hiragana/1" className="inline-flex items-center rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Start a lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="text-sm font-semibold">Continue where you left off</div>
      <div className="mt-2 text-gray-500 dark:text-gray-400">Resume your last module</div>
      <div className="mt-3">
        <Link href={href} className="inline-flex items-center rounded bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
          Continue
        </Link>
      </div>
    </div>
  );
}
