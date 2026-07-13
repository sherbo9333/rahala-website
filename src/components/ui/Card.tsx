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
 * Always carries the `group` class (harmless when unused) so a nested
 * IconBadge can cascade its own hover scale off the card's hover state
 * instead of needing its own mouse listeners.
 */
export function Card({ children, className, emphasized = false, variant = "light", hoverable = true }: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-card p-6 md:p-8 shadow-soft transition-all duration-300 ease-out-soft",
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
      {children}
    </div>
  );
}
