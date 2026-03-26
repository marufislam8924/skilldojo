"use client";

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    elements.forEach((el) => observer.observe(el));

    // PARALLAX GLOW FOLLOW
    document.addEventListener("mousemove", (e) => {
      const glow = document.querySelector(".glow");

      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    });

  }, []);

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
      <section className="hero reveal">

        <div className="glow"></div>

        <h1>
          Learn Japanese <br />
          <span>the smart way</span>
        </h1>

        <p className="desc">
          Master Japanese with real conversations & structured learning.
        </p>

        <div className="hero-buttons">
          <button className="primary magnetic">Start Learning</button>
          <button className="secondary">Watch Free Lesson</button>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features reveal">
        <h2>What you’ll learn</h2>

        <div className="grid">

          <div className="card tilt">
            <h3>Hiragana & Katakana</h3>
            <p>Learn Japanese alphabets from scratch.</p>
          </div>

          <div className="card tilt">
            <h3>Kanji</h3>
            <p>Master essential characters step by step.</p>
          </div>

          <div className="card tilt">
            <h3>Grammar</h3>
            <p>Understand real Japanese sentence structure.</p>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats reveal">
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