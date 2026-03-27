import AudioButton from "./AudioButton";

export default function ConversationCard({ item, index }) {
  return (
    <article className="group flex items-start justify-between gap-4 rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,14,13,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,14,13,0.10)] active:scale-[0.99]">
      <div className="space-y-2">
        <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          Line {index}
        </div>
        <p className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {item.japanese}
        </p>
        <p className="text-base font-medium text-amber-700 sm:text-lg">{item.romaji}</p>
        <p className="text-sm leading-6 text-stone-600 sm:text-[15px]">{item.meaning}</p>
      </div>

      <AudioButton audio={item.audio} text={item.japanese} />
    </article>
  );
}