<div className="hidden md:flex items-center justify-center bg-[#f2f0ec] border-l relative">

  <span className="absolute text-[180px] opacity-5">
    学
  </span>

  <div className="flex flex-col gap-3 z-10">

    {["Hiragana", "Vocabulary", "Grammar", "Conversation", "Kanji"].map((item, i) => (
      <div key={i} className="bg-white px-5 py-4 rounded shadow hover:translate-x-2 transition flex items-center justify-between w-[260px]">
        <div>
          <p className="text-sm font-medium">{item}</p>
          <p className="text-xs text-gray-500">N5 Level</p>
        </div>
        <span className="text-xs text-gray-400">Free</span>
      </div>
    ))}

  </div>

</div>