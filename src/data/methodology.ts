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
