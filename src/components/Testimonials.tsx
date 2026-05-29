"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    id:      1,
    quote:   "כן, הוא הגיע ב-35 דקות, ב-11 בלילה. וכן, הכל עבד לפני שהלך.",
    name:    "דנה לוי",
    role:    "בעלת דירה, גבעת שאול",
    initials: "ד.ל",
    hue:     48,
  },
  {
    id:      2,
    quote:   "לא שברו קיר אחד. מצאו את הדליפה, תיקנו אותה, ועזבו נקיים. זה הכל.",
    name:    "יוסי גולן",
    role:    "מנהל נכסים, מרכז ירושלים",
    initials: "י.ג",
    hue:     220,
  },
  {
    id:      3,
    quote:   "שלוש שנים. תמיד אותה רמה, תמיד אותה נדיבות. לא מחליפים אותם.",
    name:    "רחל מזרחי",
    role:    "בעלת הבית, בית הכרם",
    initials: "ר.מ",
    hue:     160,
  },
  {
    id:      4,
    quote:   "הצעת המחיר הייתה מדויקת. לא שקל אחד יותר. זה נדיר בתחום הזה.",
    name:    "אבי שמיר",
    role:    "קבלן בנייה, מלחה",
    initials: "א.ש",
    hue:     30,
  },
  {
    id:      5,
    quote:   "ידעו בדיוק מה אני צריכה, עוד לפני שסיימתי לתאר את הבעיה. מרשים.",
    name:    "מיכל הרצוג",
    role:    "אם לשלושה, הר נוף",
    initials: "מ.ה",
    hue:     280,
  },
  {
    id:      6,
    quote:   "הג'קוזי עובד מצוין. ויואב עצמו בא לבדוק שבוע אחרי. זה אומר הכל.",
    name:    "ניר בן-דוד",
    role:    "פנטהאוז, קטמון",
    initials: "נ.ב",
    hue:     190,
  },
];

const BIG_WORDS = ["מקצועי.", "מהיר.", "מהימן."];

const INTERVAL_MS = 3200;

export default function Testimonials() {
  const [active,    setActive]    = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=backward
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-80px" });

  const advance = useCallback((delta: number) => {
    setDirection(delta);
    setActive((prev) => (prev + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  /* Auto-advance */
  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(1), INTERVAL_MS);
  };

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
    resetTimer();
  };

  /* Swipe gesture on mobile */
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info;
    if (offset.x < -40 || velocity.x < -300) {
      advance(1); resetTimer();
    } else if (offset.x > 40 || velocity.x > 300) {
      advance(-1); resetTimer();
    }
  };

  const t = TESTIMONIALS[active];

  const variants = {
    enter:   (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center:  { opacity: 1, y: 0 },
    exit:    (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background:    "var(--charcoal-deep)",
        paddingBlock:  "clamp(64px, 10vh, 128px)",
        paddingInline: "clamp(24px, 5vw, 64px)",
        overflow:      "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-end",
          marginBottom:   "clamp(48px, 7vw, 80px)",
          flexWrap:       "wrap",
          gap:            24,
        }}
      >
        <div>
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
            // מה אומרים הלקוחות
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
              fontSize:      "clamp(2rem, 4.5vw, 4.2rem)",
              fontWeight:    400,
              color:         "var(--cream)",
              lineHeight:    1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {BIG_WORDS.map((word, i) => (
              <span key={word}>
                {i < 2 ? (
                  <span style={{ color: "var(--cream)" }}>{word} </span>
                ) : (
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>{word}</em>
                )}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-heebo, Arial, sans-serif)",
            fontSize:   13,
            color:      "var(--cream-muted)",
            opacity:    0.55,
            whiteSpace: "nowrap",
          }}
        >
          {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </motion.span>
      </div>

      {/* ── Main testimonial card ── */}
      <div
        style={{
          maxWidth:     900,
          marginInline: "auto",
          position:     "relative",
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={handleDragEnd}
          style={{ cursor: "grab" }}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Quote mark */}
              <motion.div
                style={{
                  fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                  fontSize:      "clamp(64px, 10vw, 112px)",
                  color:         "var(--accent)",
                  lineHeight:    0.7,
                  marginBottom:  24,
                  opacity:       0.35,
                  userSelect:    "none",
                }}
                aria-hidden="true"
              >
                ❝
              </motion.div>

              {/* Quote text */}
              <blockquote
                style={{
                  fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                  fontSize:      "clamp(1.5rem, 3.2vw, 2.6rem)",
                  fontWeight:    400,
                  fontStyle:     "italic",
                  color:         "var(--cream)",
                  lineHeight:    1.35,
                  letterSpacing: "-0.01em",
                  marginBottom:  "clamp(32px, 5vw, 48px)",
                  borderRight:   "3px solid var(--accent)",
                  paddingRight:  "clamp(20px, 2.5vw, 32px)",
                }}
              >
                {t.quote}
              </blockquote>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* Avatar */}
                <div
                  style={{
                    width:           48,
                    height:          48,
                    borderRadius:    "50%",
                    background:      `oklch(30% 0.04 ${t.hue})`,
                    border:          "1px solid var(--border-line)",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    flexShrink:      0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
                      fontSize:   14,
                      color:      `oklch(72% 0.12 ${t.hue})`,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t.initials}
                  </span>
                </div>

                <div>
                  <p
                    style={{
                      fontFamily:   "var(--font-frank-ruhl, Georgia, serif)",
                      fontStyle:    "italic",
                      fontSize:     17,
                      color:        "var(--cream)",
                      lineHeight:   1.2,
                      marginBottom: 4,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-heebo, Arial, sans-serif)",
                      fontSize:   12,
                      color:      "var(--cream-muted)",
                      opacity:    0.65,
                    }}
                  >
                    {t.role}
                  </p>
                </div>

                {/* Stars */}
                <div
                  style={{
                    marginRight: "auto",
                    display:     "flex",
                    gap:         3,
                  }}
                  aria-label="5 כוכבים"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="var(--accent)"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "clamp(32px, 5vw, 48px)",
            marginTop:      "clamp(40px, 6vw, 56px)",
            justifyContent: "flex-start",
          }}
        >
          {/* Prev/Next arrows */}
          <div style={{ display: "flex", gap: 12 }}>
            {([-1, 1] as const).map((delta) => (
              <button
                key={delta}
                onClick={() => { advance(delta); resetTimer(); }}
                aria-label={delta === -1 ? "הקודם" : "הבא"}
                style={{
                  width:          40,
                  height:         40,
                  borderRadius:   "50%",
                  border:         "1px solid var(--border-line)",
                  background:     "transparent",
                  color:          "var(--cream-muted)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  cursor:         "none",
                  transition:     "border-color 0.25s ease, color 0.25s ease",
                  flexShrink:     0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color       = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-line)";
                  e.currentTarget.style.color       = "var(--cream-muted)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {delta === -1
                    ? <path d="M15 18l-6-6 6-6" />
                    : <path d="M9 18l6-6-6-6" />
                  }
                </svg>
              </button>
            ))}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`עבור לביקורת ${i + 1}`}
                style={{
                  width:        i === active ? 24 : 6,
                  height:       6,
                  borderRadius: 3,
                  background:   i === active ? "var(--accent)" : "var(--border-line)",
                  border:       "none",
                  cursor:       "none",
                  padding:      0,
                  transition:   "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.35s ease",
                  flexShrink:   0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
