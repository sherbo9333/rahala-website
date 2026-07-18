import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Emphasized card gets the gold border treatment (e.g. the middle
   * "Why Rahala" card, matching the PDF's own emphasis pattern). */
  emphasized?: boolean;
  /** Dark variant for cards placed on navy sections (e.g. Contact info cards). */
  variant?: "light" | "dark";
  hoverable?: boolean;
}

/**
 * Component Library Reference — Card.
 * Spec: 20px radius, white bg (or navy on dark sections), 1px gray-200
 * border, soft shadow at rest. Hover polish: lifts 6px, shadow deepens,
 * border brightens slightly — smooth 300ms transition (a touch slower
 * than the button's 250ms since the card travels further).
 *
 * Phase 6.6 (final polish): added a hairline top highlight (a soft
 * white-to-transparent gradient sliver along the top edge — the
 * "glass catching light" cue) and switched the hover shadow from a
 * flat gray tint to a brand-navy tint, so Card's depth reads as part
 * of the same visual family as the Hero's glows rather than a
 * generic neutral drop-shadow.
 *
 * Always carries the `group` class (harmless when unused) so a nested
 * IconBadge can cascade its own hover scale/glow off the card's hover
 * state instead of needing its own mouse listeners.
 */
export function Card({ children, className, emphasized = false, variant = "light", hoverable = true }: CardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-card p-6 shadow-soft transition-all duration-300 ease-out-soft md:p-8",
        variant === "light" && "border border-gray-200",
        variant === "light" && !emphasized && hoverable && "hover:border-gray-300",
        variant === "light" && "bg-white",
        variant === "dark" && "border border-white/10 bg-navy-900/60 text-white",
        variant === "dark" && hoverable && "hover:border-white/20",
        emphasized && "border-gold-400",
        emphasized && hoverable && "hover:shadow-glow-gold",
        hoverable && "hover:-translate-y-1.5 hover:shadow-soft-lg",
        className
      )}
    >
      {variant === "light" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/[0.08] to-transparent"
        />
      )}
      {children}
    </div>
  );
}
