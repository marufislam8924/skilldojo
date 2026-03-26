"use client";

import { useEffect } from "react";

export default function Reveal({ children }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    });

    elements.forEach(el => observer.observe(el));
  }, []);

  return <div className="reveal">{children}</div>;
}