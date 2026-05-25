import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Copy, Check, ArrowDown } from "lucide-react";
import LiveClock from "./LiveClock";
import StatusBubble from "./StatusBubble";
import site from "../data/site.json";

const PROFILE_IMG =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80";

export default function Hero() {
  const [glowFaded, setGlowFaded] = useState(false);
  const [popLabels, setPopLabels] = useState([]);
  const [copied, setCopied] = useState(false);
  const popIdRef = useRef(0);

  useEffect(() => {
    const visited = localStorage.getItem("ps_visited");
    if (visited) {
      setGlowFaded(true);
    } else {
      const t = setTimeout(() => {
        setGlowFaded(true);
        localStorage.setItem("ps_visited", "1");
      }, 2200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleImageClick = () => {
    const labels = site.imageLabels;
    const next = labels.map((l, i) => ({
      id: ++popIdRef.current + "-" + i,
      text: l,
      x: (Math.random() - 0.5) * 280,
      y: (Math.random() - 0.5) * 280 - 40,
      delay: i * 0.04,
    }));
    setPopLabels((prev) => [...prev, ...next]);
    setTimeout(() => {
      setPopLabels((prev) => prev.filter((p) => !next.find((n) => n.id === p.id)));
    }, 2400);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section
      id="home"
      data-testid="hero"
      className="relative pt-16 sm:pt-24 pb-16 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      <div className={`hero-glow ${glowFaded ? "faded" : ""}`} />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">
        {/* LEFT: profile + name */}
        <div>
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative">
              <motion.button
                data-testid="profile-image"
                onClick={handleImageClick}
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-orange-100 border-2 border-white soft-shadow cursor-pointer"
              >
                <img
                  src={PROFILE_IMG}
                  alt="Pritpal Singh"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.button>
              <StatusBubble messages={site.statusBubbles} />

              {/* floating image labels */}
              <AnimatePresence>
                {popLabels.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      x: p.x,
                      y: p.y,
                      scale: 1,
                    }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 14,
                      delay: p.delay,
                    }}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-orange-200 text-[11px] text-orange-700 soft-shadow"
                  >
                    {p.text}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex-1">
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                Portfolio · v1.0
              </div>
              <h1
                data-testid="hero-name"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[0.95]"
              >
                {site.name}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-neutral-600">
                {site.role} <span className="text-orange-500">·</span> based in {site.location.split(",")[0]}
              </p>
            </div>
          </div>

          <p
            data-testid="hero-tagline"
            className="mt-8 max-w-xl text-base sm:text-lg text-neutral-700 leading-relaxed"
          >
            {site.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              data-testid="cta-resume"
              href={site.resume}
              download
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-sm hover:bg-orange-500 transition-colors"
            >
              <Download size={15} strokeWidth={1.8} />
              Download Resume
            </a>
            <button
              data-testid="cta-copy-email"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/10 text-sm hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {copied ? (
                <Check size={15} strokeWidth={1.8} />
              ) : (
                <Copy size={15} strokeWidth={1.8} />
              )}
              {copied ? "Copied" : site.email}
            </button>
          </div>
        </div>

        {/* RIGHT: live clock + status */}
        <div className="md:pt-4">
          <LiveClock timezone={site.timezone} location={site.location} />
          <div className="mt-6 hidden md:flex flex-col items-end gap-2 text-xs text-neutral-400">
            <span>Open to product · growth · 0→1 conversations</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 flex items-center gap-3 text-xs text-neutral-400">
        <ArrowDown size={14} strokeWidth={1.5} className="animate-bounce" />
        <span className="uppercase tracking-[0.2em]">Scroll to read</span>
      </div>
    </section>
  );
}
