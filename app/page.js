import { useEffect } from "react";
"use client";
export default function Home() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="logo">
          <div className="logo-box">道</div>
          Skilldojo
        </div>

        <div className="nav-links">
          <p>Courses</p>
          <p>About</p>
          <p>Contact</p>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <p className="tag">▶ Featured Lesson</p>
        <h3 className="jp">日本語を学ぼう</h3>

        <h1>
          Learn Japanese <br />
          <span>the smart way</span>
        </h1>

        <p className="desc">
          Master Japanese from beginner to fluent with real conversations.
        </p>

        <div className="hero-buttons">
          <button className="primary">Start Learning</button>
          <button className="secondary">Watch Free Lesson</button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>What you’ll learn</h2>

        <div className="grid">
          <div className="card">
            <h3>Hiragana & Katakana</h3>
            <p>Learn Japanese alphabets from scratch.</p>
          </div>

          <div className="card">
            <h3>Kanji</h3>
            <p>Master essential characters step by step.</p>
          </div>

          <div className="card">
            <h3>Grammar</h3>
            <p>Understand real Japanese sentence structure.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <h2>Trusted by learners worldwide</h2>

        <div className="stats-grid">
          <div>
            <h1>50K+</h1>
            <p>Students</p>
          </div>

          <div>
            <h1>200+</h1>
            <p>Lessons</p>
          </div>

          <div>
            <h1>95%</h1>
            <p>Success rate</p>
          </div>
        </div>
      </section>

    </main>
  );
}