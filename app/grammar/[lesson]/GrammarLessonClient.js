"use client";
import { useState, useCallback } from "react";
import LessonView from "../../components/LessonView";
import HanaDrawer from "../../../components/hana/HanaDrawer";

export default function GrammarLessonClient({ lessonId, data, totalLessons }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardChange = useCallback(
    (index) => {
      setActiveIndex(index);
    },
    []
  );

  return (
    <div className="pb-24">
      <LessonView
        lessonId={lessonId}
        data={data}
        courseSlug="grammar"
        totalLessons={totalLessons}
        onCardChange={handleCardChange}
      />
      <HanaDrawer
        lessonTitle={data.name}
        patterns={data.chars}
        activePatternIndex={activeIndex}
      />
    </div>
  );
}
