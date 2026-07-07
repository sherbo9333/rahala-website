import { cn } from "@/lib/cn";

interface NumberedStepProps {
  number: string;
  title: string;
  description: string;
  emphasized?: boolean;
  className?: string;
}

/**
 * Component Library — Numbered step circle + card.
 * Spec: 48px circle, gold fill when active/emphasized, navy outline
 * otherwise. Used in the Methodology strip (Home + future Methodology page).
 */
export function NumberedStep({ number, title, description, emphasized = false, className }: NumberedStepProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div
        className={cn(
          "mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-bold",
          emphasized ? "border-gold-400 bg-gold-400 text-navy-900" : "border-navy-900/20 text-navy-900"
        )}
      >
        {number}
      </div>
      <div
        className={cn(
          "w-full rounded-card border bg-white p-6 shadow-soft",
          emphasized ? "border-gold-400" : "border-gray-200"
        )}
      >
        <h3 className={cn("font-arabic text-lg font-bold", emphasized ? "text-gold-400" : "text-navy-900")}>
          {title}
        </h3>
        <p className="mt-2 font-arabic text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  );
}
