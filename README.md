# رحالة — Website (Phase 5.1: Foundation)

Production codebase for the Rahala Digital Growth Company website.
Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide React.

## Status: Phase 5.1 complete

This phase delivers the **foundation only** — no pages have been built yet (per the phased build plan). What's here:

- Next.js 15 / React 19 project, TypeScript strict mode
- Tailwind config wired to the approved design tokens (colors, type scale, radii, shadows, spacing)
- Self-hosted brand fonts (Plus Jakarta Sans, Inter, IBM Plex Sans Arabic)
- Global layout: RTL (`dir="rtl" lang="ar"`), SEO metadata, skip-to-content link
- Reusable UI components: `Button`, `Card`, `IconBadge`, `EyebrowLabel`, `Container`, `Logo`
- Header (sticky, transparent→solid on scroll, desktop nav, Services mega-menu)
- Footer (matches the PDF's Contact-slide layout exactly)
- Fully responsive mobile menu (full-screen overlay, staggered link animation, accordion for Services)

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
npm run typecheck
```

The root route (`/`) currently renders a **temporary scaffold placeholder**, clearly marked as such in `src/app/page.tsx` — this is intentional, not a bug. The real Home page is scoped for Phase 5.2.

## Two implementation notes (deviations explained, as required)

1. **Next.js/React versions**: pinned to `next@15.5.20` / `react@19.2.7` rather than the initially-requested `next@15` latest-at-request-time, because the originally resolved versions were affected by the December 2025 React Server Components CVE cluster (CVE-2025-66478 critical RCE, plus CVE-2025-55183/55184/67779). These are the latest patched releases in the Next.js 15 line — still Next.js 15 as requested, just security-current.
2. **Fonts self-hosted via `@fontsource` instead of `next/font/google`**: avoids a runtime dependency on Google's font CDN entirely (better privacy, no external request, unaffected by network variance to Google's edge). Visually and typographically identical to what the spec calls for — same three families, same weights.

## Folder structure

```
src/
  app/            → App Router routes + root layout + global CSS
  components/
    ui/           → Button, Card, IconBadge, EyebrowLabel, Container, Logo
    layout/       → Header, Footer, MobileMenu, ServicesMegaMenu
  sections/       → (empty — page sections land here in Phase 5.2+)
  hooks/          → useScrolled
  lib/            → fonts, cn() utility, design tokens (motion/breakpoints)
  data/           → navigation.ts (services, nav, contact info — transcribed from the approved PDF)
  types/          → shared TypeScript types
public/
  assets/         → logo-white.png, logo-navy.png (generated from the approved logo)
```

## Awaiting approval to begin Phase 5.2

Per the phased build plan, no page templates have been built. Next up (pending your sign-off): Home page.
