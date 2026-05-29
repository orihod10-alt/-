"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Phone } from "lucide-react";

/* WhatsApp SVG (inline — no external dependency) */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-80px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.play().catch(() => {});
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position:     "relative",
        minHeight:    "90vh",
        overflow:     "hidden",
        background:   "var(--charcoal-deep)",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
      }}
    >
      {/* Background video — low opacity */}
      <video
        ref={videoRef}
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
          filter:    "brightness(0.18) saturate(0.4)",
          zIndex:    0,
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/7676386/7676386-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Grain */}
      <div className="grain" />

      {/* Gradient vignette */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--charcoal-deep) 100%)",
          zIndex:     1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position:      "relative",
          zIndex:        5,
          paddingInline: "clamp(24px, 5vw, 64px)",
          textAlign:     "center",
          maxWidth:      820,
        }}
      >
        {/* Eyebrow */}
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
            marginBottom:  24,
          }}
        >
          // מוכנים להתחיל?
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
            fontSize:      "clamp(2rem, 8vw, 6.5rem)",
            fontWeight:    400,
            color:         "var(--cream)",
            lineHeight:    1.0,
            letterSpacing: "-0.025em",
            marginBottom:  28,
          }}
        >
          בואו נעבוד{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
            יחד.
          </em>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          style={{
            fontFamily: "var(--font-heebo, Arial, sans-serif)",
            fontSize:   "clamp(15px, 1.8vw, 17px)",
            lineHeight: 1.7,
            color:      "var(--cream-muted)",
            marginBottom: "clamp(40px, 6vw, 56px)",
            maxWidth:   520,
            marginInline: "auto",
            paddingBottom: "0.2em",
          }}
        >
          תיאור הבעיה לוקח פחות מדקה. אנחנו על הדרך תוך 20 דקות.
          <br />
          זמינים 24/7, כולל שבתות וחגים.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
          className="cta-buttons-row"
          style={{
            display:        "flex",
            gap:            16,
            justifyContent: "center",
            alignItems:     "center",
            flexWrap:       "wrap",
          }}
        >
          {/* Primary — Call */}
          <a
            href="tel:050-1234567"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            10,
              background:     "var(--accent)",
              color:          "var(--charcoal-deep)",
              fontFamily:     "var(--font-heebo, Arial, sans-serif)",
              fontSize:       16,
              fontWeight:     600,
              letterSpacing:  "0.02em",
              textDecoration: "none",
              padding:        "15px 32px",
              borderRadius:   9999,
              border:         "2px solid var(--accent)",
              transition:     "background 0.25s ease, color 0.25s ease, transform 0.18s ease",
              cursor:         "none",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background  = "transparent";
              e.currentTarget.style.color        = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background  = "var(--accent)";
              e.currentTarget.style.color        = "var(--charcoal-deep)";
            }}
          >
            <Phone size={17} strokeWidth={2} />
            050-1234567
          </a>

          {/* Secondary — WhatsApp */}
          <a
            href="https://wa.me/9725012345678?text=שלום%2C%20אני%20מעוניין%20בשירות%20אינסטלציה"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            10,
              color:          "var(--cream)",
              fontFamily:     "var(--font-heebo, Arial, sans-serif)",
              fontSize:       15,
              fontWeight:     500,
              textDecoration: "none",
              padding:        "15px 28px",
              borderRadius:   9999,
              border:         "1px solid var(--border-line)",
              transition:     "border-color 0.25s ease, color 0.25s ease",
              cursor:         "none",
              whiteSpace:     "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color       = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-line)";
              e.currentTarget.style.color       = "var(--cream)";
            }}
          >
            <WhatsAppIcon size={18} />
            וואטסאפ
          </a>
        </motion.div>

        {/* Trust nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily:  "var(--font-heebo, Arial, sans-serif)",
            fontSize:    12,
            color:       "var(--cream-muted)",
            opacity:     0.45,
            marginTop:   28,
            letterSpacing: "0.04em",
          }}
        >
          ✓ ביטוח מקצועי מלא &nbsp;·&nbsp; ✓ הצעת מחיר ללא עלות &nbsp;·&nbsp; ✓ שירות 24/7
        </motion.p>
      </div>
    </section>
  );
}
