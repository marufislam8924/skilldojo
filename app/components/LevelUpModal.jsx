"use client";

import { useState, useEffect } from "react";
import styles from "./LevelUpModal.module.css";

export default function LevelUpModal({ newLevel, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const milestoneMessages = {
    5: "Getting serious! 💪",
    10: "Double digits! 🔥",
    15: "Unstoppable! ⚡",
    20: "Master in training! 🥋",
    25: "Quarter century! 🌟",
    30: "Legendary! 🐉",
    40: "Almost there! 🏔️",
    50: "Maximum level! 👑",
  };

  const milestone = milestoneMessages[newLevel];

  return (
    <div className={`${styles.overlay} ${visible ? styles.overlayVisible : ""}`} onClick={onClose}>
      <div className={`${styles.modal} ${visible ? styles.modalVisible : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.particles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.particle} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`,
            }} />
          ))}
        </div>

        <div className={styles.badge}>
          <span className={styles.badgeIcon}>⭐</span>
        </div>

        <h2 className={styles.title}>Level Up!</h2>
        <div className={styles.levelDisplay}>
          <span className={styles.levelNumber}>{newLevel}</span>
        </div>

        {milestone && <p className={styles.milestone}>{milestone}</p>}

        <p className={styles.subtitle}>
          You reached <strong>Level {newLevel}</strong>! Keep studying to unlock more!
        </p>

        <button className={styles.continueBtn} onClick={onClose}>
          Continue →
        </button>
      </div>
    </div>
  );
}
