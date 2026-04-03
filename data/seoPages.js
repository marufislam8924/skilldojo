// data/seoPages.js
// SkillDojo — Programmatic SEO data for /learn/[slug] pages

export const seoPages = [
  // ─── HIRAGANA SERIES ──────────────────────────────────────────────────────
  {
    slug: "learn-hiragana-basics",
    title: "Learn Hiragana Basics — Your First Japanese Alphabet",
    description:
      "Start learning Japanese with Hiragana basics. Master the vowel row (あ い う え お) and understand how the Japanese writing system works.",
    category: "hiragana",
    level: "beginner",
    vocabulary: [
      { japanese: "あ", romaji: "a", english: "first hiragana vowel" },
      { japanese: "い", romaji: "i", english: "second hiragana vowel" },
      { japanese: "う", romaji: "u", english: "third hiragana vowel" },
      { japanese: "え", romaji: "e", english: "fourth hiragana vowel" },
      { japanese: "お", romaji: "o", english: "fifth hiragana vowel" },
    ],
    examples: [
      { japanese: "あい", romaji: "ai", english: "love" },
      { japanese: "いえ", romaji: "ie", english: "house" },
      { japanese: "うえ", romaji: "ue", english: "above" },
      { japanese: "あお", romaji: "ao", english: "blue" },
    ],
    tips: [
      "Practice writing each character at least 10 times",
      "Say the sound out loud as you write",
      "Use the SkillDojo flashcards to test yourself",
      "Start reading simple words made only from vowels",
    ],
    content:
      "Hiragana is the foundation of Japanese reading. The five vowels あ (a), い (i), う (u), え (e), お (o) are the first characters every learner should memorize. These vowels appear in every row of the Hiragana chart and form the basis of Japanese pronunciation. Unlike English, Japanese vowels have consistent sounds that never change.",
    relatedSlugs: [
      "learn-hiragana-ka-row",
      "learn-hiragana-sa-row",
      "learn-katakana-basics",
    ],
  },
  {
    slug: "learn-hiragana-ka-row",
    title: "Learn Hiragana KA Row — か き く け こ",
    description:
      "Master the Hiragana KA row with か, き, く, け, こ. Interactive practice with pronunciation guide and example words for JLPT N5.",
    category: "hiragana",
    level: "beginner",
    vocabulary: [
      { japanese: "か", romaji: "ka", english: "KA sound" },
      { japanese: "き", romaji: "ki", english: "KI sound" },
      { japanese: "く", romaji: "ku", english: "KU sound" },
      { japanese: "け", romaji: "ke", english: "KE sound" },
      { japanese: "こ", romaji: "ko", english: "KO sound" },
    ],
    examples: [
      { japanese: "かき", romaji: "kaki", english: "persimmon" },
      { japanese: "きく", romaji: "kiku", english: "chrysanthemum / to listen" },
      { japanese: "くうき", romaji: "kuuki", english: "air" },
      { japanese: "こえ", romaji: "koe", english: "voice" },
    ],
    tips: [
      "か looks like a person cutting something — KA-t",
      "き has two horizontal strokes that look like a KEY",
      "Practice combining vowels with KA row characters",
      "Try writing words: かお (face), きく (listen)",
    ],
    content:
      "The KA row adds the K consonant to each vowel, creating five new characters. This is the second row in the Hiragana chart. Notice how each character combines the K sound with a vowel: か (ka), き (ki), く (ku), け (ke), こ (ko). These characters appear frequently in everyday Japanese words.",
    relatedSlugs: [
      "learn-hiragana-basics",
      "learn-hiragana-sa-row",
      "learn-hiragana-ta-row",
    ],
  },
  {
    slug: "learn-hiragana-sa-row",
    title: "Learn Hiragana SA Row — さ し す せ そ",
    description:
      "Study the Hiragana SA row characters さ, し, す, せ, そ with pronunciation, mnemonics, and JLPT N5 vocabulary words.",
    category: "hiragana",
    level: "beginner",
    vocabulary: [
      { japanese: "さ", romaji: "sa", english: "SA sound" },
      { japanese: "し", romaji: "shi", english: "SHI sound" },
      { japanese: "す", romaji: "su", english: "SU sound" },
      { japanese: "せ", romaji: "se", english: "SE sound" },
      { japanese: "そ", romaji: "so", english: "SO sound" },
    ],
    examples: [
      { japanese: "さくら", romaji: "sakura", english: "cherry blossom" },
      { japanese: "すし", romaji: "sushi", english: "sushi" },
      { japanese: "しお", romaji: "shio", english: "salt" },
      { japanese: "そら", romaji: "sora", english: "sky" },
    ],
    tips: [
      "し (shi) is irregular — it's SHI not SI",
      "す looks like a hook for hanging SU-shi",
      "Practice reading: おすし, おかし (sweets)",
      "Note that し curves to the right, not left",
    ],
    content:
      "The SA row introduces the S consonant. An important exception: し is pronounced 'shi' rather than 'si'. This is one of the first irregular readings in Hiragana. The SA row characters appear in many common Japanese words like さくら (cherry blossom), すし (sushi), and そら (sky).",
    relatedSlugs: [
      "learn-hiragana-ka-row",
      "learn-hiragana-ta-row",
      "learn-hiragana-basics",
    ],
  },
  {
    slug: "learn-hiragana-ta-row",
    title: "Learn Hiragana TA Row — た ち つ て と",
    description:
      "Master the Hiragana TA row with た, ち, つ, て, と. Includes irregular readings chi and tsu, plus example words and writing tips.",
    category: "hiragana",
    level: "beginner",
    vocabulary: [
      { japanese: "た", romaji: "ta", english: "TA sound" },
      { japanese: "ち", romaji: "chi", english: "CHI sound" },
      { japanese: "つ", romaji: "tsu", english: "TSU sound" },
      { japanese: "て", romaji: "te", english: "TE sound" },
      { japanese: "と", romaji: "to", english: "TO sound" },
    ],
    examples: [
      { japanese: "たこ", romaji: "tako", english: "octopus" },
      { japanese: "ちず", romaji: "chizu", english: "map" },
      { japanese: "つき", romaji: "tsuki", english: "moon" },
      { japanese: "てがみ", romaji: "tegami", english: "letter" },
    ],
    tips: [
      "ち is CHI (not TI) — another irregular reading",
      "つ is TSU (not TU) — practice this unique sound",
      "Don't confuse し (shi) and つ (tsu) — they curve differently",
      "Small っ (tsu) doubles the next consonant",
    ],
    content:
      "The TA row has two important irregular readings: ち is 'chi' (not 'ti') and つ is 'tsu' (not 'tu'). These are essential sounds in Japanese. The small っ (tsu) is also used as a consonant doubler — it's one of the most important special characters to learn.",
    relatedSlugs: [
      "learn-hiragana-sa-row",
      "learn-hiragana-na-row",
      "learn-hiragana-basics",
    ],
  },
  {
    slug: "learn-hiragana-na-row",
    title: "Learn Hiragana NA Row — な に ぬ ね の",
    description:
      "Study the Hiragana NA row: な, に, ぬ, ね, の. All regular readings with common JLPT N5 vocabulary and writing practice.",
    category: "hiragana",
    level: "beginner",
    vocabulary: [
      { japanese: "な", romaji: "na", english: "NA sound" },
      { japanese: "に", romaji: "ni", english: "NI sound" },
      { japanese: "ぬ", romaji: "nu", english: "NU sound" },
      { japanese: "ね", romaji: "ne", english: "NE sound" },
      { japanese: "の", romaji: "no", english: "NO sound" },
    ],
    examples: [
      { japanese: "なつ", romaji: "natsu", english: "summer" },
      { japanese: "にく", romaji: "niku", english: "meat" },
      { japanese: "ねこ", romaji: "neko", english: "cat" },
      { japanese: "のみもの", romaji: "nomimono", english: "drink" },
    ],
    tips: [
      "の is one of the most common hiragana — it means 'of/belonging to'",
      "な and ぬ are often confused — practice side by side",
      "ね looks like a snail — NE-ver rushes",
      "All readings in this row are regular (N + vowel)",
    ],
    content:
      "The NA row is fully regular — each character is simply the N consonant plus a vowel. The particle の (no) meaning 'of' or possessive is one of the most frequently used characters in all of Japanese. You'll see it constantly in phrases like にほんのたべもの (Japanese food).",
    relatedSlugs: [
      "learn-hiragana-ta-row",
      "learn-hiragana-basics",
      "learn-katakana-basics",
    ],
  },

  // ─── KATAKANA SERIES ──────────────────────────────────────────────────────
  {
    slug: "learn-katakana-basics",
    title: "Learn Katakana Basics — Japanese Writing System for Foreign Words",
    description:
      "Start learning Katakana, the Japanese alphabet used for foreign words. Master ア イ ウ エ オ and understand when to use Katakana vs Hiragana.",
    category: "katakana",
    level: "beginner",
    vocabulary: [
      { japanese: "ア", romaji: "a", english: "first katakana vowel" },
      { japanese: "イ", romaji: "i", english: "second katakana vowel" },
      { japanese: "ウ", romaji: "u", english: "third katakana vowel" },
      { japanese: "エ", romaji: "e", english: "fourth katakana vowel" },
      { japanese: "オ", romaji: "o", english: "fifth katakana vowel" },
    ],
    examples: [
      { japanese: "アメリカ", romaji: "Amerika", english: "America" },
      { japanese: "イギリス", romaji: "Igirisu", english: "England" },
      { japanese: "エアコン", romaji: "eakon", english: "air conditioner" },
      { japanese: "オレンジ", romaji: "orenji", english: "orange" },
    ],
    tips: [
      "Katakana is mainly used for foreign loanwords",
      "Each katakana has a matching hiragana with the same sound",
      "Katakana strokes are more angular than hiragana",
      "Practice by writing foreign words you know in katakana",
    ],
    content:
      "Katakana is the second Japanese phonetic alphabet. While Hiragana is used for native Japanese words, Katakana is used for foreign loanwords, onomatopoeia, and emphasis. It has the same 46 basic characters as Hiragana, with the same sounds but different shapes. Katakana characters tend to be more angular and geometric.",
    relatedSlugs: [
      "learn-hiragana-basics",
      "learn-katakana-ka-row",
      "japanese-n5-vocabulary-numbers",
    ],
  },
  {
    slug: "learn-katakana-ka-row",
    title: "Learn Katakana KA Row — カ キ ク ケ コ",
    description:
      "Master the Katakana KA row: カ, キ, ク, ケ, コ. Practice with loanwords, pronunciation, and stroke order for JLPT N5.",
    category: "katakana",
    level: "beginner",
    vocabulary: [
      { japanese: "カ", romaji: "ka", english: "KA sound" },
      { japanese: "キ", romaji: "ki", english: "KI sound" },
      { japanese: "ク", romaji: "ku", english: "KU sound" },
      { japanese: "ケ", romaji: "ke", english: "KE sound" },
      { japanese: "コ", romaji: "ko", english: "KO sound" },
    ],
    examples: [
      { japanese: "カメラ", romaji: "kamera", english: "camera" },
      { japanese: "キッチン", romaji: "kicchin", english: "kitchen" },
      { japanese: "クラス", romaji: "kurasu", english: "class" },
      { japanese: "コーヒー", romaji: "koohii", english: "coffee" },
    ],
    tips: [
      "カ looks like the blade of a Ka-tana (sword)",
      "コ is a simple box shape — think of CO-rner",
      "Practice writing loanwords: カレー (curry), ケーキ (cake)",
      "Long vowels in katakana use ー (dash), not double characters",
    ],
    content:
      "The Katakana KA row mirrors the Hiragana KA row in sound but uses different character shapes. Katakana KA row characters are very common because many English K-words have been adopted into Japanese. Learn to recognize カメラ (camera), コーヒー (coffee), and ケーキ (cake).",
    relatedSlugs: [
      "learn-katakana-basics",
      "learn-hiragana-ka-row",
      "learn-katakana-sa-row",
    ],
  },
  {
    slug: "learn-katakana-sa-row",
    title: "Learn Katakana SA Row — サ シ ス セ ソ",
    description:
      "Study Katakana SA row characters サ, シ, ス, セ, ソ. Includes common loanwords, writing tips, and pronunciation practice.",
    category: "katakana",
    level: "beginner",
    vocabulary: [
      { japanese: "サ", romaji: "sa", english: "SA sound" },
      { japanese: "シ", romaji: "shi", english: "SHI sound" },
      { japanese: "ス", romaji: "su", english: "SU sound" },
      { japanese: "セ", romaji: "se", english: "SE sound" },
      { japanese: "ソ", romaji: "so", english: "SO sound" },
    ],
    examples: [
      { japanese: "サラダ", romaji: "sarada", english: "salad" },
      { japanese: "シャツ", romaji: "shatsu", english: "shirt" },
      { japanese: "スポーツ", romaji: "supootsu", english: "sports" },
      { japanese: "ソフト", romaji: "sofuto", english: "soft" },
    ],
    tips: [
      "シ (shi) and ツ (tsu) are the most confused katakana pair",
      "シ has horizontal-ish strokes; ツ has vertical-ish strokes",
      "ソ and ン are also commonly confused — practice together",
      "Write slowly and pay attention to stroke direction",
    ],
    content:
      "The Katakana SA row includes the famously confusing pair シ (shi) and its lookalike ツ (tsu) from the TA row. The trick: in シ, the two small strokes are more horizontal and the long stroke goes from bottom to top. Many common loanwords use SA row characters: サラダ (salad), スポーツ (sports), セーター (sweater).",
    relatedSlugs: [
      "learn-katakana-ka-row",
      "learn-katakana-basics",
      "learn-hiragana-sa-row",
    ],
  },

  // ─── VOCABULARY & GRAMMAR SERIES ──────────────────────────────────────────
  {
    slug: "japanese-n5-vocabulary-numbers",
    title: "Japanese N5 Numbers — Count from 1 to 100 in Japanese",
    description:
      "Learn to count from 1 to 100 in Japanese. Complete number vocabulary list with kanji, hiragana, romaji, and counting patterns for JLPT N5.",
    category: "vocabulary",
    level: "beginner",
    vocabulary: [
      { japanese: "いち", romaji: "ichi", english: "one (1)" },
      { japanese: "に", romaji: "ni", english: "two (2)" },
      { japanese: "さん", romaji: "san", english: "three (3)" },
      { japanese: "よん / し", romaji: "yon / shi", english: "four (4)" },
      { japanese: "ご", romaji: "go", english: "five (5)" },
      { japanese: "ろく", romaji: "roku", english: "six (6)" },
      { japanese: "なな / しち", romaji: "nana / shichi", english: "seven (7)" },
      { japanese: "はち", romaji: "hachi", english: "eight (8)" },
      { japanese: "きゅう / く", romaji: "kyuu / ku", english: "nine (9)" },
      { japanese: "じゅう", romaji: "juu", english: "ten (10)" },
    ],
    examples: [
      { japanese: "にじゅういち", romaji: "nijuuichi", english: "twenty-one (21)" },
      { japanese: "さんじゅう", romaji: "sanjuu", english: "thirty (30)" },
      { japanese: "ひゃく", romaji: "hyaku", english: "hundred (100)" },
      { japanese: "でんわばんごう", romaji: "denwa bangou", english: "phone number" },
    ],
    tips: [
      "4 has two readings: よん (yon) is preferred over し (shi) because し sounds like 'death'",
      "7 has two readings: なな (nana) is more common than しち (shichi)",
      "Numbers 11-19 are simply じゅう (10) + the single digit",
      "Multiples of 10: にじゅう (20), さんじゅう (30), etc.",
    ],
    content:
      "Japanese numbers follow a logical system once you learn 1-10. Numbers 11-19 are formed by saying 10 + digit (じゅういち = 11, じゅうに = 12). Tens are formed by digit + 10 (にじゅう = 20, さんじゅう = 30). Note that 4, 7, and 9 each have two possible readings — context determines which to use.",
    relatedSlugs: [
      "japanese-n5-vocabulary-time",
      "japanese-n5-vocabulary-family",
      "learn-hiragana-basics",
    ],
  },
  {
    slug: "japanese-n5-vocabulary-time",
    title: "Telling Time in Japanese — Hours, Minutes & Time Expressions",
    description:
      "Learn how to tell time in Japanese. Hours (じ), minutes (ふん), and daily time expressions for JLPT N5 with pronunciation.",
    category: "vocabulary",
    level: "beginner",
    vocabulary: [
      { japanese: "いちじ", romaji: "ichiji", english: "one o'clock" },
      { japanese: "にじ", romaji: "niji", english: "two o'clock" },
      { japanese: "さんじ", romaji: "sanji", english: "three o'clock" },
      { japanese: "よじ", romaji: "yoji", english: "four o'clock" },
      { japanese: "ごぜん", romaji: "gozen", english: "AM / morning" },
      { japanese: "ごご", romaji: "gogo", english: "PM / afternoon" },
      { japanese: "いま", romaji: "ima", english: "now" },
      { japanese: "なんじ", romaji: "nanji", english: "what time?" },
    ],
    examples: [
      { japanese: "いま なんじ ですか？", romaji: "ima nanji desu ka?", english: "What time is it now?" },
      { japanese: "ごぜん くじ です", romaji: "gozen kuji desu", english: "It's 9 AM" },
      { japanese: "ごご さんじはん です", romaji: "gogo sanji-han desu", english: "It's 3:30 PM" },
      { japanese: "しちじ に おきます", romaji: "shichiji ni okimasu", english: "I wake up at 7" },
    ],
    tips: [
      "じ (ji) is the counter for hours: いちじ (1 o'clock), にじ (2 o'clock)",
      "ふん/ぷん (fun/pun) is the counter for minutes — the reading changes based on the number",
      "はん (han) means 'half' — さんじはん = 3:30",
      "4 o'clock is よじ (yoji), not しじ or よんじ",
    ],
    content:
      "Telling time in Japanese uses the counter じ (ji) for hours and ふん/ぷん (fun/pun) for minutes. Some hours have irregular readings: 4 o'clock is よじ (not しじ), 7 o'clock is しちじ, and 9 o'clock is くじ. Half past is expressed with はん — so 3:30 is さんじはん.",
    relatedSlugs: [
      "japanese-n5-vocabulary-numbers",
      "japanese-n5-vocabulary-days",
      "japanese-n5-grammar-particles",
    ],
  },
  {
    slug: "japanese-n5-vocabulary-family",
    title: "Japanese Family Words — How to Talk About Family in Japanese",
    description:
      "Learn Japanese family vocabulary for JLPT N5. Two sets of words: humble (own family) and honorific (others' family) with pronunciation.",
    category: "vocabulary",
    level: "beginner",
    vocabulary: [
      { japanese: "おかあさん", romaji: "okaasan", english: "mother (someone else's)" },
      { japanese: "はは", romaji: "haha", english: "mother (own)" },
      { japanese: "おとうさん", romaji: "otousan", english: "father (someone else's)" },
      { japanese: "ちち", romaji: "chichi", english: "father (own)" },
      { japanese: "おにいさん", romaji: "oniisan", english: "older brother (someone else's)" },
      { japanese: "あに", romaji: "ani", english: "older brother (own)" },
      { japanese: "おねえさん", romaji: "oneesan", english: "older sister (someone else's)" },
      { japanese: "あね", romaji: "ane", english: "older sister (own)" },
    ],
    examples: [
      { japanese: "ちち は かいしゃいん です", romaji: "chichi wa kaishain desu", english: "My father is a company employee" },
      { japanese: "おかあさん は おげんき ですか", romaji: "okaasan wa ogenki desu ka", english: "Is your mother well?" },
      { japanese: "あに が います", romaji: "ani ga imasu", english: "I have an older brother" },
      { japanese: "かぞく は ごにん です", romaji: "kazoku wa gonin desu", english: "My family has 5 people" },
    ],
    tips: [
      "Japanese has TWO sets of family words: humble (own) and honorific (others')",
      "Use humble forms when talking about YOUR family to others",
      "Use honorific forms when asking about SOMEONE ELSE's family",
      "かぞく (kazoku) is the general word for 'family'",
    ],
    content:
      "Japanese family vocabulary is unique because there are two forms for each family member: a humble form for your own family and an honorific form for someone else's family. When speaking about your mother to others, use はは (haha). When asking about someone else's mother, use おかあさん (okaasan). This distinction is a core part of Japanese politeness.",
    relatedSlugs: [
      "japanese-n5-vocabulary-numbers",
      "japanese-n5-self-introduction",
      "japanese-n5-grammar-desu",
    ],
  },
  {
    slug: "japanese-n5-vocabulary-days",
    title: "Days of the Week in Japanese — Complete Guide with Kanji",
    description:
      "Learn all seven days of the week in Japanese with kanji, hiragana, romaji, and memory tricks. Essential JLPT N5 vocabulary.",
    category: "vocabulary",
    level: "beginner",
    vocabulary: [
      { japanese: "げつようび", romaji: "getsuyoubi", english: "Monday (moon day)" },
      { japanese: "かようび", romaji: "kayoubi", english: "Tuesday (fire day)" },
      { japanese: "すいようび", romaji: "suiyoubi", english: "Wednesday (water day)" },
      { japanese: "もくようび", romaji: "mokuyoubi", english: "Thursday (wood day)" },
      { japanese: "きんようび", romaji: "kinyoubi", english: "Friday (gold day)" },
      { japanese: "どようび", romaji: "doyoubi", english: "Saturday (earth day)" },
      { japanese: "にちようび", romaji: "nichiyoubi", english: "Sunday (sun day)" },
    ],
    examples: [
      { japanese: "きょう は なんようび ですか", romaji: "kyou wa nanyoubi desu ka", english: "What day is today?" },
      { japanese: "きんようび に いきます", romaji: "kinyoubi ni ikimasu", english: "I will go on Friday" },
      { japanese: "まいしゅう げつようび", romaji: "maishuu getsuyoubi", english: "every Monday" },
      { japanese: "どようび と にちようび は やすみ です", romaji: "doyoubi to nichiyoubi wa yasumi desu", english: "Saturday and Sunday are holidays" },
    ],
    tips: [
      "Each day is named after a natural element: moon, fire, water, wood, gold, earth, sun",
      "ようび (youbi) means 'day of the week' — it's the suffix for all days",
      "Use に after days to mean 'on (that day)': げつようび に = on Monday",
      "きょう (today), あした (tomorrow), きのう (yesterday) are also essential",
    ],
    content:
      "Japanese days of the week follow the classical element system: 月 (moon), 火 (fire), 水 (water), 木 (wood), 金 (gold), 土 (earth), 日 (sun). Each day ends with ようび (youbi). This system is shared with other East Asian languages. Learning the days also teaches you seven important kanji characters.",
    relatedSlugs: [
      "japanese-n5-vocabulary-time",
      "japanese-n5-vocabulary-numbers",
      "japanese-n5-grammar-particles",
    ],
  },

  // ─── GRAMMAR SERIES ───────────────────────────────────────────────────────
  {
    slug: "japanese-n5-grammar-desu",
    title: "Japanese です (Desu) Explained — The Polite Copula",
    description:
      "Understand です (desu) in Japanese. Learn when and how to use this essential polite ending with examples and sentence patterns for JLPT N5.",
    category: "grammar",
    level: "beginner",
    vocabulary: [
      { japanese: "です", romaji: "desu", english: "is / am / are (polite)" },
      { japanese: "ではありません", romaji: "dewa arimasen", english: "is not (polite)" },
      { japanese: "でした", romaji: "deshita", english: "was (polite)" },
      { japanese: "ではありませんでした", romaji: "dewa arimasen deshita", english: "was not (polite)" },
    ],
    examples: [
      { japanese: "わたし は がくせい です", romaji: "watashi wa gakusei desu", english: "I am a student" },
      { japanese: "これ は ほん です", romaji: "kore wa hon desu", english: "This is a book" },
      { japanese: "にほんじん ではありません", romaji: "nihonjin dewa arimasen", english: "I am not Japanese" },
      { japanese: "きのう は あめ でした", romaji: "kinou wa ame deshita", english: "Yesterday was rainy" },
    ],
    tips: [
      "です makes any sentence polite — always use it with strangers",
      "The negative is ではありません or じゃありません (casual)",
      "Past tense: でした (was). Past negative: ではありませんでした",
      "です is used with nouns and な-adjectives, NOT with verbs",
    ],
    content:
      "です (desu) is the polite copula in Japanese, roughly meaning 'is/am/are'. It comes at the end of sentences and is essential for polite speech. Every JLPT N5 student must master its four forms: です (present positive), ではありません (present negative), でした (past positive), and ではありませんでした (past negative).",
    relatedSlugs: [
      "japanese-n5-grammar-particles",
      "japanese-n5-grammar-masu",
      "japanese-n5-self-introduction",
    ],
  },
  {
    slug: "japanese-n5-grammar-particles",
    title: "Japanese Particles は が を に で — Complete JLPT N5 Guide",
    description:
      "Master the five essential Japanese particles: は (wa), が (ga), を (wo), に (ni), で (de). Clear explanations with example sentences for JLPT N5.",
    category: "grammar",
    level: "beginner",
    vocabulary: [
      { japanese: "は", romaji: "wa", english: "topic marker" },
      { japanese: "が", romaji: "ga", english: "subject marker" },
      { japanese: "を", romaji: "wo/o", english: "object marker" },
      { japanese: "に", romaji: "ni", english: "direction / time / location marker" },
      { japanese: "で", romaji: "de", english: "location of action / means marker" },
    ],
    examples: [
      { japanese: "わたし は がくせい です", romaji: "watashi wa gakusei desu", english: "I am a student (topic: I)" },
      { japanese: "ねこ が います", romaji: "neko ga imasu", english: "There is a cat (subject: cat)" },
      { japanese: "パン を たべます", romaji: "pan wo tabemasu", english: "I eat bread (object: bread)" },
      { japanese: "がっこう に いきます", romaji: "gakkou ni ikimasu", english: "I go to school (direction: school)" },
    ],
    tips: [
      "は marks the topic (what the sentence is about)",
      "が marks the subject (who/what does the action)",
      "を marks the direct object (what receives the action)",
      "に marks destination, time, or existence location; で marks where actions happen",
    ],
    content:
      "Japanese particles are small words placed after nouns to show their grammatical role. The five core particles for JLPT N5 are は (topic), が (subject), を (object), に (direction/time/location of existence), and で (location of action/means). Understanding particles is the key to building correct Japanese sentences.",
    relatedSlugs: [
      "japanese-n5-grammar-desu",
      "japanese-n5-grammar-masu",
      "japanese-n5-grammar-adjectives",
    ],
  },
  {
    slug: "japanese-n5-grammar-masu",
    title: "Japanese ます Form — Polite Verb Conjugation for Beginners",
    description:
      "Learn the ます (masu) form for polite Japanese verbs. Covers present, past, negative, and past negative with JLPT N5 verb examples.",
    category: "grammar",
    level: "beginner",
    vocabulary: [
      { japanese: "たべます", romaji: "tabemasu", english: "eat (polite)" },
      { japanese: "のみます", romaji: "nomimasu", english: "drink (polite)" },
      { japanese: "いきます", romaji: "ikimasu", english: "go (polite)" },
      { japanese: "みます", romaji: "mimasu", english: "see / watch (polite)" },
      { japanese: "します", romaji: "shimasu", english: "do (polite)" },
      { japanese: "きます", romaji: "kimasu", english: "come (polite)" },
    ],
    examples: [
      { japanese: "まいにち にほんご を べんきょう します", romaji: "mainichi nihongo wo benkyou shimasu", english: "I study Japanese every day" },
      { japanese: "きのう えいが を みました", romaji: "kinou eiga wo mimashita", english: "I watched a movie yesterday" },
      { japanese: "あした いきません", romaji: "ashita ikimasen", english: "I won't go tomorrow" },
      { japanese: "コーヒー を のみます", romaji: "koohii wo nomimasu", english: "I drink coffee" },
    ],
    tips: [
      "ます = present/future positive (I do / I will do)",
      "ません = present/future negative (I don't / I won't)",
      "ました = past positive (I did)",
      "ませんでした = past negative (I didn't)",
    ],
    content:
      "The ます (masu) form is the backbone of polite Japanese. Every verb has a ます form used in formal and everyday polite conversation. The conjugation pattern is consistent: ます (present), ません (negative), ました (past), ませんでした (past negative). Start by memorizing common verbs in ます form before learning dictionary form.",
    relatedSlugs: [
      "japanese-n5-grammar-desu",
      "japanese-n5-grammar-particles",
      "japanese-n5-grammar-adjectives",
    ],
  },
  {
    slug: "japanese-n5-grammar-adjectives",
    title: "Japanese Adjectives — い and な Adjective Guide for JLPT N5",
    description:
      "Learn the two types of Japanese adjectives: い-adjectives and な-adjectives. Conjugation rules, examples, and practice for JLPT N5.",
    category: "grammar",
    level: "beginner",
    vocabulary: [
      { japanese: "おおきい", romaji: "ookii", english: "big (い-adjective)" },
      { japanese: "ちいさい", romaji: "chiisai", english: "small (い-adjective)" },
      { japanese: "たかい", romaji: "takai", english: "expensive / tall (い-adj)" },
      { japanese: "しずか", romaji: "shizuka", english: "quiet (な-adjective)" },
      { japanese: "きれい", romaji: "kirei", english: "beautiful / clean (な-adj)" },
      { japanese: "げんき", romaji: "genki", english: "energetic / healthy (な-adj)" },
    ],
    examples: [
      { japanese: "この りんご は おおきい です", romaji: "kono ringo wa ookii desu", english: "This apple is big" },
      { japanese: "この へや は しずか です", romaji: "kono heya wa shizuka desu", english: "This room is quiet" },
      { japanese: "あの レストラン は たかくない です", romaji: "ano resutoran wa takakunai desu", english: "That restaurant is not expensive" },
      { japanese: "きれいな はな", romaji: "kireina hana", english: "beautiful flower" },
    ],
    tips: [
      "い-adjectives end in い and conjugate by changing the ending",
      "な-adjectives need な before nouns: しずかな へや (quiet room)",
      "Beware: きれい looks like い-adjective but is actually な-adjective",
      "Negative い: drop い, add くない — おおきい → おおきくない",
    ],
    content:
      "Japanese has two adjective types with different grammar rules. い-adjectives (like おおきい, ちいさい, たかい) end in い and conjugate by changing the ending. な-adjectives (like しずか, きれい, げんき) need な when placed before nouns. A common trap: きれい ends in い but is a な-adjective. Always check which type a new adjective belongs to.",
    relatedSlugs: [
      "japanese-n5-grammar-desu",
      "japanese-n5-grammar-particles",
      "japanese-n5-grammar-masu",
    ],
  },

  // ─── CONVERSATION & PRACTICAL SERIES ──────────────────────────────────────
  {
    slug: "japanese-n5-self-introduction",
    title: "Japanese Self Introduction — 自己紹介 Guide for Beginners",
    description:
      "Learn how to introduce yourself in Japanese. Complete 自己紹介 (jikoshoukai) template with name, nationality, occupation, and hobbies.",
    category: "conversation",
    level: "beginner",
    vocabulary: [
      { japanese: "はじめまして", romaji: "hajimemashite", english: "nice to meet you" },
      { japanese: "わたし は", romaji: "watashi wa", english: "I am (topic)" },
      { japanese: "～から きました", romaji: "~kara kimashita", english: "I came from ~" },
      { japanese: "しゅみ は", romaji: "shumi wa", english: "my hobby is" },
      { japanese: "どうぞ よろしく", romaji: "douzo yoroshiku", english: "please treat me well" },
    ],
    examples: [
      { japanese: "はじめまして。わたし は マリア です。", romaji: "hajimemashite. watashi wa Maria desu.", english: "Nice to meet you. I am Maria." },
      { japanese: "アメリカ から きました", romaji: "Amerika kara kimashita", english: "I came from America" },
      { japanese: "しゅみ は どくしょ です", romaji: "shumi wa dokusho desu", english: "My hobby is reading" },
      { japanese: "どうぞ よろしく おねがいします", romaji: "douzo yoroshiku onegaishimasu", english: "Pleased to meet you (very polite)" },
    ],
    tips: [
      "Start with はじめまして and end with どうぞ よろしく",
      "Mention your name, country, job, and hobby — in that order",
      "Use です for polite statements about yourself",
      "Practice saying it smoothly as one paragraph",
    ],
    content:
      "The Japanese self-introduction (自己紹介, jikoshoukai) follows a standard pattern: greeting, name, origin, occupation, hobby, and closing. This is one of the most practical skills for any beginner because you'll use it every time you meet someone new in Japan. The closing phrase どうぞ よろしく おねがいします is uniquely Japanese and shows respect.",
    relatedSlugs: [
      "japanese-n5-vocabulary-family",
      "japanese-n5-grammar-desu",
      "japanese-n5-ordering-food",
    ],
  },
  {
    slug: "japanese-n5-ordering-food",
    title: "Ordering Food in Japanese — Restaurant Phrases for Beginners",
    description:
      "Learn essential Japanese restaurant phrases. How to order food, ask for the menu, request the check, and common food vocabulary for JLPT N5.",
    category: "conversation",
    level: "beginner",
    vocabulary: [
      { japanese: "メニュー", romaji: "menyuu", english: "menu" },
      { japanese: "おねがいします", romaji: "onegaishimasu", english: "please (requesting)" },
      { japanese: "おすすめ", romaji: "osusume", english: "recommendation" },
      { japanese: "おかいけい", romaji: "okaikei", english: "the check / bill" },
      { japanese: "いただきます", romaji: "itadakimasu", english: "said before eating" },
      { japanese: "ごちそうさまでした", romaji: "gochisousama deshita", english: "said after eating" },
    ],
    examples: [
      { japanese: "すみません、メニュー おねがいします", romaji: "sumimasen, menyuu onegaishimasu", english: "Excuse me, the menu please" },
      { japanese: "これ を おねがいします", romaji: "kore wo onegaishimasu", english: "This one, please" },
      { japanese: "おすすめ は なんですか", romaji: "osusume wa nan desu ka", english: "What do you recommend?" },
      { japanese: "おかいけい おねがいします", romaji: "okaikei onegaishimasu", english: "The check, please" },
    ],
    tips: [
      "Point to the menu and say これ を おねがいします — it always works",
      "いただきます before eating is essential Japanese etiquette",
      "ごちそうさまでした after eating thanks the cook",
      "すみません (excuse me) is how you get a waiter's attention",
    ],
    content:
      "Ordering food in Japanese follows a polite pattern. Get attention with すみません, request the menu, order with を おねがいします, and close with おかいけい おねがいします for the bill. Before eating, say いただきます and after eating, say ごちそうさまでした. These phrases will carry you through any restaurant in Japan.",
    relatedSlugs: [
      "japanese-n5-self-introduction",
      "japanese-n5-shopping-phrases",
      "japanese-n5-grammar-particles",
    ],
  },
  {
    slug: "japanese-n5-shopping-phrases",
    title: "Shopping in Japanese — Essential Phrases for Buying in Japan",
    description:
      "Learn Japanese shopping vocabulary and phrases. How to ask prices, sizes, try things on, and pay at Japanese stores. JLPT N5 level.",
    category: "conversation",
    level: "beginner",
    vocabulary: [
      { japanese: "いくら ですか", romaji: "ikura desu ka", english: "how much is it?" },
      { japanese: "これ", romaji: "kore", english: "this (near me)" },
      { japanese: "それ", romaji: "sore", english: "that (near you)" },
      { japanese: "あれ", romaji: "are", english: "that (over there)" },
      { japanese: "ください", romaji: "kudasai", english: "please give me" },
      { japanese: "カード", romaji: "kaado", english: "card (credit/debit)" },
    ],
    examples: [
      { japanese: "これ は いくら ですか", romaji: "kore wa ikura desu ka", english: "How much is this?" },
      { japanese: "それ を ください", romaji: "sore wo kudasai", english: "Please give me that" },
      { japanese: "カード で いいですか", romaji: "kaado de ii desu ka", english: "Is card OK?" },
      { japanese: "もう すこし やすい の は ありますか", romaji: "mou sukoshi yasui no wa arimasu ka", english: "Do you have something cheaper?" },
    ],
    tips: [
      "これ/それ/あれ (this/that/that over there) are your best friends when shopping",
      "Point and say これ を ください — you don't need to know the item name",
      "いくら ですか works for anything — food, clothes, souvenirs",
      "Practice numbers so you can understand the price answer",
    ],
    content:
      "Shopping in Japan is manageable with just a few key phrases. The demonstrative trio これ (this), それ (that near you), and あれ (that over there) lets you point to anything. Combine with を ください (please give me) or いくら ですか (how much?) and you can navigate any Japanese store. Many stores now accept カード (card) payments.",
    relatedSlugs: [
      "japanese-n5-ordering-food",
      "japanese-n5-vocabulary-numbers",
      "japanese-n5-self-introduction",
    ],
  },
  {
    slug: "japanese-n5-asking-directions",
    title: "Asking Directions in Japanese — Essential Travel Phrases",
    description:
      "Learn to ask and understand directions in Japanese. Left, right, straight, station, and common location phrases for traveling in Japan.",
    category: "conversation",
    level: "beginner",
    vocabulary: [
      { japanese: "みぎ", romaji: "migi", english: "right" },
      { japanese: "ひだり", romaji: "hidari", english: "left" },
      { japanese: "まっすぐ", romaji: "massugu", english: "straight" },
      { japanese: "えき", romaji: "eki", english: "station" },
      { japanese: "どこ", romaji: "doko", english: "where?" },
      { japanese: "ちかく", romaji: "chikaku", english: "nearby" },
    ],
    examples: [
      { japanese: "すみません、えき は どこ ですか", romaji: "sumimasen, eki wa doko desu ka", english: "Excuse me, where is the station?" },
      { japanese: "まっすぐ いって ください", romaji: "massugu itte kudasai", english: "Please go straight" },
      { japanese: "みぎ に まがって ください", romaji: "migi ni magatte kudasai", english: "Please turn right" },
      { japanese: "ここ から とおい ですか", romaji: "koko kara tooi desu ka", english: "Is it far from here?" },
    ],
    tips: [
      "Always start with すみません (excuse me) when asking strangers",
      "どこ ですか (where is?) works for any location",
      "Learn landmarks: こうばん (police box), コンビニ (convenience store), えき (station)",
      "If you don't understand, say もう いちど おねがいします (one more time please)",
    ],
    content:
      "Navigating Japan requires just a few direction words: みぎ (right), ひだり (left), まっすぐ (straight). Combined with ～は どこ ですか (where is ~?) you can find anything. Japanese people are generally very helpful to lost travelers, so don't hesitate to ask. Even a simple すみません with a map will get you help.",
    relatedSlugs: [
      "japanese-n5-shopping-phrases",
      "japanese-n5-ordering-food",
      "japanese-n5-grammar-particles",
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getSeoPage(slug) {
  return seoPages.find((p) => p.slug === slug) || null;
}

export function getAllSeoSlugs() {
  return seoPages.map((p) => p.slug);
}

export function getRelatedPages(slugs) {
  return seoPages.filter((p) => slugs.includes(p.slug));
}

export function getSeoPagesByCategory(category) {
  return seoPages.filter((p) => p.category === category);
}
