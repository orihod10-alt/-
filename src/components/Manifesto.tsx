"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Manifesto — cinematic centered scroll reveal.
 * Words in {braces} render in accent italic.
 * Background video at low opacity creates atmosphere.
 */

const LINES: string[] = [
  "אנחנו לא רק מתקנים צנרת.",
  "אנחנו {שומרים} על הבית שלך.",
  "על השקט. על השעון. על האסתטיקה.",
  "זה הסטנדרט שלנו.",
  "זה {הסטנדרט היחיד.}",
];

/* Parse a line into segments: { text, accent } */
interface Segment { text: string; accent: boolean; }

function parseSegments(line: string): Segment[] {
  const segments: Segment[] = [];
  const re = /\{([^}]+)\}|([^{]+)/g;
  let match;
  while ((match = re.exec(line)) !== null) {
    if (match[1] !== undefined) {
      segments.push({ text: match[1], accent: true });
    } else if (match[2] !== undefined) {
      segments.push({ text: match[2], accent: false });
    }
  }
  return segments;
}

/* Flatten all words with metadata for index-based animation */
interface Word {
  text:            string;
  accent:          boolean;
  lineBreakBefore: boolean;
}

const WORDS: Word[] = LINES.flatMap((line, li) => {
  const segments = parseSegments(line);
  const words: { text: string; accent: boolean }[] = [];
  segments.forEach((seg) => {
    seg.text.split(/(\s+)/).filter(Boolean).forEach((tok) => {
      words.push({ text: tok, accent: seg.accent });
    });
  });
  return words.map((w, wi) => ({
    ...w,
    lineBreakBefore: wi === 0 && li > 0,
  }));
});

const TOTAL = WORDS.length;

function AnimatedWord({
  word,
  index,
  scrollYProgress,
}: {
  word: Word;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start   = Math.max(0, (index - 2)  / TOTAL);
  const end     = Math.min(1, (index + 2)  / TOTAL);
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const filter  = useTransform(scrollYProgress, [start, end], ["blur(3px)", "blur(0px)"]);

  return (
    <>
      {word.lineBreakBefore && <br />}
      <motion.span
        style={{
          opacity,
          filter,
          color:     word.accent ? "var(--accent)" : "var(--cream)",
          fontStyle: word.accent ? "italic" : "normal",
          display:   word.text.trim() === "" ? "inline" : "inline",
          textShadow: word.accent
            ? "0 0 32px oklch(72% 0.13 65 / 0.35)"
            : "none",
        }}
      >
        {word.text}
      </motion.span>
    </>
  );
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ["start 0.8", "center 0.4"],
  });

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      style={{
        position:       "relative",
        minHeight:      "120vh",
        background:     "var(--charcoal-deep)",
        overflow:       "hidden",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}
    >
      {/* Atmospheric background video */}
      <video
        src="/videos/smart-water.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{
          position:  "absolute",
          inset:     0,
          width:     "100%",
          height:    "100%",
          objectFit: "cover",
          opacity:   0.12,
          filter:    "blur(8px)",
        }}
      />

      {/* Radial dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(11,9,8,0.88) 70%)",
        }}
      />

      {/* Massive faded watermark */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%) rotate(-6deg)",
          fontSize:      "clamp(14rem, 32vw, 36rem)",
          fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
          fontStyle:     "italic",
          color:         "var(--cream)",
          opacity:       0.028,
          fontWeight:    400,
          whiteSpace:    "nowrap",
          pointerEvents: "none",
          userSelect:    "none",
          lineHeight:    1,
        }}
      >
        אקווה
      </div>

      {/* Film grain */}
      <div className="grain" style={{ zIndex: 1 }} />

      {/* Centered content */}
      <div
        style={{
          position:   "relative",
          zIndex:     10,
          maxWidth:   "min(1100px, 90vw)",
          margin:     "0 auto",
          padding:    "clamp(80px, 12vh, 160px) clamp(24px, 5vw, 64px)",
          textAlign:  "center",
          direction:  "rtl",
        }}
      >
        {/* Eyebrow with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            20,
            marginBottom:   "clamp(48px, 7vh, 80px)",
          }}
        >
          <div style={{ width: 60, height: 1, background: "var(--accent)" }} />
          <span
            style={{
              fontFamily:    "var(--font-heebo, Arial, sans-serif)",
              fontSize:      13,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color:         "var(--accent)",
            }}
          >
            המניפסט שלנו
          </span>
          <div style={{ width: 60, height: 1, background: "var(--accent)" }} />
        </motion.div>

        {/* Scroll-revealed text */}
        <div
          style={{
            fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
            fontSize:      "clamp(2rem, 5vw, 4.5rem)",
            fontWeight:    400,
            lineHeight:    1.55,
            letterSpacing: "-0.01em",
          }}
        >
          {WORDS.map((word, i) => (
            <AnimatedWord
              key={i}
              word={word}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            20,
            marginTop:      "clamp(64px, 10vh, 100px)",
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.18)" }} />
          <span
            style={{
              fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
              fontStyle:  "italic",
              fontSize:   18,
              color:      "var(--cream-muted)",
            }}
          >
            יואב אברהם, מייסד אקווה
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.18)" }} />
        </motion.div>
      </div>
    </section>
  );
}
