import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check } from "lucide-react";
import { highlight } from "../lib/highlight.jsx";
import site from "../data/site.json";

const PROFILE_IMG =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80";

export default function Hero() {
  const [copied, setCopied] = useState(false);
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
      className="relative min-h-[88vh] pt-20 sm:pt-28 pb-20 px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="text-xs uppercase tracking-[0.22em] text-neutral-500 mb-8">
          Portfolio · v1.0
        </div>

        <div className="flex items-center gap-5 sm:gap-7 mb-8">
          <div className="relative shrink-0">
            <div
              data-testid="profile-image"
              className={`relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-orange-100 ${
                site.openToWork ? "otw-ring" : ""
              }`}
            >
              <img
                src={PROFILE_IMG}
                alt="Pritpal Singh"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            {site.openToWork && (
              <span
                data-testid="open-to-work"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-green-600 text-white text-[10px] font-medium uppercase tracking-wider soft-shadow"
              >
                Open to Work
              </span>
            )}
          </div>

          <div>
            <h1
              data-testid="hero-name"
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
            >
              {site.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-neutral-600">
              {site.role}{" "}
              <span className="text-orange-500">·</span> based in{" "}
              {site.location.split(",")[0]}
            </p>
          </div>
        </div>

        <p
          data-testid="hero-tagline"
          className="max-w-2xl text-lg sm:text-xl text-neutral-800 leading-[1.55]"
        >
          {highlight(site.tagline)}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            data-testid="cta-resume"
            href={site.resume}
            download
            className="btn-orbit group inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm hover:brightness-110 transition-all"
          >
            <Download size={15} strokeWidth={1.9} />
            Download Resume
          </a>
          <button
            data-testid="cta-copy-email"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-black/10 text-sm hover:border-orange-300 hover:text-orange-600 transition-colors"
          >
            {copied ? (
              <Check size={15} strokeWidth={1.9} />
            ) : (
              <Copy size={15} strokeWidth={1.9} />
            )}
            {copied ? "Copied" : site.email}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
