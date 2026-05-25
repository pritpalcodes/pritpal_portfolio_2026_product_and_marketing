import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { highlight } from "../lib/highlight.jsx";
import site from "../data/site.json";

export default function AboutSection() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const paragraphs =
        containerRef.current.querySelectorAll("[data-paragraph]");
      const viewportMid = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      paragraphs.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const dist = Math.abs(viewportMid - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const paragraphStyle = (i) => {
    const diff = i - active;
    if (diff === 0) return { opacity: 1, filter: "blur(0px)" };
    if (Math.abs(diff) === 1) return { opacity: 0.65, filter: "blur(0px)" };
    if (Math.abs(diff) === 2) return { opacity: 0.4, filter: "blur(1px)" };
    return { opacity: 0.25, filter: "blur(3px)" };
  };

  return (
    <section
      id="about"
      data-testid="about-section"
      ref={containerRef}
      className="relative px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16">
        <div className="md:sticky md:top-28 self-start">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
            01 · About
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-orange-50 soft-shadow">
            <img
              src="https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=600&q=80"
              alt="Workspace"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                Currently
              </div>
              <div className="text-sm text-neutral-800">
                Leading SEO-led organic growth · Omniful
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
            A product person who lives at
            <br />
            the <em>intersection</em> of {" "}
            <span className="kw">growth</span>,
            <span className="kw mx-1">AI</span>, and storytelling.
          </h2>
          {site.longIntro.map((p, i) => (
            <motion.p
              key={i}
              data-paragraph
              data-testid={`about-p-${i}`}
              animate={paragraphStyle(i)}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="reveal-paragraph text-lg sm:text-xl text-neutral-800 leading-relaxed"
            >
              {highlight(p)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
