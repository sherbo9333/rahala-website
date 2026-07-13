"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Rss } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

/** Static network nodes: [x, y, radius] — varied sizes read as depth (near/far). */
const NODES: Array<[number, number, number]> = [
  [120, 480, 3],
  [180, 180, 2.5],
  [620, 120, 3.5],
  [780, 250, 2.5],
  [380, 80, 2.5],
  [520, 460, 2],
  [80, 260, 2],
  [860, 480, 2.5],
];

/** Floating particles: [x%, y%, size, floatDelay, variant] */
const PARTICLES: Array<[number, number, number, number, "float" | "float-reverse"]> = [
  [12, 70, 3, 0, "float"],
  [22, 30, 2, 1.2, "float-reverse"],
  [68, 22, 2.5, 0.6, "float"],
  [85, 60, 2, 1.8, "float-reverse"],
  [45, 85, 2, 0.9, "float"],
  [92, 35, 3, 0.3, "float-reverse"],
];

/**
 * Home Hero — Phase 6.2 depth pass.
 *
 * Same "living communication network" concept as Phase 6.1 (a
 * connected constellation with transmitting lines and impact
 * ripples), pushed further per direct feedback: glowing nodes (SVG
 * blur filter), two traveling light pulses that actually move along
 * the connection paths (native SVG `animateMotion`, gated behind
 * `useReducedMotion` since SMIL isn't covered by the CSS
 * `prefers-reduced-motion` override the rest of the site relies on),
 * six softly floating particles for atmospheric depth, and a subtle
 * mouse-parallax drift on the whole network layer. Every element
 * remains slow and restrained — nothing here loops faster than ~3s or
 * moves more than a few pixels.
 */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const parallaxX = useTransform(springX, [-1, 1], [-14, 14]);
  const parallaxY = useTransform(springY, [-1, 1], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-navy-900"
    >
      {/* Cinematic vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(11,18,32,0.75)_100%)]"
      />

      {/* Soft breathing spotlight behind the wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-gold-400/[0.08] blur-[110px]"
      />

      {/* Floating atmospheric particles */}
      {PARTICLES.map(([x, y, size, delay, variant], i) => (
        <div
          key={i}
          aria-hidden="true"
          className={
            variant === "float"
              ? "pointer-events-none absolute animate-float rounded-full bg-white/30 blur-[1px]"
              : "pointer-events-none absolute animate-float-reverse rounded-full bg-white/30 blur-[1px]"
          }
          style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDelay: `${delay}s` }}
        />
      ))}

      {/* The signal network — parallax-responsive layer */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ x: parallaxX, y: parallaxY }}
      >
        <defs>
          <filter id="hero-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static connections */}
        <g stroke="#E2E8F0" strokeOpacity="0.14" strokeWidth="1">
          <line x1="120" y1="480" x2="250" y2="380" />
          <line x1="250" y1="380" x2="180" y2="180" />
          <line x1="620" y1="120" x2="700" y2="420" />
          <line x1="700" y1="420" x2="780" y2="250" />
          <line x1="520" y1="460" x2="620" y2="120" />
          <line x1="80" y1="260" x2="180" y2="180" />
        </g>

        {/* Transmitting connections — marching-dash "signal" texture,
            always on (pure CSS, respects prefers-reduced-motion globally) */}
        <path id="hero-path-1" d="M420 520 L 620 120" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="10 14" className="animate-dash-flow" />
        <path id="hero-path-2" d="M180 180 L 380 80" stroke="#2952E3" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="10 14" className="animate-dash-flow" />

        {/* Glowing static nodes */}
        {NODES.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#E2E8F0" fillOpacity="0.4" filter="url(#hero-glow)" />
        ))}

        {/* Impact nodes — soft expanding ripple on arrival, staggered */}
        <circle cx="250" cy="380" r="4" fill="#C9A24B" filter="url(#hero-glow)" />
        <circle cx="250" cy="380" r="4" fill="none" stroke="#C9A24B" strokeWidth="1.5" className="origin-center animate-ripple" />
        <circle cx="700" cy="420" r="4" fill="#2952E3" filter="url(#hero-glow)" />
        <circle
          cx="700"
          cy="420"
          r="4"
          fill="none"
          stroke="#2952E3"
          strokeWidth="1.5"
          className="origin-center animate-ripple"
          style={{ animationDelay: "1.2s" }}
        />

        {/* Traveling light pulses — genuinely moving along the network,
            not just a decorative dash. Native SVG animateMotion isn't
            covered by the CSS prefers-reduced-motion override the rest
            of the site relies on, so it's explicitly gated here. */}
        {!shouldReduceMotion && (
          <>
            <circle r="3.5" fill="#F4E4B8" filter="url(#hero-glow)">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M420 520 L 620 120" />
            </circle>
            <circle r="3" fill="#8FA8F5" filter="url(#hero-glow)">
              <animateMotion dur="5.5s" repeatCount="indefinite" path="M180 180 L 380 80" begin="1.5s" />
            </circle>
          </>
        )}
      </motion.svg>

      <Container className="relative flex min-h-[92vh] flex-col items-center justify-center py-24 text-center md:min-h-[88vh]">
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col items-center">
          <motion.div variants={item} className="relative mb-7 flex h-14 w-14 items-center justify-center">
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gold-400/20 blur-lg animate-pulse-glow" />
            <Rss size={30} strokeWidth={1.5} className="relative text-gold-400" aria-hidden="true" />
          </motion.div>

          <motion.p variants={item} className="font-arabic text-caption text-gold-400">
            شركة رسالة للنمو الرقمي
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-arabic text-[3.75rem] font-extrabold leading-[1.03] tracking-tight text-white sm:text-display-lg"
          >
            رسالة
          </motion.h1>

          <motion.div variants={item} className="my-7 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-gold-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            <span className="h-px w-10 bg-gold-400" />
          </motion.div>

          <motion.p variants={item} className="max-w-xl font-arabic text-xl leading-relaxed text-gray-200 sm:text-2xl">
            شريكك الاستراتيجي في النمو الرقمي
          </motion.p>

          <motion.div variants={item} className="mt-11 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button href="/contact" variant="primary" className="justify-center bg-white text-navy-900 hover:bg-blue-600 hover:text-white">
              ابدأ شراكتك الآن
            </Button>
            <Button href="/services" variant="ghost-light" className="justify-center">
              تعرّف على خدماتنا
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Seamless transition into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}
