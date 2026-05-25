import experience from "../data/experience.json";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto py-24 sm:py-32"
    >
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
          03 · Experience
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl">
          Where I've shipped, <em>broken things,</em> and learned.
        </h2>
      </div>

      <ol className="relative border-l border-dashed border-black/15 pl-6 sm:pl-10 space-y-12">
        {experience.map((e, i) => (
          <li
            key={i}
            data-testid={`exp-${i}`}
            className="relative group"
          >
            <span className="absolute -left-[34px] sm:-left-[46px] top-2 h-3 w-3 rounded-full bg-orange-500 ring-4 ring-orange-100" />
            <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-10">
              <div>
                <div className="font-mono text-xs text-neutral-500">
                  {e.period}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  {e.location}
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                  {e.role}
                </h3>
                <div className="text-sm text-orange-600 mt-1">{e.company}</div>
                <p className="mt-3 text-neutral-700 leading-relaxed">
                  {e.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {e.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm text-neutral-700"
                    >
                      <span className="text-orange-500 mt-1.5 shrink-0">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
