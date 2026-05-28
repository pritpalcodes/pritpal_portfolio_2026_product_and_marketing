import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import writing from "../data/writing.json";

export default function WritingDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const piece = writing.find((w) => w.slug === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    restDelta: 0.001,
  });

  if (!piece) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-4xl mb-4">Essay not found</h1>
        <Link to="/" className="text-orange-600 hover:underline">
          ← Back home
        </Link>
      </div>
    );
  }

  const idx = writing.findIndex((w) => w.slug === slug);
  const next = writing[(idx + 1) % writing.length];

  return (
    <article data-testid="writing-detail" className="relative pb-32">
      <motion.div
        className="fixed left-0 top-0 right-0 h-0.5 bg-orange-500 origin-left z-50"
        style={{ scaleX }}
      />

      <header className="px-6 sm:px-12 lg:px-20 pt-10 pb-6">
        <button
          onClick={() => navigate(-1)}
          data-testid="writing-back"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </header>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-3xl mx-auto pt-6">
        <div className="text-xs uppercase tracking-[0.22em] text-orange-600 mb-5">
          {piece.date} · {piece.readTime}
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
        >
          {piece.title}
        </motion.h1>
        <p className="mt-6 text-xl text-neutral-700 leading-relaxed">
          {piece.summary}
        </p>
      </section>

      {piece.cover && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto mt-14"
        >
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-orange-50 soft-shadow-lg">
            <img
              src={piece.cover}
              alt={piece.title}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.section>
      )}

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-2xl mx-auto mt-20 space-y-7">
        {piece.body.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            data-testid={`writing-p-${i}`}
            className="font-serif text-2xl sm:text-3xl text-neutral-900 leading-[1.45]"
          >
            {p}
          </motion.p>
        ))}
      </section>

      <section className="relative px-6 sm:px-12 lg:px-20 max-w-3xl mx-auto mt-28">
        <div className="dotted-line mb-8" />
        <Link
          to={`/writing/${next.slug}`}
          data-testid="writing-next"
          className="group block py-6"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-2">
            Next essay
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-2xl sm:text-3xl group-hover:text-orange-600 transition-colors">
              {next.title}
            </h3>
            <ArrowUpRight
              size={20}
              className="text-neutral-500 group-hover:text-orange-600 transition-colors"
            />
          </div>
        </Link>
      </section>
    </article>
  );
}
