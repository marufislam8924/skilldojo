"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("ring");

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener("mousemove", e => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      if (cursor && ring) {
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";

        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;

        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <>
      <div id="cursor" className="cursor"></div>
      <div id="ring" className="cursor-ring"></div>
    </>
  );
}