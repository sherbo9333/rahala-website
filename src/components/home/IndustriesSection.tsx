"use client";

import { industries } from "@/data/industries";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/**
 * Industries directory preview on Home. Desktop/tablet: slow
 * auto-scrolling marquee that pauses on hover (CSS animation, not JS,
 * for performance). Mobile: static 2-row wrapped chip layout — no
 * auto-scroll on touch devices, since a moving element a user can't
 * easily pause is bad UX on mobile.
 */
export function IndustriesSection() {
  // Duplicate the list once so the marquee loop is seamless.
  const marqueeItems = [...industries, ...industries];

  return (
    <Section background="gray" id="industries" className="overflow-hidden">
      <Container>
        <EyebrowLabel number="١٠" latin>
          INDUSTRIES
        </EyebrowLabel>
        <h2 className="mt-4 font-arabic text-h2 text-navy-900">القطاعات التي نخدمها</h2>
        <p className="mt-4 max-w-2xl font-arabic text-body text-gray-500">
          خبرة عميقة عبر طيف واسع من القطاعات الاقتصادية
        </p>
      </Container>

      {/* Desktop/tablet marquee */}
      <div className="group relative mt-12 hidden md:block">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {marqueeItems.map((industry, i) => (
            <div
              key={`${industry.label}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap rounded-full border border-gray-200 bg-white px-6 py-3 shadow-soft"
            >
              <industry.icon size={20} aria-hidden="true" className="text-blue-600" strokeWidth={1.75} />
              <span className="font-arabic text-sm font-medium text-navy-900">{industry.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: static wrapped chips */}
      <Container className="mt-10 md:hidden">
        <div className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <div
              key={industry.label}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-soft"
            >
              <industry.icon size={18} aria-hidden="true" className="text-blue-600" strokeWidth={1.75} />
              <span className="font-arabic text-sm font-medium text-navy-900">{industry.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
