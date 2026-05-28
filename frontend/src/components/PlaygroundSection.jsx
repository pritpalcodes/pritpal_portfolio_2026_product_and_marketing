import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import playground from "../data/playground.json";

export default function PlaygroundSection() {
  return (
    <section
      id="playground"
      data-testid="playground-section"
      className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto py-24 sm:py-32"
    >
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.22em] text-neutral-400 mb-3">
          04 · Playground
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl">
          Side projects, <em>tools,</em> and bad ideas worth shipping.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {playground.map((p, i) => (
          <motion.div
            key={p.slug}
            data-testid={`playground-${i}`}
            whileHover={{ y: -6, rotate: -0.4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="group relative rounded-2xl bg-white border border-black/5 soft-shadow"
          >
            <Link
              to={`/playground/${p.slug}`}
              data-testid={`playground-link-${p.slug}`}
              className="block p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-orange-50 text-orange-700">
                  {p.kind}
                </span>
                <span className="font-mono text-[10px] text-neutral-400">
                  #{p.tag.toLowerCase()}
                </span>
              </div>
              <h3 className="font-serif text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {p.blurb}
              </p>
              <div className="mt-6 dotted-line" />
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Open case</span>
                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
