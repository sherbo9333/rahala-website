"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { primaryNav } from "@/data/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Full-screen mobile nav overlay per spec:
 * navy background, staggered fade-in of links 60ms apart, 52px min
 * tap targets. Services item expands in-place (accordion) rather than
 * pushing to a second screen, to keep the mobile flow to one level.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Lock body scroll while the overlay is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-navy-900 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="القائمة الرئيسية"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-1/3 -top-1/4 h-[420px] w-[420px] rounded-full bg-gold-600/[0.08] blur-[100px]"
          />
          <div className="flex items-center justify-between px-5 py-5">
            <Logo variant="white" />
            <button
              onClick={onClose}
              aria-label="إغلاق القائمة"
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <motion.nav
            aria-label="التنقل الرئيسي"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-1 flex-col overflow-y-auto px-5 py-4"
          >
            {primaryNav.map((item) => (
              <motion.div key={item.href} variants={itemVariants} className="border-b border-white/10">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setServicesExpanded((v) => !v)}
                      className="flex min-h-[52px] w-full items-center justify-between py-3 text-right font-arabic text-lg font-medium text-white transition-colors duration-200 hover:text-gold-400"
                      aria-expanded={servicesExpanded}
                      aria-controls="mobile-services-panel"
                    >
                      {item.label}
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {servicesExpanded && (
                        <motion.div
                          id="mobile-services-panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-3 ps-4">
                            {item.children.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                onClick={onClose}
                                className="flex min-h-[44px] items-center font-arabic text-base text-white/70 transition-colors hover:text-gold-400"
                              >
                                {service.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-[52px] w-full items-center font-arabic text-lg font-medium text-white transition-colors duration-200 hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>

          <motion.div variants={itemVariants} className="px-5 pb-8 pt-4">
            <Button href="/contact" variant="primary" className="w-full justify-center bg-white text-navy-900 hover:bg-gold-400 hover:text-navy-900 hover:shadow-none">
              ابدأ شراكتك مع رسالة الآن
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
