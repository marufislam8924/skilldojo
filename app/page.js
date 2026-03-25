"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>

      <section className="levels">

        <h2>Learn by Level</h2>
        <p className="sub">
          Structured courses from zero to conversational fluency
        </p>

        <div className="cards">

          {/* CLICKABLE CARD */}
          <div 
            className="card clickable"
            onClick={() => router.push("/course/hiragana")}
          >
            <div className="icon">🔤</div>
            <h3>Hiragana & Katakana Mastery</h3>
            <p className="jp">ひらがなとカタカナ</p>
            <p>Master Japanese characters from scratch.</p>

            <div className="bottom">
              <span className="level">Beginner</span>
              <span className="lessons">24 lessons</span>
            </div>
          </div>

          {/* OTHER CARD */}
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

        </div>

      </section>

    </main>
  );
}