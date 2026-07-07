import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";

/**
 * Brand typography — three roles, per the Design System:
 *  - Plus Jakarta Sans: English display/headings (700-800)
 *  - Inter: English body copy (400-500)
 *  - IBM Plex Sans Arabic: all Arabic text, every weight
 *
 * Self-hosted via @fontsource rather than next/font/google: the font
 * files ship inside the app's own build output, so there is no
 * external request to Google's CDN at runtime — one less third-party
 * dependency, no CDN latency variance, and it keeps working the same
 * way in restricted/offline build environments.
 *
 * Font-family names below match what globals.css declares via
 * @font-face-equivalent CSS custom properties consumed by Tailwind's
 * fontFamily config (font-display / font-body / font-arabic).
 */
export const FONT_FAMILY = {
  display: "'Plus Jakarta Sans', sans-serif",
  body: "'Inter', sans-serif",
  arabic: "'IBM Plex Sans Arabic', sans-serif",
} as const;
