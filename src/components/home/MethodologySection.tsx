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
 *
 * Both breakpoints render the same `NumberedStep` component (switching
 * its `orientation` prop) rather than duplicating step markup per
 * breakpoint — refactored during the production-polish pass to remove
 * duplicated JSX.
 */
export function MethodologySection() {
  return (
    <Section background="white" id="methodology-preview">
      <Container>
        <EyebrowLabel>
          كيف نعمل
        </EyebrowLabel>
        <h2 className="mt-5 font-arabic text-h2 text-navy-900">منهجيتنا</h2>
        <p className="mt-5 max-w-2xl font-arabic text-body text-gray-500">{methodologyCaption}</p>

        {/* Desktop/tablet: horizontal with connecting line */}
        <div className="relative mt-14 hidden md:grid md:grid-cols-5 md:gap-6">
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 h-px bg-navy-900/10" />
          {methodologySteps.map((step) => (
            <NumberedStep key={step.number} {...step} orientation="vertical" className="relative" />
          ))}
        </div>

        {/* Mobile: vertical stepper */}
        <div className="relative mt-12 flex flex-col gap-8 md:hidden">
          <div aria-hidden="true" className="absolute bottom-6 start-6 top-6 w-px bg-navy-900/10" />
          {methodologySteps.map((step) => (
            <NumberedStep key={step.number} {...step} orientation="horizontal" className="relative" />
          ))}
        </div>
      </Container>
    </Section>
  );
}
