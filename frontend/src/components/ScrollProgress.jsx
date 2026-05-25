import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  return (
    <div className="scroll-progress hidden md:block" aria-hidden>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}
