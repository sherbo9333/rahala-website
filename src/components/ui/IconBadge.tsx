import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
  /** gold is used sparingly on dark sections; blue is the default. */
  tone?: "blue" | "gold";
  /** md/lg are the spec sizes (40/48px). xl (80px) is an extension for
   * the Services page's expanded detail rows — same visual language,
   * just scaled up for a section that needs more presence. */
  size?: "md" | "lg" | "xl";
}

/**
 * Component Library Reference — Icon badge.
 * Spec: 40-48px circle, blue-600 @10% opacity bg, icon in blue-600
 * or gold depending on section context.
 *
 * Hover polish: scales to 1.08 when the nearest `group` ancestor
 * (typically a Card) is hovered — the icon reacts to the card being
 * hovered rather than needing its own separate hover target, which
 * would fight with the card's own hover area.
 *
 * Marked aria-hidden since it is always paired with adjacent visible
 * text (title/label) — the icon is decorative, not the accessible name.
 */
export function IconBadge({ icon: Icon, className, tone = "blue", size = "md" }: IconBadgeProps) {
  const sizeMap = { md: "h-10 w-10", lg: "h-12 w-12", xl: "h-20 w-20" } as const;
  const iconSizeMap = { md: 20, lg: 24, xl: 36 } as const;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-full shrink-0",
        "transition-transform duration-200 ease-out group-hover:scale-[1.08]",
        sizeMap[size],
        tone === "blue" && "bg-blue-600/10 text-blue-600",
        tone === "gold" && "bg-gold-400/10 text-gold-400",
        className
      )}
    >
      <Icon size={iconSizeMap[size]} strokeWidth={1.75} />
    </div>
  );
}
