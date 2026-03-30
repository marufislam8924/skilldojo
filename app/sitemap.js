import { hiraganaLessons, katakanaLessons } from "./data";
import { vocabularyLessons } from "./vocabData";
import { grammarLessons } from "./grammarData";
import { conversationLessons } from "../data/conversationLessons";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/hiragana",
    "/katakana",
    "/vocab",
    "/grammar",
    "/conversation",
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
    url: `${siteUrl}/conversation/${lesson.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...hiraganaPages,
    ...katakanaPages,
    ...vocabPages,
    ...grammarPages,
    ...conversationPages,
  ];
}