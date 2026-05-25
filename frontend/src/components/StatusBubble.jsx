import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusBubble({ messages }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % messages.length),
      3800
    );
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div
      data-testid="status-bubble"
      className="absolute -bottom-3 -right-6 sm:-right-4 z-10"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="px-3 py-1.5 rounded-full bg-white border border-black/5 soft-shadow text-xs text-neutral-700 whitespace-nowrap"
        >
          {messages[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
