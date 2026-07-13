import { coreValues } from "@/data/about";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

/**
 * "قيمنا الجوهرية" — 5 cards in the PDF's own 3+2 centered layout.
 * Built with flex-wrap + justify-center rather than a fixed grid so
 * the last row (2 cards) naturally centers instead of hugging the
 * grid's start edge — a plain 3-column grid would leave the 5th card
 * awkwardly alone on the left of an empty row.
 */
export function ValuesSection() {
  return (
    <Section background="gray" id="values">
      <Container>
        <EyebrowLabel>
          مبادئنا
        </EyebrowLabel>
        <h2 className="mt-5 font-arabic text-h2 text-navy-900">قيمنا الجوهرية</h2>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {coreValues.map((value) => (
            <div key={value.title} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
              <Card className="h-full" variant="light">
                <IconBadge icon={value.icon} tone="navy" size="lg" className="mb-5" />
                <h3 className="font-arabic text-h3 text-navy-900">{value.title}</h3>
                <p className="mt-2 font-arabic text-[15px] leading-relaxed text-gray-500">{value.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
