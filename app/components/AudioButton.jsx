"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AudioButton.module.css";

function speakFallback(text, onEnd) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

export default function AudioButton({ audio, text }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlaybackEnd = () => {
    setIsPlaying(false);
  };

  const handlePlay = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    setMessage("");
    setIsPlaying(true);

    if (!audio) {
      setMessage("Audio unavailable. Using device voice.");
      speakFallback(text, handlePlaybackEnd);
      return;
    }

    const player = new Audio(audio);
    audioRef.current = player;

    player.onended = handlePlaybackEnd;
    player.onerror = () => {
      setMessage("Audio file missing. Using device voice.");
      speakFallback(text, handlePlaybackEnd);
    };

    try {
      await player.play();
    } catch {
      setMessage("Autoplay blocked or audio missing. Using device voice.");
      speakFallback(text, handlePlaybackEnd);
    }
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        onClick={handlePlay}
        className={styles.btn}
        aria-label={isPlaying ? "Stop audio" : "Play audio"}
      >
        {isPlaying ? "■" : "▶"}
      </button>
      {message ? (
        <span className={styles.message}>{message}</span>
      ) : null}
    </div>
  );
}