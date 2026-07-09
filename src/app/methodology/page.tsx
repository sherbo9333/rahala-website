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
    title: `${title} | رحالة`,
    description,
    url: "/methodology",
  },
  twitter: {
    title: `${title} | رحالة`,
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
 * reserved for the future dedicated "لماذا رحالة" page rather than
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
          <PageHeader eyebrow="METHODOLOGY" eyebrowLatin number="٠٧" title={title} description={description} />
        </Container>
      </Section>

      <Section background="gray" id="methodology-overview">
        <Container>
          <h2 className="sr-only">نظرة عامة على منهجيتنا</h2>
          <p className="mx-auto max-w-3xl text-center font-arabic text-xl leading-[1.9] text-navy-900">
            {methodologyOverview}
          </p>
        </Container>
      </Section>

      <Section background="white" id="methodology-timeline">
        <Container>
          <EyebrowLabel number="٠٧" latin>
            THE PROCESS
          </EyebrowLabel>
          <h2 className="mt-4 font-arabic text-h2 text-navy-900">رحلة العمل الكاملة</h2>
          <div className="mt-14">
            <ProcessTimelineSection />
          </div>
        </Container>
      </Section>

      <Section background="gray" id="why-process-works">
        <Container>
          <EyebrowLabel number="١١" latin>
            ADVANTAGES
          </EyebrowLabel>
          <h2 className="mt-4 font-arabic text-h2 text-navy-900">لماذا تنجح منهجيتنا</h2>
          <div className="mt-10">
            <WhyProcessWorksSection />
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}
