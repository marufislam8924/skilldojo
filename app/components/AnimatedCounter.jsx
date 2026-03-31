"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({ target, duration = 2000, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const num = parseInt(target, 10);
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    let start = 0;
    const step = Math.max(1, Math.floor(num / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, target, duration]);

  const display = typeof count === "number" ? `${prefix}${count}${suffix}` : `${prefix}${target}${suffix}`;

  return <span ref={ref}>{display}</span>;
}
