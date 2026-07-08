import { Repeat } from "lucide-react";
import { methodologySteps } from "@/data/methodology";
import { NumberedStep } from "@/components/ui/NumberedStep";

/**
 * The "Complete Process Timeline" for the dedicated Methodology page.
 * Reuses NumberedStep exactly as Home's condensed preview strip does
 * (horizontal + connecting line on desktop/tablet, vertical stepper on
 * mobile) — but this is the fuller version, so it adds the loop-back
 * indicator the approved design spec called for on this page
 * specifically (Home's version stays a lightweight teaser without it).
 *
 * A literal curved arrow connecting step 5 back to step 1 would need
 * different SVG geometry at every breakpoint to stay accurate — the
 * approved spec's own mobile fallback was a simple "↻ دورة مستمرة"
 * chip, so rather than maintain a fragile multi-breakpoint curve, this
 * page uses that same chip treatment consistently at every size.
 *
 * Note on JSX duplication: this component's outer grid/line wrapper is
 * intentionally similar to Home's MethodologySection rather than
 * sharing one extracted component — refactoring Home's (frozen) file
 * to consume a shared primitive would mean modifying a completed page.
 * Logged as TD-003 rather than acted on here.
 */
export function ProcessTimelineSection() {
  return (
    <>
      {/* Desktop/tablet: horizontal with connecting line */}
      <div className="relative hidden md:grid md:grid-cols-5 md:gap-6">
        <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 h-px bg-navy-900/10" />
        {methodologySteps.map((step) => (
          <NumberedStep key={step.number} {...step} orientation="vertical" className="relative" />
        ))}
      </div>

      {/* Mobile: vertical stepper */}
      <div className="relative flex flex-col gap-8 md:hidden">
        <div aria-hidden="true" className="absolute bottom-6 start-6 top-6 w-px bg-navy-900/10" />
        {methodologySteps.map((step) => (
          <NumberedStep key={step.number} {...step} orientation="horizontal" className="relative" />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-5 py-2.5">
          <Repeat size={16} aria-hidden="true" className="text-gold-400" />
          <span className="font-arabic text-sm font-semibold text-navy-900">دورة مستمرة</span>
        </div>
      </div>
    </>
  );
}
