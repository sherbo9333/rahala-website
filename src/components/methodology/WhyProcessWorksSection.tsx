import { CheckCircle2 } from "lucide-react";
import { processAdvantages } from "@/data/methodology";

/**
 * "لماذا تنجح منهجيتنا" — checklist rows rather than icon cards,
 * matching the PDF's own visual treatment of this content (its
 * Advantages slide uses check-marked lines, not bordered cards) and
 * giving the page a second layout rhythm instead of repeating the
 * card-grid pattern used everywhere else on the site.
 */
export function WhyProcessWorksSection() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {processAdvantages.map((advantage) => (
        <div key={advantage.title} className="flex items-start gap-4">
          <CheckCircle2 size={22} aria-hidden="true" className="mt-1 shrink-0 text-blue-600" strokeWidth={1.75} />
          <div>
            <h3 className="font-arabic text-lg font-semibold text-navy-900">{advantage.title}</h3>
            <p className="mt-1 font-arabic text-[15px] leading-relaxed text-gray-500">{advantage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
