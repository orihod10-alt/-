"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value:   number;
  suffix:  string;
  prefix?: string;
  label:   string;
  sub:     string;
}

const STATS: Stat[] = [
  {
    value:  20,
    suffix: "+",
    label:  "שנות ניסיון",
    sub:    "בירושלים והסביבה",
  },
  {
    value:  5000,
    suffix: "+",
    label:  "לקוחות",
    sub:    "בתים ועסקים",
  },
  {
    value:  98,
    suffix: "%",
    label:  "שביעות רצון",
    sub:    "על בסיס 1,200+ ביקורות",
  },
  {
    value:  24,
    suffix: "/7",
    label:  "זמינות",
    sub:    "כולל שבתות וחגים",
  },
];

function CountUp({
  to,
  suffix,
  running,
}: {
  to:      number;
  suffix:  string;
  running: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef            = useRef<number | null>(null);
  const startRef          = useRef<number | null>(null);
  const duration          = 1800; // ms

  useEffect(() => {
    if (!running) return;

    const animate = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed  = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * to));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [running, to]);

  return (
    <span>
      {to === 5000 && count >= 1000
        ? `${(count / 1000).toFixed(count >= 5000 ? 0 : 1)}K`
        : count.toLocaleString("he-IL")}
      {suffix}
    </span>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: false, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease:     [0.16, 1, 0.3, 1],
        delay:    index * 0.1,
      }}
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "flex-start",
        padding:        "clamp(32px, 4vw, 48px) clamp(24px, 3vw, 40px)",
        borderRight:    index > 0 ? "1px solid var(--border-line)" : "none",
        position:       "relative",
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
          fontSize:      "clamp(3rem, 5.5vw, 5.5rem)",
          fontWeight:    400,
          color:         "var(--cream)",
          lineHeight:    1,
          letterSpacing: "-0.03em",
          display:       "block",
          marginBottom:  12,
        }}
      >
        <CountUp to={stat.value} suffix={stat.suffix} running={inView} />
      </span>

      {/* Amber divider */}
      <div
        style={{
          width:      32,
          height:     1,
          background: "var(--accent)",
          marginBottom: 14,
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
          fontStyle:     "italic",
          fontSize:      "clamp(1rem, 1.6vw, 1.25rem)",
          color:         "var(--cream)",
          display:       "block",
          marginBottom:  6,
          lineHeight:    1.2,
        }}
      >
        {stat.label}
      </span>

      {/* Sub */}
      <span
        style={{
          fontFamily: "var(--font-heebo, Arial, sans-serif)",
          fontSize:   12,
          color:      "var(--cream-muted)",
          opacity:    0.65,
          lineHeight: 1.5,
        }}
      >
        {stat.sub}
      </span>
    </motion.div>
  );
}

export default function StatsImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{
        background:    "var(--charcoal)",
        paddingBlock:  "clamp(56px, 8vh, 96px)",
        paddingInline: "clamp(24px, 5vw, 64px)",
      }}
    >
      {/* Top border accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height:          1,
          background:      "var(--border-line)",
          marginBottom:    "clamp(40px, 6vw, 72px)",
          transformOrigin: "right",
        }}
      />

      {/* Grid — 2 cols mobile, 4 cols desktop */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          maxWidth:            1200,
          marginInline:        "auto",
        }}
      >
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          height:          1,
          background:      "var(--border-line)",
          marginTop:       "clamp(40px, 6vw, 72px)",
          transformOrigin: "right",
        }}
      />
    </section>
  );
}
