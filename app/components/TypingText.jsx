"use client";

import { useEffect, useState } from "react";

export default function TypingText({ texts, speed = 80, pause = 2000, className = "" }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];

    if (!deleting && displayed.length < current.length) {
      const timer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }

    if (!deleting && displayed.length === current.length) {
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }

    if (deleting && displayed.length > 0) {
      const timer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, speed / 2);
      return () => clearTimeout(timer);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }
  }, [displayed, deleting, index, texts, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span style={{
        display: "inline-block",
        width: "3px",
        height: "1em",
        background: "var(--red)",
        marginLeft: "2px",
        animation: "blink 0.8s step-end infinite",
        verticalAlign: "text-bottom",
      }} />
    </span>
  );
}
