"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

/**
 * Animates a number counting up from 0 once it enters the viewport.
 * Per spec: 1200ms ease-out, plays once only. Respects
 * prefers-reduced-motion by jumping straight to the final value.
 */
export function CountUp({ value, prefix = "", suffix = "", className, duration = 1200 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let frame: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
