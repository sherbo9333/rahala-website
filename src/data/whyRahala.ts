import { Layers, TrendingUp, Link2 } from "lucide-react";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "لماذا تختار رحالة؟" slide.
 * Icons chosen to match the PDF's own glyphs as closely as lucide-react
 * allows (star→Layers for "integrated approach" reads clearer than a
 * literal star at icon-badge size; arrow-up→TrendingUp; link→Link2).
 * Wording is transcribed verbatim — do not edit without updating the PDF.
 */
export const whyRahalaCards = [
  {
    icon: Layers,
    title: "نهج متكامل",
    description: "نوّحد الاستراتيجية والتنفيذ والقياس داخل منظومة واحدة تضمن نموًا مستدامًا.",
    emphasized: false,
  },
  {
    icon: TrendingUp,
    title: "نمو رقمي حقيقي",
    description: "نرّكز على النتائج القابلة للقياس التي تنعكس مباشرًة على نمو أعمالك.",
    emphasized: true,
  },
  {
    icon: Link2,
    title: "شراكة استراتيجية",
    description: "نعمل كشريك طويل الأمد، نشاركك القرار، ونقود النمو مع فريقك.",
    emphasized: false,
  },
] as const;
