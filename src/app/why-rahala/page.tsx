import type { Metadata } from "next";
import { whyRahalaHero, whyRahalaOverview, competitiveAdvantagesSubhead } from "@/data/why-rahala";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { CompetitiveAdvantagesSection } from "@/components/why-rahala/CompetitiveAdvantagesSection";
import { ClientMetricsRecap } from "@/components/why-rahala/ClientMetricsRecap";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

const title = whyRahalaHero.title;
const description = whyRahalaHero.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/why-rahala",
  },
  openGraph: {
    title: `${title} | رسالة`,
    description,
    url: "/why-rahala",
  },
  twitter: {
    title: `${title} | رسالة`,
    description,
  },
};

/**
 * WHY RAHALA — Phase 5.7
 * Section order per the approved structure: Hero -> Why Rahala
 * Overview -> Competitive Advantages -> Why Clients Choose Rahala ->
 * Final CTA.
 *
 * Hero/Overview text reconstructed from the PDF's "WHY RAHALA" slide
 * (page 8) — see data/why-rahala.ts for the reconstruction note.
 * Competitive Advantages is the complete 6-item list from the PDF's
 * "مزايانا التنافسية" slide (page 11); the Methodology page
 * intentionally shows only 3 of these (see TECHNICAL_DEBT.md).
 * "Why Clients Choose Rahala" reuses the same approved metrics from
 * Home's Key Metrics band as supporting proof, per the approved design
 * spec's own note for this section, rather than inventing new claims.
 */
export default function WhyRahalaPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "لماذا رسالة؟", path: "/why-rahala" },
        ])}
      />
      <Section background="white" id="why-rahala-hero">
        <Container>
          <PageHeader eyebrow={whyRahalaHero.eyebrow} eyebrowLatin number="٠٨" title={title} description={description} />
        </Container>
      </Section>

      <Section background="gray" id="why-rahala-overview">
        <Container>
          <h2 className="sr-only">نظرة عامة</h2>
          <p className="mx-auto max-w-3xl text-center font-arabic text-xl leading-[1.9] text-navy-900">
            {whyRahalaOverview}
          </p>
        </Container>
      </Section>

      <Section background="white" id="competitive-advantages">
        <Container>
          <EyebrowLabel number="١١" latin>
            ADVANTAGES
          </EyebrowLabel>
          <h2 className="mt-4 font-arabic text-h2 text-navy-900">مزايانا التنافسية</h2>
          <p className="mt-4 max-w-2xl font-arabic text-body text-gray-500">{competitiveAdvantagesSubhead}</p>

          <div className="mt-12">
            <CompetitiveAdvantagesSection />
          </div>
        </Container>
      </Section>

      <Section background="gray" id="why-clients-choose">
        <Container>
          <h2 className="text-center font-arabic text-h2 text-navy-900">لماذا يختارنا عملاؤنا</h2>
          <div className="mt-12">
            <ClientMetricsRecap />
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}
