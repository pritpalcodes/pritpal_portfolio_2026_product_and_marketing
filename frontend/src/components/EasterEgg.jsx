import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUOTE = "Good products feel obvious only after they're built.";

export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (e.key.length !== 1) return;
      if (
        ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }
      const next = (buffer + e.key.toLowerCase()).slice(-7);
      setBuffer(next);
      if (next.endsWith("product")) {
        setShow(true);
        setTimeout(() => setShow(false), 3500);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [buffer]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="easter-toast"
          data-testid="easter-egg"
        >
          “{QUOTE}”
        </motion.div>
      )}
    </AnimatePresence>
  );
}
