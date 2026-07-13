import { industries } from "@/data/industries";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

/**
 * Full industries directory for the dedicated Industries page — a
 * clean icon+label grid, 4 columns on desktop per the approved spec.
 *
 * Deliberately not a reuse of Home's IndustriesSection: that one is a
 * lightweight auto-scrolling marquee/chip teaser meant to signal
 * breadth without taking much homepage space. This page IS the
 * destination for browsing industries, so it gets its own static,
 * scannable grid instead — same underlying data, different and
 * intentionally distinct presentation for a different job.
 *
 * No per-industry description beyond the label: the approved PDF
 * gives industries as a flat, unranked label list with zero
 * elaboration per sector — inventing descriptive copy here would mean
 * fabricating content the source material never defined.
 */
export function IndustriesGridSection() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {industries.map((industry) => (
        <Card key={industry.label} hoverable className="flex flex-col items-center gap-4 text-center">
          <IconBadge icon={industry.icon} tone="navy" size="lg" />
          <h3 className="font-arabic text-base font-semibold text-navy-900">{industry.label}</h3>
        </Card>
      ))}
    </div>
  );
}
