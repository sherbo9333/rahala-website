import type { Metadata } from "next";
import { methodologyCaption, methodologyOverview } from "@/data/methodology";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { ProcessTimelineSection } from "@/components/methodology/ProcessTimelineSection";
import { WhyProcessWorksSection } from "@/components/methodology/WhyProcessWorksSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

const title = "منهجيتنا";
const description = methodologyCaption;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/methodology",
  },
  openGraph: {
    title: `${title} | رسالة`,
    description,
    url: "/methodology",
  },
  twitter: {
    title: `${title} | رسالة`,
    description,
  },
};

/**
 * METHODOLOGY — Phase 5.6
 * Section order per the approved structure: Hero -> Methodology
 * Overview -> Complete Process Timeline -> Why Our Process Works ->
 * Final CTA.
 *
 * No StickySubNav here (unlike About): the approved structure reads as
 * one linear narrative building toward the timeline, not four
 * independent content blocks a visitor would want to jump between —
 * an anchor sub-nav would add UI weight without a clear benefit.
 *
 * "Why Our Process Works" uses 3 of the PDF's 6 Advantages — the ones
 * specifically about how the process runs (integrated approach,
 * transparent reporting, on-time/on-budget delivery). The other 3
 * (team expertise, local market knowledge, world-class tools) are
 * reserved for the future dedicated "لماذا رسالة" page rather than
 * fully duplicated here.
 */
export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "منهجيتنا", path: "/methodology" },
        ])}
      />
      <Section background="white" id="methodology-hero">
        <Container>
          <PageHeader eyebrow="كيف نعمل" title={title} description={description} />
        </Container>
      </Section>

      <Section background="gray" id="methodology-overview">
        <Container>
          <h2 className="sr-only">نظرة عامة على منهجيتنا</h2>
          <div className="relative mx-auto max-w-3xl rounded-card border border-gray-200 bg-white p-8 shadow-soft sm:p-12">
            <span
              aria-hidden="true"
              className="absolute right-8 top-4 font-display text-6xl leading-none text-gold-400/25 sm:right-10"
            >
              &rdquo;
            </span>
            <p className="relative font-arabic text-xl leading-[1.9] text-navy-900">{methodologyOverview}</p>
          </div>
        </Container>
      </Section>

      <Section background="white" id="methodology-timeline">
        <Container>
          <EyebrowLabel>
            رحلة العمل
          </EyebrowLabel>
          <h2 className="mt-5 font-arabic text-h2 text-navy-900">رحلة العمل الكاملة</h2>
          <div className="mt-14">
            <ProcessTimelineSection />
          </div>
        </Container>
      </Section>

      <Section background="gray" id="why-process-works">
        <Container>
          <EyebrowLabel>
            مزايانا
          </EyebrowLabel>
          <h2 className="mt-5 font-arabic text-h2 text-navy-900">لماذا تنجح منهجيتنا</h2>
          <div className="mt-10">
            <WhyProcessWorksSection />
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}
