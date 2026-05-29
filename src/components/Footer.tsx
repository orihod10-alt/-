"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock } from "lucide-react";

/* Inline social icons — lucide removed branded icons */
function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "שירותים", href: "#services" },
  { label: "אודות",   href: "#manifesto" },
  { label: "תהליך",   href: "#process"   },
  { label: "המלצות",  href: "#testimonials" },
  { label: "צור קשר", href: "#cta" },
];

const SERVICES = [
  "תיקון דליפות",
  "שירות חירום 24/7",
  "התקנות יוקרה",
  "פתיחת סתימות",
  "מערכות מים חכמות",
  "שיפוצי אמבטיות",
];

const SOCIAL = [
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: FacebookIcon,  href: "#", label: "Facebook"  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView    = useInView(footerRef, { once: false, margin: "-60px" });

  return (
    <footer
      ref={footerRef}
      style={{
        background:    "var(--charcoal-deep)",
        borderTop:     "1px solid var(--accent)",
        paddingBlock:  "clamp(48px, 7vh, 80px)",
        paddingInline: "clamp(24px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1280, marginInline: "auto" }}>

        {/* ── Top grid ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap:                 "clamp(32px, 4vw, 48px)",
            marginBottom:        "clamp(40px, 6vw, 64px)",
          }}
        >
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo mark */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span
                style={{
                  width:        8,
                  height:       8,
                  borderRadius: "50%",
                  background:   "var(--accent)",
                  display:      "inline-block",
                  flexShrink:   0,
                }}
              />
              <span
                style={{
                  fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
                  fontSize:      24,
                  color:         "var(--cream)",
                  letterSpacing: "-0.01em",
                }}
              >
                אקווה
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-heebo, Arial, sans-serif)",
                fontSize:   13,
                lineHeight: 1.7,
                color:      "var(--cream-muted)",
                opacity:    0.7,
                maxWidth:   220,
                paddingBottom: "0.2em",
              }}
            >
              אינסטלציה ברמה אחרת.
              <br />
              ירושלים והסביבה. EST. 2005.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width:          36,
                    height:         36,
                    borderRadius:   "50%",
                    border:         "1px solid var(--border-line)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    color:          "var(--cream-muted)",
                    transition:     "border-color 0.25s ease, color 0.25s ease",
                    textDecoration: "none",
                    cursor:         "none",
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
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            <h4
              style={{
                fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                fontSize:      11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                marginBottom:  20,
              }}
            >
              ניווט
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily:     "var(--font-heebo, Arial, sans-serif)",
                    fontSize:       14,
                    color:          "var(--cream-muted)",
                    textDecoration: "none",
                    transition:     "color 0.25s ease",
                    width:          "fit-content",
                    cursor:         "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-muted)")}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Services column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
          >
            <h4
              style={{
                fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                fontSize:      11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                marginBottom:  20,
              }}
            >
              שירותים
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {SERVICES.map((svc) => (
                <span
                  key={svc}
                  style={{
                    fontFamily: "var(--font-heebo, Arial, sans-serif)",
                    fontSize:   14,
                    color:      "var(--cream-muted)",
                    opacity:    0.65,
                  }}
                >
                  {svc}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.20 }}
          >
            <h4
              style={{
                fontFamily:    "var(--font-heebo, Arial, sans-serif)",
                fontSize:      11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color:         "var(--accent)",
                marginBottom:  20,
              }}
            >
              יצירת קשר
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a
                href="tel:050-1234567"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            10,
                  fontFamily:     "var(--font-heebo, Arial, sans-serif)",
                  fontSize:       14,
                  color:          "var(--cream-muted)",
                  textDecoration: "none",
                  transition:     "color 0.25s ease",
                  cursor:         "none",
                  width:          "fit-content",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-muted)")}
              >
                <Phone size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                050-1234567
              </a>

              <div
                style={{
                  display:    "flex",
                  alignItems: "flex-start",
                  gap:        10,
                  fontFamily: "var(--font-heebo, Arial, sans-serif)",
                  fontSize:   14,
                  color:      "var(--cream-muted)",
                  opacity:    0.65,
                }}
              >
                <MapPin size={14} strokeWidth={1.5} style={{ marginTop: 3, flexShrink: 0 }} />
                <span>ירושלים והסביבה</span>
              </div>

              <div
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        10,
                  fontFamily: "var(--font-heebo, Arial, sans-serif)",
                  fontSize:   14,
                  color:      "var(--cream-muted)",
                  opacity:    0.65,
                }}
              >
                <Clock size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span>24/7 — כולל שבתות</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop:      "1px solid var(--border-line)",
            paddingTop:     24,
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            flexWrap:       "wrap",
            gap:            12,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-heebo, Arial, sans-serif)",
              fontSize:   12,
              color:      "var(--cream-muted)",
              opacity:    0.4,
            }}
          >
            © 2026 אקווה אינסטלציה. כל הזכויות שמורות.
          </p>

          <p
            style={{
              fontFamily: "var(--font-heebo, Arial, sans-serif)",
              fontSize:   12,
              color:      "var(--cream-muted)",
              opacity:    0.35,
            }}
          >
            רישיון אינסטלציה מס׳ 4821 · ביטוח אחריות מקצועית
          </p>
        </div>
      </div>
    </footer>
  );
}
