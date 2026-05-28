import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check } from "lucide-react";
import { highlight } from "../lib/highlight.jsx";
import site from "../data/site.json";

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
      className="relative pt-14 sm:pt-24 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="flex items-center gap-4 sm:gap-7 mb-6 sm:mb-8">
          <div
            data-testid="profile-image"
            className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-orange-50 shrink-0"
          >
            <img
              src={site.profileImage}
              alt={site.name}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>

          <div>
            <h1
              data-testid="hero-name"
              className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[0.95]"
            >
              {site.name}
            </h1>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-neutral-600">
              {site.role}{" "}
              <span className="text-orange-500">·</span> based in{" "}
              {site.location.split(",")[0]}
            </p>
          </div>
        </div>

        <p
          data-testid="hero-tagline"
          className="max-w-2xl text-base sm:text-xl text-neutral-800 leading-[1.6]"
        >
          {highlight(site.tagline)}
        </p>

        <div className="mt-7 sm:mt-10 flex flex-wrap gap-3">
          <a
            data-testid="cta-resume"
            href={site.resume}
            download="Pritpal_Singh_Resume.pdf"
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
            {copied ? "Copied" : "Copy Email"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
