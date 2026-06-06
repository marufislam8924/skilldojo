"use client";

import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const links = [
    { href: "/vocab", label: "Vocabulary" },
    { href: "/hiragana", label: "Kana" },
    { href: "/conversation", label: "Conversation" },
    { href: "/quiz", label: "Mock Test" },
  ];

  return (
    <nav className="sticky top-24 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-sm font-semibold">Navigate</h3>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
