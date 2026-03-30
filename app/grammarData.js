function createGrammarLesson(id, kana, name, patterns) {
  return {
    id,
    kana,
    name,
    chars: patterns.map(
      ([k, reading, meaning, exampleJa, exampleJaHiragana, exampleEn]) => ({
        k,
        reading,
        r: reading,
        meaning,
        voice: k,
        exampleJa,
        exampleJaHiragana,
        exampleEn,
      })
    ),
  };
}

export const grammarLessons = [
  createGrammarLesson(1, "文", "Copula and Basic Statements", [
    ["です", "desu", "is / am / are (polite)", "これは本です。", "これはほんです。", "This is a book."],
    ["じゃありません", "ja arimasen", "is not (polite)", "先生じゃありません。", "せんせいじゃありません。", "I am not a teacher."],
    ["ですか", "desu ka", "question ending", "日本人ですか。", "にほんじんですか。", "Are you Japanese?"],
    ["〜は〜です", "wa ... desu", "A is B", "私は学生です。", "わたしはがくせいです。", "I am a student."],
    ["〜も", "mo", "also / too", "田中さんも学生です。", "たなかさんもがくせいです。", "Tanaka is also a student."],
    ["これ / それ / あれ", "kore / sore / are", "this / that / that over there", "これはペンです。", "これはぺんです。", "This is a pen."],
    ["どれ", "dore", "which one", "どれですか。", "どれですか。", "Which one is it?"],
    ["の", "no", "possessive 'of'", "これは私の本です。", "これはわたしのほんです。", "This is my book."],
  ]),
  createGrammarLesson(2, "時", "Time and Existence", [
    ["あります", "arimasu", "there is (inanimate)", "机の上に本があります。", "つくえのうえにほんがあります。", "There is a book on the desk."],
    ["います", "imasu", "there is (animate)", "教室に先生がいます。", "きょうしつにせんせいがいます。", "There is a teacher in the classroom."],
    ["〜に", "ni", "at / in / on (location)", "学校にいます。", "がっこうにいます。", "I am at school."],
    ["〜で", "de", "at (action place)", "図書館で勉強します。", "としょかんでべんきょうします。", "I study at the library."],
    ["〜から", "kara", "from", "九時から勉強します。", "くじからべんきょうします。", "I study from nine o'clock."],
    ["〜まで", "made", "until", "五時まで働きます。", "ごじまではたらきます。", "I work until five."],
    ["〜と", "to", "and / with", "友達と行きます。", "ともだちといきます。", "I go with a friend."],
    ["〜や", "ya", "A and B and so on", "りんごやバナナを食べます。", "りんごやばななをたべます。", "I eat apples, bananas, and so on."],
  ]),
  createGrammarLesson(3, "動", "Verb Basics (Present / Past)", [
    ["〜ます", "masu", "polite present/future", "毎日日本語を勉強します。", "まいにちにほんごをべんきょうします。", "I study Japanese every day."],
    ["〜ません", "masen", "polite negative", "今日は行きません。", "きょうはいきません。", "I will not go today."],
    ["〜ました", "mashita", "polite past", "昨日映画を見ました。", "きのうえいがをみました。", "I watched a movie yesterday."],
    ["〜ませんでした", "masen deshita", "polite past negative", "朝ごはんを食べませんでした。", "あさごはんをたべませんでした。", "I did not eat breakfast."],
    ["行きます", "ikimasu", "to go", "学校へ行きます。", "がっこうへいきます。", "I go to school."],
    ["食べます", "tabemasu", "to eat", "すしを食べます。", "すしをたべます。", "I eat sushi."],
    ["見ます", "mimasu", "to see/watch", "テレビを見ます。", "てれびをみます。", "I watch TV."],
    ["します", "shimasu", "to do", "宿題をします。", "しゅくだいをします。", "I do homework."],
  ]),
  createGrammarLesson(4, "形", "Adjectives and Description", [
    ["い-adjective", "i keiyoushi", "adjective ending with い", "この本は面白いです。", "このほんはおもしろいです。", "This book is interesting."],
    ["な-adjective", "na keiyoushi", "adjective requiring な", "この町は静かです。", "このまちはしずかです。", "This town is quiet."],
    ["〜くないです", "kunai desu", "not (i-adjective)", "今日は寒くないです。", "きょうはさむくないです。", "It is not cold today."],
    ["〜じゃありません", "ja arimasen", "not (na-adjective)", "ここはにぎやかじゃありません。", "ここはにぎやかじゃありません。", "This place is not lively."],
    ["〜かったです", "katta desu", "past (i-adjective)", "映画は長かったです。", "えいがはながかったです。", "The movie was long."],
    ["〜でした", "deshita", "past (na-adjective/noun)", "駅は便利でした。", "えきはべんりでした。", "The station was convenient."],
    ["とても", "totemo", "very", "とても有名です。", "とてもゆうめいです。", "It is very famous."],
    ["あまり〜ない", "amari ... nai", "not very", "あまり暑くないです。", "あまりあつくないです。", "It is not very hot."],
  ]),
  createGrammarLesson(5, "助", "Particles Core Set", [
    ["は", "wa", "topic marker", "私は日本語を勉強します。", "わたしはにほんごをべんきょうします。", "As for me, I study Japanese."],
    ["が", "ga", "subject marker", "猫が好きです。", "ねこがすきです。", "I like cats."],
    ["を", "wo", "object marker", "水を飲みます。", "みずをのみます。", "I drink water."],
    ["に", "ni", "time/destination marker", "七時に起きます。", "しちじにおきます。", "I wake up at seven."],
    ["へ", "e", "direction marker", "日本へ行きます。", "にほんへいきます。", "I go to Japan."],
    ["で", "de", "place of action", "家で食べます。", "いえでたべます。", "I eat at home."],
    ["と", "to", "with / and", "友達と話します。", "ともだちとはなします。", "I talk with my friend."],
    ["も", "mo", "also", "私も行きます。", "わたしもいきます。", "I will go too."],
  ]),
  createGrammarLesson(6, "願", "Requests and Permission", [
    ["〜てください", "te kudasai", "please do", "もう一度言ってください。", "もういちどいってください。", "Please say it once more."],
    ["〜てもいいです", "te mo ii desu", "may do / it's okay to", "ここで写真を撮ってもいいです。", "ここでしゃしんをとってもいいです。", "May I take photos here?"],
    ["〜てはいけません", "te wa ikemasen", "must not", "ここでタバコを吸ってはいけません。", "ここでたばこをすってはいけません。", "You must not smoke here."],
    ["〜ましょう", "mashou", "let's", "一緒に勉強しましょう。", "いっしょにべんきょうしましょう。", "Let's study together."],
    ["〜ませんか", "masen ka", "won't you?", "映画を見ませんか。", "えいがをみませんか。", "Would you like to watch a movie?"],
    ["お願いします", "onegaishimasu", "please (request)", "水をお願いします。", "みずをおねがいします。", "Water, please."],
    ["だめです", "dame desu", "not allowed / no good", "ここはだめです。", "ここはだめです。", "You can't do that here."],
    ["いいです", "ii desu", "that's fine / okay", "それでいいです。", "それでいいです。", "That is fine."],
  ]),
  createGrammarLesson(7, "比", "Comparisons and Preference", [
    ["〜より", "yori", "than", "電車はバスより速いです。", "でんしゃはばすよりはやいです。", "Trains are faster than buses."],
    ["〜のほうが", "no hou ga", "A is more...", "日本語のほうが難しいです。", "にほんごのほうがむずかしいです。", "Japanese is harder."],
    ["どちら", "dochira", "which (of two)", "どちらが安いですか。", "どちらがやすいですか。", "Which is cheaper?"],
    ["一番", "ichiban", "the most", "これが一番好きです。", "これがいちばんすきです。", "I like this one the most."],
    ["好きです", "suki desu", "to like", "音楽が好きです。", "おんがくがすきです。", "I like music."],
    ["嫌いです", "kirai desu", "to dislike", "辛い食べ物が嫌いです。", "からいたべものがきらいです。", "I dislike spicy food."],
    ["上手です", "jouzu desu", "good at", "田中さんは歌が上手です。", "たなかさんはうたがじょうずです。", "Tanaka is good at singing."],
    ["下手です", "heta desu", "poor at", "私は料理が下手です。", "わたしはりょうりがへたです。", "I am bad at cooking."],
  ]),
  createGrammarLesson(8, "連", "Connecting Sentences", [
    ["そして", "soshite", "and then", "朝ごはんを食べます。そして学校へ行きます。", "あさごはんをたべます。そしてがっこうへいきます。", "I eat breakfast, and then I go to school."],
    ["でも", "demo", "but", "日本語は難しいです。でも面白いです。", "にほんごはむずかしいです。でもおもしろいです。", "Japanese is difficult, but interesting."],
    ["だから", "dakara", "so / therefore", "雨です。だから家にいます。", "あめです。だからいえにいます。", "It is raining, so I stay home."],
    ["それから", "sorekara", "after that", "駅へ行きます。それから買い物します。", "えきへいきます。それからかいものします。", "I go to the station, and after that I shop."],
    ["〜ので", "node", "because", "疲れたので寝ます。", "つかれたのでねます。", "I am tired, so I will sleep."],
    ["〜から", "kara", "because", "時間がないから急ぎます。", "じかんがないからいそぎます。", "Because I have no time, I hurry."],
    ["〜たり〜たりします", "tari ... tari shimasu", "do things like A and B", "土曜日は映画を見たり本を読んだりします。", "どようびはえいがをみたりほんをよんだりします。", "On Saturdays, I do things like watching movies and reading books."],
    ["〜し", "shi", "and / besides", "この店は安いし、おいしいです。", "このみせはやすいし、おいしいです。", "This shop is cheap and tasty."],
  ]),
];

export const totalGrammarPatterns = grammarLessons.reduce(
  (total, lesson) => total + lesson.chars.length,
  0
);

export function getDailyGrammarLesson() {
  const day = new Date().getDate();
  return grammarLessons[(day - 1) % grammarLessons.length];
}
