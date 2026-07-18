"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/data/navigation";
import { IconBadge } from "@/components/ui/IconBadge";

interface ServicesMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Desktop-only mega-menu for the "خدماتنا" nav item.
 * Shows all 6 services with icon + one-line description (verbatim
 * from the PDF) so a visitor can jump straight to the one they need
 * instead of always landing on the overview page first.
 */
export function ServicesMegaMenu({ open, onClose }: ServicesMegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="services-mega-menu"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={onClose}
          className="absolute inset-x-0 top-full z-40 hidden bg-white/85 shadow-soft-lg backdrop-blur-xl lg:block"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-900/[0.08] to-transparent"
          />
          <div className="mx-auto grid max-w-content grid-cols-3 gap-2 px-24 py-8">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                onClick={onClose}
                className="group flex items-start gap-4 rounded-card p-4 transition-colors duration-200 ease-out-soft hover:bg-gold-600/[0.05]"
              >
                <IconBadge icon={service.icon} tone="navy" />
                <div>
                  <p className="font-arabic text-base font-semibold text-navy-900 group-hover:text-gold-600">
                    {service.label}
                  </p>
                  <p className="mt-1 font-arabic text-sm leading-relaxed text-gray-500">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
