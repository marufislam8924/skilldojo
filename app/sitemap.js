import { hiraganaLessons, katakanaLessons } from "./data";
import { vocabularyLessons } from "./vocabData";
import { grammarLessons } from "./grammarData";
import { conversationLessons } from "../data/conversationLessons";
import { quizCategories } from "../data/quizData";
import { vocabularyLessons as vocabStandalone } from "../data/vocabularyLessons";
import { jlptN5Course } from "../data/jlptN5Course";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/hiragana",
    "/katakana",
    "/vocab",
    "/vocabulary",
    "/grammar",
    "/conversation",
    "/quiz",
    "/courses/30-days",
    "/courses/n5",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const hiraganaPages = hiraganaLessons.map((lesson) => ({
    url: `${siteUrl}/hiragana/${lesson.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const katakanaPages = katakanaLessons.map((lesson) => ({
    url: `${siteUrl}/katakana/${lesson.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const vocabPages = vocabularyLessons.map((lesson) => ({
    url: `${siteUrl}/vocab/${lesson.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const grammarPages = grammarLessons.map((lesson) => ({
    url: `${siteUrl}/grammar/${lesson.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const conversationPages = conversationLessons.map((lesson) => ({
    url: `${siteUrl}/conversation/${lesson.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const quizPages = quizCategories.map((cat) => ({
    url: `${siteUrl}/quiz/${cat.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const vocabStandalonePages = vocabStandalone.map((lesson) => ({
    url: `${siteUrl}/vocabulary/${lesson.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const n5Pages = jlptN5Course.map((lesson) => ({
    url: `${siteUrl}/courses/n5/${lesson.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const thirtyDayPages = Array.from({ length: 30 }, (_, i) => ({
    url: `${siteUrl}/courses/30-days/${i + 1}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...hiraganaPages,
    ...katakanaPages,
    ...vocabPages,
    ...grammarPages,
    ...conversationPages,
    ...quizPages,
    ...vocabStandalonePages,
    ...n5Pages,
    ...thirtyDayPages,
  ];
}