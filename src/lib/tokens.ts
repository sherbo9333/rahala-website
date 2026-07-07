/**
 * Non-visual design tokens — durations, easings, breakpoints — that
 * components need as JS values (e.g. for Framer Motion), not just CSS classes.
 * Colors, spacing, and radii live in tailwind.config.ts; don't duplicate them here.
 */

export const MOTION = {
  // Scroll-reveal: fade + rise 12px, one-directional, no bounce
  reveal: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  // Header compress-on-scroll
  header: {
    duration: 0.2,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  // Mobile menu overlay
  menuOverlay: {
    duration: 0.25,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  // Staggered hero entrance
  staggerChildren: 0.08,
} as const;

export const BREAKPOINTS = {
  mobile: 390,
  tablet: 834,
  desktop: 1440,
} as const;

export const HEADER_HEIGHT = {
  expanded: 88,
  compact: 64,
} as const;
