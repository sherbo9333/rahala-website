"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface SubNavItem {
  label: string;
  href: string;
}

interface StickySubNavProps {
  items: readonly SubNavItem[];
  className?: string;
}

/**
 * Sticky in-page anchor navigation — spec: "About Us ships as a single
 * scrollable page with a sticky sub-nav" (Phase 4, approved UX
 * recommendation). Active pill: navy fill + white text; inactive:
 * gray-50 fill. Reusable wherever a page needs anchor-based sub-nav
 * (not About-specific).
 *
 * Sticks at top-20 — the header's compact height, which is
 * also its *only* height on any non-Home route (Header forces solid
 * immediately off Home), so this offset is reliable without needing
 * to read the header's live height.
 */
export function StickySubNav({ items, className }: StickySubNavProps) {
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport among
        // those currently intersecting the "active band".
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveHref(`#${topMost.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="التنقل داخل الصفحة"
      className={cn(
        "sticky top-20 z-30 bg-white/70 py-3 shadow-[0_1px_24px_rgba(42,23,48,0.06)] backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex max-w-content gap-2 overflow-x-auto px-5 md:px-8 xl:px-24">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-5 py-2 font-arabic text-sm font-medium transition-colors duration-200",
                isActive ? "bg-navy-900 text-white" : "bg-gray-50 text-navy-900/70 hover:bg-gray-200"
              )}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
