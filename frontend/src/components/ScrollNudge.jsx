import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollNudge() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);
  return (
    <motion.div
      data-testid="scroll-nudge"
      style={{ opacity }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2 text-neutral-500"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.28em]">
          Scroll to read
        </span>
        <ChevronDown size={14} strokeWidth={1.6} />
      </motion.div>
    </motion.div>
  );
}
