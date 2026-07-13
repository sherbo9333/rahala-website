"use client";

import { metrics, metricsFootnote } from "@/data/metrics";
import { CountUp } from "@/components/ui/CountUp";

/**
 * "لماذا يختارنا عملاؤنا" — the same 4 approved metrics from Home's
 * Key Metrics band, reused here as supporting proof for "why clients
 * choose Rahala" (per the approved design spec's own suggestion for
 * this page: "Supporting stat recap (reuse the metrics band, smaller/
 * inline)"). Deliberately a compact inline row on a light background
 * rather than a second full-bleed navy band — repeating the exact
 * same large treatment twice on one page would be pure visual
 * duplication, not reinforcement.
 *
 * Marked "use client": CountUp uses framer-motion's useInView, and a
 * server component rendering it in a loop previously caused a React
 * Server Components manifest error (see Phase 5.2) — the fix there
 * was making the parent a client component, applied here preemptively.
 */
export function ClientMetricsRecap() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col items-center text-center">
            <CountUp
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              className="font-display text-3xl font-extrabold text-gold-600 sm:text-4xl"
            />
            <p className="mt-2 font-arabic text-sm font-semibold text-navy-900">{metric.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center font-arabic text-sm text-gray-500">{metricsFootnote}</p>
    </div>
  );
}
