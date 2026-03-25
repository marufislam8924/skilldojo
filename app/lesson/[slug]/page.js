"use client";

import { useParams } from "next/navigation";

export default function LessonPage() {

  const { slug } = useParams();

  return (
    <main style={{padding:"40px"}}>

      <h1 style={{fontSize:"40px"}}>
        Lesson: {slug}
      </h1>

      <p style={{marginTop:"20px"}}>
        This is your learning page.
      </p>

      <div style={{marginTop:"30px"}}>

        <div className="card">
          <h2>Example Lesson</h2>
          <p>こんにちは = Hello</p>
        </div>

      </div>

    </main>
  );
}
