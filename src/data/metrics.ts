/**
 * SOURCE OF TRUTH: Company Profile PDF, "مؤشرات النجاح" slide.
 * Values, labels, and the footnote are transcribed verbatim.
 * The footnote must always render alongside these numbers — it is
 * what keeps the statistics honest rather than looking fabricated.
 */
export const metrics = [
  { value: 200, prefix: "+", suffix: "%", label: "نمو المبيعات", sublabel: "متوسط النمو لدى عملائنا" },
  { value: 150, prefix: "+", suffix: "%", label: "الوصول الرقمي", sublabel: "زيادة في الوصول الرقمي" },
  { value: 95, prefix: "", suffix: "%", label: "رضا العملاء", sublabel: "معدل رضا عملائنا" },
  { value: 3, prefix: "", suffix: "x", label: "معدل التحويل", sublabel: "مضاعفة تحويل الزوار إلى عملاء" },
] as const;

export const metricsFootnote =
  "* أرقام مبنية على متوسط أداء محفظة عملائنا خلال عام كامل من الشراكة";
