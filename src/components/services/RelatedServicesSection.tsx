import type { ServiceDetail } from "@/data/service-details";
import { getRelatedNavItems } from "@/data/service-details";
import { ServiceCard } from "@/components/ui/ServiceCard";

interface RelatedServicesSectionProps {
  detail: ServiceDetail;
}

/**
 * "غالبًا ما يُقترن بـ" — reuses the exact same ServiceCard component
 * used on Home and the Services overview page, no new card variant.
 * Reinforces the PDF's own "Why Rahala" thesis (integrated system,
 * not standalone services) at the exact moment a visitor is
 * evaluating one piece of it.
 */
export function RelatedServicesSection({ detail }: RelatedServicesSectionProps) {
  const related = getRelatedNavItems(detail);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {related.map((service) => (
        <ServiceCard key={service.href} service={service} />
      ))}
    </div>
  );
}
