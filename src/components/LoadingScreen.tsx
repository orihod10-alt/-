"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const WORDS = ["מתחבר", "מאתר", "מוכן"];
const DURATION_MS = 2600;

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount]     = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [done, setDone]       = useState(false);
  const rafRef                = useRef<number>(0);
  const startRef              = useRef<number>(0);

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Count from 0 → 99 via rAF
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed  = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current  = Math.floor(eased * 99);
      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(99);
        // Small pause then reveal
        setTimeout(() => setDone(true), 220);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Cycle words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((i) => (i + 1) % WORDS.length);
    }, DURATION_MS / WORDS.length);
    return () => clearInterval(interval);
  }, []);

  // On split-reveal exit complete → notify parent
  const handleExitComplete = () => {
    document.body.style.overflow = "";
    onComplete();
  };

  const countStr = String(count).padStart(2, "0");

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            overflow: "hidden",
            background: "var(--charcoal-deep)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Top-left vertical label */}
          <div
            style={{
              position: "absolute",
              top: 32,
              right: 28,
              transform: "rotate(-90deg)",
              transformOrigin: "top right",
              fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "var(--cream)",
              opacity: 0.5,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            אקווה / AQUA
          </div>

          {/* Massive counter */}
          <div
            style={{
              fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
              fontStyle: "italic",
              fontSize: "clamp(8rem, 18vw, 16rem)",
              fontWeight: 400,
              color: "var(--cream)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              userSelect: "none",
              // Slight clip to emphasise the number filling upward
              display: "flex",
              alignItems: "center",
            }}
          >
            {countStr}
          </div>

          {/* Cycling word */}
          <div
            style={{
              marginTop: 24,
              height: 20,
              overflow: "hidden",
              fontFamily: "var(--font-heebo, Arial, sans-serif)",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "var(--cream-muted)",
              textTransform: "uppercase",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{    y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block" }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Amber progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "var(--border-line)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(count / 99) * 100}%`,
                background: "var(--accent)",
                transition: "width 0.05s linear",
                transformOrigin: "right",
              }}
            />
          </div>

          {/* SPLIT REVEAL — triggered when done=true via AnimatePresence exit */}
        </div>
      )}

      {/* When done: two halves split open */}
      {done && (
        <>
          <motion.div
            key="top-half"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {}}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "50vh",
              background: "var(--charcoal-deep)",
              zIndex: 9999,
            }}
          />
          <motion.div
            key="bottom-half"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleExitComplete}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50vh",
              background: "var(--charcoal-deep)",
              zIndex: 9999,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
