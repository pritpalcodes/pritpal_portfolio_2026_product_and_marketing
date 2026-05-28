import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import playground from "../data/playground.json";

export default function PlaygroundDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = playground.find((p) => p.slug === slug);

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

  const idx = playground.findIndex((p) => p.slug === slug);
  const next = playground[(idx + 1) % playground.length];

  return (
    <article data-testid="playground-detail" className="relative pb-32">
      <header className="px-6 sm:px-12 lg:px-20 pt-10 pb-6">
        <button
          onClick={() => navigate(-1)}
          data-testid="playground-back"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </header>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto pt-6">
        <div className="text-xs uppercase tracking-[0.22em] text-orange-600 mb-5">
          {project.kind} · #{project.tag.toLowerCase()}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
        >
          {project.title}
        </motion.h1>
        <p className="mt-6 text-xl text-neutral-700 max-w-2xl leading-relaxed">
          {project.blurb}
        </p>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto mt-16"
      >
        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-orange-50 soft-shadow-lg">
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.section>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto mt-24 space-y-24">
        {project.sections.map((s, i) => {
          const alt = i % 2 === 1;
          const galleryImg = project.gallery?.[i % (project.gallery?.length || 1)];
          return (
            <motion.div
              key={i}
              data-testid={`playground-section-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                alt ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="space-y-5">
                <div className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
                  {s.heading}
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {s.body}
                </p>
              </div>
              {galleryImg && (
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-orange-50 soft-shadow">
                  <img
                    src={galleryImg}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              {!galleryImg && (
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center">
                  <span className="font-serif text-2xl text-orange-400 italic">
                    {project.title.split(" ")[0]}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto mt-28">
          <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-6">
            Gallery
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {project.gallery.map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden bg-orange-50 soft-shadow"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                <figcaption className="px-4 py-3 text-xs text-neutral-500">
                  Reference frame {i + 1}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto mt-28">
        <div className="dotted-line mb-8" />
        <Link
          to={`/playground/${next.slug}`}
          data-testid="playground-next"
          className="group block py-6"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
            Next project
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
