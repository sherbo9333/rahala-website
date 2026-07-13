import { cn } from "@/lib/cn";

interface EyebrowLabelProps {
  children: React.ReactNode;
  className?: string;
  /** Light variant for use on navy backgrounds. */
  inverted?: boolean;
}

/**
 * Component Library Reference — Eyebrow label.
 * Spec: 13px, 600 weight, gold color, paired with a short horizontal
 * rule. Arabic text throughout the site now (Phase 6.0 localized the
 * remaining English labels).
 *
 * Phase 6.1: removed the decorative Arabic-Indic "page number" that
 * used to sit beside every eyebrow (a callback to the source PDF's own
 * slide numbering) — per direct feedback, these read as visual noise
 * rather than useful information. The design now relies on typography,
 * spacing, and hierarchy alone, without a numbering crutch.
 */
export function EyebrowLabel({ children, className, inverted = false }: EyebrowLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
      <span className={cn("font-arabic text-caption", inverted ? "text-gold-400" : "text-gold-600")}>
        {children}
      </span>
    </div>
  );
}
