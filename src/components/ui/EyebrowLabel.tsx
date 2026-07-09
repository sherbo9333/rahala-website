import { cn } from "@/lib/cn";

interface EyebrowLabelProps {
  children: React.ReactNode;
  /** Section number in Arabic-Indic numerals (e.g. "٠٢"), matching the
   * PDF's own numbering signature. Optional — not every section needs one. */
  number?: string;
  className?: string;
  /** Light variant for use on navy backgrounds. */
  inverted?: boolean;
  /**
   * The PDF alternates two eyebrow patterns: Arabic eyebrows that repeat
   * the section's own Arabic heading (فلسفتنا / رؤيتنا / رسالتنا), and
   * English all-caps technical eyebrows paired with an Arabic H2
   * (OUR SERVICES, METHODOLOGY, KEY METRICS, INDUSTRIES, ADVANTAGES).
   * Set `latin` to true to reproduce the second pattern correctly.
   */
  latin?: boolean;
}

/**
 * Component Library Reference — Eyebrow label.
 * Spec: 13px, 600 weight, letter-spaced, gold color, paired with a
 * short horizontal rule. This is the signature typographic callback
 * to the PDF's own "٢." style slide numbering — use only where a
 * section genuinely warrants the emphasis, not on every heading.
 */
export function EyebrowLabel({ children, number, className, inverted = false, latin = false }: EyebrowLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
      <span
        className={cn(
          "text-caption",
          inverted ? "text-gold-400" : "text-gold-600",
          latin ? "font-display uppercase tracking-[0.15em]" : "font-arabic"
        )}
      >
        {children}
      </span>
      {number && (
        <span
          className={cn(
            "font-display text-caption tracking-normal",
            inverted ? "text-white/30" : "text-gray-300"
          )}
        >
          {number}
        </span>
      )}
    </div>
  );
}
