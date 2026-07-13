import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhyRahalaSection } from "@/components/home/WhyRahalaSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema, contactPageSchema } from "@/lib/structured-data";

const title = "تواصل معنا";
const description = "نسعد بخدمتك والإجابة على استفساراتك في أي وقت";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `${title} | رسالة`,
    description,
    url: "/contact",
  },
  twitter: {
    title: `${title} | رسالة`,
    description,
  },
};

/**
 * CONTACT — Phase 5.8
 * Section order per this phase's approved structure: Hero -> Contact
 * Information -> Contact Form -> Why Contact Rahala -> Final CTA.
 *
 * Hero copy is verbatim from the PDF's "تواصل معنا" / Contact Us slide.
 * Contact Information and Contact Form are built as two stacked
 * sections (rather than the earlier design-phase sketch's side-by-side
 * 55/45 split) since this phase's instructions list them as two
 * distinct numbered sections — simpler and equally complete.
 *
 * "Why Contact Rahala" reuses WhyRahalaSection directly from Home
 * (per the instruction to reuse existing design language), same
 * pattern already used on the Services page.
 *
 * Form has no backend, no API, and no submission logic per the
 * explicit instruction — submitting only prevents the page reload and
 * shows a client-side confirmation message.
 */
export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "تواصل معنا", path: "/contact" },
        ])}
      />
      <Section background="white" id="contact-hero">
        <Container>
          <PageHeader eyebrow="لنتحدث" title={title} description={description} align="center" />
        </Container>
      </Section>

      <Section background="gray" id="contact-info">
        <Container>
          <h2 className="sr-only">معلومات التواصل</h2>
          <ContactInfoSection />
        </Container>
      </Section>

      <Section background="white" id="contact-form">
        <Container>
          <h2 className="sr-only">نموذج التواصل</h2>
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </Container>
      </Section>

      <WhyRahalaSection />
      <FinalCtaSection />
    </>
  );
}
