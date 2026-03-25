"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  const [index, setIndex] = useState(0);

  const flashcards = [
    { jp: "こんにちは", en: "Hello" },
    { jp: "ありがとう", en: "Thank you" },
    { jp: "さようなら", en: "Goodbye" },
  ];

  const [show, setShow] = useState(false);

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
      <nav className="nav">
        <div className="logo">
          <div className="logo-box">道</div>
          Skilldojo
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="glow"></div>

        <h1>
          Learn Japanese <br />
          <span>the smart way</span>
        </h1>

        <p className="desc">
          Practice real words with interactive flashcards.
        </p>
      </section>

      {/* FLASHCARD SECTION */}
      <section className="features">

        <h2>Flashcards</h2>

        <div className="card" onClick={() => setShow(!show)} style={{cursor:"pointer"}}>

          <h1 style={{fontSize:"40px"}}>
            {show ? flashcards[index].en : flashcards[index].jp}
          </h1>

          <p style={{marginTop:"10px"}}>
            Click to flip
          </p>

        </div>

        <div style={{marginTop:"20px"}}>
          <button className="primary" onClick={() => setIndex((index + 1) % flashcards.length)}>
            Next →
          </button>
        </div>

      </section>

      {/* LESSONS */}
      <section className="features">

        <h2>Lessons</h2>

        <div className="grid">

          <div className="card">
            <h3>Hiragana</h3>
            <p>Learn basic Japanese alphabet.</p>
          </div>

          <div className="card">
            <h3>Kanji</h3>
            <p>Understand essential characters.</p>
          </div>

          <div className="card">
            <h3>Grammar</h3>
            <p>Build correct Japanese sentences.</p>
          </div>

        </div>

      </section>

    </main>
  );
}