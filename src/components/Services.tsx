"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Service {
  id:          string;
  num:         string;
  title:       string;
  description: string;
  price:       string;
  videoSrc:    string;
}

const SERVICES: Service[] = [
  {
    id:          "leaks",
    num:         "01",
    title:       "תיקון דליפות",
    description: "איתור דליפות בטכנולוגיה מתקדמת. בלי לשבור קיר אחד.",
    price:       "החל מ-₪450",
    videoSrc:    "/videos/leaks.mp4",
  },
  {
    id:          "emergency",
    num:         "02",
    title:       "שירות חירום 24/7",
    description: "אנחנו על הדרך תוך 20 דקות. בכל שעה. בכל מזג אוויר.",
    price:       "החל מ-₪350",
    videoSrc:    "/videos/emergency.mp4",
  },
  {
    id:          "luxury",
    num:         "03",
    title:       "התקנות יוקרה",
    description: "ברזים, כיורים, אסלות. עם הקפדה על כל פרט.",
    price:       "החל מ-₪280",
    videoSrc:    "/videos/luxury.mp4",
  },
  {
    id:          "drain",
    num:         "04",
    title:       "פתיחת סתימות",
    description: "ביוב, אסלות וצנרת. פתרון מהיר, יעיל, נקי.",
    price:       "החל מ-₪320",
    videoSrc:    "/videos/drain.mp4",
  },
  {
    id:          "smart",
    num:         "05",
    title:       "מערכות מים חכמות",
    description: "דודי שמש, חימום חכם, פתרונות חסכוניים.",
    price:       "החל מ-₪890",
    videoSrc:    "/videos/smart-water.mp4",
  },
  {
    id:          "bathroom",
    num:         "06",
    title:       "שיפוצי אמבטיות",
    description: "מקלחות יוקרה, ג'קוזי, ועיצוב מותאם אישית.",
    price:       "החל מ-₪3,500",
    videoSrc:    "/videos/bathroom.mp4",
  },
];

// Cubic bezier is valid at runtime; cast as `never` to satisfy FM v12 strict types
const EASE_APPLE = [0.16, 1, 0.3, 1] as never;

const CARD_VARIANTS = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease:     EASE_APPLE,
      delay:    i * 0.12,
    },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background:    "var(--charcoal-deep)",
        paddingBlock:  "clamp(64px, 10vh, 128px)",
        paddingInline: "clamp(24px, 5vw, 64px)",
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
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
            // השירותים שלנו
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
              fontSize:      "clamp(2.4rem, 5.5vw, 5rem)",
              fontWeight:    400,
              color:         "var(--cream)",
              lineHeight:    1.0,
              letterSpacing: "-0.02em",
            }}
          >
            תיקון. התקנה.{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              מצוינות.
            </em>
          </motion.h2>
        </div>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href="#cta"
          style={{
            fontFamily:  "var(--font-heebo, Arial, sans-serif)",
            fontSize:    14,
            color:       "var(--cream-muted)",
            textDecoration: "none",
            transition:  "color 0.25s ease",
            whiteSpace:  "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-muted)")}
        >
          כל השירותים ←
        </motion.a>
      </div>

      {/* Grid */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap:                 24,
        }}
      >
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => {
    if (videoRef.current) videoRef.current.style.opacity = "0.85";
  };
  const onLeave = () => {
    if (videoRef.current) videoRef.current.style.opacity = "1";
  };

  return (
    <motion.div
      custom={index}
      variants={CARD_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-60px" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position:        "relative",
        aspectRatio:     "4 / 5",
        borderRadius:    16,
        overflow:        "hidden",
        cursor:          "none",
        transition:      "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease",
        border:          "1px solid transparent",
        background:      "var(--charcoal-deep)", /* shows while video loads */
      }}
      whileHover={{
        y:           -12,
        borderColor: "var(--accent)",
        transition:  { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        src={service.videoSrc}
        crossOrigin="anonymous"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => {
          if (videoRef.current) videoRef.current.style.opacity = "1";
        }}
        style={{
          position:   "absolute",
          inset:      0,
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          filter:     "brightness(0.45)",
          zIndex:     0,
          opacity:    0,                                    /* fades in on load */
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Grain */}
      <div className="grain" />

      {/* Gradient overlay */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.97) 100%)",
          zIndex:     2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset:    0,
          zIndex:   3,
          padding:  "clamp(20px, 2.5vw, 32px)",
          display:  "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Card number — top right (RTL) */}
        <span
          style={{
            position:   "absolute",
            top:        20,
            right:      24,
            fontFamily: "var(--font-frank-ruhl, Georgia, serif)",
            fontStyle:  "italic",
            fontSize:   13,
            color:      "var(--accent)",
          }}
        >
          {service.num}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily:    "var(--font-frank-ruhl, Georgia, serif)",
            fontSize:      "clamp(22px, 2.5vw, 28px)",
            fontWeight:    400,
            color:         "var(--cream)",
            lineHeight:    1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-heebo, Arial, sans-serif)",
            fontSize:   14,
            lineHeight: 1.6,
            color:      "var(--cream-muted)",
            marginTop:  10,
            paddingBottom: "0.2em",
          }}
        >
          {service.description}
        </p>

        {/* Bottom row */}
        <div
          style={{
            marginTop:      24,
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heebo, Arial, sans-serif)",
              fontSize:   13,
              color:      "var(--cream-muted)",
            }}
          >
            {service.price}
          </span>

          {/* Arrow button */}
          <div
            style={{
              width:        40,
              height:       40,
              borderRadius: "50%",
              border:       "1px solid var(--accent)",
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              transition:   "background 0.3s ease",
              flexShrink:   0,
            }}
          >
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              style={{ color: "var(--accent)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
