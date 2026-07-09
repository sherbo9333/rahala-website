import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { IndustriesGridSection } from "@/components/industries/IndustriesGridSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

const title = "القطاعات التي نخدمها";
const description = "خبرة عميقة عبر طيف واسع من القطاعات الاقتصادية";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: `${title} | رسالة`,
    description,
    url: "/industries",
  },
  twitter: {
    title: `${title} | رسالة`,
    description,
  },
};

/**
 * INDUSTRIES — Phase 5.5
 * Section order per the approved spec: Hero -> Industries Grid -> Final CTA.
 *
 * FinalCtaSection (reused from Home, not duplicated) replaces the
 * lighter-weight "Don't see your industry?" ghost-button band sketched
 * in the original design-phase wireframe — this phase's instructions
 * explicitly list FinalCtaSection as a component to reuse here, and
 * running both back-to-back would be a redundant double CTA. See the
 * implementation summary for the full note on this.
 */
export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "القطاعات التي نخدمها", path: "/industries" },
        ])}
      />
      <Section background="white" id="industries-hero">
        <Container>
          <PageHeader eyebrow="INDUSTRIES" eyebrowLatin number="١٠" title={title} description={description} />
        </Container>
      </Section>

      <Section background="gray" id="industries-grid">
        <Container>
          <h2 className="sr-only">قائمة القطاعات التي نخدمها</h2>
          <IndustriesGridSection />
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}
