import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import projects from "../data/projects.json";
import { highlight } from "../lib/highlight.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-4xl mb-4">Project not found</h1>
        <Link to="/" className="text-orange-600 hover:underline">
          ← Back home
        </Link>
      </div>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="min-h-screen paper-grain pb-32" data-testid="project-detail">
      <header className="relative px-6 sm:px-12 lg:px-20 pt-10 pb-12">
        <button
          onClick={() => navigate(-1)}
          data-testid="case-back"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </header>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto">
        <div className="text-xs uppercase tracking-[0.2em] text-orange-600 mb-4">
          {project.year} · {project.role}
        </div>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
          {project.title}
        </h1>
        <p className="mt-6 text-xl text-neutral-700 max-w-2xl leading-relaxed">
          {project.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-orange-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto mt-16"
      >
        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-orange-50 soft-shadow-lg">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.section>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-3xl mx-auto mt-24 space-y-16">
        <Block label="Problem" body={project.problem} />
        <Block label="Opportunity" body={project.opportunity} />
        <Block label="Approach" body={project.approach} />

        <div>
          <Label label="Experiments" />
          <ul className="space-y-3">
            {project.experiments.map((x, i) => (
              <li key={i} className="flex gap-3 text-neutral-800 text-lg leading-relaxed">
                <span className="text-orange-500 mt-2 shrink-0">·</span>
                <span>{highlight(x)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label label="Impact" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-white border border-black/5 soft-shadow p-5"
              >
                <div className="font-serif text-3xl text-orange-600 leading-none">
                  {m.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mt-3">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label label="Lessons" />
          <ul className="space-y-3">
            {project.lessons.map((x, i) => (
              <li key={i} className="font-serif text-2xl text-neutral-800 leading-snug">
                — {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto mt-32">
        <div className="dotted-line mb-8" />
        <Link
          to={`/projects/${next.slug}`}
          data-testid="case-next"
          className="group block py-6"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Next case study
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-3xl sm:text-4xl group-hover:text-orange-600 transition-colors">
              {next.title}
            </h3>
            <ArrowUpRight
              size={22}
              className="text-neutral-500 group-hover:text-orange-600 transition-colors"
            />
          </div>
        </Link>
      </section>
    </article>
  );
}

function Label({ label }) {
  return (
    <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-5">
      {label}
    </div>
  );
}
function Block({ label, body }) {
  return (
    <div>
      <Label label={label} />
      <p className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-[1.35]">
        {highlight(body)}
      </p>
    </div>
  );
}
