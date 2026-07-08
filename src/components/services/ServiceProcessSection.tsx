import { serviceProcessSteps } from "@/data/service-details";
import { NumberedStep } from "@/components/ui/NumberedStep";

/**
 * "كيف ننفذ هذه الخدمة" — reuses the exact same approved 5-step
 * methodology shown on Home and the dedicated Methodology page, rather
 * than inventing a distinct process per service: the PDF defines one
 * company-wide methodology, not six separate ones, so presenting a
 * different process per service would fabricate content that doesn't
 * exist in the approved source.
 *
 * Note on JSX similarity: this wrapper (grid + connecting line /
 * vertical stepper) is intentionally similar to Home's and
 * Methodology's own timeline wrappers, for the same reason logged as
 * TD-003 — see TD-005 in TECHNICAL_DEBT.md.
 */
export function ServiceProcessSection() {
  return (
    <>
      <div className="relative hidden md:grid md:grid-cols-5 md:gap-6">
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 h-px bg-navy-900/10" />
        {serviceProcessSteps.map((step) => (
          <NumberedStep key={step.number} {...step} orientation="vertical" className="relative" />
        ))}
      </div>

      <div className="relative flex flex-col gap-8 md:hidden">
        <div aria-hidden="true" className="absolute bottom-6 start-6 top-6 w-px bg-navy-900/10" />
        {serviceProcessSteps.map((step) => (
          <NumberedStep key={step.number} {...step} orientation="horizontal" className="relative" />
        ))}
      </div>
    </>
  );
}
