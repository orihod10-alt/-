"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "right", // RTL: grows from right
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        height: "2px",
        background: "var(--accent)",
        zIndex: 100,
      }}
    />
  );
}
