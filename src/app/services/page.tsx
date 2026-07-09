import type { Metadata } from "next";
import { mission } from "@/data/about";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServicesGridSection } from "@/components/services/ServicesGridSection";
import { ServiceDetailsSection } from "@/components/services/ServiceDetailsSection";
import { WhyRahalaSection } from "@/components/home/WhyRahalaSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

const title = "خدماتنا";
const description = mission;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `${title} | رحالة`,
    description,
    url: "/services",
  },
  twitter: {
    title: `${title} | رحالة`,
    description,
  },
};

/**
 * SERVICES — Phase 5.4
 * Section order per this phase's approved structure:
 * Hero -> Services Grid -> Service Details -> Why Choose Rahala -> Final CTA.
 *
 * The Hero's supporting description reuses the approved Mission
 * statement (data/about.ts) rather than inventing new marketing copy:
 * the PDF's own "خدماتنا" slide has no standalone intro sentence, and
 * the Mission line already describes the same integrated
 * strategy-execution-measurement approach these six services deliver.
 *
 * WhyRahalaSection and FinalCtaSection are reused directly from Home
 * (imported, not duplicated) per the instruction to reuse existing
 * design language rather than rebuild it.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "خدماتنا", path: "/services" },
        ])}
      />
      <Section background="white" id="services-hero">
        <Container>
          <PageHeader eyebrow="OUR SERVICES" eyebrowLatin number="٠٦" title={title} description={description} />
        </Container>
      </Section>

      <ServicesGridSection />
      <ServiceDetailsSection />
      <WhyRahalaSection />
      <FinalCtaSection />
    </>
  );
}
