"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {

  useEffect(() => {
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
      <motion.nav 
        className="nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="logo">
          <div className="logo-box">道</div>
          Skilldojo
        </div>

        <div className="nav-links">
          <p>Courses</p>
          <p>About</p>
          <p>Contact</p>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="hero">

        <div className="glow"></div>

        <div className="hero-content">

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Learn Japanese <br />
            <span>faster than ever</span>
          </motion.h1>

          <motion.p
            className="desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Structured lessons, flashcards, and AI practice — all in one place.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="primary">Start Learning</button>
            <button className="secondary">Watch Demo</button>
          </motion.div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>Everything you need</h2>

        <div className="grid">

          <div className="card">
            <h3>Flashcards</h3>
            <p>Spaced repetition system for fast memory.</p>
          </div>

          <div className="card">
            <h3>Structured Lessons</h3>
            <p>JLPT-based roadmap from zero to fluent.</p>
          </div>

          <div className="card">
            <h3>AI Practice</h3>
            <p>Practice real conversations with AI.</p>
          </div>

        </div>
      </section>

    </main>
  );
}