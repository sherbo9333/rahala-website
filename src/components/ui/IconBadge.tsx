import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
  /** navy is the default neutral tone; gold is reserved for emphasis
   * only (per the brand's "accent, not a primary color" rule). */
  tone?: "navy" | "gold";
  /** On dark (navy) backgrounds, the accent needs its lighter shade to
   * keep contrast — same pattern as EyebrowLabel's `inverted` prop. */
  inverted?: boolean;
  /** md/lg are the spec sizes (40/48px). xl (80px) is an extension for
   * the Services page's expanded detail rows — same visual language,
   * just scaled up for a section that needs more presence. */
  size?: "md" | "lg" | "xl";
}

/**
 * Component Library Reference — Icon badge.
 *
 * Phase 6.6 (final polish): added a soft blurred glow halo behind the
 * tinted circle, fading in on the parent card's hover — the same
 * "glowing node" language the Hero uses for its network (an SVG blur
 * filter on each point), reproduced here cheaply in CSS so every
 * card icon on the site now carries a little of that same depth
 * instead of being a flat tinted circle. Restrained: the glow is
 * invisible at rest and only ~15-25% opacity even at its peak.
 *
 * Hover polish: the circle itself still scales to 1.08 when the
 * nearest `group` ancestor (typically a Card) is hovered.
 *
 * Marked aria-hidden since it is always paired with adjacent visible
 * text (title/label) — the icon is decorative, not the accessible name.
 */
export function IconBadge({ icon: Icon, className, tone = "navy", inverted = false, size = "md" }: IconBadgeProps) {
  const sizeMap = { md: "h-10 w-10", lg: "h-12 w-12", xl: "h-20 w-20" } as const;
  const iconSizeMap = { md: 20, lg: 24, xl: 36 } as const;

  return (
    <div aria-hidden="true" className={cn("relative flex shrink-0 items-center justify-center", sizeMap[size], className)}>
      <div
        className={cn(
          "absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 ease-out-soft group-hover:opacity-100",
          tone === "navy" && "bg-navy-900/15",
          tone === "gold" && (inverted ? "bg-gold-400/25" : "bg-gold-600/20")
        )}
      />
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-full transition-transform duration-200 ease-out-soft group-hover:scale-[1.08]",
          tone === "navy" && "bg-navy-900/[0.07] text-navy-900",
          tone === "gold" && (inverted ? "bg-gold-400/15 text-gold-400" : "bg-gold-600/10 text-gold-600")
        )}
      >
        <Icon size={iconSizeMap[size]} strokeWidth={1.75} />
      </div>
    </div>
  );
}
