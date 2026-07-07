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
 */
export function IconBadge({ icon: Icon, className, tone = "blue", size = "md" }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full shrink-0",
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
