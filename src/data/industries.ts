import {
  ShoppingBag,
  UtensilsCrossed,
  Building2,
  HeartPulse,
  GraduationCap,
  Landmark,
  Clapperboard,
  Factory,
} from "lucide-react";

/**
 * SOURCE OF TRUTH: Company Profile PDF, "القطاعات التي نخدمها" slide.
 * A flat, unranked list — the PDF gives no per-industry elaboration,
 * so this stays a clean icon+label directory (no invented case studies).
 */
export const industries = [
  { icon: ShoppingBag, label: "التجزئة والتسوق" },
  { icon: UtensilsCrossed, label: "المطاعم والضيافة" },
  { icon: Building2, label: "العقارات" },
  { icon: HeartPulse, label: "الرعاية الصحية" },
  { icon: GraduationCap, label: "التعليم والتدريب" },
  { icon: Landmark, label: "الخدمات المالية" },
  { icon: Clapperboard, label: "الترفيه والإعلام" },
  { icon: Factory, label: "الصناعة والتصنيع" },
] as const;
