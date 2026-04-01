// japaneseIn30Days.ts
// SkillDojo — Japanese in 30 Days Curriculum
// Maps each day to existing lessons across all courses

export interface DayTask {
  course: "hiragana" | "katakana" | "vocab" | "grammar" | "conversation" | "n5" | "quiz";
  lessonId: number;
  title: string;
  label: string;
}

export interface CurriculumDay {
  day: number;
  title: string;
  subtitle: string;
  focus: string;
  tasks: DayTask[];
  tip: string;
}

export const curriculum: CurriculumDay[] = [
  // ─── WEEK 1: Hiragana Foundation ─────────────────────────────────────────
  {
    day: 1,
    title: "First Steps — Hiragana あ Row",
    subtitle: "Your Japanese journey starts here",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 1, title: "Hiragana Row A (あ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 2, title: "Hiragana Row KA (か)", label: "Hiragana" },
    ],
    tip: "Focus on writing each character by hand 10 times. Muscle memory helps retention.",
  },
  {
    day: 2,
    title: "Building Momentum",
    subtitle: "More hiragana rows",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 3, title: "Hiragana Row SA (さ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 4, title: "Hiragana Row TA (た)", label: "Hiragana" },
      { course: "hiragana", lessonId: 5, title: "Hiragana Row NA (な)", label: "Hiragana" },
    ],
    tip: "Review yesterday's characters before starting today. Spaced repetition is key.",
  },
  {
    day: 3,
    title: "Halfway Through Hiragana",
    subtitle: "HA through RA rows",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 6, title: "Hiragana Row HA (は)", label: "Hiragana" },
      { course: "hiragana", lessonId: 7, title: "Hiragana Row MA (ま)", label: "Hiragana" },
      { course: "hiragana", lessonId: 8, title: "Hiragana Row YA (や)", label: "Hiragana" },
    ],
    tip: "Try reading random hiragana from earlier rows to test your recall.",
  },
  {
    day: 4,
    title: "Finishing Core Hiragana",
    subtitle: "RA, WA rows and N",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 9, title: "Hiragana Row RA (ら)", label: "Hiragana" },
      { course: "hiragana", lessonId: 10, title: "Hiragana Row WA (わ) & N (ん)", label: "Hiragana" },
    ],
    tip: "You now know all 46 basic hiragana! Take a moment to celebrate.",
  },
  {
    day: 5,
    title: "Dakuten & Handakuten",
    subtitle: "Voiced sounds in hiragana",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 11, title: "Dakuten GA (が)", label: "Hiragana" },
      { course: "hiragana", lessonId: 12, title: "Dakuten ZA (ざ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 13, title: "Dakuten DA (だ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 14, title: "Dakuten BA (ば) & PA (ぱ)", label: "Hiragana" },
    ],
    tip: "Dakuten (゛) and handakuten (゜) are just marks added to characters you already know.",
  },
  {
    day: 6,
    title: "Combination Sounds",
    subtitle: "Hiragana compound characters",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 15, title: "Combo KYA (きゃ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 16, title: "Combo SHA (しゃ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 17, title: "Combo CHA (ちゃ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 18, title: "Combo NYA (にゃ)", label: "Hiragana" },
    ],
    tip: "Compound sounds combine a consonant row with YA, YU, or YO — learn the pattern, not each individually.",
  },
  {
    day: 7,
    title: "Hiragana Mastery & First Words",
    subtitle: "Finish hiragana + your first vocabulary",
    focus: "hiragana",
    tasks: [
      { course: "hiragana", lessonId: 19, title: "Combo HYA (ひゃ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 20, title: "Combo MYA (みゃ)", label: "Hiragana" },
      { course: "hiragana", lessonId: 21, title: "Combo RYA (りゃ)", label: "Hiragana" },
      { course: "vocab", lessonId: 1, title: "Greetings & Basics", label: "Vocabulary" },
    ],
    tip: "Week 1 done! You can read hiragana. Start learning greetings to use immediately.",
  },

  // ─── WEEK 2: Katakana + Core Vocabulary ──────────────────────────────────
  {
    day: 8,
    title: "Katakana Begins",
    subtitle: "The second alphabet",
    focus: "katakana",
    tasks: [
      { course: "katakana", lessonId: 1, title: "Katakana Row A (ア)", label: "Katakana" },
      { course: "katakana", lessonId: 2, title: "Katakana Row KA (カ)", label: "Katakana" },
      { course: "katakana", lessonId: 3, title: "Katakana Row SA (サ)", label: "Katakana" },
    ],
    tip: "Katakana looks different but covers the same sounds as hiragana. Look for similarities.",
  },
  {
    day: 9,
    title: "Katakana Momentum",
    subtitle: "TA through HA rows",
    focus: "katakana",
    tasks: [
      { course: "katakana", lessonId: 4, title: "Katakana Row TA (タ)", label: "Katakana" },
      { course: "katakana", lessonId: 5, title: "Katakana Row NA (ナ)", label: "Katakana" },
      { course: "katakana", lessonId: 6, title: "Katakana Row HA (ハ)", label: "Katakana" },
    ],
    tip: "Katakana is used for foreign loan words — try reading food menus in katakana!",
  },
  {
    day: 10,
    title: "Katakana Core Complete",
    subtitle: "MA through N + first conversation",
    focus: "katakana",
    tasks: [
      { course: "katakana", lessonId: 7, title: "Katakana Row MA (マ)", label: "Katakana" },
      { course: "katakana", lessonId: 8, title: "Katakana Row YA (ヤ)", label: "Katakana" },
      { course: "katakana", lessonId: 9, title: "Katakana Row RA (ラ)", label: "Katakana" },
      { course: "katakana", lessonId: 10, title: "Katakana Row WA (ワ) & N (ン)", label: "Katakana" },
      { course: "conversation", lessonId: 1, title: "Greetings & Hello", label: "Conversation" },
    ],
    tip: "Practice greeting phrases out loud. Speaking activates different memory pathways.",
  },
  {
    day: 11,
    title: "Katakana Dakuten & Combos",
    subtitle: "Voiced and compound sounds",
    focus: "katakana",
    tasks: [
      { course: "katakana", lessonId: 11, title: "Katakana Dakuten GA (ガ)", label: "Katakana" },
      { course: "katakana", lessonId: 12, title: "Katakana Dakuten ZA (ザ)", label: "Katakana" },
      { course: "katakana", lessonId: 13, title: "Katakana Dakuten DA (ダ)", label: "Katakana" },
      { course: "katakana", lessonId: 14, title: "Katakana Dakuten BA (バ) & PA (パ)", label: "Katakana" },
    ],
    tip: "Same dakuten rules apply — just different letter shapes.",
  },
  {
    day: 12,
    title: "Katakana Compounds & Vocab Boost",
    subtitle: "Finish katakana combinations",
    focus: "katakana",
    tasks: [
      { course: "katakana", lessonId: 15, title: "Katakana Combo KYA (キャ)", label: "Katakana" },
      { course: "katakana", lessonId: 16, title: "Katakana Combo SHA (シャ)", label: "Katakana" },
      { course: "katakana", lessonId: 17, title: "Katakana Combo CHA (チャ)", label: "Katakana" },
      { course: "vocab", lessonId: 2, title: "Family Members", label: "Vocabulary" },
    ],
    tip: "You can now read both Japanese alphabets. Real Japanese text is a mix of both.",
  },
  {
    day: 13,
    title: "Katakana Mastery + Numbers",
    subtitle: "Last katakana combos + essential numbers",
    focus: "katakana",
    tasks: [
      { course: "katakana", lessonId: 18, title: "Katakana Combo NYA (ニャ)", label: "Katakana" },
      { course: "katakana", lessonId: 19, title: "Katakana Combo HYA (ヒャ)", label: "Katakana" },
      { course: "katakana", lessonId: 20, title: "Katakana Combo MYA (ミャ)", label: "Katakana" },
      { course: "katakana", lessonId: 21, title: "Katakana Combo RYA (リャ)", label: "Katakana" },
      { course: "vocab", lessonId: 3, title: "Numbers", label: "Vocabulary" },
    ],
    tip: "Both alphabets done! From here on, it's vocabulary, grammar, and conversation.",
  },
  {
    day: 14,
    title: "Week 2 Wrap — Vocab & Conversation",
    subtitle: "Reinforce with real phrases",
    focus: "vocabulary",
    tasks: [
      { course: "vocab", lessonId: 4, title: "Body Parts", label: "Vocabulary" },
      { course: "vocab", lessonId: 5, title: "Emotions", label: "Vocabulary" },
      { course: "conversation", lessonId: 2, title: "Introductions", label: "Conversation" },
    ],
    tip: "Halfway there! Review any hiragana or katakana you're unsure about during breaks.",
  },

  // ─── WEEK 3: Grammar + Vocabulary Expansion ──────────────────────────────
  {
    day: 15,
    title: "Grammar Foundations",
    subtitle: "Your first grammar patterns",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 1, title: "Copula (です / じゃない)", label: "Grammar" },
      { course: "vocab", lessonId: 6, title: "Sports", label: "Vocabulary" },
    ],
    tip: "Grammar is the glue that holds vocabulary together. Focus on the sentence patterns.",
  },
  {
    day: 16,
    title: "Time & Grammar",
    subtitle: "Talking about when things happen",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 2, title: "Time Expressions", label: "Grammar" },
      { course: "vocab", lessonId: 7, title: "Animals", label: "Vocabulary" },
      { course: "conversation", lessonId: 3, title: "Country Origins", label: "Conversation" },
    ],
    tip: "Try combining today's time expressions with yesterday's grammar to make full sentences.",
  },
  {
    day: 17,
    title: "Verbs & Actions",
    subtitle: "Basic verb patterns",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 3, title: "Basic Verbs", label: "Grammar" },
      { course: "vocab", lessonId: 8, title: "Nature", label: "Vocabulary" },
    ],
    tip: "Japanese verbs always come at the end of the sentence. This is the biggest pattern difference from English.",
  },
  {
    day: 18,
    title: "Describing Things",
    subtitle: "Adjectives and descriptions",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 4, title: "Adjectives (い & な)", label: "Grammar" },
      { course: "vocab", lessonId: 9, title: "Colors", label: "Vocabulary" },
      { course: "conversation", lessonId: 4, title: "Polite Daily Expressions", label: "Conversation" },
    ],
    tip: "い-adjectives and な-adjectives conjugate differently — pay attention to which type each word is.",
  },
  {
    day: 19,
    title: "Particles — The Backbone",
    subtitle: "Essential Japanese particles",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 5, title: "Particles (は, が, を, に, で, へ)", label: "Grammar" },
      { course: "vocab", lessonId: 10, title: "Food & Drink", label: "Vocabulary" },
    ],
    tip: "Particles mark the role of each word in a sentence. Master these and you unlock Japanese sentence structure.",
  },
  {
    day: 20,
    title: "Making Requests",
    subtitle: "Asking and requesting politely",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 6, title: "Requests & Permissions", label: "Grammar" },
      { course: "vocab", lessonId: 11, title: "Clothes", label: "Vocabulary" },
      { course: "conversation", lessonId: 5, title: "Classroom Phrases", label: "Conversation" },
    ],
    tip: "Politeness is essential in Japanese. Always default to polite (ます/です) forms as a beginner.",
  },
  {
    day: 21,
    title: "Comparisons & Connectors",
    subtitle: "Final grammar patterns + review",
    focus: "grammar",
    tasks: [
      { course: "grammar", lessonId: 7, title: "Comparisons", label: "Grammar" },
      { course: "grammar", lessonId: 8, title: "Connectors", label: "Grammar" },
      { course: "vocab", lessonId: 12, title: "Weather", label: "Vocabulary" },
    ],
    tip: "All core N5 grammar complete! You now know enough grammar to form real sentences.",
  },

  // ─── WEEK 4: N5 Course + Review + Quizzes ────────────────────────────────
  {
    day: 22,
    title: "JLPT N5 Prep Begins",
    subtitle: "Structured N5 lessons",
    focus: "n5",
    tasks: [
      { course: "n5", lessonId: 1, title: "N5: Everyday Objects", label: "JLPT N5" },
      { course: "n5", lessonId: 2, title: "N5: Basic Sentence Patterns", label: "JLPT N5" },
      { course: "vocab", lessonId: 13, title: "Travel", label: "Vocabulary" },
    ],
    tip: "N5 lessons combine vocab + grammar + practice. Treat each like a mini-exam prep session.",
  },
  {
    day: 23,
    title: "Numbers, Time & Location",
    subtitle: "N5 practical topics",
    focus: "n5",
    tasks: [
      { course: "n5", lessonId: 3, title: "N5: Numbers, Time & Dates", label: "JLPT N5" },
      { course: "n5", lessonId: 4, title: "N5: Location & Existence", label: "JLPT N5" },
      { course: "vocab", lessonId: 14, title: "House & Home", label: "Vocabulary" },
    ],
    tip: "Numbers and time expressions appear in almost every JLPT N5 listening question.",
  },
  {
    day: 24,
    title: "Food, Verbs & Shopping",
    subtitle: "Real-world N5 scenarios",
    focus: "n5",
    tasks: [
      { course: "n5", lessonId: 5, title: "N5: Food & Drink", label: "JLPT N5" },
      { course: "n5", lessonId: 6, title: "N5: Verb Conjugation Basics", label: "JLPT N5" },
      { course: "vocab", lessonId: 15, title: "School & Work", label: "Vocabulary" },
    ],
    tip: "Verb conjugation is tested heavily on the JLPT. Practice transforming verbs into polite, negative, and past forms.",
  },
  {
    day: 25,
    title: "Reading & Listening Practice",
    subtitle: "N5 comprehension skills",
    focus: "n5",
    tasks: [
      { course: "n5", lessonId: 7, title: "N5: Daily Routine Reading", label: "JLPT N5" },
      { course: "n5", lessonId: 8, title: "N5: Shopping Conversations", label: "JLPT N5" },
      { course: "vocab", lessonId: 16, title: "Daily Routine", label: "Vocabulary" },
    ],
    tip: "When reading, don't translate word-by-word. Try to understand the overall meaning first.",
  },
  {
    day: 26,
    title: "Transport & Self-Introduction",
    subtitle: "Final N5 lessons",
    focus: "n5",
    tasks: [
      { course: "n5", lessonId: 9, title: "N5: Transport & Directions", label: "JLPT N5" },
      { course: "n5", lessonId: 10, title: "N5: Self-Introduction & Greetings", label: "JLPT N5" },
      { course: "vocab", lessonId: 17, title: "Technology", label: "Vocabulary" },
    ],
    tip: "Practice your self-introduction (自己紹介) out loud — it's the most useful real-world exercise.",
  },
  {
    day: 27,
    title: "Quiz Day — Kana Review",
    subtitle: "Test your hiragana and katakana",
    focus: "quiz",
    tasks: [
      { course: "quiz", lessonId: 1, title: "Quiz: Hiragana", label: "Quiz" },
      { course: "quiz", lessonId: 2, title: "Quiz: Katakana", label: "Quiz" },
      { course: "vocab", lessonId: 18, title: "Music & Arts", label: "Vocabulary" },
    ],
    tip: "If you score below 80%, revisit the characters you missed before moving on.",
  },
  {
    day: 28,
    title: "Quiz Day — Vocab & Grammar",
    subtitle: "Test your knowledge",
    focus: "quiz",
    tasks: [
      { course: "quiz", lessonId: 3, title: "Quiz: Vocabulary", label: "Quiz" },
      { course: "quiz", lessonId: 4, title: "Quiz: Grammar", label: "Quiz" },
      { course: "vocab", lessonId: 19, title: "Health & Medicine", label: "Vocabulary" },
    ],
    tip: "Wrong answers are learning opportunities. Read every explanation carefully.",
  },
  {
    day: 29,
    title: "Final Review",
    subtitle: "Comprehensive review day",
    focus: "quiz",
    tasks: [
      { course: "quiz", lessonId: 5, title: "Quiz: Mixed Review", label: "Quiz" },
      { course: "vocab", lessonId: 20, title: "Hobbies & Interests", label: "Vocabulary" },
    ],
    tip: "Go back and redo any lessons where you felt weak. Focus on your trouble spots.",
  },
  {
    day: 30,
    title: "Graduation Day 🎓",
    subtitle: "You did it — celebrate your progress!",
    focus: "conversation",
    tasks: [
      { course: "conversation", lessonId: 1, title: "Review: Greetings & Hello", label: "Conversation" },
      { course: "conversation", lessonId: 2, title: "Review: Introductions", label: "Conversation" },
      { course: "conversation", lessonId: 5, title: "Review: Classroom Phrases", label: "Conversation" },
    ],
    tip: "Congratulations! You've covered hiragana, katakana, 400+ vocabulary words, core N5 grammar, conversation, and quizzes. Keep reviewing and you'll be JLPT N5 ready.",
  },
];
