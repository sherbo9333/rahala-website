import { vision } from "@/data/about";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/**
 * "رؤيتنا" — recreates the PDF's own vision slide treatment: full-bleed
 * navy band, centered statement, oversized gold quotation glyph. This
 * is the single most quotable line in the company profile, so it gets
 * a monument-style treatment rather than being folded into a paragraph.
 */
export function VisionSection() {
  return (
    <Section background="navy" id="vision" className="text-center">
      <Container>
        <div className="flex justify-center">
          <EyebrowLabel inverted number="٠٢">
            رؤيتنا
          </EyebrowLabel>
        </div>
        <h2 className="mt-4 font-arabic text-h2 text-white">رؤيتنا</h2>

        <div aria-hidden="true" className="mt-8 font-display text-6xl leading-none text-gold-400">
          &rdquo;
        </div>

        <p className="mx-auto -mt-4 max-w-2xl font-arabic text-2xl leading-relaxed text-gray-200">
          {vision}
        </p>
      </Container>
    </Section>
  );
}
