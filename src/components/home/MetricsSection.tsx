"use client";

import { metrics, metricsFootnote } from "@/data/metrics";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { CountUp } from "@/components/ui/CountUp";

/**
 * "مؤشرات النجاح" — navy full-bleed band, breaks the white/gray
 * rhythm of the surrounding sections. These four numbers are Rahala's
 * single most persuasive asset, so the footnote sourcing them must
 * stay clearly legible (13px, gray-300-on-navy — not gray-500, which
 * would sit close to invisible on this background) rather than being
 * the most skippable text on the page.
 */
export function MetricsSection() {
  return (
    <Section background="navy" id="metrics">
      <Container>
        <EyebrowLabel number="٠٩" inverted latin>
          KEY METRICS
        </EyebrowLabel>
        <h2 className="mt-4 font-arabic text-h2 text-white">مؤشرات النجاح</h2>
        <p className="mt-4 max-w-2xl font-arabic text-body text-gray-200">
          نتائج حقيقية وقابلة للقياس تعكس التزامنا بنجاح عملائنا
        </p>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <CountUp
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                className="font-display text-4xl font-extrabold text-gold-400 sm:text-5xl lg:text-6xl"
              />
              <p className="mt-3 font-arabic text-base font-semibold text-white">{metric.label}</p>
              <p className="mt-1 font-arabic text-sm text-gray-300">{metric.sublabel}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-arabic text-sm text-gray-300">{metricsFootnote}</p>
      </Container>
    </Section>
  );
}
