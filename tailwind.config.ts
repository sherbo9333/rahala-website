import type { Config } from "tailwindcss";

/**
 * Rahala Design System — Tailwind Configuration
 * Every value here is a direct translation of the approved
 * High-Fidelity UI Specification (Phase 4). Do not add ad-hoc
 * colors/spacing in components — extend this file instead so
 * the design system stays the single source of truth.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    // Custom breakpoints matching the spec's three target viewports
    screens: {
      sm: "390px", // mobile reference
      md: "768px", // tablet reference
      lg: "1024px",
      xl: "1280px", // desktop content max-width reference
      "2xl": "1440px", // desktop reference
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#2A1730",
          900: "#2A1730",
        },
        blue: {
          DEFAULT: "#2952E3",
          600: "#2952E3",
        },
        cyan: {
          DEFAULT: "#3DD9EB",
          400: "#3DD9EB",
        },
        gold: {
          DEFAULT: "#8A0254",
          /** Phase 6.5: migrated from the old navy/gold palette to the
           * real brand palette extracted directly (pixel-sampled) from
           * the official Company Profile PDF — deep plum/near-black
           * base + a vivid magenta accent, no gold anywhere in the
           * source material. Token *names* ("navy", "gold") are kept
           * as-is deliberately: renaming them would mean touching
           * every one of the ~40 files that reference these classes,
           * where changing only the values here cascades everywhere
           * automatically. 400 is the lighter accent for dark
           * backgrounds (6.49:1 on the new navy — was gold-400's role
           * on the old navy); 600 is the vivid magenta for light
           * backgrounds (9.47:1 on white — was gold-600's role, and
           * comfortably beats the old gold-600's 5.94:1). */
          400: "#D48CB3",
          600: "#8A0254",
        },
        gray: {
          50: "#FAF5F8",
          200: "#E2E8F0",
          300: "#CBD5E1",
          500: "#64748B",
        },
      },
      fontFamily: {
        // Wired to CSS variables set by next/font in the root layout
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        arabic: ["var(--font-ibm-plex-arabic)", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }], // 64px hero H1
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" }], // 48px page H1
        h2: ["2.75rem", { lineHeight: "1.15", fontWeight: "700" }], // 44px
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        body: ["1.0625rem", { lineHeight: "1.6" }], // 17px, 1.8 for Arabic set via .font-arabic
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }], // 13px eyebrow
      },
      borderRadius: {
        card: "20px",
        button: "14px",
        input: "12px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem", // 120px-ish helper
        section: "8rem", // 128px desktop section padding
        "section-tablet": "5rem", // 80px
        "section-mobile": "4rem", // 64px
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(42, 23, 48, 0.08)",
        "soft-lg": "0 12px 32px rgba(42, 23, 48, 0.12)",
        "glow-cyan": "0 0 20px rgba(61, 217, 235, 0.35)",
        "glow-gold": "0 0 24px rgba(138, 2, 84, 0.35)",
      },
      transitionTimingFunction: {
        "ease-out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-24px) scale(1.06)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(20px) scale(1.08)" },
        },
        "dash-flow": {
          "0%": { strokeDashoffset: "40" },
          "100%": { strokeDashoffset: "0" },
        },
        ripple: {
          "0%": { transform: "scale(0.7)", opacity: "0.55" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.12)" },
        },
        shine: {
          "0%": { transform: "translateX(-150%) skewX(-12deg)" },
          "100%": { transform: "translateX(150%) skewX(-12deg)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        marquee: "marquee 40s linear infinite",
        float: "float 9s ease-in-out infinite",
        "float-reverse": "float-reverse 11s ease-in-out infinite",
        "dash-flow": "dash-flow 2.5s linear infinite",
        ripple: "ripple 3.5s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shine: "shine 0.9s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
