"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    const ring = document.createElement("div");

    cursor.id = "cursor";
    ring.id = "ring";

    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });

    function animate() {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return null;
}