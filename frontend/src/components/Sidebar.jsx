import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FlaskConical,
  Briefcase,
  Award,
  PenLine,
  Linkedin,
} from "lucide-react";

const ITEMS = [
  { id: "home", label: "Home", icon: Home, type: "nav" },
  { id: "playground", label: "Playground", icon: FlaskConical, type: "nav" },
  { id: "experience", label: "Experience", icon: Briefcase, type: "nav" },
  { id: "certifications", label: "Certifications", icon: Award, type: "external" },
  { id: "writing", label: "Writing", icon: PenLine, type: "nav" },
  { id: "divider", type: "divider" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, type: "external" },
];

export default function Sidebar({ active, onNavigate, externalUrls }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      data-testid="sidebar"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      initial={false}
      animate={{ width: open ? 196 : 64 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col rounded-2xl bg-white/85 backdrop-blur-md border border-black/5 soft-shadow overflow-hidden"
      style={{ padding: 8 }}
    >
      {ITEMS.map((item) => {
        if (item.type === "divider") {
          return (
            <div
              key="divider"
              data-testid="nav-divider"
              className="my-2 mx-3 h-px bg-black/10"
            />
          );
        }
        const { id, label, icon: Icon } = item;
        const isActive = active === id;
        const isExternal = item.type === "external";
        return (
          <button
            key={id}
            data-testid={`nav-${id}`}
            onClick={() => {
              if (isExternal && externalUrls && externalUrls[id]) {
                window.open(externalUrls[id], "_blank", "noopener");
              } else {
                onNavigate(id);
              }
            }}
            className="group relative flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-orange-50"
          >
            <span
              className={`flex h-6 w-6 items-center justify-center transition-transform group-hover:scale-110 ${
                isActive ? "text-orange-500" : "text-neutral-700"
              }`}
            >
              <Icon size={18} strokeWidth={1.6} />
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
        );
      })}
    </motion.nav>
  );
}
