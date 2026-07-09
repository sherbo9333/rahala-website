import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

/**
 * Global loading fallback, shown by Next.js during route segment
 * transitions that suspend. Server Component (no interactivity, no
 * hooks needed) — a client component here would only add unnecessary
 * JS for a UI that renders once and disappears.
 *
 * Uses Tailwind's standard `animate-pulse` utility for the skeleton
 * shimmer — this is the standard loading-state idiom, not a new
 * branded motion style layered on top of the site's Framer Motion
 * animation system, so it doesn't conflict with "reuse the existing
 * animation system."
 *
 * role="status" + aria-live="polite" + sr-only text make this
 * announced to screen readers without any visible layout change.
 * Skeleton block sizes approximate a typical hero + 3-card section
 * (the shape most pages share) to minimize layout shift once real
 * content replaces it.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">جارٍ تحميل الصفحة...</span>

      <Section background="white" id="loading-hero">
        <Container className="flex flex-col items-center text-center">
          <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-4 h-10 w-72 max-w-full animate-pulse rounded-full bg-gray-200 sm:w-96" />
          <div className="mt-4 h-4 w-64 max-w-full animate-pulse rounded-full bg-gray-200" />
        </Container>
      </Section>

      <Section background="gray" id="loading-grid">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-card border border-gray-200 bg-white p-6 shadow-soft">
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-5 h-5 w-2/3 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-gray-200" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
