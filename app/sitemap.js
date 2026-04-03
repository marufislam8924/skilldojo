import { hiraganaLessons, katakanaLessons } from "./data";
import { vocabularyLessons } from "./vocabData";
import { grammarLessons } from "./grammarData";
import { conversationLessons } from "../data/conversationLessons";
import { quizCategories } from "../data/quizData";
import { vocabularyLessons as vocabStandalone } from "../data/vocabularyLessons";
import { jlptN5Course } from "../data/jlptN5Course";
import { blogPosts } from "../data/blogPosts";
import { seoPages } from "../data/seoPages";
import { keywordPages } from "../data/keywords";
import { hiraganaCharPages } from "../data/hiraganaCharPages";
import { conversationTopicPages } from "../data/conversationTopicPages";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilldojo.vercel.app";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/hiragana",
    "/katakana",
    "/vocab",
    "/vocabulary",
    "/grammar",
    "/conversation",
    "/quiz",
    "/courses/30-days",
    "/courses/n5",
    "/blog",
    "/learn",
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

  const blogPages = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const learnPages = seoPages.map((page) => ({
    url: `${siteUrl}/learn/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const keywordLearnPages = keywordPages.map((page) => ({
    url: `${siteUrl}/learn/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const hiraganaGuidePages = hiraganaCharPages.map((page) => ({
    url: `${siteUrl}/hiragana-guide/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const conversationGuidePages = conversationTopicPages.map((page) => ({
    url: `${siteUrl}/conversation-guide/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const entries = [
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
    ...blogPages,
    ...learnPages,
    ...keywordLearnPages,
    ...hiraganaGuidePages,
    ...conversationGuidePages,
  ];

  const dedupedByUrl = new Map();
  entries.forEach((entry) => {
    dedupedByUrl.set(entry.url, entry);
  });

  return Array.from(dedupedByUrl.values());
}