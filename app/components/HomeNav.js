"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import StudentNavAction from "./StudentNavAction";

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className={styles.nav} ref={navRef}>
      <Link href="/" className={styles.logo}>
        Skill<span style={{ color: "var(--red)" }}>Dojo</span> 道場
      </Link>

      <div
        id="home-mobile-menu"
        className={`${styles.navActions} ${menuOpen ? styles.navActionsOpen : ""}`}
      >
        <StudentNavAction className={styles.navLink} dashboardLabel="Progress" onClick={close} />
        <Link href="/vocab" className={styles.navLink} onClick={close}>Vocabulary</Link>
        <Link href="/grammar" className={styles.navLink} onClick={close}>Grammar</Link>
        <Link href="/katakana" className={styles.navLink} onClick={close}>Katakana</Link>
        <a
          href="https://youtube.com/@skilldojo-b2t"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ytLink}
          onClick={close}
        >
          ▶ YouTube
        </a>
      </div>

      <button
        className={styles.menuBtn}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="home-mobile-menu"
      >
        <span className={`${styles.menuBar} ${menuOpen ? styles.menuBar1Open : ""}`} />
        <span className={`${styles.menuBar} ${menuOpen ? styles.menuBar2Open : ""}`} />
        <span className={`${styles.menuBar} ${menuOpen ? styles.menuBar3Open : ""}`} />
      </button>
    </nav>
  );
}
