import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PenLine, Linkedin, Download } from "lucide-react";

const ITEMS = [
  { id: "writing", label: "Writing", icon: PenLine, type: "nav" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, type: "external" },
  { id: "resume", label: "Resume", icon: Download, type: "download" },
];

export default function Sidebar({ active, onNavigate, externalUrls, resumeUrl }) {
  const [open, setOpen] = useState(false);

  const handle = (item) => {
    if (item.type === "external") {
      window.open(externalUrls?.[item.id], "_blank", "noopener");
    } else if (item.type === "download") {
      const a = document.createElement("a");
      a.href = resumeUrl;
      a.download = "Pritpal_Singh_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <motion.nav
      data-testid="sidebar"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      initial={false}
      animate={{ width: open ? 180 : 56 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col rounded-2xl bg-white/85 backdrop-blur-md border border-black/5 soft-shadow overflow-hidden"
      style={{ padding: 6 }}
    >
      {ITEMS.map((item, idx) => {
        const { id, label, icon: Icon } = item;
        const isActive = active === id;
        return (
          <div key={id} className="flex flex-col">
            {idx > 0 && (
              <div className="my-1 mx-3 h-px bg-black/10" data-testid={`nav-sep-${idx}`} />
            )}
            <button
              data-testid={`nav-${id}`}
              onClick={() => handle(item)}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-orange-50"
            >
              <span
                className={`flex h-5 w-5 items-center justify-center transition-transform group-hover:scale-110 ${
                  isActive ? "text-orange-500" : "text-neutral-700"
                }`}
              >
                <Icon size={17} strokeWidth={1.6} />
              </span>
              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                    className={`whitespace-nowrap text-sm ${
                      isActive ? "text-orange-600 font-medium" : "text-neutral-700"
                    }`}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="active-dot"
                  className="absolute left-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-orange-500"
                />
              )}
            </button>
          </div>
        );
      })}
    </motion.nav>
  );
}
