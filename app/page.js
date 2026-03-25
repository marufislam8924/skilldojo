"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const courses = [
    {
      title: "Hiragana & Katakana",
      jp: "ひらがなとカタカナ",
      lessons: "24 lessons",
      path: "hiragana"
    },
    {
      title: "Conversational Japanese",
      jp: "日本語会話",
      lessons: "18 lessons",
      path: "conversation"
    },
    {
      title: "Kanji Foundations",
      jp: "漢字基礎",
      lessons: "30 lessons",
      path: "kanji"
    },
    {
      title: "Grammar",
      jp: "文法",
      lessons: "25 lessons",
      path: "grammar"
    },
  ];

  return (
    <main>

      {/* NAV */}
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

        <h1>
          日本語を学ぼう <br />
          <span>Learn Japanese</span>
        </h1>

        <p className="desc">
          Master Japanese from beginner to conversational level.
        </p>

        <div className="hero-buttons">
          <button className="primary">Start Learning</button>
          <button className="secondary">Watch Free Lesson</button>
        </div>

      </section>

      {/* COURSES */}
      <section className="features">

        <h2>Learn by Level</h2>

        <div className="grid">

          {courses.map((course, i) => (
            <div 
              key={i} 
              className="card"
              onClick={() => router.push(`/lesson/${course.path}`)}
            >
              <h3>{course.title}</h3>
              <p>{course.jp}</p>
              <p style={{marginTop:"10px", color:"#888"}}>
                {course.lessons}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div className="stats-grid">
          <div>
            <h1>50K+</h1>
            <p>Subscribers</p>
          </div>

          <div>
            <h1>200+</h1>
            <p>Lessons</p>
          </div>

          <div>
            <h1>15K+</h1>
            <p>Learners</p>
          </div>
        </div>

      </section>

    </main>
  );
}