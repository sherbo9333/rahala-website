# Technical Debt Log

Non-critical observations noted during later phases, deliberately **not** acted on so as not to modify frozen/completed pages. Address these in a dedicated cleanup pass when convenient, or fold into a future phase if a page is reopened for other reasons.

---

### TD-001 — About page's Open Graph/Twitter title doesn't reflect the page title
**Noted:** Phase 5.4 (verifying Services page SEO)
**Where:** `src/app/about/page.tsx`
**Detail:** About's `metadata` export sets `title`/`description`/`alternates.canonical` but no explicit `openGraph`/`twitter` objects. Next.js does not deep-merge nested metadata fields from a child route into the parent's `openGraph`/`twitter` — so About's actual `og:title`/`twitter:title` tags currently fall back to the root layout's site-wide default ("رحالة | شريكك الاستراتيجي في النمو الرقمي") instead of "من نحن | رحالة". Services and Industries (built after this was noticed) both set explicit `openGraph`/`twitter` objects and don't have this gap.
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
