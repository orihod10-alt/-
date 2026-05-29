"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Clock, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    Icon:  Shield,
    title: "מוגן מכל כיוון",
    body:  "ביטוח אחריות מקצועית מלאה. 5 שנות אחריות על כל עבודה. אתם מוגנים — תמיד.",
    num:   "01",
  },
  {
    Icon:  Clock,
    title: "מגיעים בזמן",
    body:  "חלון הגעה של שעה, לא 'בין 8 ל-14'. SMS כשאנחנו בדרך. הזמן שלכם שווה.",
    num:   "02",
  },
  {
    Icon:  Award,
    title: "עבודת אמן",
    body:  "מוסמך משרד הבריאות. חבר לשכת האינסטלטורים. כל עבודה לפי תקן ישראלי.",
    num:   "03",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Parallax on the background video */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const ctx = gsap.context(() => {
      gsap.to(video, {
        yPercent: 20,
        ease:     "none",
        scrollTrigger: {
          trigger: section,
          start:   "top bottom",
          end:     "bottom top",
          scrub:   true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* 3-D mouse parallax on the glass panel */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="why-us"
      style={{
        position:   "relative",
        overflow:   "hidden",
        background: "var(--charcoal-deep)",
        paddingBlock: "clamp(80px, 12vh, 160px)",
      }}
    >
      {/* ── Parallax background video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      "-20% 0",
          width:      "100%",
          height:     "140%",
          objectFit:  "cover",
          filter:     "brightness(0.22) saturate(0.5)",
          zIndex:     0,
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/5532765/5532765-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Grain */}
      <div className="grain" />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset:    0,
          background: "linear-gradient(180deg, var(--charcoal-deep) 0%, rgba(11,9,8,0.55) 40%, rgba(11,9,8,0.7) 100%)",
          zIndex:   1,
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position:      "relative",
          zIndex:        5,
          paddingInline: "clamp(24px, 5vw, 64px)",
          maxWidth:      1280,
          marginInline:  "auto",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily:    "var(--font-heebo, Arial, sans-serif)",
              fontSize:      12,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "var(--accent)",
              marginBottom:  16,
            }}
          >
            // למה אקווה
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
              fontSize:      "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight:    400,
              color:         "var(--cream)",
              lineHeight:    1.0,
              letterSpacing: "-0.02em",
              maxWidth:      700,
            }}
          >
            הסטנדרט שלנו.{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              לא תנאי.
            </em>
          </motion.h2>
        </div>

        {/* 3-D glass panel */}
        <motion.div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
            transformStyle:       "preserve-3d",
            borderRadius:         20,
          }}
        >
          <div
            className="liquid-glass-strong"
            style={{
              borderRadius: 20,
              padding:      "clamp(32px, 5vw, 56px)",
              border:       "1px solid var(--border-line)",
            }}
          >
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                gap:                 "clamp(32px, 4vw, 48px)",
              }}
            >
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    ease:     [0.16, 1, 0.3, 1],
                    delay:    0.2 + i * 0.12,
                  }}
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    gap:           16,
                    paddingRight:  i > 0 ? 0 : 0,
                    borderRight:   i > 0 ? "1px solid var(--border-line)" : "none",
                    paddingInlineStart: i > 0 ? "clamp(24px, 3vw, 40px)" : 0,
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width:           48,
                      height:          48,
                      borderRadius:    12,
                      border:          "1px solid var(--accent)",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      background:      "rgba(var(--accent-rgb, 200,150,60), 0.06)",
                      flexShrink:      0,
                    }}
                  >
                    <pillar.Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: "var(--accent)" }}
                    />
                  </div>

                  {/* Number */}
                  <span
                    style={{
                      fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                      fontStyle:     "italic",
                      fontSize:      12,
                      color:         "var(--accent)",
                      opacity:       0.65,
                    }}
                  >
                    {pillar.num}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                      fontSize:      "clamp(1.2rem, 2vw, 1.6rem)",
                      fontWeight:    400,
                      color:         "var(--cream)",
                      lineHeight:    1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontFamily: "var(--font-heebo, Arial, sans-serif)",
                      fontSize:   14,
                      lineHeight: 1.7,
                      color:      "var(--cream-muted)",
                      opacity:    0.8,
                      paddingBottom: "0.2em",
                    }}
                  >
                    {pillar.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
