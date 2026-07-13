# Technical Debt Log

Non-critical observations noted during later phases, deliberately **not** acted on so as not to modify frozen/completed pages. Address these in a dedicated cleanup pass when convenient, or fold into a future phase if a page is reopened for other reasons.

---

### TD-001 — About page's Open Graph/Twitter title doesn't reflect the page title
**Noted:** Phase 5.4 (verifying Services page SEO)
**Where:** `src/app/about/page.tsx`
**Detail:** About's `metadata` export sets `title`/`description`/`alternates.canonical` but no explicit `openGraph`/`twitter` objects. Next.js does not deep-merge nested metadata fields from a child route into the parent's `openGraph`/`twitter` — so About's actual `og:title`/`twitter:title` tags currently fall back to the root layout's site-wide default ("رسالة | شريكك الاستراتيجي في النمو الرقمي") instead of "من نحن | رسالة". Services and Industries (built after this was noticed) both set explicit `openGraph`/`twitter` objects and don't have this gap.
**Fix:** Add the same explicit `openGraph`/`twitter` block to About's metadata that Services/Industries already use. Low effort, purely additive, no visual/layout change — safe to do whenever About is reopened, or as a standalone metadata-only patch if you'd rather not wait.
**Severity:** Low (doesn't affect the page itself, only how it previews when shared on social/search).

---

### TD-002 — Mega-menu and footer link to 6 service detail routes that don't exist yet
**Noted:** Phase 5.1 (pre-existing), reconfirmed Phase 5.4
**Status: RESOLVED in Phase 5.9.** All 6 `/services/[slug]` routes now exist and build successfully; verified the mega-menu's `/services/e-commerce` link resolves to a real page in the compiled output.
**Where:** `src/data/navigation.ts` (`services[].href` → `/services/digital-strategy`, etc.), consumed by `Header`'s `ServicesMegaMenu`, `MobileMenu`, and `Footer`
**Detail (historical):** These six routes 404'd until Phase 5.9 built the individual service detail template.
**Severity:** N/A — resolved.

---

*No new technical debt introduced in Phase 5.5 (Industries).*

---

### TD-003 — Timeline wrapper markup duplicated between Home and Methodology page
**Noted:** Phase 5.6 (Methodology)
**Where:** `src/components/home/MethodologySection.tsx` (frozen) vs. `src/components/methodology/ProcessTimelineSection.tsx` (new)
**Detail:** Both components render the same horizontal/vertical `NumberedStep` arrangement (connecting line + responsive orientation switch). The actual repeated visual unit (`NumberedStep`) is properly reused in both places — only the surrounding grid/connecting-line wrapper (a small amount of markup) is duplicated. This is deliberate: extracting a shared `MethodologyTimeline` primitive would require modifying Home's `MethodologySection.tsx`, which is frozen this phase.
**Fix:** If Home is ever reopened for other reasons, extract a shared `MethodologyTimeline` component (parameterized by whether to show the loop-back indicator) and have both Home and Methodology consume it.
**Severity:** Low — cosmetic code duplication, not a functional or visual bug. Both components independently pass all validation.

---

*No new technical debt introduced in Phase 5.6 beyond TD-003.*

---

### TD-004 — Checklist-row pattern duplicated between Methodology and Why Rahala pages
**Noted:** Phase 5.7 (Why Rahala)
**Where:** `src/components/methodology/WhyProcessWorksSection.tsx` (frozen) vs. `src/components/why-rahala/CompetitiveAdvantagesSection.tsx` (new)
**Detail:** Both render the same "CheckCircle2 icon + title + description" checklist-row visual pattern (matching the PDF's own check-marked list treatment of its Advantages content in both places). Consistent with the TD-003 precedent: the shared pattern isn't extracted into one component because doing so would require modifying Methodology's frozen file.
**Fix:** If Methodology is ever reopened, extract a shared `ChecklistItem` (or similar) primitive and have both pages consume it. Until then, both are independently correct and pass all validation.
**Severity:** Low — cosmetic duplication, not a functional or visual bug.

---

*No new technical debt introduced in Phase 5.7 beyond TD-004.*

---

*Phase 5.8 (Contact): no new technical debt. `ContactInfoSection`'s icon+label+value pattern is conceptually similar to Footer's contact items, but the presentation differs enough (Card-grid vs. compact list) that this wasn't treated as the same class of duplication as TD-003/TD-004 — no shared component was reasonably extractable without a larger refactor of Footer itself, which is out of scope and frozen.*

---

### TD-005 — Service Detail template's process-timeline wrapper follows the same TD-003 pattern
**Noted:** Phase 5.9 (Individual Service Detail Pages)
**Where:** `src/components/services/ServiceProcessSection.tsx` (new)
**Detail:** Same situation as TD-003: the actual repeated visual unit (`NumberedStep`) is properly reused, but the surrounding grid/connecting-line wrapper markup is independently written here too (a third copy, alongside Home's `MethodologySection` and the dedicated Methodology page's `ProcessTimelineSection`), since Home and Methodology are both frozen.
**Fix:** If either frozen page is reopened, extract one shared `MethodologyTimeline` primitive (parameterized by loop-back on/off) consumed by all three call sites.
**Severity:** Low — cosmetic duplication only.

**Also note (not a defect, a resolved ambiguity):** this phase's instructions listed the e-commerce slug as `ecommerce`, but the existing (frozen) `services` array in `data/navigation.ts` already uses the href `/services/e-commerce`. Since the phase's own stated objective is that these pages "should satisfy every existing navigation link," the slug was implemented as `e-commerce` to match the existing frozen link exactly, rather than introducing a second, inconsistent spelling that would leave the current mega-menu/footer links broken.

---

*Phase 5.10 (Error Handling & Production Experience): no new technical debt. `not-found.tsx` and `error.tsx` reuse `PageHeader`/`Section`/`Container`/`Button` with no new duplication. `loading.tsx` was deliberately kept a Server Component (no hooks/interactivity needed) to avoid an unnecessary client bundle. No route-specific `loading.tsx` was added for `/services/[slug]`: all 6 slugs are statically generated via `generateStaticParams` with no async data fetching in the page, so navigation is instant and a dedicated loading state would never meaningfully render — the global `loading.tsx` already covers any edge case, and adding a duplicate would be unjustified per this phase's own "avoid unnecessary duplication" instruction.*

---

*Phase 5.11 (Legal Pages): no new technical debt.*

**Footer was modified this phase** — explicitly authorized by the phase's own instruction ("If Privacy Policy or Terms links do not already exist in the footer: Add them"). Change was purely additive (two new links in the existing bottom legal row); the pre-existing tagline text was preserved, not removed. No visual restructuring.

**Cookie Policy was deliberately not created.** Per the phase's own conditional instruction ("Only create Cookie Policy if it is referenced anywhere in the website or legally required by the approved project scope"): the site does not currently set any cookies, use any analytics/tracking scripts, or reference a cookie policy anywhere in its content or approved scope — so neither condition is met. The Privacy Policy's cookies section is written narrowly (only essential-cookie language) to stay accurate to this. If analytics/tracking is added in a future phase, a dedicated Cookie Policy should be created at that point.

**Legal content caveat:** the Privacy Policy and Terms & Conditions contain generic, neutral legal boilerplate appropriate for a standard business website — not a substitute for review by qualified legal counsel before public launch. Placeholders like `[رقم السجل التجاري]` and `[تاريخ آخر تحديث]` are clearly marked and must be filled in before publication.

---

## Phase 5.12 — Production Optimization & SEO Audit

Per this phase's explicit scope, verified bugs found during the audit were fixed directly (not just logged) — each is a measurable, objective issue (contrast ratio, broken link, unnecessary client bundle), not a subjective design change.

### 🔴 CRITICAL — Fixed: sitewide broken primary CTA
Every primary call-to-action across the **entire site** (Header, MobileMenu, Hero, and every instance of `FinalCtaSection` — present on Home, About, Services, Industries, Methodology, Why Rahala, Contact, and all 6 service detail pages) linked to `/get-started`, a route that was never built in any phase. This was the site's main conversion path, broken everywhere.
**Interim fix applied:** repointed all `/get-started` references to `/contact` — a real, working page whose form already serves the same "start engaging with Rahala" intent.
**Recommendation:** build a dedicated `/get-started` or `/consultation` landing page in a future phase (the original approved design spec envisioned this as a higher-intent page with an industry dropdown and budget field, distinct from the general Contact form) — see Production Recommendations in the Phase 5.12 delivery notes.

### Fixed — WCAG contrast failures (color)
- **`EyebrowLabel`** (used on nearly every page): gold-400 text on white/light backgrounds measured 2.4:1, failing WCAG AA even for large text (needs 3:1; normal text needs 4.5:1). Root cause: the component's `inverted` prop correctly adjusted the secondary "number" span's color for dark backgrounds but never adjusted the main label's color for light ones — the `inverted`-aware pattern existed but was incompletely applied. Fixed by adding a `gold-600` (#7D5F23) token — same hue, 5.94:1 on white — used automatically whenever `inverted` is false; `gold-400` unchanged for the dark-background case (7.8:1, already passing).
- **`WhyRahalaSection`** and **`NumberedStep`** emphasized-state text: same gold-400-on-white-card issue, same fix (`gold-600`).
- **Home's `IndustriesSection`** subtitle: `gray-500` sits directly on the section's `gray-50` background (4.43:1, just under the 4.5:1 threshold) rather than inside a white Card like every other gray-500 usage on the site. Fixed with a scoped one-off darker shade (`#5C6A80`, 5.11:1) rather than changing the `gray-500` token globally, since that token passes everywhere else it's used.

### Fixed — Accessibility: missing nav landmark labels
`Header`'s desktop `<nav>` and `MobileMenu`'s `<nav>` had no `aria-label`, unlike `StickySubNav` which already did. Fixed: both now have `aria-label="التنقل الرئيسي"`, so screen-reader users navigating by landmark can distinguish them from any other `<nav>` on the page (e.g. About's sticky sub-nav).

### Fixed — Performance: 4 unnecessary `"use client"` directives
`FinalCtaSection`, `IndustriesSection`, `MethodologySection`, and `ServicesPreviewSection` (Home) were all marked client components with zero hooks, event handlers, or browser-only APIs — verified by direct inspection before removing. These were added defensively during the Phase 5.2 polish pass (generalizing a fix that was only actually needed for `MetricsSection`, which does directly loop over a hook-using child). Removing the unnecessary directives measurably shrank every page's route-specific JS: Home nearly halved (8.61 kB → 3.82 kB); Industries, Methodology, and Services dropped ~72% (2.2 kB → ~0.6 kB each). Verified no regression: rebuilt and confirmed all content still renders correctly, and the RSC boundary bug this defensive pattern originally guarded against did not resurface.

### Resolved: TD-001 (About page OG/Twitter metadata gap)
Fixed in this phase — About now has the same explicit `openGraph`/`twitter` block every other page uses.

### New structured data (JSON-LD) — Organization, WebSite, Breadcrumb, Service, ContactPage
Added per this phase's explicit requirement. Organization + WebSite render sitewide (root layout); Breadcrumb renders on every non-Home page; Service renders on each of the 6 service detail pages; ContactPage renders on Contact. All verified as well-formed JSON via direct parsing of the compiled output, not just visual inspection.

### Remaining (unchanged from prior phases)
TD-002 (resolved Phase 5.9), TD-003, TD-004, TD-005 — all still low-severity, intentional, frozen-page-constrained duplication. No new instances of this class of debt found in this phase.

---

## Brand name update — "رحالة" → "رسالة"

Replaced every occurrence of the Arabic brand name "رحالة" with "رسالة" across all content: page titles, metadata, JSON-LD (Organization/WebSite names), hero wordmark, logo alt text, footer, mega-menu, legal pages, and code comments referencing the brand — verified zero remaining occurrences in both source and compiled output.

**Deliberately NOT changed** (flagged to the client before proceeding, confirmed to continue):
- **Logo artwork** (`logo-white.png`/`logo-navy.png`) — these are rendered graphics of the old wordmark, not editable text. A real rebrand needs new logo artwork designed from scratch.
- **Domain and email** (`rahala.sa`, `info@rahala.sa`) — these are real, approved infrastructure. Fabricating a new domain/email by substitution would mean inventing contact details that likely don't exist.
- **Source-code identifiers** — component names (`WhyRahalaSection`), file/folder paths (`src/app/why-rahala/`), and the live `/why-rahala` URL (already in the sitemap) were left as-is. These are code architecture, not brand-name content; renaming them would be a much larger structural refactor with real regression risk, and wasn't what was asked.
- **Exception:** the JSON-LD `alternateName` field ("Rahala Digital Growth Company") *was* updated to "Resala Digital Growth Company" — unlike the identifiers above, this is a content value meant for search engines, not a code identifier, so it was updated for consistency with the Arabic name change.

**Incidental bug found and fixed during verification:** Home's `<title>` tag was missing the "| رسالة" suffix that every other page correctly picks up from the root layout's title template — a pre-existing issue (present since Phase 5.2, unrelated to this rename) that happened to surface while spot-checking the rename's output. Fixed by setting Home's title explicitly rather than relying on template inheritance.

**Recommendation:** if this is a genuine, permanent rebrand, a follow-up phase should (1) commission new logo artwork, (2) confirm and migrate to a real new domain/email, and (3) decide whether the `/why-rahala` route and related component/file names should be renamed to match — none of which could be done as part of a content-text replacement.

---

## Phase 6.0 — UI/UX Polish & Premium Experience

No new technical debt introduced. Notes on decisions made:

- **Contact form backend requires `RESEND_API_KEY`** to actually send email (see `.env.example`). Without it, the route returns a graceful Arabic error rather than crashing — this is expected until a real API key is configured. `CONTACT_FROM_EMAIL` must additionally be on a domain verified with Resend or sending will fail regardless of the API key.
- **Home's `IndustriesSection`, `MethodologySection` (timeline layout), and `WhyProcessWorksSection` (Methodology page) were all kept as Server Components** — none of the new visual treatments (staggered cards, quote panels, card grids) needed hooks or client-only APIs, consistent with the Phase 5.12 performance audit's findings.
- **The Hero's new background layers (dot-grid, floating orbs, flowing lines) are pure CSS/SVG animations**, not JS-driven — they inherit the global `prefers-reduced-motion` override in `globals.css` automatically, with no additional reduced-motion handling needed in the component itself.

---

## Phase 6.1 — Premium Experience Redesign & Creative Director Review

### What changed
- **Hero rebuilt from scratch** around the brand's literal meaning ("رسالة" = message): a faint connected-node network with two "transmitting" lines (traveling light via `stroke-dashoffset`) and two "impact" ripple nodes, plus a cinematic vignette and soft spotlight glow behind the wordmark. Replaced the previous generic floating-blob treatment and the Compass icon (a journey/navigation metaphor) with `Rss` (a literal signal/broadcast glyph, softly pulsing rather than spinning) — a more precise fit for a company named "message."
- **Footer rebuilt** as one cohesive 12-column grid (brand blurb + social / pages / services / contact side by side) instead of four stacked, bordered blocks — removes the "empty gaps" feeling by giving every column real weight. Social section labeled "رسالة على المنصات" per the brand-voice request.
- **All decorative Arabic-Indic eyebrow numbers removed site-wide** (`EyebrowLabel`'s `number` prop and `PageHeader`'s pass-through deleted entirely, not just hidden) — verified zero remaining across every page in compiled output.
- **Section-transition fades added** at every navy/light color boundary that previously cut hard: Metrics (top and bottom), Final CTA (top), About's Vision section (top and bottom) — soft gradient blends instead of a hard stop, addressing the "stacked containers" feedback at the boundaries where it was most visually abrupt.

### Deliberately NOT changed, and why
- **`NumberedStep`'s step numbers (١–٥) were kept.** These are a different case from the decorative eyebrow numbers: they show the actual order of a real 5-step process, not a page-reference callback with no informational value. Removing them would hurt comprehension of a genuinely sequential methodology, which isn't what the "remove decorative numbers" feedback was about — but flagging this explicitly rather than silently leaving it, since a stricter reading of "remove all of them completely" could include this.
- **The fundamental Hero layout (centered wordmark reveal, dual CTA) is unchanged**, per the explicit instruction to keep the same content and messaging. The full redesign effort went into background depth, motion concept, and typographic polish rather than restructuring what's already an appropriate composition for this exact content.

### Honest Creative Director review — what I'd flag if this were someone else's work

This brief's scope (four reference sites, "review every section," full motion system overhaul, footer, hero-from-scratch, plus a final review) is realistically several days of senior design work condensed into one pass. I prioritized the highest-leverage, most explicitly-called-out items (Hero, footer, decorative numbers, the worst section-transition seams) rather than spreading thin across every single component. In the interest of the same honesty I'd want from someone reviewing my own work:

1. **Not every section got a full craft pass.** `ServicesGridSection`, `IndustriesGridSection`, `ContactInfoSection`, and the individual service-detail template still use the same card-grid pattern established in earlier phases. It's solid, consistent, and not generic — but it wasn't specifically reconsidered against the "would this be on Awwwards" bar the way the Hero and Footer were. If a follow-up phase wants to push further, these are the next candidates.
2. **Motion timing/easing wasn't globally re-tuned.** Existing hover/scroll-reveal timings (from Phase 5.2's polish pass) are reused as-is. They're good, restrained, and consistent — but "better easing, better animation timing" as a blanket instruction wasn't re-audited value-by-value against the reference sites' specific feel.
3. **Cross-site "connection/signal" visual language is currently concentrated in the Hero and About illustration only.** A more thorough execution of the brand-identity brief would extend that same motif (subtly) into 1–2 more moments — e.g. the Methodology page's step connectors, or the Metrics section — rather than treating it as Hero-only. Flagging as the single highest-value follow-up if this phase continues.
4. **I did not literally study the four reference URLs pixel-by-pixel** beyond one earlier fetch of causehouse.co for structural inspiration (numbered-slide rhythm, single-CTA footers). Given the instruction was explicitly "inspiration only, do not copy," and my read on all four was at the level of "premium agency site conventions" rather than site-specific detail, I don't believe this materially changed the outcome — but I want to be transparent that the level of study was a synthesis of general premium-web conventions I already know, not a fresh forensic teardown of each of the four sites in this session.

None of the above are regressions or unfinished work in the sense of being broken — they're candid notes on where the highest-value next investment would go if this phase is continued, rather than claiming the site is now maximally polished everywhere.

---

## Phase 6.2 — Premium Detail Pass

### 🟡 Open question, not yet actioned: brand color palette
Client feedback asked to "extract the branding palette directly from the logo" (deep magenta / dark purple / near-black), moving away from navy/blue. I analyzed every pixel of the actual uploaded logo file (`Logo__2_.png`) before touching anything: it is 96% a single off-white tone (`#F0F1ED`) with no magenta, purple, or black anywhere in it — only faint anti-aliasing blend pixels around the small "®" mark. I flagged this discrepancy to the client directly rather than either fabricating a magenta palette that isn't actually in the file, or silently ignoring the request. **Color system unchanged pending clarification or a corrected logo file.** Everything else in this phase's feedback was implemented independent of that open question.

### Fixed — Footer's excess bottom whitespace
Root cause found: `Container`'s `py-16 md:py-20` applied equally top *and* bottom, leaving ~80px of empty padding below the already-visually-closed copyright row (which has its own `border-t` + `pt-6`). Changed to asymmetric `pt-16 pb-8 md:pt-20 md:pb-10` — generous top padding preserved, tight bottom padding since the copyright row itself already provides closure.

### Hero — deepened per feedback
Added: SVG glow filter on all network nodes, two literal traveling light pulses via native `animateMotion` along the existing connection paths (gated behind `useReducedMotion` since SMIL isn't covered by the site's CSS-based reduced-motion override), six softly floating particles, and subtle mouse-parallax drift on the whole network layer (spring-eased, ±14px range, also gated behind `useReducedMotion`). Same underlying concept as Phase 6.1 (a living network, not decorative shapes) — extended with actual motion rather than only static-plus-dash-flow.

**Bug caught and fixed before shipping:** the floating particles' animation class was initially built via a template literal (`` `animate-${variant}` ``) — Tailwind's JIT scanner can't detect dynamically-constructed class names, so `animate-float-reverse` would have silently failed to generate any CSS (half the particles wouldn't have animated). Fixed by using an explicit conditional with both literal class strings present in source; verified the class actually appears in compiled CSS output before considering it done.

### Navbar — genuine glassmorphism
Sticky state changed from a near-opaque `bg-white/95` to `bg-white/70` with `backdrop-blur-xl` and a soft `border-white/40` edge — now reads as translucent glass rather than a solid white bar. Verified present in compiled output on pages where the header is always in its solid state.

### Logo size
Increased a further ~20% (40px/48px → 48px/56px, mobile/desktop) per explicit feedback. Compact header height increased 64px → 72px to keep the larger logo from feeling cramped; `StickySubNav`'s sticky offset updated to match so it still sits flush under the header on About's anchor navigation.

### Build verification
`tsc --noEmit` clean · `next build` — all 23 routes generate · `next lint` clean · verified in compiled output: glass classes present, logo size increased, footer padding fixed, `animate-float-reverse` actually generated, heading hierarchy and RTL intact, all 9 pages' canonicals unaffected.

---

## Phase 6.3 — Color System Migration & Premium Polish (Hero explicitly out of scope)

### Color palette clarified and migrated
A prior client message asked to extract magenta/purple from the logo; pixel analysis showed the logo has no such colors. This message clarified the actual intended palette: **Deep Navy / White / Warm Gold**, which is what the site already mostly used — the real task was removing leftover blue accents (`blue-600`, `cyan`) and letting gold serve its intended "emphasis only" role. Migrated site-wide:
- `IconBadge`'s default tone renamed `"blue"` → `"navy"` (the color values changed too, not just the name) — every card icon on the site.
- `Button`'s primary hover: `blue-600`/cyan-glow → `gold-600`/gold-glow (verified 5.94:1 contrast for white text on gold-600).
- Header nav: active state is now a neutral navy pill (state indication, not "emphasis"); hover is a gold underline + text accent (an actual emphasis moment) — a deliberate navy-vs-gold logic, not just a find-and-replace.
- Checklist icons, service-card links, metric numbers, contact-info hovers, mega-menu hovers, form focus borders, and the About page's illustration (including a literal `#2952E3` hex value in its SVG) — all converted.
- **Deliberate exception, kept as-is:** the global `:focus-visible` outline and `Button`'s focus ring stay `blue-600`. Button renders on both light and dark backgrounds (including custom-styled instances placed on navy page sections), and no single navy or gold shade stays reliably visible as an outline in every one of those contexts — navy vanishes on navy, gold only marginally passes contrast on white. Blue-600 keeps working as a neutral, always-visible functional indicator. Treated as an accessibility-safety call, not an oversight.
- **HeroSection.tsx was not touched or included in this migration** — per explicit instruction, its `#2952E3` blue accents remain exactly as they were (confirmed via checksum: the file's MD5 hash is unchanged from before this phase's edits began).

### Footer
Padding tightened further (32-40px → 24-32px bottom), gap before the copyright divider reduced (56px → 40px). Column headers upgraded to a gold caption-style treatment (matching `EyebrowLabel`'s pattern elsewhere) instead of plain white/50 text, for clearer hierarchy.

### Navbar
Logo increased a further ~15-20% (48px/56px → 56px/64px); header heights increased accordingly (72px→80px compact, 88px→96px expanded) so the larger logo has room to breathe; `StickySubNav`'s offset updated to match. Nav item spacing widened (32px → 40px gaps) for a more premium rhythm.

### Typography
`h2` 40px→44px, `h3` 22px→24px (both with adjusted line-height for the larger size). Heading-to-description spacing widened site-wide (16px→20px gaps) via `PageHeader` and every section header that replicates its pattern.

### Motion
Section-entrance reveal softened (40px rise → 26px) per "keep animations subtle" — the larger offset read as a bigger jump than intended. `Card` and `Button` now share the same premium `ease-out-soft` cubic-bezier instead of generic `ease-out`. `Card`'s emphasized variant gets a matching gold glow on hover.

### Build verification
`tsc --noEmit` clean · `next build` — all 23 routes generate · `next lint` clean · verified in compiled output: zero blue-600/cyan remains anywhere except the documented Button/focus-ring exception and the untouched Hero; logo size, footer padding, and typography changes all confirmed; heading hierarchy and RTL intact on every page; all 9 pages' canonical URLs regression-checked and unaffected.

---

## Phase 6.4 — Flagged: major content/brand conflict, not yet resolved

**🔴 A "final production pass" request arrived with an uploaded company profile PDF ("Resala_Profile_Company_2026.pdf") describing a fundamentally different business than this entire site is built around:**

| | This site (built across ~20 phases) | The new PDF |
|---|---|---|
| Business type | Digital growth / strategy agency | Influencer-marketing agency |
| Services | Digital Strategy, Digital Marketing, Website Dev, E-commerce, Visual Identity, Data Analytics | Campaign Architecting, Content Strategy, Performance-Based Influencer Marketing, "Zero-Headache Protocol," Data Audits |
| Domain | rahala.sa | resalaagency.com |
| Clients | none named (no case studies yet) | Kybun KSA, LEF Cosmetics, Riva Reno Gelato, صانع الفن |
| Palette | Deep Navy / White / Gold (per the immediately preceding message) | Deep magenta / dark purple / near-black / white — no gold |

This directly contradicts the color-system migration just completed in Phase 6.3 (explicitly instructed as "Deep Navy, White, Warm Gold" one message prior), and would require rewriting the Services, About, Industries, Why-Rahala, and Contact-info content entirely to describe a different company. **Not actioned pending explicit confirmation** — silently rewriting a company's entire service line and color identity based on an ambiguous document conflict isn't a safe default. Flagged directly to the client; proceeded with everything in that same request that doesn't depend on the answer (see below).

### Implemented this phase (content/color-independent)
- **Navbar glass edge**: replaced the hard `border-b` on the scrolled/solid header with a soft gradient dissolve extending ~32px below the header's own edge — reads as floating glass fading into the page rather than a bar with a ruled line under it.
- **Performance/accessibility re-verification** (no Lighthouse runner available in this environment, so these are the underlying signals, not a measured score): client-component list re-confirmed minimal (11 files, each independently justified — no new unnecessary ones found); fonts confirmed `font-display: swap`; only the header Logo uses `priority` (correctly, the only true above-the-fold image); bundle sizes healthy (all routes 148-157kB First Load JS).
- **Hero explicitly reconfirmed untouched** — checksum-verified unchanged from the start of this phase. The uploaded reference `HeroSection.tsx` (from the parallel "Hero rebuild" conversation) was treated as context, not installed — it references Tailwind keyframes (`cloud-drift`, `scroll-dot`) that don't exist in this project's config, and installing it would mean modifying the exact file both this message and the previous one said not to touch. Flagged directly to the client in case that installation was actually wanted.

### Not yet done, pending the content/color question above
Full page-flow/section-blending pass beyond the navbar (most navy-boundary transitions were already addressed in Phases 6.1-6.2; remaining white/gray-50 boundaries are subtle by design, not hard cuts), the broader "review every section" pass, and any color/content migration — all held pending the client's answer, since several of these (especially anything touching cards, backgrounds, or CTAs) would need to be redone if the palette/content direction changes.

---

## Phase 6.5 — Color & domain migrated to the real brand (content still pending)

Executed the unambiguous, PDF-sourced parts of the "single source of truth" instruction:

- **Full color palette migration**, done at the token level (`tailwind.config.ts` + `globals.css` CSS variables) so it cascades through every one of the ~40 files using these classes without editing them individually:
  - `navy` (900): `#0B1220` → `#2A1730` (deep plum/near-black, pixel-sampled from the PDF's actual cover/section backgrounds)
  - `gold` 600/400: `#7D5F23`/`#C9A24B` → `#8A0254`/`#D48CB3` (vivid magenta for light backgrounds, lighter pink-magenta for dark — pixel-sampled from the PDF's accent color and card tints)
  - `gray-50`: cool `#F5F7FA` → warm-tinted `#FAF5F8`, matching the PDF's light card backgrounds
  - All contrast-verified: magenta-600 on white = 9.47:1 (comfortably passes AA, better than the old gold-600's 5.94:1); magenta-400 on the new navy = 6.49:1 (passes, matching the old gold-400/navy pairing's role)
  - Raw (non-Tailwind-class) hex values also updated: About page's SVG illustration, the dynamic OG image generator, the favicon (`icon.png`, regenerated), and the tinted logo variant (`logo-navy.png`, regenerated)
- **Domain/contact facts updated**: `rahala.sa` → `resalaagency.com` (the PDF's actual domain) across `layout.tsx`, `sitemap.ts`, `robots.ts`, `structured-data.ts`, `data/navigation.ts`, `.env.example` — canonical URLs, JSON-LD, and the footer/contact-page email all now point to the real domain.
- **Hero confirmed untouched** — checksum unchanged through this phase.

### Deliberately NOT done yet: the business-content rewrite
Services (6 digital-growth services → 5 influencer-marketing services), About's story/vision/mission, and Industries/Methodology (which have no direct equivalent in the new PDF) still describe the old business model. This is a substantially larger, higher-risk task than the color/domain migration:
- The PDF's source copy is in English; the site is Arabic-first throughout (RTL layout, Arabic typography). Translating/adapting 5 new services + About narrative into Arabic — versus flipping the entire site to English/LTR — are two very different scopes of work, and guessing wrong on which is wanted would mean redoing a large amount of content work.
- Services currently have 6 static routes with SEO/JSON-LD/sitemap entries each; the new PDF has 5 services with different names entirely, meaning routes would need to be renamed, not just re-worded.
- Industries and Methodology pages have no corresponding content in the new PDF at all — would need a decision on whether to remove them, or find a legitimate substitute rather than inventing content.

**Recommend confirming two things before this is executed:** (1) Arabic adaptation of the new services/about copy, or a full English/LTR conversion; (2) what happens to the Industries and Methodology pages, which the new business model doesn't map onto directly.
