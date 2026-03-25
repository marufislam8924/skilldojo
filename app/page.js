"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
          Learn Japanese <br />
          <span>the smart way</span>
        </h1>

        <p className="desc">
          Start with Hiragana and build real skills.
        </p>

        <button 
          className="primary"
          onClick={() => router.push("/lesson/hiragana")}
        >
          Start Hiragana →
        </button>
      </section>

    </main>
  );
}