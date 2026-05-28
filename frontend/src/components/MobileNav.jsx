import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Linkedin, Download } from "lucide-react";

const ITEMS = [
  { id: "writing", label: "Writing", icon: PenLine, type: "nav" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, type: "external" },
  { id: "resume", label: "Resume", icon: Download, type: "download" },
];

export default function MobileNav({ active, onNavigate, externalUrls, resumeUrl }) {
  const [visible, setVisible] = useState(true);

  // Smart hide on scroll (mobile): hide while user is scrolling, reveal when scroll stops
  useEffect(() => {
    let lastY = window.scrollY;
    let stillTimer = null;

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) setVisible(false);
      lastY = y;
      if (stillTimer) clearTimeout(stillTimer);
      stillTimer = setTimeout(() => setVisible(true), 220);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stillTimer) clearTimeout(stillTimer);
    };
  }, []);

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
    <AnimatePresence>
      {visible && (
        <motion.nav
          data-testid="mobile-nav"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0 px-1 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/5 soft-shadow"
        >
          {ITEMS.map((item, i) => {
            const { id, label, icon: Icon } = item;
            const isActive = active === id;
            return (
              <div key={id} className="flex items-center">
                {i > 0 && (
                  <span
                    data-testid={`mnav-sep-${i}`}
                    className="mx-0.5 h-4 w-px bg-black/15"
                    aria-hidden
                  />
                )}
                <button
                  data-testid={`mnav-${id}`}
                  onClick={() => handle(item)}
                  className={`flex items-center gap-1.5 h-9 px-3 rounded-full transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-neutral-700 hover:text-orange-600"
                  }`}
                >
                  <Icon size={14} strokeWidth={1.8} />
                  <span className="text-[12px] font-medium">{label}</span>
                </button>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
