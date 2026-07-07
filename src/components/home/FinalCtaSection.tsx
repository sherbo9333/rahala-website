"use client";

import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const checkpoints = ["استشارة مجانية", "خطة مخصصة لعملك", "نتائج قابلة للقياس"];

/**
 * Final CTA — copy taken directly from the PDF's own closing slide
 * ("ابدأ رحلة نموك الرقمي اليوم" / "من التخطيط الاستراتيجي إلى
 * التنفيذ والقياس"), including the three reassurance checkpoints.
 */
export function FinalCtaSection() {
  return (
    <Section background="navy" id="cta" className="text-center">
      <Container>
        <h2 className="font-arabic text-h2 text-white">ابدأ رحلة نموك الرقمي اليوم</h2>
        <p className="mx-auto mt-4 max-w-2xl font-arabic text-body text-gray-200">
          رحالة شريكك في كل خطوة من رحلة نموك — من التخطيط الاستراتيجي إلى التنفيذ والقياس
        </p>

        <div className="mt-10 flex justify-center">
          <Button href="/get-started" variant="primary" className="bg-white text-navy-900 hover:bg-gold-400 hover:text-navy-900 hover:shadow-none">
            ابدأ شراكتك مع رحالة الآن
          </Button>
        </div>

        <ul className="mt-8 flex flex-col items-center justify-center gap-3 font-arabic text-sm text-gray-300 sm:flex-row sm:gap-8">
          {checkpoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <Check size={16} aria-hidden="true" className="text-gold-400" />
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
