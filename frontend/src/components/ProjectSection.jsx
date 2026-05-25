import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import projects from "../data/projects.json";

export default function ProjectSection() {
  const [active, setActive] = useState(0);
  const cur = projects[active];

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto py-24 sm:py-32"
    >
      <div className="flex items-baseline justify-between gap-6 mb-12">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">
            02 · Selected Work
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl">
            Cases, sketches, <em>and ships.</em>
          </h2>
        </div>
        <div className="hidden md:block text-xs text-neutral-400">
          Hover to preview · click to open
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12">
        {/* LEFT — title list */}
        <ul className="space-y-1" data-testid="project-list">
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <li key={p.slug}>
                <Link
                  to={`/projects/${p.slug}`}
                  data-testid={`project-item-${p.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block py-5 border-b border-black/10"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-2">
                        <span>{p.year}</span>
                        <span>·</span>
                        <span>{p.role}</span>
                      </div>
                      <h3
                        className={`font-serif text-2xl sm:text-3xl leading-tight transition-colors ${
                          isActive ? "text-orange-600" : "text-neutral-900"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1 line-clamp-1">
                        {p.subtitle}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isActive ? -45 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className={`shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? "border-orange-300 bg-orange-50 text-orange-600"
                          : "border-black/10 text-neutral-500"
                      }`}
                    >
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </motion.span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT — preview panel */}
        <div className="md:sticky md:top-28 self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.slug}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="bg-white rounded-2xl border border-black/5 soft-shadow-lg overflow-hidden"
              data-testid="project-preview"
            >
              <div className="aspect-[16/10] overflow-hidden bg-orange-50">
                <img
                  src={cur.image}
                  alt={cur.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex flex-wrap gap-1.5">
                  {cur.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-orange-50 text-orange-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1.5">
                    Problem
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {cur.problem}
                  </p>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-1.5">
                    Solution
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {cur.approach}
                  </p>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mb-2">
                    Impact
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {cur.metrics.slice(0, 3).map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl bg-neutral-50 px-3 py-2.5"
                      >
                        <div className="font-serif text-lg text-orange-600 leading-none">
                          {m.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-500 mt-1.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/projects/${cur.slug}`}
                  data-testid="project-open-case"
                  className="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700"
                >
                  Read case study
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
