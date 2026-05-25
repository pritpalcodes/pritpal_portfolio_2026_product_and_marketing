import writing from "../data/writing.json";
import { ArrowUpRight } from "lucide-react";

export default function WritingSection() {
  return (
    <section
      id="writing"
      data-testid="writing-section"
      className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto py-24 sm:py-32"
    >
      <div className="mb-12 flex items-baseline justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
            05 · Writing
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl">
            Notes, <em>essays,</em> and teardowns.
          </h2>
        </div>
        <span className="text-xs text-neutral-400 hidden sm:block">
          {writing.length} pieces
        </span>
      </div>

      <ul className="divide-y divide-black/10">
        {writing.map((w, i) => (
          <li key={i} data-testid={`writing-${i}`}>
            <a
              href={w.url}
              className="group flex items-center justify-between gap-6 py-6 transition-transform"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl sm:text-2xl leading-snug transition-transform group-hover:translate-x-1.5">
                  {w.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-600 line-clamp-1">
                  {w.summary}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {w.date}
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-neutral-500 group-hover:border-orange-300 group-hover:text-orange-600 transition-colors">
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
