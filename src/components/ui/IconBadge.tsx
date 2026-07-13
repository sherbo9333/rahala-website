import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
  /** navy is the default neutral tone; gold is reserved for emphasis
   * only (per the brand's "gold as accent, not a primary color" rule). */
  tone?: "navy" | "gold";
  /** On dark (navy) backgrounds, gold needs its lighter shade to keep
   * contrast — same pattern as EyebrowLabel's `inverted` prop. */
  inverted?: boolean;
  /** md/lg are the spec sizes (40/48px). xl (80px) is an extension for
   * the Services page's expanded detail rows — same visual language,
   * just scaled up for a section that needs more presence. */
  size?: "md" | "lg" | "xl";
}

/**
 * Component Library Reference — Icon badge.
 * Spec: 40-48px circle, tinted background, icon color matching tone.
 *
 * Phase 6.3: renamed the default tone from "blue" to "navy" and
 * changed its actual colors to match — the brand palette is Deep
 * Navy / White / Warm Gold, with gold reserved strictly for emphasis,
 * so a "blue" tone as the site-wide default was both misnamed and
 * off-brand. Every card icon on the site uses this default tone.
 *
 * Hover polish: scales to 1.08 when the nearest `group` ancestor
 * (typically a Card) is hovered — the icon reacts to the card being
 * hovered rather than needing its own separate hover target, which
 * would fight with the card's own hover area.
 *
 * Marked aria-hidden since it is always paired with adjacent visible
 * text (title/label) — the icon is decorative, not the accessible name.
 */
export function IconBadge({ icon: Icon, className, tone = "navy", inverted = false, size = "md" }: IconBadgeProps) {
  const sizeMap = { md: "h-10 w-10", lg: "h-12 w-12", xl: "h-20 w-20" } as const;
  const iconSizeMap = { md: 20, lg: 24, xl: 36 } as const;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-full shrink-0",
        "transition-transform duration-200 ease-out group-hover:scale-[1.08]",
        sizeMap[size],
        tone === "navy" && "bg-navy-900/[0.07] text-navy-900",
        tone === "gold" && (inverted ? "bg-gold-400/15 text-gold-400" : "bg-gold-600/10 text-gold-600"),
        className
      )}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={1.75} />
    </div>
  );
}
