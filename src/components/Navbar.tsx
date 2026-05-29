"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "שירותים", href: "#services" },
  { label: "אודות",   href: "#manifesto" },
  { label: "גלריה",   href: "#process"   },
  { label: "המלצות",  href: "#testimonials" },
];

export default function Navbar() {
  const [hidden,   setHidden]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY             = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY.current && current > 80);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Floating pill ── */}
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: hidden ? "-140%" : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 0,
          borderRadius: 9999,
          paddingInline: 28,
          paddingBlock: 12,
          direction: "rtl",
        }}
        className="liquid-glass"
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginLeft: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
              fontSize: 20,
              color: "var(--cream)",
              letterSpacing: "-0.01em",
            }}
          >
            אקווה
          </span>
        </div>

        {/* Links — desktop only */}
        <div
          className="hidden md:flex"
          style={{ gap: 28, alignItems: "center", flex: 1, justifyContent: "center" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-heebo, Arial, sans-serif)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--cream-muted)",
                textDecoration: "none",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--cream-muted)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Phone — desktop */}
        <a
          href="tel:050-1234567"
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-heebo, Arial, sans-serif)",
            fontSize: 13,
            color: "var(--cream)",
            textDecoration: "none",
            transition: "color 0.25s ease",
            marginRight: 32,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--accent)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--cream)")
          }
        >
          <Phone size={14} strokeWidth={1.5} />
          050-1234567
        </a>

        {/* Hamburger — mobile */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="פתח תפריט"
          style={{
            background: "none",
            border: "none",
            color: "var(--cream)",
            cursor: "none",
            padding: 4,
          }}
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </motion.nav>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              background: "rgba(11, 9, 8, 0.92)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="סגור תפריט"
              style={{
                position: "absolute",
                top: 28,
                left: 28,
                background: "none",
                border: "none",
                color: "var(--cream)",
                cursor: "none",
              }}
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Links */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 36,
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
                    fontSize: 28,
                    color: "var(--cream)",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="tel:050-1234567"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-heebo, Arial, sans-serif)",
                  fontSize: 16,
                  color: "var(--accent)",
                  textDecoration: "none",
                }}
              >
                <Phone size={16} strokeWidth={1.5} />
                050-1234567
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
