import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "ghost-light";
type ButtonSize = "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Component Library Reference — Primary / Ghost button.
 * Spec: 14px radius, hover → gold fill + gold glow (primary), hover →
 * navy fill @8% opacity (ghost).
 *
 * Phase 6.3: primary hover moved from blue-600/cyan-glow to
 * gold-600/gold-glow, matching the brand's actual Deep Navy / White /
 * Warm Gold palette (verified 5.94:1 contrast for white text on
 * gold-600 — safe).
 *
 * Focus-visible outline deliberately kept as blue-600, not changed to
 * a brand color: Button is reused across both light and dark
 * backgrounds (including instances with a custom light bg placed on a
 * navy page section), and neither navy nor gold has a single shade
 * that stays clearly visible as an outline in every one of those
 * contexts — navy would vanish on navy, gold clears WCAG on navy but
 * only marginally on white. Blue-600 keeps working as a genuinely
 * neutral, always-visible focus indicator, which is arguably what a
 * functional accessibility affordance should be rather than a brand
 * color statement.
 *
 *  - hover: lifts 2px (-translate-y-0.5) + a subtle shadow, 250ms ease
 *  - active: settles back down and scales to 0.98 (reads as a real press)
 *  - disabled: 50% opacity, no pointer events, no lift/shadow
 *  - min-h-11 (44px) guarantees a compliant tap target at every size
 *
 * Phase 6.6 (final polish): primary variant gets a soft light sweep
 * across the fill on hover — the same premium "shine" cue the Hero's
 * own CTA uses, implemented here in the shared component so every
 * primary button site-wide carries it, not just Hero's one-off. Kept
 * to the primary variant only (restraint): ghost buttons stay plain.
 *
 * Renders a Next.js <Link> when `href` is passed, otherwise a <button>,
 * so this one component covers every CTA in the spec without duplicating
 * styles between navigational and action buttons.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "lg", className, children, href, ...props }, ref) => {
    const base = cn(
      "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-button font-display font-semibold",
      "transition-all duration-[250ms] ease-out-soft",
      "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
      "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none",
      size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
      variant === "primary" &&
        "bg-navy-900 text-white hover:bg-gold-600 hover:shadow-glow-gold",
      variant === "ghost" &&
        "border-[1.5px] border-navy-900 text-navy-900 bg-transparent hover:bg-navy-900/[0.08] hover:shadow-soft",
      variant === "ghost-light" &&
        "border-[1.5px] border-white text-white bg-transparent hover:bg-white/10 hover:shadow-soft",
      className
    );

    const content = (
      <>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {variant === "primary" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine"
          />
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={base}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={base} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
