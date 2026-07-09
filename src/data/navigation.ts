import { Layers, Activity, Monitor, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import type { NavItem, ServiceNavItem } from "@/types/navigation";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "خدماتنا" slide.
 * Labels and descriptions are transcribed verbatim — do not edit
 * wording here without updating the approved PDF first.
 */
export const services: ServiceNavItem[] = [
  {
    label: "الاستراتيجية الرقمية",
    description: "نرسم خارطة نمو رقمية تربط أهدافك بالنتائج.",
    href: "/services/digital-strategy",
    icon: Layers,
  },
  {
    label: "التسويق الرقمي",
    description: "نطلق حملات رقمية تستهدف الجمهور المناسب وتحقق نتائج قابلة للقياس.",
    href: "/services/digital-marketing",
    icon: Activity,
  },
  {
    label: "تطوير المواقع",
    description: "نطور مواقع سريعة واحترافية مصممة لتحويل الزائر إلى عميل.",
    href: "/services/website-development",
    icon: Monitor,
  },
  {
    label: "التجارة الإلكترونية",
    description: "نبني متاجر إلكترونية تحقق تجربة شراء ومبيعات أفضل.",
    href: "/services/e-commerce",
    icon: ShoppingBag,
  },
  {
    label: "الهوية البصرية",
    description: "نبني هوية بصرية تُميز علامتك وتُرسخ حضورها في السوق.",
    href: "/services/visual-identity",
    icon: Sparkles,
  },
  {
    label: "تحليل البيانات",
    description: "نحوّل البيانات إلى قرارات تُسرّع نمو أعمالك.",
    href: "/services/data-analytics",
    icon: TrendingUp,
  },
];

/**
 * SOURCE OF TRUTH: Website Sitemap (Phase 2, approved).
 * "About Us" ships as a single page with in-page anchors per the
 * approved UX recommendation (Phase 4, section 0).
 */
export const primaryNav: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "خدماتنا", href: "/services", children: services },
  { label: "القطاعات", href: "/industries" },
  { label: "لماذا رسالة", href: "/why-rahala" },
  { label: "منهجيتنا", href: "/methodology" },
  { label: "تواصل معنا", href: "/contact" },
];

export const aboutAnchors = [
  { label: "قصتنا", href: "#story" },
  { label: "رؤيتنا", href: "#vision" },
  { label: "رسالتنا", href: "#mission" },
  { label: "قيمنا", href: "#values" },
];

/** SOURCE OF TRUTH: Company Profile PDF, Contact slide. */
export const contactInfo = {
  location: "الرياض، المملكة العربية السعودية",
  website: "www.rahala.sa",
  email: "info@rahala.sa",
  phone: "+966 54 668 7283",
};
