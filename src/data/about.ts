import { Target, Handshake, ShieldCheck, Lightbulb, Award, Users } from "lucide-react";

/**
 * SOURCE OF TRUTH: Company Profile PDF ("رؤيتنا" / "رسالتنا" / "قيمنا
 * الجوهرية" slides) for Vision, Mission, and Core Values — transcribed
 * verbatim. "Our Story" comes from the approved brand content document
 * (Phase 4 continuation), written specifically to fill the one gap the
 * PDF didn't cover, with no invented years/figures/achievements.
 */

export const storyParagraphs = [
  "نشأت رحالة من ملاحظة بسيطة تكررت في كل قطاع تعاملنا معه: أغلب العلامات التجارية لا تفتقر إلى الجهد الرقمي، بل تفتقر إلى منظومة تُحوّل هذا الجهد إلى نمو حقيقي. حملة تسويقية هنا، موقع إلكتروني هناك، تقرير أداء لا أحد يقرأه بعمق — جهود متفرقة، كل واحدة منها قد تكون جيدة بمفردها، لكنها لا تجتمع أبدًا في اتجاه واحد.",
  "من هذه الملاحظة، لا من فكرة نظرية، بدأت رحالة. لم نُرد أن نكون وكالة تنفّذ ما يُطلب منها فحسب، بل شريكًا يسأل \"لماذا\" قبل أن يسأل \"كيف\" — يفهم النشاط التجاري والسوق أولًا، ثم يبني الاستراتيجية، ثم ينفّذ، ثم يقيس، ثم يُحسّن.",
  "اسم \"رحالة\" نفسه يعكس هذا المعنى: النمو الرقمي ليس محطة تصل إليها وتتوقف، بل رحلة مستمرة من الفهم إلى التخطيط إلى التنفيذ إلى القياس، تتكرر وتتحسن في كل دورة.",
];

export const vision =
  "أن نكون الشريك الأول للنمو الرقمي في المنطقة العربية، عبر بناء منظومات نمو تحقق نتائج مستدامة، وتعكس القيمة الحقيقية لكل علامة تجارية.";

export const mission =
  "نقدّم حلولاً رقمية متكاملة، تجمع بين الإبداع والاستراتيجية والتنفيذ، لنصنع نموًا مستدامًا ونبني شراكات طويلة الأمد.";

export const missionPillars = [
  { icon: Target, label: "النتائج القابلة للقياس", description: "أداء مرئي بمؤشرات واضحة" },
  { icon: Handshake, label: "شراكة طويلة الأمد", description: "علاقات تمتد ما بعد المشروع" },
  { icon: ShieldCheck, label: "تنفيذ باحترافية", description: "فرق متخصصة بمعايير عالمية" },
] as const;

export const coreValues = [
  { icon: Users, title: "الشراكة", description: "نعمل كفريق واحد مع عملائنا نحو النجاح المشترك" },
  { icon: Target, title: "النتائج", description: "نلتزم بتحقيق أهداف قابلة للقياس والتحقق" },
  { icon: ShieldCheck, title: "الثقة", description: "نبني علاقاتنا على الشفافية والنزاهة التامة" },
  { icon: Lightbulb, title: "الابتكار", description: "نتبنى أحدث الحلول والأساليب الرقمية" },
  { icon: Award, title: "التميز", description: "نسعى دائمًا لتجاوز التوقعات في كل ما نقدمه" },
] as const;
