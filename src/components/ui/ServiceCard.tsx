import { memo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ServiceNavItem } from "@/types/navigation";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";

interface ServiceCardProps {
  service: ServiceNavItem;
}

/**
 * Component Library — Service card.
 * Icon badge, title, one-line description (verbatim from the PDF),
 * and a "اعرف المزيد" link whose arrow slides on hover. Reused on
 * Home's services preview grid and the Services Overview page so the
 * pattern only exists in one place.
 *
 * Arrow points left (←) because in RTL reading direction, "forward"
 * is toward the left — ArrowLeft is the correct directional icon here,
 * not a mistake.
 *
 * Memoized: rendered in a loop of 6 identical, prop-stable cards: no
 * reason to re-render one when a sibling's state (e.g. carousel
 * scroll) changes.
 */
function ServiceCardComponent({ service }: ServiceCardProps) {
  return (
    <Card className="h-full">
      <Link href={service.href} className="flex h-full flex-col">
        <IconBadge icon={service.icon} tone="blue" size="lg" className="mb-5" />
        <h3 className="font-arabic text-h3 text-navy-900">{service.label}</h3>
        <p className="mt-2 flex-1 font-arabic text-[15px] leading-relaxed text-gray-500">
          {service.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-arabic text-sm font-semibold text-blue-600">
          اعرف المزيد
          <ArrowLeft size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1" />
        </span>
      </Link>
    </Card>
  );
}

export const ServiceCard = memo(ServiceCardComponent);
