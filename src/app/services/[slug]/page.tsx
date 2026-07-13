import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceDetails, getServiceDetail } from "@/data/service-details";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { IconBadge } from "@/components/ui/IconBadge";
import { CheckList } from "@/components/ui/CheckList";
import { ServiceProcessSection } from "@/components/services/ServiceProcessSection";
import { RelatedServicesSection } from "@/components/services/RelatedServicesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/structured-data";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generates the 6 static routes at build time — one reusable template,
 * powered entirely by data/service-details.ts, not six separate
 * hand-written page implementations.
 */
export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return {};

  return {
    title: detail.title,
    description: detail.description,
    alternates: {
      canonical: `/services/${detail.slug}`,
    },
    openGraph: {
      title: `${detail.title} | رسالة`,
      description: detail.description,
      url: `/services/${detail.slug}`,
    },
    twitter: {
      title: `${detail.title} | رسالة`,
      description: detail.description,
    },
  };
}

/**
 * SERVICE DETAIL TEMPLATE — Phase 5.9
 * One reusable template for all 6 services, powered by
 * data/service-details.ts. Section order: Hero -> Overview -> Key
 * Benefits -> Process -> Related Services -> Final CTA.
 *
 * Note: the existing `services` href for e-commerce is
 * "/services/e-commerce" (hyphenated) — this phase's own opening
 * objective says these pages "should satisfy every existing
 * navigation link under Services", so the slug here matches that
 * existing href exactly rather than the later "ecommerce" spelling
 * listed in the phase's bullet list. See implementation summary.
 */
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildServiceSchema(detail)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "خدماتنا", path: "/services" },
          { name: detail.title, path: `/services/${detail.slug}` },
        ])}
      />
      <Section background="white" id="service-hero">
        <Container>
          <div className="flex flex-col items-center text-center">
            <IconBadge icon={detail.icon} tone="navy" size="xl" className="mb-6" />
            <PageHeader
              eyebrow="خدماتنا"
              title={detail.title}
              description={detail.description}
              align="center"
            />
          </div>
        </Container>
      </Section>

      <Section background="gray" id="service-overview">
        <Container>
          <h2 className="sr-only">نظرة عامة</h2>
          <p className="mx-auto max-w-2xl text-center font-arabic text-xl leading-[1.9] text-navy-900">
            {detail.overview}
          </p>
        </Container>
      </Section>

      <Section background="white" id="service-benefits">
        <Container>
          <EyebrowLabel>أهم الفوائد</EyebrowLabel>
          <h2 className="mt-5 font-arabic text-h2 text-navy-900">لماذا هذه الخدمة تهمك</h2>
          <div className="mt-10 max-w-xl">
            <CheckList items={detail.benefits.map((benefit) => ({ title: benefit }))} />
          </div>
        </Container>
      </Section>

      <Section background="gray" id="service-process">
        <Container>
          <EyebrowLabel>
            خطوات التنفيذ
          </EyebrowLabel>
          <h2 className="mt-5 font-arabic text-h2 text-navy-900">كيف ننفذ هذه الخدمة</h2>
          <div className="mt-14">
            <ServiceProcessSection />
          </div>
        </Container>
      </Section>

      <Section background="white" id="related-services">
        <Container>
          <h2 className="font-arabic text-h2 text-navy-900">غالبًا ما يُقترن بـ</h2>
          <div className="mt-10">
            <RelatedServicesSection detail={detail} />
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}
