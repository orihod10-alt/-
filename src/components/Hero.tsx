"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { useVideoAutoplay } from "@/utils/useVideoAutoplay";

/**
 * Custom character splitter — replaces SplitText (Club GreenSock paid plugin).
 * Wraps each character in a .char-wrap > .char span pair for overflow-hidden reveal.
 */
function CharSplit({ text, className, style }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={{ ...style, display: "block" }}>
      {text.split("").map((char, i) => (
        <span key={i} className="char-wrap" style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.2em" }}>
          <span
            className="char"
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {char === " " ? " " : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate .char elements inside headlineRef
      const chars = headlineRef.current?.querySelectorAll<HTMLElement>(".char");
      if (!chars?.length) return;

      // Set initial state
      gsap.set(chars, { y: "120%", opacity: 0, rotation: 8 });

      // Staggered reveal
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.035,
        delay: 0.2,
      });

      // Eyebrow
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0)", duration: 0.9, ease: "power3.out", delay: 0.9 }
      );

      // CTA row
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 1.1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Force muted autoplay — works on iOS Safari and Android Chrome */
  useVideoAutoplay(videoRef);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        background: "var(--charcoal-deep)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* ── Layer 1: Background Video ── */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* ── Grain on video ── */}
      <div className="grain" style={{ zIndex: 1 }} />

      {/* ── Layer 2: Gradient overlay ── */}
      <div
        aria-hidden="true"
        className="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(15,12,8,0.95) 0%, rgba(15,12,8,0.6) 40%, rgba(15,12,8,0.3) 70%, rgba(15,12,8,0.15) 100%)",
        }}
      />

      {/* ── Layer 3: Headline content (bottom-right / RTL) ── */}
      <div
        className="hero-content-wrap"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          paddingTop: "clamp(100px, 14vh, 160px)",
          paddingBottom: "clamp(60px, 8vh, 100px)",
          paddingInline: "clamp(24px, 5vw, 64px)",
          maxWidth: 1280,
          marginInline: "auto",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
            opacity: 0,
          }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "var(--accent)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-heebo, Arial, sans-serif)",
              fontSize: 12,
              letterSpacing: "0.3em",
              lineHeight: 1.8,
              textTransform: "uppercase",
              color: "var(--cream-muted)",
            }}
          >
            // אינסטלציה ברמה אחרת
          </span>
        </div>

        {/* Headline — two lines */}
        <div
          ref={headlineRef}
          style={{
            maxWidth:     "min(1100px, 90vw)",
            overflow:     "visible",
            paddingBottom: "0.3em",
            paddingRight:  "0.1em",
          }}
        >
          <CharSplit
            text="כי הבית שלך"
            className="hero-headline-line"
            style={{
              fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
              fontWeight:    400,
              color:         "var(--cream)",
              lineHeight:    0.92,
              letterSpacing: "-0.02em",
              marginBottom:  "0.05em",
            }}
          />
          <span
            className="hero-headline-line"
            style={{
              fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
              fontStyle:     "italic",
              fontWeight:    400,
              color:         "var(--accent)",
              lineHeight:    1.15,
              letterSpacing: "-0.02em",
              display:       "block",
              paddingBottom: "0.25em",
              overflow:      "visible",
            }}
          >
            {/* Amber line split separately for color */}
            {"ראוי ליותר.".split("").map((char, i) => (
              <span key={i} className="char-wrap" style={{ display: "inline-block", overflow: "visible", paddingBottom: "0.2em", paddingRight: "0.05em", paddingLeft: "0.05em" }}>
                <span className="char" style={{ display: "inline-block" }}>
                  {char === " " ? " " : char}
                </span>
              </span>
            ))}
          </span>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            marginTop: 36,
            maxWidth: 540,
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-heebo, Arial, sans-serif)",
              fontSize: "clamp(14px, 3.5vw, 17px)",
              lineHeight: 1.7,
              color: "var(--cream-muted)",
              paddingBottom: "0.2em",
            }}
          >
            20 שנות ניסיון. אלפי בתים בירושלים.
            <br />
            גישה שונה לחלוטין לאינסטלציה.
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            marginTop: 40,
            display: "flex",
            gap: 36,
            alignItems: "center",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          {/* Primary CTA */}
          <a
            href="#process"
            className="hover-amber-line"
            style={{
              fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              color: "var(--cream)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 4,
            }}
          >
            קבע ייעוץ
            <span style={{ fontSize: "0.9em" }}>←</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#services"
            className="hover-amber-line"
            style={{
              fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              color: "var(--cream-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 4,
            }}
          >
            ראה עבודות
            <ArrowDown size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>

    </section>
  );
}
