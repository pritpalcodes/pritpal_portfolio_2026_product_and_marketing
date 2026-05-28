import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FlaskConical,
  Briefcase,
  PenLine,
  FileText,
  Linkedin,
  Search,
} from "lucide-react";

const ACTIONS = (nav, openLink) => [
  { id: "home", label: "Go to Home", icon: Home, run: () => nav("home") },
  { id: "projects", label: "Go to Projects", icon: Briefcase, run: () => nav("projects") },
  { id: "playground", label: "Go to Playground", icon: FlaskConical, run: () => nav("playground") },
  { id: "writing", label: "Go to Writing", icon: PenLine, run: () => nav("writing") },
  { id: "resume", label: "Open Resume", icon: FileText, run: () => openLink("/assets/Pritpal_Singh_Resume.pdf") },
  { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, run: () => openLink("https://www.linkedin.com/in/oye-pritpal/") },
];

export default function CommandPalette({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const items = ACTIONS(
    (id) => {
      onNavigate(id);
      setOpen(false);
    },
    (url) => {
      window.open(url, "_blank", "noopener");
      setOpen(false);
    }
  ).filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] bg-black/30 backdrop-blur-sm px-4"
          onClick={() => setOpen(false)}
          data-testid="cmdk-overlay"
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-white border border-black/5 soft-shadow-lg overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5">
              <Search size={16} className="text-neutral-400" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type to navigate…"
                data-testid="cmdk-input"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-neutral-400"
              />
              <span className="font-mono text-[10px] text-neutral-400 px-1.5 py-0.5 rounded border border-black/10">
                ESC
              </span>
            </div>
            <ul className="max-h-80 overflow-auto hide-scroll py-2">
              {items.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={a.run}
                    data-testid={`cmdk-${a.id}`}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-orange-50 hover:text-orange-700"
                  >
                    <a.icon size={15} strokeWidth={1.7} />
                    {a.label}
                  </button>
                </li>
              ))}
              {items.length === 0 && (
                <li className="px-4 py-6 text-sm text-neutral-400 text-center">
                  No commands match "{q}"
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
