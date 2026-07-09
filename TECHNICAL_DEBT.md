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
