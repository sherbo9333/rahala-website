"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * Home Hero — recreates the PDF's own opening slide composition
 * (small eyebrow mark → gold tagline → giant wordmark → gold divider
 * → subheadline → dual CTA) so a visitor who has seen the company
 * profile feels immediate brand recognition.
 *
 * The compass mark rotates once every 20s (--animate-spin-slow) — the
 * single ambient motion moment on the page, deliberately quiet rather
 * than a flashy intro animation.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Subtle radial gradient mesh, top-right, 8% opacity — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/[0.08] blur-3xl"
      />

      <Container className="relative flex min-h-[90vh] flex-col items-center justify-center py-24 text-center md:min-h-[85vh]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={item} className="mb-6 flex h-16 w-16 items-center justify-center">
            <Compass size={40} strokeWidth={1.25} className="animate-spin-slow text-gold-400" aria-hidden="true" />
          </motion.div>

          <motion.p variants={item} className="font-arabic text-caption text-gold-400">
            شركة رسالة للنمو الرقمي
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-arabic text-[3.5rem] font-extrabold leading-[1.05] text-white sm:text-display-lg"
          >
            رسالة
          </motion.h1>

          <motion.div variants={item} className="my-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-gold-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            <span className="h-px w-10 bg-gold-400" />
          </motion.div>

          <motion.p variants={item} className="max-w-xl font-arabic text-xl leading-relaxed text-gray-200 sm:text-2xl">
            شريكك الاستراتيجي في النمو الرقمي
          </motion.p>

          <motion.div variants={item} className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button href="/contact" variant="primary" className="justify-center bg-white text-navy-900 hover:bg-blue-600 hover:text-white">
              ابدأ شراكتك الآن
            </Button>
            <Button href="/services" variant="ghost-light" className="justify-center">
              تعرّف على خدماتنا
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
