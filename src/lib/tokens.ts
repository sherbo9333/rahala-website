/**
 * Non-visual design tokens — durations, easings, breakpoints — that
 * components need as JS values (e.g. for Framer Motion), not just CSS classes.
 * Colors, spacing, and radii live in tailwind.config.ts; don't duplicate them here.
 */

export const MOTION = {
  // Section-level scroll reveal: fade + rise 40px, plays once,
  // 0.6s ease-out. Consumed by the shared `Section` component so
  // every section on the site animates in with identical timing.
  reveal: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
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
