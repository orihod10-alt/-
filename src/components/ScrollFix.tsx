"use client";

import { useEffect } from "react";

/**
 * Failsafe: ensures body.style.overflow is never left as "hidden"
 * after LoadingScreen unmounts, even if cleanup in LoadingScreen fails.
 */
export default function ScrollFix() {
  useEffect(() => {
    // Give LoadingScreen time to finish, then ensure overflow is cleared
    const timer = window.setTimeout(() => {
      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
    }, 4000); // 4s: loading screen should be done by then

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
