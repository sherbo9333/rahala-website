import { memo } from "react";
import { cn } from "@/lib/cn";

interface NumberedStepProps {
  number: string;
  title: string;
  description: string;
  emphasized?: boolean;
  className?: string;
  /** vertical: circle above card, centered (desktop horizontal strip).
   *  horizontal: circle beside card, left-aligned (mobile vertical stepper). */
  orientation?: "vertical" | "horizontal";
}

/**
 * Component Library — Numbered step circle + card.
 * Spec: 48px circle, gold fill when active/emphasized, navy outline
 * otherwise. Used in the Methodology strip (Home + future Methodology
 * page) in both its desktop (vertical/stacked) and mobile
 * (horizontal/row) arrangements — one component, one source of truth,
 * instead of hand-duplicating the same markup per breakpoint.
 */
function NumberedStepComponent({
  number,
  title,
  description,
  emphasized = false,
  className,
  orientation = "vertical",
}: NumberedStepProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div className={cn("flex", isHorizontal ? "items-start gap-5 text-start" : "flex-col items-center text-center", className)}>
      <div
        className={cn(
          "z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-bold",
          !isHorizontal && "mb-4",
          emphasized ? "border-gold-400 bg-gold-400 text-navy-900" : "border-navy-900/20 bg-white text-navy-900"
        )}
      >
        {number}
      </div>
      <div
        className={cn(
          "relative overflow-hidden rounded-card border bg-white p-6 shadow-soft transition-all duration-300 ease-out-soft",
          isHorizontal ? "flex-1 p-5" : "w-full",
          emphasized ? "border-gold-400" : "border-gray-200"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/[0.08] to-transparent"
        />
        <h3 className={cn("font-arabic text-lg font-bold", emphasized ? "text-gold-600" : "text-navy-900")}>
          {title}
        </h3>
        <p className="mt-2 font-arabic text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export const NumberedStep = memo(NumberedStepComponent);
