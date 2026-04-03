const seedKeywords = [
  "learn japanese online free",
  "japanese n5 course",
  "learn japanese for beginners",
  "hiragana and katakana lessons",
  "japanese conversation practice",
  "japanese grammar n5",
  "learn japanese step by step",
  "learn japanese n5 lesson 1",
  "learn japanese n5 lesson 2",
  "hiragana a pronunciation",
  "hiragana ka ki ku ke ko",
  "hiragana chart with audio",
  "japanese greetings conversation",
  "basic japanese conversation for beginners",
  "japanese conversation at restaurant",
  "how to learn japanese fast",
  "how long does it take to learn japanese",
  "best apps to learn japanese",
  "is japanese hard to learn",
  "tips to learn japanese quickly",
];

const expansions = [
  "complete guide",
  "step by step",
  "with examples",
  "for self study",
  "with daily practice plan",
];

const categoryVocabulary = {
  hiragana: [
    { japanese: "あ", romaji: "a", english: "hiragana vowel a" },
    { japanese: "か", romaji: "ka", english: "hiragana consonant ka" },
    { japanese: "き", romaji: "ki", english: "hiragana consonant ki" },
    { japanese: "く", romaji: "ku", english: "hiragana consonant ku" },
  ],
  katakana: [
    { japanese: "ア", romaji: "a", english: "katakana vowel a" },
    { japanese: "カ", romaji: "ka", english: "katakana consonant ka" },
    { japanese: "キ", romaji: "ki", english: "katakana consonant ki" },
    { japanese: "ク", romaji: "ku", english: "katakana consonant ku" },
  ],
  grammar: [
    { japanese: "です", romaji: "desu", english: "polite copula" },
    { japanese: "ます", romaji: "masu", english: "polite verb ending" },
    { japanese: "は", romaji: "wa", english: "topic particle" },
    { japanese: "を", romaji: "wo", english: "object particle" },
  ],
  conversation: [
    { japanese: "こんにちは", romaji: "konnichiwa", english: "hello" },
    { japanese: "おねがいします", romaji: "onegaishimasu", english: "please" },
    { japanese: "すみません", romaji: "sumimasen", english: "excuse me" },
    { japanese: "ありがとうございます", romaji: "arigatou gozaimasu", english: "thank you" },
  ],
  vocabulary: [
    { japanese: "がくせい", romaji: "gakusei", english: "student" },
    { japanese: "せんせい", romaji: "sensei", english: "teacher" },
    { japanese: "べんきょう", romaji: "benkyou", english: "study" },
    { japanese: "にほんご", romaji: "nihongo", english: "Japanese language" },
  ],
  strategy: [
    { japanese: "まいにち", romaji: "mainichi", english: "every day" },
    { japanese: "れんしゅう", romaji: "renshuu", english: "practice" },
    { japanese: "もくひょう", romaji: "mokuhyou", english: "goal" },
    { japanese: "けいぞく", romaji: "keizoku", english: "consistency" },
  ],
};

function toSlug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toTitleCase(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferCategory(keyword) {
  if (keyword.includes("hiragana") && keyword.includes("katakana")) return "katakana";
  if (keyword.includes("hiragana")) return "hiragana";
  if (keyword.includes("katakana")) return "katakana";
  if (keyword.includes("conversation") || keyword.includes("greetings") || keyword.includes("restaurant")) {
    return "conversation";
  }
  if (keyword.includes("grammar")) return "grammar";
  if (keyword.includes("lesson") || keyword.includes("n5") || keyword.includes("course")) return "vocabulary";
  if (keyword.includes("best apps") || keyword.includes("how ") || keyword.includes("tips")) return "strategy";
  return "vocabulary";
}

function getExamples(keyword, category) {
  if (category === "hiragana" || category === "katakana") {
    return [
      { japanese: "あい", romaji: "ai", english: "love" },
      { japanese: "かお", romaji: "kao", english: "face" },
      { japanese: "きく", romaji: "kiku", english: "to listen" },
    ];
  }

  if (category === "conversation") {
    return [
      {
        japanese: "こんにちは。よろしく おねがいします。",
        romaji: "konnichiwa. yoroshiku onegaishimasu.",
        english: "Hello. Nice to meet you.",
      },
      {
        japanese: "これ を おねがいします。",
        romaji: "kore wo onegaishimasu.",
        english: "This one, please.",
      },
      {
        japanese: "すみません、えき は どこ ですか。",
        romaji: "sumimasen, eki wa doko desu ka.",
        english: "Excuse me, where is the station?",
      },
    ];
  }

  if (category === "grammar") {
    return [
      {
        japanese: "わたし は がくせい です。",
        romaji: "watashi wa gakusei desu.",
        english: "I am a student.",
      },
      {
        japanese: "まいにち にほんご を べんきょう します。",
        romaji: "mainichi nihongo wo benkyou shimasu.",
        english: "I study Japanese every day.",
      },
      {
        japanese: "きょう は いそがしい です。",
        romaji: "kyou wa isogashii desu.",
        english: "I am busy today.",
      },
    ];
  }

  return [
    {
      japanese: "にほんご を べんきょう します。",
      romaji: "nihongo wo benkyou shimasu.",
      english: "I study Japanese.",
    },
    {
      japanese: "にちようび に れんしゅう します。",
      romaji: "nichiyoubi ni renshuu shimasu.",
      english: "I practice on Sunday.",
    },
    {
      japanese: "すこし ずつ じょうず に なります。",
      romaji: "sukoshi zutsu jouzu ni narimasu.",
      english: "You improve little by little.",
    },
  ];
}

function getTips(keyword) {
  return [
    "Review this topic for 10 minutes every day.",
    "Say each phrase out loud and record your pronunciation.",
    "Use one sentence from this page in a real conversation.",
    "Track your progress weekly and revisit weak points.",
  ];
}

function makePage(keyword, usedSlugs) {
  const category = inferCategory(keyword);
  const baseSlug = toSlug(keyword);
  let slug = baseSlug;
  let n = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${n}`;
    n += 1;
  }
  usedSlugs.add(slug);

  return {
    slug,
    keyword,
    title: `${toTitleCase(keyword)} - Complete Beginner Guide`,
    description: `Learn ${keyword} with structured lessons, simple explanations, and practical Japanese examples for beginners.`,
    category,
    level: "beginner",
    content: `This page focuses on ${keyword}. You will learn core vocabulary, sentence patterns, and practical tips you can apply immediately. Use this as a step-by-step study reference and combine it with daily practice for faster progress.`,
    vocabulary: categoryVocabulary[category] || categoryVocabulary.vocabulary,
    examples: getExamples(keyword, category),
    tips: getTips(keyword),
    relatedSlugs: [],
  };
}

function buildKeywordPool() {
  const expanded = [];
  for (const keyword of seedKeywords) {
    expanded.push(keyword);
    for (const suffix of expansions) {
      expanded.push(`${keyword} ${suffix}`);
    }
  }
  return expanded;
}

function attachRelated(pages) {
  return pages.map((page) => {
    const related = pages
      .filter((candidate) => candidate.slug !== page.slug && candidate.category === page.category)
      .slice(0, 4)
      .map((candidate) => candidate.slug);

    return {
      ...page,
      relatedSlugs: related,
    };
  });
}

const usedSlugs = new Set();
const pool = buildKeywordPool();
const basePages = pool.map((keyword) => makePage(keyword, usedSlugs));

export const keywordPages = attachRelated(basePages);

export function getKeywordPage(slug) {
  return keywordPages.find((page) => page.slug === slug) || null;
}

export function getAllKeywordSlugs() {
  return keywordPages.map((page) => page.slug);
}
