import { CheckCircle2 } from "lucide-react";
import { processAdvantages } from "@/data/methodology";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

/**
 * "لماذا تنجح منهجيتنا".
 *
 * Phase 6.0 revision: moved from a single narrow stacked list
 * (max-w-2xl, mostly empty space either side on wide viewports) to a
 * 3-column card grid — same exact content, reusing the same Card +
 * IconBadge components as everywhere else on the site, just laid out
 * to actually use the available width instead of leaving it empty.
 */
export function WhyProcessWorksSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {processAdvantages.map((advantage) => (
        <Card key={advantage.title} className="h-full">
          <IconBadge icon={CheckCircle2} tone="navy" size="lg" className="mb-4" />
          <h3 className="font-arabic text-lg font-semibold text-navy-900">{advantage.title}</h3>
          <p className="mt-2 font-arabic text-[15px] leading-relaxed text-gray-500">{advantage.description}</p>
        </Card>
      ))}
    </div>
  );
}
