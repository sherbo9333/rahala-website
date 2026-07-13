import { industries } from "@/data/industries";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

/**
 * Industries directory preview on Home.
 *
 * Phase 6.0 redesign: replaced the auto-scrolling marquee with a
 * staggered card grid — alternating columns sit at a slightly
 * different vertical offset (pure CSS via nth-child, no JS) for a
 * "floating" bento feel with real depth, instead of a generic
 * slider. Reuses the same Card + IconBadge components as every other
 * card on the site, so hover lift/border-brighten/icon-scale behavior
 * is automatically consistent — no new interaction patterns invented.
 *
 * Kept as a Server Component (no motion/hooks needed for the stagger
 * itself), consistent with the Phase 5.12 performance audit's
 * findings about unnecessary client components.
 */
export function IndustriesSection() {
  return (
    <Section background="gray" id="industries">
      <Container>
        <EyebrowLabel>خبرتنا</EyebrowLabel>
        <h2 className="mt-5 font-arabic text-h2 text-navy-900">القطاعات التي نخدمها</h2>
        <p className="mt-5 max-w-2xl font-arabic text-body text-[#5C6A80]">
          {/* WCAG contrast fix (Phase 5.12 audit): gray-500 on this
              section's gray-50 background measures 4.43:1, just under
              the 4.5:1 AA threshold for normal-size text. This is the
              one place gray-500 sits directly on gray-50 rather than
              inside a white Card, so a small one-off darkening (5.11:1)
              is used here instead of changing the gray-500 token
              itself, which passes everywhere else it's used. */}
          خبرة عميقة عبر طيف واسع من القطاعات الاقتصادية
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 [&>*:nth-child(2n)]:sm:mt-6 [&>*:nth-child(3n)]:lg:mt-0 [&>*:nth-child(4n)]:lg:mt-6">
          {industries.map((industry) => (
            <Card
              key={industry.label}
              className="flex flex-col items-center gap-3 p-5 text-center sm:p-6"
            >
              <IconBadge icon={industry.icon} tone="navy" size="lg" />
              <span className="font-arabic text-sm font-medium text-navy-900 sm:text-base">
                {industry.label}
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
