/**
 * SOURCE OF TRUTH: Company Profile PDF, "منهجيتنا" slide.
 * A continuous 5-step cycle (explicitly captioned as such in the PDF:
 * "دورة تطوير مستمرة لتحقيق نمو مستدام") — step 3 (التنفيذ) carries the
 * PDF's own visual emphasis (gold-highlighted card), reproduced here.
 */
import { Layers, ClipboardList, CalendarCheck } from "lucide-react";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "منهجيتنا" slide.
 * A continuous 5-step cycle (explicitly captioned as such in the PDF:
 * "دورة تطوير مستمرة لتحقيق نمو مستدام") — step 3 (التنفيذ) carries the
 * PDF's own visual emphasis (gold-highlighted card), reproduced here.
 */
export const methodologySteps = [
  { number: "١", title: "الفهم", description: "نفهم نشاطك والسوق لنحدد فرص النمو.", emphasized: false },
  { number: "٢", title: "التخطيط", description: "نبني خطة واضحة بأهداف قابلة للقياس.", emphasized: false },
  { number: "٣", title: "التنفيذ", description: "ننفذ الحلول باحترافية ودقة لتحقيق أفضل النتائج.", emphasized: true },
  { number: "٤", title: "القياس", description: "نقيس الأداء ونحلل النتائج لاتخاذ قرارات أفضل.", emphasized: false },
  { number: "٥", title: "التحسين", description: "نحسن الأداء باستمرار لضمان النمو المستدام.", emphasized: false },
] as const;

export const methodologyCaption = "دورة تطوير مستمرة لتحقيق نمو مستدام.";

/**
 * SOURCE OF TRUTH: approved brand content document (Phase 4), "فلسفتنا
 * (نسخة موسّعة)" section — written specifically to expand on this exact
 * 5-step cycle without introducing any new claim beyond what the PDF's
 * own methodology slide already establishes. Reused verbatim here for
 * the Methodology page's Overview section.
 */
export const methodologyOverview =
  "نؤمن في رسالة أن النمو الرقمي الحقيقي لا يتحقق من خلال جهد واحد معزول، بل من خلال اجتماع هذه الجهود كلها في منظومة واحدة تتحرك بانسجام نحو هدف واحد محدد سلفًا. حين نبني استراتيجية، نُصممها لتُنفَّذ فعليًا، لا لتبقى وثيقة. وحين ننفّذ، نقيس أثر كل خطوة على النتيجة النهائية. وحين نقيس، نستخدم ما نتعلمه لتحسين الدورة القادمة — ثم نعود لنفهم من جديد، بمعلومات أعمق مما كانت لدينا في البداية.";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "مزايانا التنافسية" slide.
 * Curated to the 3 (of 6) advantages that are specifically about how
 * the *process* is run — not team expertise, local presence, or tools,
 * which belong to the future dedicated "لماذا رسالة" page instead of
 * being fully duplicated here. See Phase 5.6 deviations note.
 */
export const processAdvantages = [
  {
    icon: Layers,
    title: "نهج شامل ومتكامل",
    description: "نجمع الاستراتيجية والتنفيذ والقياس في منظومة واحدة",
  },
  {
    icon: ClipboardList,
    title: "تقارير شفافة ودورية",
    description: "تحديثات مفصلة تُمكّنك من اتخاذ قرارات مبنية على بيانات",
  },
  {
    icon: CalendarCheck,
    title: "الالتزام بالمواعيد والميزانية",
    description: "ننجز ما نعد به في الوقت والتكلفة المحددة دون مفاجآت",
  },
] as const;
