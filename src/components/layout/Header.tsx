"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";

interface HeaderProps {
  /**
   * Some pages (e.g. Services Overview, Contact) open on a light
   * section rather than a dark hero — pass false so the header is
   * solid from the first frame instead of flashing transparent-white text.
   */
  transparentOnTop?: boolean;
}

/**
 * Global sticky header, per spec:
 * - Transparent + white text over a dark hero, until scrolled
 * - Solid white + navy text once scrolled (shadow, compact height)
 * - 88px → 64px height compression on scroll, 200ms ease
 * - Single filled CTA button — the only filled button in the header
 */
export function Header({ transparentOnTop = true }: HeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(24);
  const pathname = usePathname();

  const solid = scrolled || !transparentOnTop;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 ease-out",
          solid ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_theme(colors.gray.200)]" : "bg-transparent"
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
                      className={cn(
                        "relative py-2 font-arabic text-[15px] font-medium transition-colors",
                        solid ? "text-navy-900/80 hover:text-blue-600" : "text-white/90 hover:text-white",
                        "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-blue-600 after:transition-all after:duration-150 hover:after:w-full"
                      )}
                      aria-expanded={servicesOpen}
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
                  className={cn(
                    "relative py-2 font-arabic text-[15px] font-medium transition-colors",
                    isActive
                      ? solid
                        ? "text-blue-600"
                        : "text-white"
                      : solid
                        ? "text-navy-900/80 hover:text-blue-600"
                        : "text-white/90 hover:text-white",
                    "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:bg-blue-600 after:transition-all after:duration-150",
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
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-navy-900" : "text-white"
            )}
          >
            <Menu size={24} />
          </button>
        </div>

        <ServicesMegaMenu open={servicesOpen} onClose={() => setServicesOpen(false)} />
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
