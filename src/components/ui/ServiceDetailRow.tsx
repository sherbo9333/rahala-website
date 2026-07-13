import { memo } from "react";
import type { ServiceNavItem } from "@/types/navigation";
import { IconBadge } from "@/components/ui/IconBadge";
import { cn } from "@/lib/cn";

interface ServiceDetailRowProps {
  service: ServiceNavItem;
  index: number;
}

/**
 * Expanded presentation of a single service for the Services page's
 * "Service Details" section — a large icon + title + the exact PDF
 * description, laid out in an alternating left/right row per index.
 *
 * Deliberately not a repeat of the Services Grid's card pattern: the
 * grid above already shows all 6 services compactly, so simply
 * re-rendering the same card again here would be pure duplication
 * with no added value. This alternating editorial layout gives each
 * service more visual room without inventing any new copy — content
 * is identical to the grid, verbatim from the approved PDF.
 *
 * Memoized: rendered 6x with stable props in a static list.
 */
function ServiceDetailRowComponent({ service, index }: ServiceDetailRowProps) {
  const isReversed = index % 2 === 1;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 border-b border-gray-200 py-10 last:border-b-0 md:flex-row md:gap-12",
        isReversed && "md:flex-row-reverse"
      )}
    >
      <div className="flex shrink-0 items-center justify-center">
        <IconBadge icon={service.icon} tone="navy" size="xl" />
      </div>
      <div className="text-center md:text-start">
        <h3 className="font-arabic text-h3 text-navy-900">{service.label}</h3>
        <p className="mx-auto mt-3 max-w-xl font-arabic text-body leading-relaxed text-gray-500 md:mx-0">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export const ServiceDetailRow = memo(ServiceDetailRowComponent);
