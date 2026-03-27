export default function ConversationLessonLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#faf7f2_0%,#fffdf9_100%)] px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,14,13,0.08)]">
        <div className="h-3 w-32 animate-pulse rounded-full bg-stone-200" />
        <div className="mt-5 h-10 w-3/4 animate-pulse rounded-2xl bg-stone-200" />
        <div className="mt-4 h-20 animate-pulse rounded-3xl bg-stone-100" />
        <div className="mt-4 h-20 animate-pulse rounded-3xl bg-stone-100" />
        <div className="mt-4 h-20 animate-pulse rounded-3xl bg-stone-100" />
      </div>
    </main>
  );
}