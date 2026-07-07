import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface IconBadgeProps {
  icon: LucideIcon;
  className?: string;
  /** gold is used sparingly on dark sections; blue is the default. */
  tone?: "blue" | "gold";
  size?: "md" | "lg";
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
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-full shrink-0",
        "transition-transform duration-200 ease-out group-hover:scale-[1.08]",
        size === "md" ? "h-10 w-10" : "h-12 w-12",
        tone === "blue" && "bg-blue-600/10 text-blue-600",
        tone === "gold" && "bg-gold-400/10 text-gold-400",
        className
      )}
    >
      <Icon size={size === "md" ? 20 : 24} strokeWidth={1.75} />
    </div>
  );
}
