"use client";

export default function Home() {
  return (
    <main>

      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px"
      }}>
        <h3>SKILLDOJO</h3>
        <div style={{ display: "flex", gap: "20px" }}>
          <p>Courses</p>
          <p>About</p>
          <p>Contact</p>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        textAlign: "center",
        padding: "100px 20px"
      }}>
        <p>▶ Featured Lesson</p>
        <h3 style={{ marginTop: "10px" }}>日本語を学ぼう</h3>

        <h1 style={{
          fontSize: "56px",
          marginTop: "20px"
        }}>
          Learn Japanese
        </h1>

        <p style={{ marginTop: "20px", color: "#666" }}>
          Master Japanese from beginner to fluent with real conversations.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button style={{
            padding: "12px 24px",
            background: "black",
            color: "white",
            borderRadius: "8px",
            marginRight: "10px"
          }}>
            Start Learning
          </button>

          <button style={{
            padding: "12px 24px",
            border: "1px solid black",
            borderRadius: "8px"
          }}>
            Watch Free Lesson
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        padding: "80px 20px",
        maxWidth: "900px",
        margin: "auto"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
          What you’ll learn
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}>

          <div style={{ border: "1px solid #eee", padding: "20px" }}>
            <h3>Hiragana & Katakana</h3>
            <p>Learn Japanese alphabets from scratch.</p>
          </div>

          <div style={{ border: "1px solid #eee", padding: "20px" }}>
            <h3>Kanji</h3>
            <p>Master essential characters step by step.</p>
          </div>

          <div style={{ border: "1px solid #eee", padding: "20px" }}>
            <h3>Grammar</h3>
            <p>Understand real Japanese sentence structure.</p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "#f5f5f5"
      }}>
        <h2>Trusted by learners worldwide</h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "30px"
        }}>
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