import { CheckCircle2 } from "lucide-react";
import { competitiveAdvantages } from "@/data/why-rahala";
import { cn } from "@/lib/cn";

/**
 * "مزايانا التنافسية" — all 6 approved advantages, checklist rows
 * rather than icon cards (matching the PDF's own check-marked list
 * treatment of this exact content, per the approved design spec's
 * note that a checklist suits comparison/decision content better than
 * a grid). Alternates icon-left/icon-right per row for visual rhythm,
 * as specified.
 *
 * Note on JSX similarity: this uses the same checklist-row pattern as
 * the Methodology page's WhyProcessWorksSection (frozen this phase).
 * Logged as TD-004 rather than extracting a shared component now,
 * consistent with the TD-003 precedent from Phase 5.6.
 */
export function CompetitiveAdvantagesSection() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {competitiveAdvantages.map((advantage, index) => {
        const isReversed = index % 2 === 1;
        return (
          <div
            key={advantage.title}
            className={cn("flex items-start gap-4", isReversed && "sm:flex-row-reverse")}
          >
            <CheckCircle2 size={22} aria-hidden="true" className="mt-1 shrink-0 text-blue-600" strokeWidth={1.75} />
            <div>
              <h3 className="font-arabic text-lg font-semibold text-navy-900">{advantage.title}</h3>
              <p className="mt-1 font-arabic text-[15px] leading-relaxed text-gray-500">{advantage.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
