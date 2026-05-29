"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

import CustomCursor   from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollFix      from "@/components/ScrollFix";
import LoadingScreen  from "@/components/LoadingScreen";
import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import TrustMarquee   from "@/components/TrustMarquee";
import Manifesto      from "@/components/Manifesto";
import Services       from "@/components/Services";
import Process        from "@/components/Process";
import StatsImpact    from "@/components/StatsImpact";
import Testimonials   from "@/components/Testimonials";
import WhyUs          from "@/components/WhyUs";
import CTAFinal       from "@/components/CTAFinal";
import Footer         from "@/components/Footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* ── Always-mounted UI overlays ── */}
      <CustomCursor />
      <ScrollProgress />
      <ScrollFix />

      {/* ── Cinematic loading screen ── */}
      {!loaded && (
        <LoadingScreen onComplete={() => setLoaded(true)} />
      )}

      {/* ── Page sections ── */}
      <main>
        <Navbar />
        <Hero />
        <TrustMarquee />
        <Manifesto />
        <Services />
        <Process />
        <StatsImpact />
        <Testimonials />
        <WhyUs />
        <CTAFinal />
        <Footer />
      </main>

      {/* ── Mobile sticky phone CTA (appears after load) ── */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="flex md:hidden"
            style={{
              position:      "fixed",
              bottom:        20,
              left:          "50%",
              transform:     "translateX(-50%)",
              zIndex:        40,
              pointerEvents: "auto",
            }}
          >
            <a
              href="tel:050-1234567"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            10,
                background:     "var(--accent)",
                color:          "var(--charcoal-deep)",
                fontFamily:     "var(--font-heebo, Arial, sans-serif)",
                fontSize:       15,
                fontWeight:     700,
                letterSpacing:  "0.02em",
                textDecoration: "none",
                padding:        "13px 28px",
                borderRadius:   9999,
                boxShadow:      "0 8px 32px rgba(0,0,0,0.55)",
                whiteSpace:     "nowrap",
              }}
            >
              <Phone size={17} strokeWidth={2} />
              050-1234567
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
