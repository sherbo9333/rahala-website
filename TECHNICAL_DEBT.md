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
**Where:** `src/data/navigation.ts` (`services[].href` → `/services/digital-strategy`, etc.), consumed by `Header`'s `ServicesMegaMenu`, `MobileMenu`, and `Footer`
**Detail:** These six routes will 404 until individual service detail pages are built in a future phase. This is expected, pre-existing state from before Phase 5.4 — not a regression introduced by any completed phase.
**Fix:** Build the six `/services/[slug]` pages in a future phase (not currently scoped).
**Severity:** Low while the site isn't live; becomes Medium once deployed publicly (dead links from primary nav).

---

*No new technical debt introduced in Phase 5.5 (Industries).*
