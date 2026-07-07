"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Drives the header's transparent→solid, expanded→compact transition.
 * Passive listener + rAF-throttled to avoid layout thrash on scroll.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Set initial state (e.g. on client-side navigation with restored scroll position)
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
