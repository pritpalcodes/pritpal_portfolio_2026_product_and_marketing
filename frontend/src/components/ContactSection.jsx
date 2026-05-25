import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Linkedin, Github, FileText, Twitter, BookOpen, Mail } from "lucide-react";
import site from "../data/site.json";

const ICONS = [
  { key: "linkedin", icon: Linkedin, label: "LinkedIn", url: site.socials.linkedin },
  { key: "github", icon: Github, label: "Github", url: site.socials.github },
  { key: "twitter", icon: Twitter, label: "Twitter", url: site.socials.twitter },
  { key: "medium", icon: BookOpen, label: "Medium", url: site.socials.medium },
  { key: "resume", icon: FileText, label: "Resume", url: site.resume },
  { key: "email", icon: Mail, label: "Email", url: `mailto:${site.email}` },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative px-6 sm:px-12 lg:px-20 max-w-5xl mx-auto py-24 sm:py-36 text-center"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
        07 · Contact
      </div>
      <h2 className="font-serif text-4xl sm:text-6xl leading-tight">
        Let's build something <em>weird.</em>
      </h2>
      <p className="mt-5 text-neutral-600 max-w-xl mx-auto">
        Always open to talking about products, growth, side projects, or your
        favourite teardown.
      </p>

      <button
        onClick={copy}
        data-testid="email-pill"
        className="group mt-10 inline-flex items-center gap-3 px-5 sm:px-8 py-4 sm:py-5 rounded-full bg-white border border-black/10 soft-shadow-lg hover:border-orange-300 transition-colors"
      >
        <span className="font-serif text-xl sm:text-3xl text-neutral-900 group-hover:text-orange-600 transition-colors break-all">
          {site.email}
        </span>
        <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </span>
      </button>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {ICONS.map(({ key, icon: Icon, label, url }) => (
          <motion.a
            key={key}
            href={url}
            target={url.startsWith("mailto") || url === "#" ? undefined : "_blank"}
            rel="noopener noreferrer"
            data-testid={`social-${key}`}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white border border-black/10 hover:border-orange-300 hover:text-orange-600 text-sm text-neutral-700 transition-colors"
          >
            <Icon size={15} strokeWidth={1.7} />
            <span>{label}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
