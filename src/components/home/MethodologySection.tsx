import { methodologySteps, methodologyCaption } from "@/data/methodology";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { NumberedStep } from "@/components/ui/NumberedStep";

/**
 * Home's Methodology preview strip. Horizontal on desktop/tablet with
 * a connecting line running through the step circles (a genuinely
 * sequential process, so numbering is earned here, unlike most cards
 * on the site). Collapses to a vertical stepper on mobile with the
 * connecting line running top-to-bottom.
 */
export function MethodologySection() {
  return (
    <Section background="white" id="methodology-preview">
      <Container>
        <EyebrowLabel number="٠٧" latin>
          METHODOLOGY
        </EyebrowLabel>
        <h2 className="mt-4 font-arabic text-h2 text-navy-900">منهجيتنا</h2>
        <p className="mt-4 max-w-2xl font-arabic text-body text-gray-500">{methodologyCaption}</p>

        {/* Desktop/tablet: horizontal with connecting line */}
        <div className="relative mt-14 hidden md:grid md:grid-cols-5 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 h-px bg-navy-900/10"
            style={{ marginInline: "10%" }}
          />
          {methodologySteps.map((step) => (
            <NumberedStep key={step.number} {...step} className="relative" />
          ))}
        </div>

        {/* Mobile: vertical stepper */}
        <div className="relative mt-12 flex flex-col gap-8 md:hidden">
          <div aria-hidden="true" className="absolute bottom-6 start-6 top-6 w-px bg-navy-900/10" />
          {methodologySteps.map((step) => (
            <div key={step.number} className="relative flex items-start gap-5">
              <div
                className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-bold ${
                  step.emphasized ? "border-gold-400 bg-gold-400 text-navy-900" : "border-navy-900/20 bg-white text-navy-900"
                }`}
              >
                {step.number}
              </div>
              <div
                className={`flex-1 rounded-card border bg-white p-5 shadow-soft ${
                  step.emphasized ? "border-gold-400" : "border-gray-200"
                }`}
              >
                <h3 className={`font-arabic text-lg font-bold ${step.emphasized ? "text-gold-400" : "text-navy-900"}`}>
                  {step.title}
                </h3>
                <p className="mt-1 font-arabic text-sm leading-relaxed text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
