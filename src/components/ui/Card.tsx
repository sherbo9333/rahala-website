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
 * border, soft shadow at rest, lifts 4px + deeper shadow on hover, 200ms.
 */
export function Card({ children, className, emphasized = false, variant = "light", hoverable = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card p-6 md:p-8 shadow-soft transition-all duration-200 ease-out",
        variant === "light" && "bg-white border border-gray-200",
        variant === "dark" && "bg-navy-900/60 border border-white/10 text-white",
        emphasized && "border-gold-400",
        hoverable && "hover:-translate-y-1 hover:shadow-soft-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
