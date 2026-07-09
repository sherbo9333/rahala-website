import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

/**
 * Explicit noindex: a 404 already returns HTTP 404 (crawlers won't
 * index it on that basis alone), but an explicit robots directive is
 * the production-safe belt-and-suspenders per this phase's instruction.
 */
export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Global 404 — per the approved design spec: a designed moment, not a
 * broken default. Large ghosted "٤٠٤" sits decoratively behind the
 * message (low-opacity, aria-hidden — not real content). The compass
 * mark is static here, not the ambient rotating version used in the
 * Home hero: the spec is explicit that a 404 isn't the place for
 * playful ambient motion.
 *
 * Reuses PageHeader, Section, Container, and Button — no new
 * components needed for this page.
 */
export default function NotFound() {
  return (
    <Section background="white" id="not-found">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="relative flex flex-col items-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-display text-[140px] font-extrabold leading-none text-navy-900/[0.08] sm:text-[180px]"
          >
            ٤٠٤
          </span>

          <div className="relative flex flex-col items-center">
            <Compass size={40} strokeWidth={1.25} className="mb-6 text-gold-400" aria-hidden="true" />
            <PageHeader
              eyebrow="404"
              eyebrowLatin
              title="الصفحة التي تبحث عنها غير موجودة"
              description="يبدو أنك سلكت طريقًا غير مألوف في رحلتك — دعنا نعيدك إلى المسار الصحيح."
              align="center"
            />
          </div>
        </div>

        <div className="relative mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button href="/" variant="primary" className="justify-center">
            العودة للرئيسية
          </Button>
          <Button href="/services" variant="ghost" className="justify-center">
            تصفح خدماتنا
          </Button>
        </div>
      </Container>
    </Section>
  );
}
