"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labelOverrides = {
  learn: "Learn",
  vocab: "Vocabulary",
  vocabulary: "Vocabulary",
  quiz: "Quiz",
  grammar: "Grammar",
  hiragana: "Hiragana",
  katakana: "Katakana",
  conversation: "Conversation",
  courses: "Courses",
  student: "Student",
  signin: "Sign In",
  dashboard: "Dashboard",
  blog: "Blog",
  contact: "Contact",
  about: "About",
  terms: "Terms",
  "privacy-policy": "Privacy Policy",
  "learn-japanese-n5": "Learn Japanese N5",
  "jlpt-n5-vocabulary": "JLPT N5 Vocabulary",
  "japanese-basic-conversation": "Japanese Basic Conversation",
  "hiragana-chart": "Hiragana Chart",
  "katakana-chart": "Katakana Chart",
};

function toTitleCase(segment) {
  if (!segment) return "";
  if (labelOverrides[segment]) return labelOverrides[segment];

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return null;
  }

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    return {
      href,
      label: toTitleCase(segment),
      isLast,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="mt-3 mb-2 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-slate-600">
        <li>
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1">
            <span aria-hidden="true" className="text-slate-400">
              /
            </span>
            {crumb.isLast ? (
              <span className="font-semibold text-slate-900" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-slate-900">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
