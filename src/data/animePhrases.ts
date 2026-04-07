export interface AnimePhrase {
  id: number;
  japanese: string;
  romaji: string;
  english: string;
  context: string;
  animeExample?: string;
}

export interface AnimePhraseLesson {
  id: number;
  title: string;
  description: string;
  emoji: string;
  phrases: AnimePhrase[];
}

type AnimePhraseCourse = {
  title: string;
  description: string;
  totalPhrases: number;
  lessons: AnimePhraseLesson[];
};

type AnimePhraseStem = Omit<AnimePhrase, "id">;

type AnimePhraseVariant = {
  japaneseSuffix: string;
  romajiSuffix: string;
  englishNote: string;
  contextNote: string;
};

type AnimePhraseLessonSeed = {
  title: string;
  description: string;
  emoji: string;
  variants: AnimePhraseVariant[];
  stems: AnimePhraseStem[];
};

const animeExamples = [
  "Naruto, My Hero Academia",
  "Demon Slayer, Jujutsu Kaisen",
  "Attack on Titan, Fullmetal Alchemist: Brotherhood",
  "One Piece, Bleach",
  "Death Note, Code Geass",
  "Spy x Family, Kaguya-sama: Love Is War",
  "Haikyu!!, Blue Lock",
  "Dragon Ball Z, One Punch Man",
  "Steins;Gate, Re:ZERO",
  "Tokyo Revengers, Black Clover",
] as const;

const reactionVariants: AnimePhraseVariant[] = [
  {
    japaneseSuffix: "",
    romajiSuffix: "",
    englishNote: "",
    contextNote: "",
  },
];

const doubtVariants: AnimePhraseVariant[] = [
  {
    japaneseSuffix: "",
    romajiSuffix: "",
    englishNote: "",
    contextNote: "",
  },
];

const battleVariants: AnimePhraseVariant[] = [
  {
    japaneseSuffix: "",
    romajiSuffix: "",
    englishNote: "",
    contextNote: "",
  },
];

const lessonSeeds: AnimePhraseLessonSeed[] = [
  {
    title: "Greetings & Basic Reactions",
    description: "Daily greetings and short reactions heard across slice-of-life and shonen anime.",
    emoji: "👋",
    variants: reactionVariants,
    stems: [
      {
        japanese: "おはよう",
        romaji: "ohayou",
        english: "Good morning",
        context: "Used in the morning when meeting classmates, family, or teammates.",
      },
      {
        japanese: "こんにちは",
        romaji: "konnichiwa",
        english: "Hello / Good afternoon",
        context: "Standard daytime greeting in schools, shops, and streets.",
      },
      {
        japanese: "こんばんは",
        romaji: "konbanwa",
        english: "Good evening",
        context: "Used after sunset in casual and polite scenes.",
      },
      {
        japanese: "ただいま",
        romaji: "tadaima",
        english: "I am home",
        context: "Said when returning home or to a dorm.",
      },
      {
        japanese: "おかえり",
        romaji: "okaeri",
        english: "Welcome back",
        context: "Response to someone returning home or to base.",
      },
      {
        japanese: "はじめまして",
        romaji: "hajimemashite",
        english: "Nice to meet you",
        context: "First-time introductions in class transfers or team meetings.",
      },
      {
        japanese: "よろしく",
        romaji: "yoroshiku",
        english: "Please treat me well",
        context: "Set phrase after introductions or when asking cooperation.",
      },
      {
        japanese: "元気？",
        romaji: "genki?",
        english: "How are you?",
        context: "Friendly check-in with someone you know.",
      },
      {
        japanese: "いってきます",
        romaji: "ittekimasu",
        english: "I am off",
        context: "Said before leaving home for school or mission.",
      },
      {
        japanese: "いってらっしゃい",
        romaji: "itterasshai",
        english: "Take care / See you",
        context: "Reply to someone leaving home.",
      },
    ],
  },
  {
    title: "Emotions & Feelings",
    description: "Core emotional expressions used in dramatic and everyday anime scenes.",
    emoji: "💭",
    variants: reactionVariants,
    stems: [
      {
        japanese: "うれしい",
        romaji: "ureshii",
        english: "I am happy",
        context: "Used after good news, victories, or kind gestures.",
      },
      {
        japanese: "悲しい",
        romaji: "kanashii",
        english: "I am sad",
        context: "Used in emotional losses and reflective scenes.",
      },
      {
        japanese: "くやしい",
        romaji: "kuyashii",
        english: "I am frustrated",
        context: "Said after losing or failing to protect someone.",
      },
      {
        japanese: "さびしい",
        romaji: "sabishii",
        english: "I feel lonely",
        context: "Used when separated from close friends or family.",
      },
      {
        japanese: "こわい",
        romaji: "kowai",
        english: "I am scared",
        context: "Common in horror, battle, or tense situations.",
      },
      {
        japanese: "安心した",
        romaji: "anshin shita",
        english: "I am relieved",
        context: "Used after danger passes or worries are resolved.",
      },
      {
        japanese: "緊張する",
        romaji: "kinchou suru",
        english: "I am nervous",
        context: "Before tests, confessions, tournaments, or speeches.",
      },
      {
        japanese: "むかつく",
        romaji: "mukatsuku",
        english: "That annoys me",
        context: "Casual irritation in arguments or rival scenes.",
      },
      {
        japanese: "ドキドキする",
        romaji: "dokidoki suru",
        english: "My heart is pounding",
        context: "Used in romance, suspense, and risky moments.",
      },
      {
        japanese: "ほっとした",
        romaji: "hotto shita",
        english: "What a relief",
        context: "Said when stress suddenly eases.",
      },
    ],
  },
  {
    title: "Battle & Fighting Phrases",
    description: "Combat lines, declarations, and aggressive statements common in action anime.",
    emoji: "⚔️",
    variants: battleVariants,
    stems: [
      {
        japanese: "かかってこい",
        romaji: "kakatte koi",
        english: "Bring it on",
        context: "Challenge line used before a fight starts.",
      },
      {
        japanese: "いくぞ",
        romaji: "iku zo",
        english: "Here I go",
        context: "Shouted before charging or launching an attack.",
      },
      {
        japanese: "負けるな",
        romaji: "makeru na",
        english: "Do not lose",
        context: "Encouragement shouted to allies under pressure.",
      },
      {
        japanese: "ぶっ倒す",
        romaji: "buttaosu",
        english: "I will crush you",
        context: "Rough statement used by hot-blooded fighters.",
      },
      {
        japanese: "覚悟しろ",
        romaji: "kakugo shiro",
        english: "Prepare yourself",
        context: "Threat line before a decisive strike.",
      },
      {
        japanese: "ここで決める",
        romaji: "koko de kimeru",
        english: "I will finish it here",
        context: "Used at turning points in boss fights.",
      },
      {
        japanese: "本気で行く",
        romaji: "honki de iku",
        english: "I am going all out",
        context: "Declaration before using full strength.",
      },
      {
        japanese: "まだ終わってない",
        romaji: "mada owattenai",
        english: "It is not over yet",
        context: "Said when standing back up after heavy damage.",
      },
      {
        japanese: "守ってみせる",
        romaji: "mamotte miseru",
        english: "I will protect them",
        context: "Protective resolve line in emotional battles.",
      },
      {
        japanese: "逃がさない",
        romaji: "nigasanai",
        english: "I will not let you escape",
        context: "Used while pursuing an opponent.",
      },
    ],
  },
  {
    title: "Friendship & Bonds",
    description: "Phrases about trust, teamwork, and emotional connections among companions.",
    emoji: "🤝",
    variants: reactionVariants,
    stems: [
      {
        japanese: "信じてる",
        romaji: "shinjiteru",
        english: "I believe in you",
        context: "Used to support a teammate during critical moments.",
      },
      {
        japanese: "仲間だ",
        romaji: "nakama da",
        english: "You are my comrade",
        context: "Affirms group belonging and mutual trust.",
      },
      {
        japanese: "一緒に行こう",
        romaji: "issho ni ikou",
        english: "Let us go together",
        context: "Invites someone to face challenges side by side.",
      },
      {
        japanese: "絆は切れない",
        romaji: "kizuna wa kirenai",
        english: "Our bond cannot be broken",
        context: "Spoken during emotional loyalty scenes.",
      },
      {
        japanese: "助け合おう",
        romaji: "tasukeaou",
        english: "Let us help each other",
        context: "Used when teams regroup after setbacks.",
      },
      {
        japanese: "友達だから",
        romaji: "tomodachi dakara",
        english: "Because we are friends",
        context: "Reason given for support without conditions.",
      },
      {
        japanese: "背中は任せた",
        romaji: "senaka wa makaseta",
        english: "I have got your back",
        context: "Battlefield trust phrase between partners.",
      },
      {
        japanese: "お前を一人にしない",
        romaji: "omae o hitori ni shinai",
        english: "I will not leave you alone",
        context: "Promise made to someone in distress.",
      },
      {
        japanese: "約束だ",
        romaji: "yakusoku da",
        english: "It is a promise",
        context: "Used to seal emotionally important agreements.",
      },
      {
        japanese: "そばにいる",
        romaji: "soba ni iru",
        english: "I will stay by your side",
        context: "Comfort line in vulnerable character moments.",
      },
    ],
  },
  {
    title: "Shock & Surprise",
    description: "Instant reaction phrases when characters are stunned by events.",
    emoji: "😲",
    variants: doubtVariants,
    stems: [
      {
        japanese: "まさか",
        romaji: "masaka",
        english: "No way",
        context: "Classic disbelief reaction to sudden reveals.",
      },
      {
        japanese: "うそだろ",
        romaji: "uso daro",
        english: "You have got to be kidding",
        context: "Used after shocking information or twists.",
      },
      {
        japanese: "なんだって",
        romaji: "nandatte",
        english: "What did you say",
        context: "Spoken when someone cannot believe what they heard.",
      },
      {
        japanese: "ありえない",
        romaji: "arienai",
        english: "Impossible",
        context: "Used when events defy expectations.",
      },
      {
        japanese: "本当",
        romaji: "hontou",
        english: "Really",
        context: "Short confirmation check after surprising news.",
      },
      {
        japanese: "びっくりした",
        romaji: "bikkuri shita",
        english: "That startled me",
        context: "Reaction to sudden noises or appearances.",
      },
      {
        japanese: "信じられない",
        romaji: "shinjirarenai",
        english: "I cannot believe it",
        context: "Used in major plot shock moments.",
      },
      {
        japanese: "そんな",
        romaji: "sonna",
        english: "It cannot be",
        context: "One-word shock expression in dramatic scenes.",
      },
      {
        japanese: "嘘でしょ",
        romaji: "uso desho",
        english: "You are kidding, right",
        context: "Common casual disbelief phrase.",
      },
      {
        japanese: "冗談だろ",
        romaji: "joudan daro",
        english: "This must be a joke",
        context: "Used when reality feels absurd.",
      },
    ],
  },
  {
    title: "Agreement & Disagreement",
    description: "Useful phrases for agreeing, refusing, and challenging opinions.",
    emoji: "✅",
    variants: reactionVariants,
    stems: [
      {
        japanese: "その通り",
        romaji: "sono toori",
        english: "Exactly right",
        context: "Direct agreement with someone else's point.",
      },
      {
        japanese: "賛成だ",
        romaji: "sansei da",
        english: "I agree",
        context: "Used in group decisions and strategy talks.",
      },
      {
        japanese: "いいね",
        romaji: "ii ne",
        english: "Sounds good",
        context: "Casual approval among friends.",
      },
      {
        japanese: "わかった",
        romaji: "wakatta",
        english: "Understood",
        context: "Acknowledges instructions or plans.",
      },
      {
        japanese: "了解",
        romaji: "ryoukai",
        english: "Roger that",
        context: "Common in mission-oriented and military-like scenes.",
      },
      {
        japanese: "反対だ",
        romaji: "hantai da",
        english: "I disagree",
        context: "Clear rejection of a proposal.",
      },
      {
        japanese: "違う",
        romaji: "chigau",
        english: "That is wrong",
        context: "Used to correct someone quickly.",
      },
      {
        japanese: "それは違う",
        romaji: "sore wa chigau",
        english: "That is not correct",
        context: "Firm disagreement during debates.",
      },
      {
        japanese: "納得できない",
        romaji: "nattoku dekinai",
        english: "I cannot accept that",
        context: "Used when unconvinced by explanations.",
      },
      {
        japanese: "同意する",
        romaji: "doui suru",
        english: "I consent",
        context: "Formal or strategic agreement line.",
      },
    ],
  },
  {
    title: "Determination & Resolve",
    description: "Lines used when characters commit to difficult goals.",
    emoji: "🔥",
    variants: battleVariants,
    stems: [
      {
        japanese: "絶対にやる",
        romaji: "zettai ni yaru",
        english: "I will do it no matter what",
        context: "Strong commitment before hard challenges.",
      },
      {
        japanese: "あきらめない",
        romaji: "akiramenai",
        english: "I will not give up",
        context: "Classic perseverance phrase in shonen arcs.",
      },
      {
        japanese: "やってみせる",
        romaji: "yatte miseru",
        english: "I will prove I can do it",
        context: "Used to answer doubt from others.",
      },
      {
        japanese: "前に進む",
        romaji: "mae ni susumu",
        english: "I will move forward",
        context: "Used after accepting painful truths.",
      },
      {
        japanese: "乗り越える",
        romaji: "norikoeru",
        english: "I will overcome this",
        context: "Said when facing internal or external obstacles.",
      },
      {
        japanese: "負けない",
        romaji: "makenai",
        english: "I will not lose",
        context: "Spoken before direct confrontation.",
      },
      {
        japanese: "逃げない",
        romaji: "nigenai",
        english: "I will not run away",
        context: "Used to show emotional growth and courage.",
      },
      {
        japanese: "覚悟はできてる",
        romaji: "kakugo wa dekiteru",
        english: "I am prepared",
        context: "Used before sacrifice or decisive action.",
      },
      {
        japanese: "ここからだ",
        romaji: "koko kara da",
        english: "It starts now",
        context: "Signals a comeback or final phase.",
      },
      {
        japanese: "限界を超える",
        romaji: "genkai o koeru",
        english: "I will surpass my limits",
        context: "Power progression line in intense arcs.",
      },
    ],
  },
  {
    title: "Love & Romance",
    description: "Romantic, affectionate, and shy expressions frequently heard in anime.",
    emoji: "❤️",
    variants: reactionVariants,
    stems: [
      {
        japanese: "好きだ",
        romaji: "suki da",
        english: "I like you",
        context: "Direct confession phrase in romantic scenes.",
      },
      {
        japanese: "大好き",
        romaji: "daisuki",
        english: "I really like you",
        context: "Stronger affection than plain suki.",
      },
      {
        japanese: "愛してる",
        romaji: "aishiteru",
        english: "I love you",
        context: "Used rarely for deep emotional impact.",
      },
      {
        japanese: "会いたい",
        romaji: "aitai",
        english: "I want to see you",
        context: "Common in longing and distance scenes.",
      },
      {
        japanese: "そばにいて",
        romaji: "soba ni ite",
        english: "Stay with me",
        context: "Request for emotional closeness.",
      },
      {
        japanese: "手をつないで",
        romaji: "te o tsunaide",
        english: "Hold my hand",
        context: "Tender request during intimate moments.",
      },
      {
        japanese: "守りたい",
        romaji: "mamoritai",
        english: "I want to protect you",
        context: "Protective love statement common in drama anime.",
      },
      {
        japanese: "恥ずかしい",
        romaji: "hazukashii",
        english: "I am embarrassed",
        context: "Used after teasing, compliments, or confessions.",
      },
      {
        japanese: "ドキドキする",
        romaji: "dokidoki suru",
        english: "My heart is racing",
        context: "Classic romantic tension phrase.",
      },
      {
        japanese: "気になる",
        romaji: "ki ni naru",
        english: "You are on my mind",
        context: "Used when someone draws romantic interest.",
      },
    ],
  },
  {
    title: "Insults & Taunts (mild, anime-appropriate)",
    description: "Mild taunts used by rivals, tsundere characters, and comic antagonists.",
    emoji: "😏",
    variants: reactionVariants,
    stems: [
      {
        japanese: "ばか",
        romaji: "baka",
        english: "Idiot",
        context: "Very common light insult in anime banter.",
      },
      {
        japanese: "まぬけ",
        romaji: "manuke",
        english: "Fool",
        context: "Used to mock clumsy mistakes.",
      },
      {
        japanese: "へたくそ",
        romaji: "hetakuso",
        english: "You are terrible at this",
        context: "Taunt aimed at weak performance.",
      },
      {
        japanese: "調子に乗るな",
        romaji: "choushi ni noru na",
        english: "Do not get cocky",
        context: "Said to overconfident opponents.",
      },
      {
        japanese: "弱すぎる",
        romaji: "yowasugiru",
        english: "Too weak",
        context: "Battle taunt to provoke the enemy.",
      },
      {
        japanese: "甘い",
        romaji: "amai",
        english: "Too naive",
        context: "Critique of careless strategy or attitude.",
      },
      {
        japanese: "子どもだな",
        romaji: "kodomo da na",
        english: "You are childish",
        context: "Dismissive line used by older rivals.",
      },
      {
        japanese: "口だけか",
        romaji: "kuchi dake ka",
        english: "Is that all talk",
        context: "Challenges whether someone can back words with action.",
      },
      {
        japanese: "どんくさい",
        romaji: "donkusai",
        english: "So clumsy",
        context: "Used in comedic frustration scenes.",
      },
      {
        japanese: "しっかりしろ",
        romaji: "shikkari shiro",
        english: "Get it together",
        context: "Harsh encouragement among teammates.",
      },
    ],
  },
  {
    title: "School & Student Life",
    description: "Expressions tied to classes, club activities, and school events.",
    emoji: "🏫",
    variants: reactionVariants,
    stems: [
      {
        japanese: "遅刻だ",
        romaji: "chikoku da",
        english: "I am late",
        context: "Said while rushing to school.",
      },
      {
        japanese: "授業が始まる",
        romaji: "jugyou ga hajimaru",
        english: "Class is starting",
        context: "Used to hurry friends into the classroom.",
      },
      {
        japanese: "宿題やった",
        romaji: "shukudai yatta",
        english: "I did my homework",
        context: "Often used in morning classroom chatter.",
      },
      {
        japanese: "テスト勉強する",
        romaji: "tesuto benkyou suru",
        english: "I will study for the test",
        context: "Exam preparation conversations.",
      },
      {
        japanese: "部活に行く",
        romaji: "bukatsu ni iku",
        english: "I am going to club practice",
        context: "After-school planning line.",
      },
      {
        japanese: "先輩おはようございます",
        romaji: "senpai ohayou gozaimasu",
        english: "Good morning, senpai",
        context: "Polite greeting to upperclassmen.",
      },
      {
        japanese: "先生に聞こう",
        romaji: "sensei ni kikou",
        english: "Let us ask the teacher",
        context: "Used when students are confused about assignments.",
      },
      {
        japanese: "ノート見せて",
        romaji: "nooto misete",
        english: "Show me your notes",
        context: "Common request before quizzes.",
      },
      {
        japanese: "放課後どうする",
        romaji: "houkago dou suru",
        english: "What are you doing after school",
        context: "Used to invite friends to hang out.",
      },
      {
        japanese: "学園祭が楽しみ",
        romaji: "gakuensai ga tanoshimi",
        english: "I am excited for the school festival",
        context: "Seasonal school event conversation.",
      },
    ],
  },
  {
    title: "Food & Daily Life",
    description: "Everyday home and meal expressions common in family and dorm scenes.",
    emoji: "🍱",
    variants: reactionVariants,
    stems: [
      {
        japanese: "いただきます",
        romaji: "itadakimasu",
        english: "Let us eat",
        context: "Said before starting a meal.",
      },
      {
        japanese: "ごちそうさま",
        romaji: "gochisousama",
        english: "Thanks for the meal",
        context: "Said after finishing food.",
      },
      {
        japanese: "おなかすいた",
        romaji: "onaka suita",
        english: "I am hungry",
        context: "Common after school or travel scenes.",
      },
      {
        japanese: "うまい",
        romaji: "umai",
        english: "Delicious",
        context: "Casual praise for tasty food.",
      },
      {
        japanese: "まずい",
        romaji: "mazui",
        english: "This tastes bad",
        context: "Reaction to failed cooking attempts.",
      },
      {
        japanese: "料理する",
        romaji: "ryouri suru",
        english: "I will cook",
        context: "Daily chore planning in home settings.",
      },
      {
        japanese: "買い物に行く",
        romaji: "kaimono ni iku",
        english: "I am going shopping",
        context: "Used for grocery and errand scenes.",
      },
      {
        japanese: "今日は忙しい",
        romaji: "kyou wa isogashii",
        english: "I am busy today",
        context: "Said when daily schedule is packed.",
      },
      {
        japanese: "早く寝よう",
        romaji: "hayaku neyou",
        english: "Let us sleep early",
        context: "Advice before important days.",
      },
      {
        japanese: "風呂入る",
        romaji: "furo hairu",
        english: "I am taking a bath",
        context: "Very common domestic line in Japanese homes.",
      },
    ],
  },
  {
    title: "Questions & Curiosity",
    description: "Question forms used to probe mysteries and gather information.",
    emoji: "❓",
    variants: doubtVariants,
    stems: [
      {
        japanese: "なんで",
        romaji: "nande",
        english: "Why",
        context: "Casual why-question in emotional scenes.",
      },
      {
        japanese: "どうして",
        romaji: "doushite",
        english: "How come",
        context: "Softer alternative to ask for reasons.",
      },
      {
        japanese: "本当に",
        romaji: "hontou ni",
        english: "Really",
        context: "Checks truthfulness of surprising claims.",
      },
      {
        japanese: "何それ",
        romaji: "nani sore",
        english: "What is that",
        context: "Used when seeing unfamiliar things.",
      },
      {
        japanese: "どこで",
        romaji: "doko de",
        english: "Where",
        context: "Asks location of an event or person.",
      },
      {
        japanese: "いつ",
        romaji: "itsu",
        english: "When",
        context: "Asks timing for plans or incidents.",
      },
      {
        japanese: "誰が",
        romaji: "dare ga",
        english: "Who",
        context: "Asks identity or responsibility.",
      },
      {
        japanese: "教えて",
        romaji: "oshiete",
        english: "Tell me",
        context: "Direct request for information.",
      },
      {
        japanese: "気になる",
        romaji: "ki ni naru",
        english: "I am curious",
        context: "Used when something draws strong interest.",
      },
      {
        japanese: "詳しく聞かせて",
        romaji: "kuwashiku kikasete",
        english: "Tell me in detail",
        context: "Prompt for deeper explanation.",
      },
    ],
  },
  {
    title: "Sadness & Regret",
    description: "Expressions for apology, grief, and remorse after painful events.",
    emoji: "😢",
    variants: reactionVariants,
    stems: [
      {
        japanese: "ごめん",
        romaji: "gomen",
        english: "I am sorry",
        context: "Casual apology to friends and peers.",
      },
      {
        japanese: "申し訳ない",
        romaji: "moushiwakenai",
        english: "I deeply apologize",
        context: "Stronger apology in serious situations.",
      },
      {
        japanese: "悔しい",
        romaji: "kuyashii",
        english: "This is frustrating",
        context: "Said after painful defeat or missed chance.",
      },
      {
        japanese: "つらい",
        romaji: "tsurai",
        english: "This is painful",
        context: "Used when emotionally overwhelmed.",
      },
      {
        japanese: "泣きたい",
        romaji: "nakitai",
        english: "I want to cry",
        context: "Used in scenes of emotional breakdown.",
      },
      {
        japanese: "失敗した",
        romaji: "shippai shita",
        english: "I failed",
        context: "Acknowledging mistakes after setbacks.",
      },
      {
        japanese: "戻りたい",
        romaji: "modoritai",
        english: "I want to go back",
        context: "Longing for earlier, happier times.",
      },
      {
        japanese: "守れなかった",
        romaji: "mamorenakatta",
        english: "I could not protect them",
        context: "Regret line after losing someone important.",
      },
      {
        japanese: "後悔してる",
        romaji: "koukai shiteru",
        english: "I regret it",
        context: "Self-blame in reflective scenes.",
      },
      {
        japanese: "もう遅い",
        romaji: "mou osoi",
        english: "It is too late",
        context: "Used in tragic turning points.",
      },
    ],
  },
  {
    title: "Pride & Confidence",
    description: "Bold self-assured statements from confident heroes and rivals.",
    emoji: "😎",
    variants: battleVariants,
    stems: [
      {
        japanese: "任せろ",
        romaji: "makasero",
        english: "Leave it to me",
        context: "Confident acceptance of responsibility.",
      },
      {
        japanese: "俺は最強だ",
        romaji: "ore wa saikyou da",
        english: "I am the strongest",
        context: "Classic rival boasting line.",
      },
      {
        japanese: "できる",
        romaji: "dekiru",
        english: "I can do this",
        context: "Self-affirmation before a challenge.",
      },
      {
        japanese: "問題ない",
        romaji: "mondai nai",
        english: "No problem",
        context: "Used to reassure others confidently.",
      },
      {
        japanese: "完璧だ",
        romaji: "kanpeki da",
        english: "Perfect",
        context: "Said after executing a plan cleanly.",
      },
      {
        japanese: "負ける気がしない",
        romaji: "makeru ki ga shinai",
        english: "I do not feel like losing",
        context: "Confidence line before high-stakes matches.",
      },
      {
        japanese: "余裕だ",
        romaji: "yoyuu da",
        english: "This is easy for me",
        context: "Used by composed or overpowered characters.",
      },
      {
        japanese: "見てろ",
        romaji: "mitero",
        english: "Watch me",
        context: "Said before showing skill or growth.",
      },
      {
        japanese: "実力を見せる",
        romaji: "jitsuryoku o miseru",
        english: "I will show my true ability",
        context: "Declaration before proving oneself.",
      },
      {
        japanese: "当然だ",
        romaji: "touzen da",
        english: "Naturally",
        context: "Calmly accepting praise as expected.",
      },
    ],
  },
  {
    title: "Confusion & Doubt",
    description: "Phrases used when things do not make sense and characters hesitate.",
    emoji: "😕",
    variants: doubtVariants,
    stems: [
      {
        japanese: "どういうこと",
        romaji: "dou iu koto",
        english: "What do you mean",
        context: "Asked when explanation is unclear.",
      },
      {
        japanese: "意味がわからない",
        romaji: "imi ga wakaranai",
        english: "I do not understand",
        context: "Used when logic feels inconsistent.",
      },
      {
        japanese: "本当なの",
        romaji: "hontou nano",
        english: "Is that really true",
        context: "Questioning unbelievable claims.",
      },
      {
        japanese: "夢か",
        romaji: "yume ka",
        english: "Is this a dream",
        context: "Said in surreal or shocking moments.",
      },
      {
        japanese: "混乱してる",
        romaji: "konran shiteru",
        english: "I am confused",
        context: "Used when overwhelmed by events.",
      },
      {
        japanese: "信じていいのか",
        romaji: "shinjite ii no ka",
        english: "Can I trust this",
        context: "Used when loyalty or facts are uncertain.",
      },
      {
        japanese: "迷ってる",
        romaji: "mayotteru",
        english: "I am unsure",
        context: "Used while struggling to choose a path.",
      },
      {
        japanese: "変だな",
        romaji: "hen da na",
        english: "That is strange",
        context: "Noticing subtle irregularities.",
      },
      {
        japanese: "何かおかしい",
        romaji: "nanika okashii",
        english: "Something is off",
        context: "Suspicion before discovering hidden truths.",
      },
      {
        japanese: "自信がない",
        romaji: "jishin ga nai",
        english: "I am not confident",
        context: "Used when doubting personal ability.",
      },
    ],
  },
  {
    title: "Commands & Requests",
    description: "Imperatives and requests used in urgent, tactical, and emotional scenes.",
    emoji: "🗣️",
    variants: reactionVariants,
    stems: [
      {
        japanese: "待ってくれ",
        romaji: "matte kure",
        english: "Wait",
        context: "Urgent request to stop someone from leaving.",
      },
      {
        japanese: "来てくれ",
        romaji: "kite kure",
        english: "Come here",
        context: "Called out when immediate support is needed.",
      },
      {
        japanese: "行ってくれ",
        romaji: "itte kure",
        english: "Please go",
        context: "Request to move quickly to a location.",
      },
      {
        japanese: "落ち着いてくれ",
        romaji: "ochitsuite kure",
        english: "Calm down",
        context: "Used to de-escalate panic.",
      },
      {
        japanese: "手伝ってくれ",
        romaji: "tetsudatte kure",
        english: "Help me",
        context: "Asking for immediate assistance.",
      },
      {
        japanese: "聞いてくれ",
        romaji: "kiite kure",
        english: "Listen to me",
        context: "Used when someone must hear critical information.",
      },
      {
        japanese: "見せてくれ",
        romaji: "misete kure",
        english: "Show me",
        context: "Demanding proof or demonstration.",
      },
      {
        japanese: "急いでくれ",
        romaji: "isoide kure",
        english: "Hurry up",
        context: "Used under time pressure.",
      },
      {
        japanese: "やめてくれ",
        romaji: "yamete kure",
        english: "Stop it",
        context: "Request to end harmful behavior.",
      },
      {
        japanese: "頼む",
        romaji: "tanomu",
        english: "I beg you",
        context: "Strong plea in emotional or desperate scenes.",
      },
    ],
  },
  {
    title: "Gratitude & Apology",
    description: "Thank-you and apology language for polite and emotional interactions.",
    emoji: "🙏",
    variants: reactionVariants,
    stems: [
      {
        japanese: "ありがとう",
        romaji: "arigatou",
        english: "Thank you",
        context: "Most common casual expression of thanks.",
      },
      {
        japanese: "どうもありがとう",
        romaji: "doumo arigatou",
        english: "Thank you very much",
        context: "Slightly stronger gratitude expression.",
      },
      {
        japanese: "助かった",
        romaji: "tasukatta",
        english: "You saved me",
        context: "Said after receiving timely help.",
      },
      {
        japanese: "感謝してる",
        romaji: "kansha shiteru",
        english: "I appreciate it",
        context: "Used in sincere gratitude scenes.",
      },
      {
        japanese: "恩に着る",
        romaji: "on ni kiru",
        english: "I am in your debt",
        context: "Traditional phrase of deep thanks.",
      },
      {
        japanese: "ごめん",
        romaji: "gomen",
        english: "Sorry",
        context: "Casual apology among close relations.",
      },
      {
        japanese: "すまない",
        romaji: "sumanai",
        english: "I am sorry",
        context: "Often used by stoic adult characters.",
      },
      {
        japanese: "申し訳ない",
        romaji: "moushiwakenai",
        english: "I am truly sorry",
        context: "Formal or heavy apology line.",
      },
      {
        japanese: "許して",
        romaji: "yurushite",
        english: "Forgive me",
        context: "Used when seeking reconciliation.",
      },
      {
        japanese: "謝る",
        romaji: "ayamaru",
        english: "I will apologize",
        context: "Stating intent to make amends.",
      },
    ],
  },
  {
    title: "Family & Relationships",
    description: "Common expressions around relatives, close bonds, and home dynamics.",
    emoji: "👨‍👩‍👧",
    variants: reactionVariants,
    stems: [
      {
        japanese: "母さん元気",
        romaji: "kaasan genki",
        english: "Mom, how are you",
        context: "Used in warm family check-ins.",
      },
      {
        japanese: "父さんただいま",
        romaji: "tousan tadaima",
        english: "Dad, I am home",
        context: "Returning-home greeting to father.",
      },
      {
        japanese: "兄ちゃん待って",
        romaji: "niichan matte",
        english: "Big brother, wait",
        context: "Younger sibling line in home scenes.",
      },
      {
        japanese: "姉ちゃんすごい",
        romaji: "neechan sugoi",
        english: "Big sister is amazing",
        context: "Sibling admiration line.",
      },
      {
        japanese: "弟を守る",
        romaji: "otouto o mamoru",
        english: "I will protect my little brother",
        context: "Protective family resolve statement.",
      },
      {
        japanese: "妹が心配",
        romaji: "imouto ga shinpai",
        english: "I am worried about my little sister",
        context: "Concerned family conversation.",
      },
      {
        japanese: "家族が一番",
        romaji: "kazoku ga ichiban",
        english: "Family comes first",
        context: "Used to express core values.",
      },
      {
        japanese: "親友だから",
        romaji: "shinyuu dakara",
        english: "Because we are best friends",
        context: "Explains emotional loyalty and support.",
      },
      {
        japanese: "幼なじみなんだ",
        romaji: "osananajimi nanda",
        english: "We are childhood friends",
        context: "Background reveal in character relationships.",
      },
      {
        japanese: "大切な人だ",
        romaji: "taisetsu na hito da",
        english: "That person is important to me",
        context: "Used to define emotional priority.",
      },
    ],
  },
  {
    title: "Power-Ups & Transformations",
    description: "Signature lines tied to awakenings, forms, and escalating power.",
    emoji: "💥",
    variants: battleVariants,
    stems: [
      {
        japanese: "覚醒する",
        romaji: "kakusei suru",
        english: "I am awakening",
        context: "Used when dormant power activates.",
      },
      {
        japanese: "変身",
        romaji: "henshin",
        english: "Transform",
        context: "Classic transformation trigger call.",
      },
      {
        japanese: "力がみなぎる",
        romaji: "chikara ga minagiru",
        english: "Power is surging",
        context: "Describes rising energy before a power-up.",
      },
      {
        japanese: "限界突破",
        romaji: "genkai toppa",
        english: "Limit break",
        context: "Used at dramatic growth moments.",
      },
      {
        japanese: "真の力を解放する",
        romaji: "shin no chikara o kaihou suru",
        english: "I will unleash my true power",
        context: "Declaration before final techniques.",
      },
      {
        japanese: "第二形態だ",
        romaji: "dai ni keitai da",
        english: "This is my second form",
        context: "Villain or hero form escalation line.",
      },
      {
        japanese: "まだ強くなれる",
        romaji: "mada tsuyoku nareru",
        english: "I can still get stronger",
        context: "Determination to keep evolving mid-fight.",
      },
      {
        japanese: "これが本気だ",
        romaji: "kore ga honki da",
        english: "This is my true strength",
        context: "Revealing hidden effort level.",
      },
      {
        japanese: "新しい技だ",
        romaji: "atarashii waza da",
        english: "A new technique",
        context: "Announcing freshly mastered moves.",
      },
      {
        japanese: "オーラが違う",
        romaji: "oora ga chigau",
        english: "The aura is different",
        context: "Observers noticing dramatic power change.",
      },
    ],
  },
  {
    title: "Farewells & Endings",
    description: "Parting phrases for temporary goodbyes and emotional final scenes.",
    emoji: "🌅",
    variants: reactionVariants,
    stems: [
      {
        japanese: "さようなら",
        romaji: "sayounara",
        english: "Goodbye",
        context: "Formal or emotionally heavy farewell.",
      },
      {
        japanese: "またな",
        romaji: "mata na",
        english: "See you",
        context: "Casual goodbye among close friends.",
      },
      {
        japanese: "また会おう",
        romaji: "mata aou",
        english: "Let us meet again",
        context: "Used when parting with hope of reunion.",
      },
      {
        japanese: "元気で",
        romaji: "genki de",
        english: "Take care",
        context: "Warm closing phrase when separating.",
      },
      {
        japanese: "気をつけて",
        romaji: "ki o tsukete",
        english: "Be careful",
        context: "Said before someone departs for danger or travel.",
      },
      {
        japanese: "ここまでだ",
        romaji: "koko made da",
        english: "This is the end",
        context: "Used at climactic finality moments.",
      },
      {
        japanese: "旅立つ",
        romaji: "tabidatsu",
        english: "I am setting out",
        context: "Departure line at the start of a journey.",
      },
      {
        japanese: "先に行く",
        romaji: "saki ni iku",
        english: "I will go ahead",
        context: "Used when splitting paths during missions.",
      },
      {
        japanese: "忘れないで",
        romaji: "wasurenaide",
        english: "Do not forget me",
        context: "Emotional request at separation scenes.",
      },
      {
        japanese: "ありがとうさようなら",
        romaji: "arigatou sayounara",
        english: "Thank you and goodbye",
        context: "Bittersweet closing line for endings.",
      },
    ],
  },
];

let phraseId = 1;
let animeExampleCursor = 0;

const lessons: AnimePhraseLesson[] = lessonSeeds.map((lesson, lessonIndex) => {
  const phrases: AnimePhrase[] = lesson.stems.flatMap((stem) =>
    lesson.variants.map((variant) => {
      const phrase: AnimePhrase = {
        id: phraseId++,
        japanese: `${stem.japanese}${variant.japaneseSuffix}`,
        romaji: `${stem.romaji}${variant.romajiSuffix}`,
        english: `${stem.english}${variant.englishNote}`,
        context: `${stem.context}${variant.contextNote}`,
        animeExample:
          stem.animeExample ?? animeExamples[animeExampleCursor % animeExamples.length],
      };

      animeExampleCursor += 1;
      return phrase;
    }),
  );

  return {
    id: lessonIndex + 1,
    title: lesson.title,
    description: lesson.description,
    emoji: lesson.emoji,
    phrases,
  };
});

export const animePhrasesCourse: AnimePhraseCourse = {
  title: "Anime Phrases Course",
  description:
    "A 1000-phrase course of common Japanese expressions heard across anime genres, organized into 20 thematic lessons.",
  totalPhrases: lessons.reduce((sum, lesson) => sum + lesson.phrases.length, 0),
  lessons,
};

export default animePhrasesCourse;
