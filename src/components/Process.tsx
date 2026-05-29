"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const STEPS = [
  {
    num:      "01",
    label:    "תיאום",
    title:    "שיחה ראשונה",
    subtitle: "מספרים לנו על הבעיה. מתאמים הגעה.",
    body:     "שיחה של 5 דקות מספיקה. אין צורך לחכות שעות. אנחנו מגיעים בחלון הזמן שמתאים לך — ולא להפך.",
    videoSrc: "/videos/process-1.mp4",
  },
  {
    num:      "02",
    label:    "אבחון",
    title:    "מאתרים את הבעיה",
    subtitle: "ציוד מדידה מקצועי. אבחון מדויק.",
    body:     "טכנולוגיית אבחון שמאפשרת לאתר כל בעיה — דליפות, סתימות, לחץ נמוך — בלי לשבור קיר אחד.",
    videoSrc: "/videos/process-2.mp4",
  },
  {
    num:      "03",
    label:    "ביצוע",
    title:    "תיקון מקצועי",
    subtitle: "עבודה נקייה. חומרים מהמדרגה הראשונה.",
    body:     "כל תיקון מבוצע לפי תקן ישראלי, עם חומרים מקצועיים בלבד. עובדים בסדר, עוזבים נקיים.",
    videoSrc: "/videos/process-3.mp4",
  },
  {
    num:      "04",
    label:    "אחריות",
    title:    "בדיקה ואחריות",
    subtitle: "בדיקת לחץ. 5 שנות אחריות בכתב.",
    body:     "לא נעזוב לפני שהכל עובד בדיוק כמו שצריך. מסמכי אחריות, ביטוח מקצועי, ושקט נפשי מלא.",
    videoSrc: "/videos/process-4.mp4",
  },
];

export default function Process() {
  /* ── Refs ── */
  const desktopRef = useRef<HTMLDivElement>(null);
  const videoRefs  = useRef<(HTMLVideoElement | null)[]>([null, null, null, null]);

  /* ── Active step — driven entirely by Framer Motion scroll ── */
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target:  desktopRef,
    offset:  ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveStep(Math.min(3, Math.floor(latest * 4)));
  });

  /* ── Sync video playback ── */
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeStep) vid.play().catch(() => {});
      else vid.pause();
    });
  }, [activeStep]);

  const step = STEPS[activeStep];

  return (
    <section id="process">

      {/* ════════════════════════════════════════════
          DESKTOP — 400vh sticky cinematic scroll
      ════════════════════════════════════════════ */}
      <div
        ref={desktopRef}
        className="hidden md:block"
        style={{ height: "400vh", position: "relative" }}
      >
        <div
          style={{
            position:            "sticky",
            top:                 0,
            height:              "100vh",
            overflow:            "hidden",
            background:          "var(--charcoal-deep)",
            display:             "grid",
            gridTemplateColumns: "7fr 5fr",
            direction:           "rtl",
            borderTop:           "1px solid var(--border-line)",
            borderBottom:        "1px solid var(--border-line)",
          }}
        >

          {/* ══ VIDEO COLUMN (right in RTL — 7fr — bigger, cinematic) ══ */}
          <div style={{ position: "relative", overflow: "hidden" }}>

            {/* Videos — opacity + blur crossfade */}
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: activeStep === i ? 1 : 0,
                  filter:  activeStep === i ? "blur(0px)" : "blur(6px)",
                }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  inset:    0,
                  zIndex:   activeStep === i ? 1 : 0,
                }}
              >
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={s.videoSrc}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{
                    width:     "100%",
                    height:    "100%",
                    objectFit: "cover",
                    filter:    "brightness(0.55)",
                  }}
                />
              </motion.div>
            ))}

            {/* Cinematic color grade */}
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         0,
                zIndex:        2,
                pointerEvents: "none",
                background:    "linear-gradient(135deg, rgba(20,15,10,0.35) 0%, rgba(20,15,10,0.55) 100%)",
              }}
            />

            {/* Film grain */}
            <div className="grain" style={{ zIndex: 3 }} />

            {/* MASSIVE watermark step number — centered, counter-rotates in */}
            <div
              aria-hidden="true"
              style={{
                position:       "absolute",
                inset:          0,
                zIndex:         4,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "flex-start",
                paddingInlineStart: "4%",
                pointerEvents:  "none",
                overflow:       "hidden",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeStep}
                  initial={{ opacity: 0, y: 64, rotate: -2 }}
                  animate={{ opacity: 0.08, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -40, rotate: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                    fontStyle:     "italic",
                    fontSize:      "clamp(280px, 30vw, 460px)",
                    fontWeight:    700,
                    color:         "var(--cream)",
                    lineHeight:    0.82,
                    letterSpacing: "-0.05em",
                    display:       "block",
                    userSelect:    "none",
                  }}
                >
                  {step.num}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Left-edge vertical sweep line */}
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                left:          0,
                top:           0,
                width:         1,
                height:        "100%",
                zIndex:        5,
                pointerEvents: "none",
                background:    "linear-gradient(180deg, transparent 0%, var(--accent) 50%, transparent 100%)",
                backgroundSize: "1px 40%",
                animation:     "process-line-sweep 4s linear infinite",
              }}
            />

            {/* Fade toward text column (left edge of video column = shared border) */}
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         0,
                zIndex:        7,
                pointerEvents: "none",
                background:    "linear-gradient(90deg, var(--charcoal-deep) 0%, transparent 28%)",
              }}
            />
          </div>

          {/* ══ TEXT COLUMN (left in RTL — 5fr) ══ */}
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              padding:       "clamp(36px, 4.5vw, 64px)",
              position:      "relative",
              zIndex:        8,
              direction:     "rtl",
            }}
          >
            {/* Section label + step counter */}
            <div style={{ marginBottom: 32 }}>
              <p
                style={{
                  fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                  fontSize:      10,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color:         "var(--cream-muted)",
                  opacity:       0.4,
                  marginBottom:  12,
                }}
              >
                // התהליך שלנו
              </p>
              {/* Step counter: lines flanking "01 / 04" */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 1, background: "var(--accent)", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                    fontStyle:     "italic",
                    fontSize:      12,
                    color:         "var(--accent)",
                    letterSpacing: "0.25em",
                    transition:    "color 0.35s ease",
                  }}
                >
                  {String(activeStep + 1).padStart(2, "0")} / 04
                </span>
                <div style={{ width: 20, height: 1, background: "var(--accent)", flexShrink: 0 }} />
              </div>
            </div>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width:        i === activeStep ? 28 : 6,
                    height:       6,
                    borderRadius: 3,
                    background:   i === activeStep ? "var(--accent)" : "var(--border-line)",
                    transition:   "width 0.45s cubic-bezier(0.16,1,0.3,1), background 0.35s ease",
                    flexShrink:   0,
                  }}
                />
              ))}
            </div>

            {/* Animated step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Step label */}
                <span
                  style={{
                    fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                    fontSize:      10,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color:         "var(--accent)",
                    display:       "block",
                    marginBottom:  18,
                  }}
                >
                  {step.label}
                </span>

                {/* Vertical accent line + title with character reveal */}
                <div
                  style={{
                    display:      "flex",
                    alignItems:   "flex-start",
                    gap:          18,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width:        2,
                      height:       80,
                      background:   "var(--accent)",
                      flexShrink:   0,
                      marginTop:    6,
                      borderRadius: 1,
                    }}
                  />
                  <h2
                    style={{
                      fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                      fontSize:      "clamp(3rem, 5vw, 5rem)",
                      fontWeight:    400,
                      color:         "var(--cream)",
                      lineHeight:    1.0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title.split("").map((char, ci) => (
                      <motion.span
                        key={`${activeStep}-${ci}`}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay:    ci * 0.04,
                          ease:     [0.22, 1, 0.36, 1],
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char === " " ? " " : char}
                      </motion.span>
                    ))}
                  </h2>
                </div>

                {/* Subtitle */}
                <p
                  style={{
                    fontFamily:   "var(--font-frank-ruhl, Georgia, serif)",
                    fontStyle:    "italic",
                    fontSize:     "clamp(1.05rem, 1.6vw, 1.25rem)",
                    color:        "var(--cream-muted)",
                    lineHeight:   1.5,
                    marginBottom: 16,
                  }}
                >
                  {step.subtitle}
                </p>

                {/* Body */}
                <p
                  style={{
                    fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                    fontSize:      14,
                    lineHeight:    1.75,
                    color:         "var(--cream-muted)",
                    maxWidth:      340,
                    opacity:       0.75,
                    marginBottom:  28,
                    paddingBottom: "0.2em",
                  }}
                >
                  {step.body}
                </p>

                {/* Next-step nudge (hidden on last step) */}
                {activeStep < 3 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    style={{
                      display:       "flex",
                      alignItems:    "center",
                      gap:           6,
                      fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                      fontSize:      11,
                      letterSpacing: "0.2em",
                      color:         "var(--cream-muted)",
                      opacity:       0.38,
                    }}
                  >
                    <span>המשך גלילה</span>
                    <span style={{ fontSize: "0.95em" }}>↓</span>
                  </motion.span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step index list */}
            <div
              style={{
                marginTop:     "auto",
                paddingTop:    32,
                display:       "flex",
                flexDirection: "column",
                gap:           11,
              }}
            >
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        10,
                    opacity:    i === activeStep ? 1 : 0.22,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  {i === activeStep && (
                    <div
                      style={{
                        width:        2,
                        height:       14,
                        background:   "var(--accent)",
                        borderRadius: 1,
                        flexShrink:   0,
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
                      fontStyle:  "italic",
                      fontSize:   11,
                      color:      "var(--accent)",
                      minWidth:   18,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-heebo, Arial, sans-serif)",
                      fontSize:   12,
                      color:      "var(--cream)",
                    }}
                  >
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vignette — full-bleed overlay on entire sticky container */}
          <div
            aria-hidden="true"
            style={{
              position:      "absolute",
              inset:         0,
              zIndex:        9,
              pointerEvents: "none",
              background:    "radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(10,8,6,0.52) 100%)",
            }}
          />

          {/* Location indicator — bottom right (inside video column visually) */}
          <div
            aria-hidden="true"
            style={{
              position:      "absolute",
              bottom:        28,
              right:         32,
              zIndex:        12,
              display:       "flex",
              alignItems:    "center",
              gap:           7,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width:        5,
                height:       5,
                borderRadius: "50%",
                background:   "var(--accent)",
                opacity:      0.65,
              }}
            />
            <span
              style={{
                fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                fontSize:      10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "var(--cream-muted)",
                opacity:       0.38,
              }}
            >
              ירושלים
            </span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MOBILE — video-top / text-below vertical snap
      ════════════════════════════════════════════ */}
      <div
        className="block md:hidden"
        style={{ background: "var(--charcoal-deep)" }}
      >
        <div className="process-carousel">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="process-slide"
              style={{
                width:         "100vw",
                height:        "100dvh",
                display:       "flex",
                flexDirection: "column",
                flexShrink:    0,
              }}
            >
              {/* Video — top 60% */}
              <div
                style={{
                  position:  "relative",
                  height:    "60dvh",
                  overflow:  "hidden",
                  flexShrink: 0,
                }}
              >
                <video
                  autoPlay={i === 0}
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  src={s.videoSrc}
                  style={{
                    position:  "absolute",
                    inset:     0,
                    width:     "100%",
                    height:    "100%",
                    objectFit: "cover",
                    filter:    "brightness(0.55)",
                  }}
                />
                <div className="grain" />

                {/* Blend into text panel below */}
                <div
                  aria-hidden="true"
                  style={{
                    position:      "absolute",
                    inset:         0,
                    background:    "linear-gradient(180deg, rgba(10,8,6,0.12) 0%, transparent 40%, var(--charcoal-deep) 100%)",
                    zIndex:        2,
                    pointerEvents: "none",
                  }}
                />

                {/* Step num — top right (RTL) */}
                <span
                  style={{
                    position:   "absolute",
                    top:        20,
                    right:      22,
                    zIndex:     4,
                    fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
                    fontStyle:  "italic",
                    fontSize:   12,
                    color:      "var(--accent)",
                  }}
                >
                  {s.num}
                </span>

                {/* Section label — top left */}
                <span
                  style={{
                    position:      "absolute",
                    top:           20,
                    left:          22,
                    zIndex:        4,
                    fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                    fontSize:      9,
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color:         "var(--cream-muted)",
                    opacity:       0.45,
                  }}
                >
                  // התהליך שלנו
                </span>
              </div>

              {/* Text panel — remaining ~40% */}
              <div
                style={{
                  flex:           1,
                  background:     "var(--charcoal-deep)",
                  padding:        "24px 28px 28px",
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "center",
                  direction:      "rtl",
                }}
              >
                <span
                  style={{
                    fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                    fontSize:      10,
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color:         "var(--accent)",
                    display:       "block",
                    marginBottom:  10,
                  }}
                >
                  {s.label}
                </span>

                <h3
                  style={{
                    fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                    fontSize:      "clamp(1.8rem, 7vw, 2.4rem)",
                    fontWeight:    400,
                    color:         "var(--cream)",
                    lineHeight:    1.05,
                    letterSpacing: "-0.02em",
                    marginBottom:  8,
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontFamily:   "var(--font-frank-ruhl, Georgia, serif)",
                    fontStyle:    "italic",
                    fontSize:     "clamp(0.9rem, 3.5vw, 1rem)",
                    color:        "var(--cream-muted)",
                    lineHeight:   1.5,
                    marginBottom: 16,
                  }}
                >
                  {s.subtitle}
                </p>

                {/* Swipe indicator dots */}
                <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
                  {STEPS.map((_, j) => (
                    <div
                      key={j}
                      style={{
                        width:        j === i ? 18 : 5,
                        height:       5,
                        borderRadius: 2.5,
                        background:   j === i ? "var(--accent)" : "rgba(255,255,255,0.18)",
                        transition:   "width 0.3s ease",
                        flexShrink:   0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
