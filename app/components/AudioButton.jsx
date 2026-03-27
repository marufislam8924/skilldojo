"use client";

import { useEffect, useRef, useState } from "react";

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
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handlePlay}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-lg shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-500 hover:bg-amber-50 active:scale-95"
        aria-label={isPlaying ? "Stop audio" : "Play audio"}
      >
        {isPlaying ? "■" : "▶"}
      </button>
      {message ? (
        <span className="max-w-28 text-right text-[11px] font-medium leading-tight text-stone-500">
          {message}
        </span>
      ) : null}
    </div>
  );
}