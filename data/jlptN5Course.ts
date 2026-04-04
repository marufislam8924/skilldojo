// jlptN5Course.ts
// SkillDojo — JLPT N5 Prep Course Data

export type Skill = "vocabulary" | "grammar" | "reading" | "listening";

export interface VocabItem {
  japanese: string;
  romaji: string;
  english: string;
}

export interface GrammarPoint {
  pattern: string;
  meaning: string;
  example: {
    japanese: string;
    romaji: string;
    english: string;
  };
}

export interface PracticeSentence {
  japanese: string;
  romaji: string;
  english: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface N5Lesson {
  id: number;
  title: string;
  titleJapanese: string;
  skill: Skill;
  description: string;
  videoUrl?: string;
  videoTitle?: string;
  vocabulary: VocabItem[];
  grammarPoints: GrammarPoint[];
  practiceSentences: PracticeSentence[];
  quiz: QuizQuestion[];
}

export const jlptN5Course: N5Lesson[] = [
  // ─── LESSON 1 ─── Vocabulary ────────────────────────────────────────────────
  {
    id: 1,
    title: "Everyday Objects",
    titleJapanese: "にちじょうのもの",
    skill: "vocabulary",
    description: "Learn essential nouns for everyday objects you'll encounter in JLPT N5 reading and listening sections.",
    vocabulary: [
      { japanese: "本", romaji: "hon", english: "book" },
      { japanese: "電話", romaji: "denwa", english: "telephone" },
      { japanese: "時計", romaji: "tokei", english: "clock / watch" },
      { japanese: "かばん", romaji: "kaban", english: "bag" },
      { japanese: "机", romaji: "tsukue", english: "desk" },
      { japanese: "いす", romaji: "isu", english: "chair" },
      { japanese: "窓", romaji: "mado", english: "window" },
      { japanese: "ドア", romaji: "doa", english: "door" },
      { japanese: "鍵", romaji: "kagi", english: "key" },
      { japanese: "財布", romaji: "saifu", english: "wallet" },
    ],
    grammarPoints: [
      {
        pattern: "これ / それ / あれ",
        meaning: "This / That (near you) / That (over there) — demonstrative pronouns for objects",
        example: {
          japanese: "これは本です。",
          romaji: "Kore wa hon desu.",
          english: "This is a book.",
        },
      },
      {
        pattern: "〜は〜です",
        meaning: "Topic marker + noun predicate. Used to identify or describe things.",
        example: {
          japanese: "あれは時計です。",
          romaji: "Are wa tokei desu.",
          english: "That is a clock.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "これはかばんです。", romaji: "Kore wa kaban desu.", english: "This is a bag." },
      { japanese: "それは私の財布です。", romaji: "Sore wa watashi no saifu desu.", english: "That is my wallet." },
      { japanese: "あの机の上に鍵があります。", romaji: "Ano tsukue no ue ni kagi ga arimasu.", english: "There is a key on that desk." },
      { japanese: "ドアの横に窓があります。", romaji: "Doa no yoko ni mado ga arimasu.", english: "There is a window next to the door." },
    ],
    quiz: [
      {
        question: "What does 時計 (tokei) mean?",
        options: ["Book", "Clock / Watch", "Bag", "Key"],
        answer: "Clock / Watch",
        explanation: "時計 (tokei) means clock or watch — a common N5 vocab word.",
      },
      {
        question: "Which sentence means 'This is a book'?",
        options: ["それは本です。", "あれは本です。", "これは本です。", "ここは本です。"],
        answer: "これは本です。",
        explanation: "これ refers to something close to the speaker. これは本です = This is a book.",
      },
      {
        question: "Choose the correct word for 'wallet'.",
        options: ["さいふ", "かばん", "つくえ", "まど"],
        answer: "さいふ",
        explanation: "財布 (さいふ / saifu) means wallet.",
      },
    ],
  },

  // ─── LESSON 2 ─── Grammar ───────────────────────────────────────────────────
  {
    id: 2,
    title: "Basic Sentence Patterns",
    titleJapanese: "きほんのぶんけい",
    skill: "grammar",
    description: "Master the core sentence patterns tested on JLPT N5: は, が, の, and negation with じゃない/ではありません.",
    vocabulary: [
      { japanese: "学生", romaji: "gakusei", english: "student" },
      { japanese: "先生", romaji: "sensei", english: "teacher" },
      { japanese: "友達", romaji: "tomodachi", english: "friend" },
      { japanese: "日本人", romaji: "nihonjin", english: "Japanese person" },
      { japanese: "会社員", romaji: "kaishain", english: "office worker" },
      { japanese: "医者", romaji: "isha", english: "doctor" },
      { japanese: "名前", romaji: "namae", english: "name" },
      { japanese: "国", romaji: "kuni", english: "country" },
    ],
    grammarPoints: [
      {
        pattern: "〜は〜じゃないです / ではありません",
        meaning: "Negative form: 'is not'. じゃない is casual; ではありません is formal.",
        example: {
          japanese: "私は先生じゃないです。",
          romaji: "Watashi wa sensei ja nai desu.",
          english: "I am not a teacher.",
        },
      },
      {
        pattern: "〜の〜",
        meaning: "Possessive / descriptive connector. Equivalent to 'of' or apostrophe-s.",
        example: {
          japanese: "田中さんの本です。",
          romaji: "Tanaka-san no hon desu.",
          english: "It is Tanaka's book.",
        },
      },
      {
        pattern: "〜か？",
        meaning: "Question marker. Add か to the end of a statement to turn it into a yes/no question.",
        example: {
          japanese: "あなたは学生ですか？",
          romaji: "Anata wa gakusei desu ka?",
          english: "Are you a student?",
        },
      },
    ],
    practiceSentences: [
      { japanese: "私は会社員です。", romaji: "Watashi wa kaishain desu.", english: "I am an office worker." },
      { japanese: "田中さんは医者じゃないです。", romaji: "Tanaka-san wa isha ja nai desu.", english: "Tanaka-san is not a doctor." },
      { japanese: "これは友達の本ですか？", romaji: "Kore wa tomodachi no hon desu ka?", english: "Is this your friend's book?" },
      { japanese: "あなたの名前は何ですか？", romaji: "Anata no namae wa nan desu ka?", english: "What is your name?" },
    ],
    quiz: [
      {
        question: "Which particle marks the topic of a sentence?",
        options: ["が", "の", "は", "を"],
        answer: "は",
        explanation: "は (wa) is the topic marker particle in Japanese.",
      },
      {
        question: "How do you say 'I am not a student' in casual Japanese?",
        options: ["私は学生です。", "私は学生じゃないです。", "私は学生ではありません。", "私は学生がないです。"],
        answer: "私は学生じゃないです。",
        explanation: "じゃないです is the casual negative. ではありません is the formal version.",
      },
      {
        question: "What does 〜の〜 indicate?",
        options: ["Direction", "Possession or description", "Time", "Location"],
        answer: "Possession or description",
        explanation: "の connects two nouns to show possession (友達の本 = friend's book) or description.",
      },
    ],
  },

  // ─── LESSON 3 ─── Vocabulary ────────────────────────────────────────────────
  {
    id: 3,
    title: "Numbers, Time & Dates",
    titleJapanese: "すうじ・じかん・ひづけ",
    skill: "vocabulary",
    description: "Numbers, telling time, and dates are heavily tested in the JLPT N5 listening section.",
    vocabulary: [
      { japanese: "一", romaji: "ichi", english: "one" },
      { japanese: "二", romaji: "ni", english: "two" },
      { japanese: "三", romaji: "san", english: "three" },
      { japanese: "四", romaji: "shi / yon", english: "four" },
      { japanese: "五", romaji: "go", english: "five" },
      { japanese: "十", romaji: "juu", english: "ten" },
      { japanese: "百", romaji: "hyaku", english: "hundred" },
      { japanese: "〜時", romaji: "〜ji", english: "o'clock (hour counter)" },
      { japanese: "〜分", romaji: "〜fun / pun", english: "minute counter" },
      { japanese: "〜月", romaji: "〜gatsu", english: "month counter" },
      { japanese: "〜日", romaji: "〜nichi / ka", english: "day counter" },
      { japanese: "今", romaji: "ima", english: "now" },
    ],
    grammarPoints: [
      {
        pattern: "〜時〜分です",
        meaning: "Telling time: [hour]時[minute]分です",
        example: {
          japanese: "今、三時十分です。",
          romaji: "Ima, sanji juppun desu.",
          english: "It is now 3:10.",
        },
      },
      {
        pattern: "〜月〜日",
        meaning: "Stating a date: [month]月[day]日",
        example: {
          japanese: "今日は四月五日です。",
          romaji: "Kyou wa shigatsu itsuka desu.",
          english: "Today is April 5th.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "今、何時ですか？", romaji: "Ima, nanji desu ka?", english: "What time is it now?" },
      { japanese: "授業は九時に始まります。", romaji: "Jugyou wa kuji ni hajimarimasu.", english: "Class starts at 9 o'clock." },
      { japanese: "誕生日は七月二十日です。", romaji: "Tanjoubi wa shichigatsu hatsuka desu.", english: "My birthday is July 20th." },
      { japanese: "五時半に会いましょう。", romaji: "Goji han ni aimashou.", english: "Let's meet at 5:30." },
    ],
    quiz: [
      {
        question: "How do you read 三時 (3時)?",
        options: ["sanji", "mitsiji", "sanju", "sanju-ji"],
        answer: "sanji",
        explanation: "三時 is read as さんじ (sanji) — 3 o'clock.",
      },
      {
        question: "What counter is used for months?",
        options: ["〜日", "〜時", "〜月", "〜分"],
        answer: "〜月",
        explanation: "〜月 (〜gatsu) is the counter for months. e.g. 四月 = April.",
      },
      {
        question: "How do you say 'It is 7:00' in Japanese?",
        options: ["今は七分です。", "今は七時です。", "今は七日です。", "今は七月です。"],
        answer: "今は七時です。",
        explanation: "七時 (shichiji) means 7 o'clock. 〜時 is the hour counter.",
      },
    ],
  },

  // ─── LESSON 4 ─── Grammar ───────────────────────────────────────────────────
  {
    id: 4,
    title: "Location & Existence",
    titleJapanese: "ばしょとそんざい",
    skill: "grammar",
    description: "Learn あります vs います, location words, and に/で particles — core grammar for N5.",
    vocabulary: [
      { japanese: "上", romaji: "ue", english: "above / on top" },
      { japanese: "下", romaji: "shita", english: "below / under" },
      { japanese: "右", romaji: "migi", english: "right" },
      { japanese: "左", romaji: "hidari", english: "left" },
      { japanese: "前", romaji: "mae", english: "in front" },
      { japanese: "後ろ", romaji: "ushiro", english: "behind" },
      { japanese: "中", romaji: "naka", english: "inside" },
      { japanese: "隣", romaji: "tonari", english: "next to" },
      { japanese: "駅", romaji: "eki", english: "train station" },
      { japanese: "近く", romaji: "chikaku", english: "nearby" },
    ],
    grammarPoints: [
      {
        pattern: "〜に〜があります / います",
        meaning: "あります = exists (inanimate). います = exists (animate: people, animals).",
        example: {
          japanese: "公園に犬がいます。",
          romaji: "Kouen ni inu ga imasu.",
          english: "There is a dog in the park.",
        },
      },
      {
        pattern: "〜の〜に",
        meaning: "Combining location words with の to describe position relative to an object.",
        example: {
          japanese: "机の上に本があります。",
          romaji: "Tsukue no ue ni hon ga arimasu.",
          english: "There is a book on top of the desk.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "駅の近くにコンビニがあります。", romaji: "Eki no chikaku ni konbini ga arimasu.", english: "There is a convenience store near the station." },
      { japanese: "いすの下に猫がいます。", romaji: "Isu no shita ni neko ga imasu.", english: "There is a cat under the chair." },
      { japanese: "銀行はどこですか？郵便局の右です。", romaji: "Ginkou wa doko desu ka? Yuubinkyoku no migi desu.", english: "Where is the bank? It is to the right of the post office." },
      { japanese: "箱の中に何がありますか？", romaji: "Hako no naka ni nani ga arimasu ka?", english: "What is inside the box?" },
    ],
    quiz: [
      {
        question: "Which verb is used for the existence of a living thing (e.g. a cat)?",
        options: ["あります", "います", "です", "あります or います"],
        answer: "います",
        explanation: "います is used for animate things (people, animals). あります is for inanimate objects.",
      },
      {
        question: "What does 隣 (tonari) mean?",
        options: ["Behind", "Under", "Next to", "In front"],
        answer: "Next to",
        explanation: "隣 (tonari) means 'next to' or 'neighboring'.",
      },
      {
        question: "Translate: 'There is a book on the desk.'",
        options: [
          "机の下に本があります。",
          "机の上に本がいます。",
          "机の上に本があります。",
          "机に本があります。",
        ],
        answer: "机の上に本があります。",
        explanation: "上 = on top, あります = exists (inanimate). Full pattern: 〜の上に〜があります.",
      },
    ],
  },

  // ─── LESSON 5 ─── Vocabulary ────────────────────────────────────────────────
  {
    id: 5,
    title: "Food & Drink",
    titleJapanese: "たべものとのみもの",
    skill: "vocabulary",
    description: "Essential food and drink vocabulary commonly tested in JLPT N5 listening and reading passages.",
    vocabulary: [
      { japanese: "ご飯", romaji: "gohan", english: "rice / meal" },
      { japanese: "パン", romaji: "pan", english: "bread" },
      { japanese: "肉", romaji: "niku", english: "meat" },
      { japanese: "魚", romaji: "sakana", english: "fish" },
      { japanese: "野菜", romaji: "yasai", english: "vegetables" },
      { japanese: "水", romaji: "mizu", english: "water" },
      { japanese: "お茶", romaji: "ocha", english: "tea" },
      { japanese: "コーヒー", romaji: "koohii", english: "coffee" },
      { japanese: "たまご", romaji: "tamago", english: "egg" },
      { japanese: "くだもの", romaji: "kudamono", english: "fruit" },
    ],
    grammarPoints: [
      {
        pattern: "〜を食べます / 飲みます",
        meaning: "を marks the direct object. 食べます = eat, 飲みます = drink.",
        example: {
          japanese: "毎朝、ご飯を食べます。",
          romaji: "Maiasa, gohan wo tabemasu.",
          english: "I eat rice every morning.",
        },
      },
      {
        pattern: "〜が好きです / 嫌いです",
        meaning: "Expressing likes and dislikes. が marks the subject of preference.",
        example: {
          japanese: "私はお茶が好きです。",
          romaji: "Watashi wa ocha ga suki desu.",
          english: "I like tea.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "毎日コーヒーを飲みます。", romaji: "Mainichi koohii wo nomimasu.", english: "I drink coffee every day." },
      { japanese: "野菜が好きですか？", romaji: "Yasai ga suki desu ka?", english: "Do you like vegetables?" },
      { japanese: "朝ご飯にパンとたまごを食べました。", romaji: "Asagohan ni pan to tamago wo tabemashita.", english: "I ate bread and eggs for breakfast." },
      { japanese: "くだものの中で、何が好きですか？", romaji: "Kudamono no naka de, nani ga suki desu ka?", english: "Among fruits, what do you like?" },
    ],
    quiz: [
      {
        question: "What does 野菜 (yasai) mean?",
        options: ["Fruit", "Fish", "Vegetables", "Meat"],
        answer: "Vegetables",
        explanation: "野菜 (やさい / yasai) means vegetables.",
      },
      {
        question: "Which particle marks the direct object of 食べます?",
        options: ["は", "が", "に", "を"],
        answer: "を",
        explanation: "を (wo) marks the direct object. e.g. パンを食べます = I eat bread.",
      },
      {
        question: "How do you say 'I like coffee'?",
        options: ["コーヒーは好きです。", "コーヒーが好きです。", "コーヒーを好きです。", "コーヒーに好きです。"],
        answer: "コーヒーが好きです。",
        explanation: "〜が好きです is the correct pattern. が marks the object of the feeling.",
      },
    ],
  },

  // ─── LESSON 6 ─── Grammar ───────────────────────────────────────────────────
  {
    id: 6,
    title: "Verb Conjugation Basics",
    titleJapanese: "どうしのかつよう",
    skill: "grammar",
    description: "Learn ます-form verbs, past tense, and negative forms — the backbone of JLPT N5 grammar.",
    vocabulary: [
      { japanese: "行く", romaji: "iku", english: "to go" },
      { japanese: "来る", romaji: "kuru", english: "to come" },
      { japanese: "食べる", romaji: "taberu", english: "to eat" },
      { japanese: "飲む", romaji: "nomu", english: "to drink" },
      { japanese: "見る", romaji: "miru", english: "to see / watch" },
      { japanese: "する", romaji: "suru", english: "to do" },
      { japanese: "書く", romaji: "kaku", english: "to write" },
      { japanese: "読む", romaji: "yomu", english: "to read" },
    ],
    grammarPoints: [
      {
        pattern: "〜ます / 〜ません",
        meaning: "Polite present affirmative and negative verb forms.",
        example: {
          japanese: "毎日、本を読みます。",
          romaji: "Mainichi, hon wo yomimasu.",
          english: "I read books every day.",
        },
      },
      {
        pattern: "〜ました / 〜ませんでした",
        meaning: "Polite past affirmative and negative verb forms.",
        example: {
          japanese: "昨日、映画を見ました。",
          romaji: "Kinou, eiga wo mimashita.",
          english: "I watched a movie yesterday.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "毎朝、学校に行きます。", romaji: "Maiasa, gakkou ni ikimasu.", english: "I go to school every morning." },
      { japanese: "昨日、手紙を書きました。", romaji: "Kinou, tegami wo kakimashita.", english: "I wrote a letter yesterday." },
      { japanese: "今日は何もしませんでした。", romaji: "Kyou wa nanimo shimasen deshita.", english: "I didn't do anything today." },
      { japanese: "友達が日本から来ます。", romaji: "Tomodachi ga Nihon kara kimasu.", english: "A friend is coming from Japan." },
    ],
    quiz: [
      {
        question: "What is the past polite form of 食べます?",
        options: ["食べません", "食べました", "食べませんでした", "食べる"],
        answer: "食べました",
        explanation: "〜ました is the polite past affirmative. 食べます → 食べました.",
      },
      {
        question: "What does 行きません mean?",
        options: ["I went", "I will go", "I don't go", "I came"],
        answer: "I don't go",
        explanation: "〜ません is the polite negative. 行きません = I don't go / I won't go.",
      },
      {
        question: "Which verb means 'to write'?",
        options: ["読む", "書く", "見る", "する"],
        answer: "書く",
        explanation: "書く (kaku) means 'to write'. 読む = read, 見る = see, する = do.",
      },
    ],
  },

  // ─── LESSON 7 ─── Reading ──────────────────────────────────────────────────
  {
    id: 7,
    title: "Daily Routine Reading",
    titleJapanese: "にちじょうのどっかい",
    skill: "reading",
    description: "Practice reading short passages about daily routines — a common topic in JLPT N5 reading sections.",
    vocabulary: [
      { japanese: "朝", romaji: "asa", english: "morning" },
      { japanese: "昼", romaji: "hiru", english: "noon / daytime" },
      { japanese: "夜", romaji: "yoru", english: "night" },
      { japanese: "起きる", romaji: "okiru", english: "to wake up" },
      { japanese: "寝る", romaji: "neru", english: "to sleep" },
      { japanese: "働く", romaji: "hataraku", english: "to work" },
      { japanese: "勉強する", romaji: "benkyou suru", english: "to study" },
      { japanese: "散歩する", romaji: "sanpo suru", english: "to take a walk" },
    ],
    grammarPoints: [
      {
        pattern: "〜てから",
        meaning: "After doing ~. Connects two sequential actions.",
        example: {
          japanese: "朝ご飯を食べてから、学校に行きます。",
          romaji: "Asagohan wo tabete kara, gakkou ni ikimasu.",
          english: "After eating breakfast, I go to school.",
        },
      },
      {
        pattern: "〜前に / 〜後で",
        meaning: "Before ~ / After ~. Used with nouns or verb dictionary forms.",
        example: {
          japanese: "寝る前に、本を読みます。",
          romaji: "Neru mae ni, hon wo yomimasu.",
          english: "Before sleeping, I read a book.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "毎朝六時に起きます。", romaji: "Maiasa rokuji ni okimasu.", english: "I wake up at 6 every morning." },
      { japanese: "昼ご飯の後で散歩します。", romaji: "Hirugohan no ato de sanpo shimasu.", english: "I take a walk after lunch." },
      { japanese: "夜は勉強してから寝ます。", romaji: "Yoru wa benkyou shite kara nemasu.", english: "At night I study and then sleep." },
      { japanese: "月曜日から金曜日まで働きます。", romaji: "Getsuyoubi kara kinyoubi made hatarakimasu.", english: "I work from Monday to Friday." },
    ],
    quiz: [
      {
        question: "What does 〜てから mean?",
        options: ["Before doing ~", "After doing ~", "While doing ~", "Without doing ~"],
        answer: "After doing ~",
        explanation: "〜てから means 'after doing ~'. It connects two sequential actions.",
      },
      {
        question: "What does 起きる (okiru) mean?",
        options: ["To sleep", "To wake up", "To eat", "To go"],
        answer: "To wake up",
        explanation: "起きる (okiru) means 'to wake up' or 'to get up'.",
      },
      {
        question: "What does 寝る前に mean?",
        options: ["After sleeping", "Before sleeping", "While sleeping", "Instead of sleeping"],
        answer: "Before sleeping",
        explanation: "〜前に means 'before ~'. 寝る前に = before sleeping.",
      },
    ],
  },

  // ─── LESSON 8 ─── Listening ─────────────────────────────────────────────────
  {
    id: 8,
    title: "Shopping Conversations",
    titleJapanese: "かいものの かいわ",
    skill: "listening",
    description: "Practice key phrases and vocabulary for shopping scenarios found in JLPT N5 listening.",
    vocabulary: [
      { japanese: "いくら", romaji: "ikura", english: "how much" },
      { japanese: "高い", romaji: "takai", english: "expensive" },
      { japanese: "安い", romaji: "yasui", english: "cheap" },
      { japanese: "店", romaji: "mise", english: "shop / store" },
      { japanese: "買う", romaji: "kau", english: "to buy" },
      { japanese: "売る", romaji: "uru", english: "to sell" },
      { japanese: "〜つ", romaji: "〜tsu", english: "general counter" },
      { japanese: "〜円", romaji: "〜en", english: "yen (currency)" },
    ],
    grammarPoints: [
      {
        pattern: "〜をください",
        meaning: "Please give me ~. Polite request used in shops.",
        example: {
          japanese: "これをください。",
          romaji: "Kore wo kudasai.",
          english: "Please give me this.",
        },
      },
      {
        pattern: "〜はいくらですか",
        meaning: "How much is ~? Standard phrasing for asking prices.",
        example: {
          japanese: "このかばんはいくらですか？",
          romaji: "Kono kaban wa ikura desu ka?",
          english: "How much is this bag?",
        },
      },
    ],
    practiceSentences: [
      { japanese: "すみません、これはいくらですか？", romaji: "Sumimasen, kore wa ikura desu ka?", english: "Excuse me, how much is this?" },
      { japanese: "それは三百円です。", romaji: "Sore wa sanbyaku en desu.", english: "That is 300 yen." },
      { japanese: "りんごを三つください。", romaji: "Ringo wo mittsu kudasai.", english: "Please give me three apples." },
      { japanese: "少し高いですね。安いのはありますか？", romaji: "Sukoshi takai desu ne. Yasui no wa arimasu ka?", english: "It's a bit expensive. Do you have a cheaper one?" },
    ],
    quiz: [
      {
        question: "How do you ask 'How much is this?' in Japanese?",
        options: ["これは何ですか？", "これはどこですか？", "これはいくらですか？", "これはだれですか？"],
        answer: "これはいくらですか？",
        explanation: "いくら means 'how much'. これはいくらですか = How much is this?",
      },
      {
        question: "What does 〜をください mean?",
        options: ["Please look at ~", "Please give me ~", "Please eat ~", "Please buy ~"],
        answer: "Please give me ~",
        explanation: "〜をください is a polite request meaning 'please give me ~'.",
      },
      {
        question: "What does 安い (yasui) mean?",
        options: ["Expensive", "Heavy", "Cheap", "New"],
        answer: "Cheap",
        explanation: "安い (yasui) means cheap or inexpensive. The opposite is 高い (takai).",
      },
    ],
  },

  // ─── LESSON 9 ─── Reading ──────────────────────────────────────────────────
  {
    id: 9,
    title: "Transport & Directions",
    titleJapanese: "こうつうとみちあんない",
    skill: "reading",
    description: "Read and understand signs, directions, and transport-related passages for JLPT N5.",
    vocabulary: [
      { japanese: "電車", romaji: "densha", english: "train" },
      { japanese: "バス", romaji: "basu", english: "bus" },
      { japanese: "タクシー", romaji: "takushii", english: "taxi" },
      { japanese: "まっすぐ", romaji: "massugu", english: "straight ahead" },
      { japanese: "右に曲がる", romaji: "migi ni magaru", english: "turn right" },
      { japanese: "左に曲がる", romaji: "hidari ni magaru", english: "turn left" },
      { japanese: "乗る", romaji: "noru", english: "to ride / get on" },
      { japanese: "降りる", romaji: "oriru", english: "to get off" },
    ],
    grammarPoints: [
      {
        pattern: "〜で行きます",
        meaning: "Go by (means of transport). で marks the means or method.",
        example: {
          japanese: "電車で会社に行きます。",
          romaji: "Densha de kaisha ni ikimasu.",
          english: "I go to work by train.",
        },
      },
      {
        pattern: "〜を出て〜",
        meaning: "Leave ~ and (then). Used to give sequential directions.",
        example: {
          japanese: "駅を出て右に曲がってください。",
          romaji: "Eki wo dete migi ni magatte kudasai.",
          english: "Leave the station and turn right.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "すみません、駅はどこですか？", romaji: "Sumimasen, eki wa doko desu ka?", english: "Excuse me, where is the station?" },
      { japanese: "まっすぐ行って、二つ目の角を左に曲がってください。", romaji: "Massugu itte, futatsu-me no kado wo hidari ni magatte kudasai.", english: "Go straight and turn left at the second corner." },
      { japanese: "バスに乗って、三つ目で降りてください。", romaji: "Basu ni notte, mittsu-me de orite kudasai.", english: "Get on the bus and get off at the third stop." },
      { japanese: "ここからタクシーで十分です。", romaji: "Koko kara takushii de juppun desu.", english: "It's 10 minutes by taxi from here." },
    ],
    quiz: [
      {
        question: "Which particle marks the means of transport?",
        options: ["に", "で", "を", "は"],
        answer: "で",
        explanation: "で marks the means or method. 電車で = by train.",
      },
      {
        question: "What does まっすぐ mean?",
        options: ["Turn left", "Turn right", "Straight ahead", "Go back"],
        answer: "Straight ahead",
        explanation: "まっすぐ (massugu) means 'straight ahead'.",
      },
      {
        question: "What does 降りる (oriru) mean?",
        options: ["To ride", "To walk", "To get off", "To get on"],
        answer: "To get off",
        explanation: "降りる (oriru) means 'to get off'. The opposite is 乗る (noru) = to get on.",
      },
    ],
  },

  // ─── LESSON 10 ─── Listening ────────────────────────────────────────────────
  {
    id: 10,
    title: "Self-Introduction & Greetings",
    titleJapanese: "じこしょうかいとあいさつ",
    skill: "listening",
    description: "Master self-introductions and common greetings — essential for JLPT N5 listening comprehension.",
    vocabulary: [
      { japanese: "はじめまして", romaji: "hajimemashite", english: "nice to meet you" },
      { japanese: "よろしくお願いします", romaji: "yoroshiku onegaishimasu", english: "pleased to meet you (formal)" },
      { japanese: "出身", romaji: "shusshin", english: "hometown / origin" },
      { japanese: "趣味", romaji: "shumi", english: "hobby" },
      { japanese: "仕事", romaji: "shigoto", english: "job / work" },
      { japanese: "家族", romaji: "kazoku", english: "family" },
      { japanese: "お元気ですか", romaji: "ogenki desu ka", english: "how are you?" },
      { japanese: "ありがとうございます", romaji: "arigatou gozaimasu", english: "thank you (formal)" },
    ],
    grammarPoints: [
      {
        pattern: "〜と申します / 〜です",
        meaning: "My name is ~. と申します is very formal; 〜です is standard polite.",
        example: {
          japanese: "田中と申します。",
          romaji: "Tanaka to moushimasu.",
          english: "My name is Tanaka.",
        },
      },
      {
        pattern: "〜から来ました",
        meaning: "I came from ~. Used to state where you are from.",
        example: {
          japanese: "アメリカから来ました。",
          romaji: "Amerika kara kimashita.",
          english: "I came from America.",
        },
      },
    ],
    practiceSentences: [
      { japanese: "はじめまして。田中です。よろしくお願いします。", romaji: "Hajimemashite. Tanaka desu. Yoroshiku onegaishimasu.", english: "Nice to meet you. I'm Tanaka. Pleased to meet you." },
      { japanese: "出身はどこですか？東京です。", romaji: "Shusshin wa doko desu ka? Tokyo desu.", english: "Where are you from? I'm from Tokyo." },
      { japanese: "趣味は何ですか？音楽を聴くことです。", romaji: "Shumi wa nan desu ka? Ongaku wo kiku koto desu.", english: "What is your hobby? It's listening to music." },
      { japanese: "お元気ですか？はい、元気です。", romaji: "Ogenki desu ka? Hai, genki desu.", english: "How are you? Yes, I'm fine." },
    ],
    quiz: [
      {
        question: "What does はじめまして mean?",
        options: ["Goodbye", "Thank you", "Nice to meet you", "Excuse me"],
        answer: "Nice to meet you",
        explanation: "はじめまして is used when meeting someone for the first time.",
      },
      {
        question: "How do you say 'I came from Japan'?",
        options: ["日本に行きました。", "日本から来ました。", "日本で来ました。", "日本を来ました。"],
        answer: "日本から来ました。",
        explanation: "〜から来ました = I came from ~. から marks the point of origin.",
      },
      {
        question: "What does 趣味 (shumi) mean?",
        options: ["Job", "Family", "Hobby", "Name"],
        answer: "Hobby",
        explanation: "趣味 (shumi) means hobby or interest.",
      },
    ],
  },
];
