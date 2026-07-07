"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { MOTION } from "@/lib/tokens";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Background per spec: white sections alternate with gray-50 and
   * navy "dark island" bands to create rhythm (see Design System §1.1). */
  background?: "white" | "gray" | "navy";
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
}

/**
 * Standardizes section vertical padding and the scroll-reveal
 * animation shared by every section on the site, so neither has to
 * be reimplemented per-section.
 *
 * Padding: tightened during the production-polish pass (previously
 * 64/80/128px mobile/tablet/desktop, felt loose on tall viewports).
 * Now 48/64/88px — an ~40px reduction at desktop, proportionally less
 * on smaller breakpoints where the original spacing already read fine.
 * Layout, colors, and content are unchanged; only the padding scale
 * moved.
 *
 * Reveal: fade-up 40px, 0.6s ease-out, plays once per section
 * (viewport margin pulls the trigger slightly earlier than dead
 * center so it doesn't feel late). scroll-mt ensures an anchor link
 * to a section doesn't land underneath the sticky header.
 */
export function Section({ children, className, background = "white", as: Tag = "section", id }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "scroll-mt-20 py-12 md:py-16 lg:py-20",
        background === "white" && "bg-white",
        background === "gray" && "bg-gray-50",
        background === "navy" && "bg-navy-900 text-white",
        className
      )}
    >
      <motion.div
        initial={MOTION.reveal.initial}
        whileInView={MOTION.reveal.animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={MOTION.reveal.transition}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
