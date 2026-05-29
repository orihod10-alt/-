"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ITEMS = [
  "מוסמך משרד הבריאות",
  "ביטוח אחריות מלא",
  "5 שנות אחריות",
  "שירות חירום 24/7",
  "אלפי לקוחות מרוצים",
  "דירוג 5 כוכבים",
];

// Triple for seamless loop
const TRIPLED = [...ITEMS, ...ITEMS, ...ITEMS];

export default function TrustMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Total width to translate: 33.333% (one set of items)
    tweenRef.current = gsap.to(track, {
      xPercent: -33.333,
      duration: 35,
      ease: "none",
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-33.333, 0),
      },
    });

    // Slow on hover, resume on leave
    const slow = () => tweenRef.current?.timeScale(0.3);
    const full = () => tweenRef.current?.timeScale(1);

    track.addEventListener("mouseenter", slow);
    track.addEventListener("mouseleave", full);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", slow);
      track.removeEventListener("mouseleave", full);
    };
  }, []);

  return (
    <div
      id="marquee"
      style={{
        background: "var(--charcoal)",
        paddingBlock: 20,
        borderTop:    "1px solid var(--accent)",
        borderBottom: "1px solid var(--accent)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 0,
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {TRIPLED.map((item, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              paddingInline: 32,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: "var(--accent)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ⌬
            </span>
            <span
              style={{
                fontFamily: "var(--font-heebo, Arial, sans-serif)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "var(--cream-muted)",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
