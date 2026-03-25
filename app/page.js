"use client";

export default function Home() {
  return (
    <main>

      {/* NAV */}
      <nav className="nav">
        <div className="logo">SKILLDOJO</div>

        <div className="links">
          <a>Courses</a>
          <a>About</a>
          <a>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <p className="tag">▶ Featured Lesson</p>

        <h3 className="jp">日本語を学ぼう</h3>

        <h1>Learn Japanese</h1>

        <p className="desc">
          Master Japanese from absolute beginner to intermediate.
          Real conversations, practical skills, cultural insights.
        </p>

        <div className="buttons">
          <button className="primary">Start Learning</button>
          <button className="secondary">Watch Free Lesson</button>
        </div>

      </section>

      {/* LEVEL SECTION */}
      <section className="levels">

        <h2>Learn by Level</h2>
        <p className="sub">
          Structured courses from zero to conversational fluency
        </p>

        <div className="cards">

          <div className="card">
            <div className="icon">🔤</div>
            <h3>Hiragana & Katakana Mastery</h3>
            <p className="jp">ひらがなとカタカナ</p>
            <p>Master Japanese characters from scratch.</p>
            <div className="bottom">
              <span className="level">Beginner</span>
              <span className="lessons">24 lessons</span>
            </div>
          </div>

          <div className="card">
            <div className="icon">💬</div>
            <h3>Conversational Japanese</h3>
            <p className="jp">日本語会話</p>
            <p>Real-world conversations and daily interactions.</p>
            <div className="bottom">
              <span className="level">Beginner+</span>
              <span className="lessons">18 lessons</span>
            </div>
          </div>

          <div className="card">
            <div className="icon">📚</div>
            <h3>Kanji Foundations</h3>
            <p className="jp">漢字基礎</p>
            <p>Learn 100+ essential kanji.</p>
            <div className="bottom">
              <span className="level">Beginner+</span>
              <span className="lessons">30 lessons</span>
            </div>
          </div>

          <div className="card">
            <div className="icon">🇯🇵</div>
            <h3>Japanese Culture & Idioms</h3>
            <p className="jp">日本文化</p>
            <p>Understand culture and real expressions.</p>
            <div className="bottom">
              <span className="level">Intermediate</span>
              <span className="lessons">15 lessons</span>
            </div>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats">
        <div>
          <h1>50K+</h1>
          <p>YouTube Subscribers</p>
        </div>
        <div>
          <h1>200+</h1>
          <p>Video Lessons</p>
        </div>
        <div>
          <h1>15K+</h1>
          <p>Active Learners</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2024 SkillDojo Japanese. All rights reserved.
        <br />
        日本語を学ぼう | Learn Japanese Together
      </footer>

    </main>
  );
}