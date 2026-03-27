export default function ConversationLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#faf7f2_0%,#fffdf9_100%)] px-4">
      <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-stone-200 bg-white px-8 py-10 shadow-[0_24px_80px_rgba(15,14,13,0.08)]">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.2s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-red-500 [animation-delay:-0.1s]" />
          <span className="h-3 w-3 animate-bounce rounded-full bg-stone-900" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
          Loading Conversation Lessons
        </p>
      </div>
    </main>
  );
}