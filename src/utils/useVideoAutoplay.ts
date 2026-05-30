"use client";
import { RefObject, useEffect } from "react";

/**
 * Forces muted autoplay on a single video element.
 *
 * Belt-and-suspenders approach for iOS Safari / Android Chrome:
 *  1. Sets muted as a DOM property AND as an HTML attribute (React's muted prop
 *     doesn't always reflect to the attribute before play() is called).
 *  2. Sets defaultMuted so it survives browser resets.
 *  3. Sets playsinline / webkit-playsinline / x5-playsinline attributes.
 *  4. Calls play() immediately and retries on the first user gesture (iOS fallback).
 */
export function useVideoAutoplay(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Mute via every available surface — required before play() on iOS
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    // Retry on first interaction as a fallback for aggressive browsers
    const events = ["touchstart", "scroll", "click"] as const;
    events.forEach((e) => document.addEventListener(e, tryPlay, { once: true }));

    return () => {
      events.forEach((e) => document.removeEventListener(e, tryPlay));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
