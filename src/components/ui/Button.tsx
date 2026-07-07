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
 * Spec: 14px radius, hover → blue-600 fill + cyan glow (primary),
 * hover → navy fill @8% opacity (ghost). Brand colors unchanged from
 * the approved spec — this pass only adds motion/state polish:
 *  - hover: lifts 2px (-translate-y-0.5) + a subtle shadow, 250ms ease
 *  - active: settles back down and scales to 0.98 (reads as a real press)
 *  - focus-visible: 2px blue-600 outline, offset 2px (unchanged, already spec-compliant)
 *  - disabled: 50% opacity, no pointer events, no lift/shadow
 *  - min-h-11 (44px) guarantees a compliant tap target at every size
 *
 * Renders a Next.js <Link> when `href` is passed, otherwise a <button>,
 * so this one component covers every CTA in the spec without duplicating
 * styles between navigational and action buttons.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "lg", className, children, href, ...props }, ref) => {
    const base = cn(
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-button font-display font-semibold",
      "transition-all duration-[250ms] ease-out",
      "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
      "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none",
      size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
      variant === "primary" &&
        "bg-navy-900 text-white hover:bg-blue-600 hover:shadow-glow-cyan",
      variant === "ghost" &&
        "border-[1.5px] border-navy-900 text-navy-900 bg-transparent hover:bg-navy-900/[0.08] hover:shadow-soft",
      variant === "ghost-light" &&
        "border-[1.5px] border-white text-white bg-transparent hover:bg-white/10 hover:shadow-soft",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={base}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={base} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
