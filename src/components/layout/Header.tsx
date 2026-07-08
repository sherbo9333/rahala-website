"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

// Both overlays are purely client-interactive and only needed after a
// user action (hover/click) — lazy-loaded so their JS isn't part of
// the initial page bundle every visitor pays for.
const ServicesMegaMenu = dynamic(
  () => import("@/components/layout/ServicesMegaMenu").then((m) => m.ServicesMegaMenu),
  { ssr: false }
);
const MobileMenu = dynamic(() => import("@/components/layout/MobileMenu").then((m) => m.MobileMenu), {
  ssr: false,
});

interface HeaderProps {
  /**
   * Auto-detected from the route by default (true only on "/", which is
   * the only page with a dark hero behind the header). Only pass this
   * explicitly to override the default for a page that doesn't fit the
   * route-based assumption — normal pages shouldn't need to.
   */
  transparentOnTop?: boolean;
}

/**
 * Global sticky header, per spec:
 * - Transparent + white text over a dark hero, until scrolled
 * - Solid white + navy text once scrolled (shadow, compact height)
 * - 88px → 64px height compression on scroll, 200ms ease
 * - Single filled CTA button — the only filled button in the header
 *
 * Accessibility note: the Services item opens on hover (mouse) *and*
 * on focus/click (keyboard) — a hover-only trigger is invisible to
 * keyboard users, since focusing the button previously did nothing.
 * It now also closes on Escape or when focus leaves the whole nav item.
 */
export function Header({ transparentOnTop }: HeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(24);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const effectiveTransparentOnTop = transparentOnTop ?? isHomePage;

  const solid = scrolled || !effectiveTransparentOnTop;

  // Close the Services mega-menu on Escape. Scoped to only listen while
  // it's actually open, so this adds no overhead the rest of the time.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 ease-out",
          solid ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_theme(colors.gray.200)]" : "bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-content items-center justify-between px-5 transition-all duration-200 ease-out md:px-8 xl:px-24",
            solid ? "h-16" : "h-[88px]"
          )}
        >
          <Logo variant={solid ? "navy" : "white"} />

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      onFocus={() => setServicesOpen(true)}
                      className={cn(
                        "relative py-2 font-arabic text-[15px] font-medium transition-colors duration-200",
                        solid ? "text-navy-900/80 hover:text-blue-600" : "text-white/90 hover:text-white",
                        "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full"
                      )}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      aria-controls="services-mega-menu"
                    >
                      {item.label}
                    </button>
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative py-2 font-arabic text-[15px] font-medium transition-colors duration-200",
                    isActive
                      ? solid
                        ? "text-blue-600"
                        : "text-white"
                      : solid
                        ? "text-navy-900/80 hover:text-blue-600"
                        : "text-white/90 hover:text-white",
                    "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:bg-blue-600 after:transition-all after:duration-200",
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/get-started"
              variant="primary"
              size="md"
              className={!solid ? "bg-white text-navy-900 hover:bg-navy-900 hover:text-white" : undefined}
            >
              ابدأ شراكتك الآن
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
            aria-haspopup="true"
            aria-expanded={mobileOpen}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              solid ? "text-navy-900" : "text-white"
            )}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>

        <ServicesMegaMenu open={servicesOpen} onClose={() => setServicesOpen(false)} />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
