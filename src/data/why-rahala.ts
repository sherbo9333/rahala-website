import { Layers, Users, ClipboardList, MapPin, Cpu, CalendarCheck } from "lucide-react";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "WHY RAHALA" slide (page 8).
 * The PDF's raw text extraction for this slide came out with reversed
 * word/line order (a recurring artifact of this RTL PDF's text layer,
 * also seen on other slides where the rendered image was needed to
 * confirm correct reading order). Reconstructed here from the
 * rendered slide image reviewed during the design phase, not guessed:
 * eyebrow "WHY RAHALA", heading "لماذا رحالة؟", supporting line "أكثر
 * من مجرد وكالة... شريك استراتيجي للنمو", body: "نجمع بين الخبرة
 * المحلية والمعايير العالمية في منظومة متكاملة تضع مصلحة عملك أولًا."
 */
export const whyRahalaHero = {
  eyebrow: "WHY RAHALA",
  title: "لماذا رحالة؟",
  description: "أكثر من مجرد وكالة... شريك استراتيجي للنمو",
};

export const whyRahalaOverview =
  "نجمع بين الخبرة المحلية والمعايير العالمية في منظومة متكاملة تضع مصلحة عملك أولًا.";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "مزايانا التنافسية" slide
 * (page 11, eyebrow "ADVANTAGES"). This is the complete list of 6 —
 * unlike the Methodology page, which intentionally shows only the 3
 * most process-relevant of these (see data/methodology.ts and
 * TECHNICAL_DEBT.md). The dedicated Why Rahala page is the right home
 * for the full set.
 */
export const competitiveAdvantagesSubhead =
  "ما يجعل رحالة مختلفة ليس ما نقوله، بل ما يشهده عملاؤنا كل يوم في نتائجهم الفعلية.";

export const competitiveAdvantages = [
  {
    icon: Layers,
    title: "نهج شامل ومتكامل",
    description: "نجمع الاستراتيجية والتنفيذ والقياس في منظومة واحدة",
  },
  {
    icon: Users,
    title: "فريق متخصص لكل خدمة",
    description: "خبراء مخصصون لكل مجال بلا استثناء",
  },
  {
    icon: ClipboardList,
    title: "تقارير شفافة ودورية",
    description: "تحديثات مفصلة تُمكّنك من اتخاذ قرارات مبنية على بيانات",
  },
  {
    icon: MapPin,
    title: "تواجد محلي وفهم عميق",
    description: "معرفة راسخة بالسوق السعودي وخصائص المستهلك العربي",
  },
  {
    icon: Cpu,
    title: "تقنيات عالمية المستوى",
    description: "منصات وأدوات من أفضل ما يقدمه العالم الرقمي",
  },
  {
    icon: CalendarCheck,
    title: "الالتزام بالمواعيد والميزانية",
    description: "ننجز ما نعد به في الوقت والتكلفة المحددة دون مفاجآت",
  },
] as const;
