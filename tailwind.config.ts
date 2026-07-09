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
          DEFAULT: "#0B1220",
          900: "#0B1220",
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
          DEFAULT: "#C9A24B",
          400: "#C9A24B",
          /** WCAG contrast fix (Phase 5.12 audit): gold-400 is only
           * 2.4:1 against white — fails AA even for large text. This
           * darker shade on the same hue passes 5.94:1 on white while
           * still reading as the brand's gold accent. Use 600 for gold
           * text on light backgrounds; 400 remains correct for gold
           * text on navy (7.8:1, already passes). */
          600: "#7D5F23",
        },
        gray: {
          50: "#F5F7FA",
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
        h2: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }], // 40px
        h3: ["1.375rem", { lineHeight: "1.35", fontWeight: "600" }], // 22px
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
        soft: "0 8px 30px rgba(11, 18, 32, 0.08)",
        "soft-lg": "0 12px 32px rgba(11, 18, 32, 0.12)",
        "glow-cyan": "0 0 20px rgba(61, 217, 235, 0.35)",
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
      },
      animation: {
        "fade-rise": "fade-rise 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
