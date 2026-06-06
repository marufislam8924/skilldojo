"use client";

import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-32 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="md:col-span-2 h-32 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-20 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="lg:col-span-1">
          <div className="h-64 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
