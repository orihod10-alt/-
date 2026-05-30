"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  /* Detect touch / coarse-pointer devices on mount */
  useEffect(() => {
    const checkTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsTouch(checkTouch);
  }, []);

  /* GSAP cursor tracking — only activates on pointer:fine */
  useEffect(() => {
    // Only on pointer:fine devices (not touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initial position: off-screen until first move
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0,    overwrite: "auto" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: "power2.out", overwrite: "auto" });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.9, opacity: 0.9, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 0,   opacity: 0,   duration: 0.25, ease: "power2.out" });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 1, opacity: 1,   duration: 0.25, ease: "power2.out" });
    };

    const onDown = () => {
      gsap.to([dot, ring], { scale: 0.85, duration: 0.1, ease: "power2.out" });
    };

    const onUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    // Attach to ALL interactive elements
    const attachTo = () => {
      const targets = document.querySelectorAll<Element>(
        "a, button, [role='button'], input, label, select, [data-cursor]"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
      return targets;
    };

    let targets = attachTo();

    // Re-scan when DOM changes (for dynamically mounted components)
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      targets = attachTo();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      observer.disconnect();
    };
  }, []);

  /* Never render cursor on touch / coarse-pointer devices */
  if (isTouch) return null;

  return (
    <>
      {/* Amber dot — tracks exactly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor fixed top-0 left-0 pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          zIndex: 9998,
          willChange: "transform",
        }}
      />
      {/* Cream ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor fixed top-0 left-0 pointer-events-none"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid var(--cream)",
          opacity: 0.5,
          zIndex: 9997,
          willChange: "transform",
        }}
      />
    </>
  );
}
