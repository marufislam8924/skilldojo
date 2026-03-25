"use client";

import { useState } from "react";

export default function Home() {

  const roadmap = [
    {
      title: "Hiragana",
      desc: "Learn all basic Japanese characters",
    },
    {
      title: "Katakana",
      desc: "Master foreign word characters",
    },
    {
      title: "Basic Grammar",
      desc: "Understand sentence structure",
    },
    {
      title: "Vocabulary",
      desc: "Learn 800+ essential words",
    },
    {
      title: "Practice",
      desc: "Apply everything with exercises",
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
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>
          JLPT N5 Roadmap <br />
          <span>step by step</span>
        </h1>

        <p className="desc">
          Follow a structured path to pass JLPT N5 easily.
        </p>
      </section>

      {/* ROADMAP */}
      <section className="features">

        <h2>N5 Learning Path</h2>

        <div className="roadmap">

          {roadmap.map((step, i) => (
            <div key={i} className="roadmap-item">

              <div className="circle">{i + 1}</div>

              <div className="content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}