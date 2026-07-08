import type { LucideIcon } from "lucide-react";
import { services } from "@/data/navigation";
import { methodologySteps } from "@/data/methodology";

export interface ServiceDetail {
  slug: string;
  title: string;
  icon: LucideIcon;
  /** Exact approved one-line description, verbatim from the PDF. */
  description: string;
  /** Paraphrased expansion of the same approved description — no new
   * claims, tools, or deliverables beyond what that one sentence covers. */
  overview: string;
  /** Short benefit phrases, each a direct restatement/breakdown of the
   * approved description — not invented technical specifics. */
  benefits: string[];
  /** Which other services this one is most often paired with, for the
   * Related Services section. Slugs, resolved against this same list. */
  relatedSlugs: string[];
}

/**
 * SOURCE OF TRUTH for title/icon/description: `services` in
 * data/navigation.ts (already approved, already used by the frozen
 * Header mega-menu, Footer, and Services overview page) — derived
 * here via slug lookup rather than re-typed, so there's no risk of
 * this data drifting out of sync with the frozen pages that also
 * render it.
 *
 * `benefits` and `overview` are paraphrases only — no service-specific
 * technical claims (tools, integrations, specific numbers) are
 * invented beyond what the approved one-line description supports.
 *
 * `process` is deliberately NOT a per-service invented process — every
 * service page reuses the same approved 5-step company methodology
 * (data/methodology.ts), framed as "how we deliver this service",
 * since the PDF never defines a distinct process per service and
 * inventing one would fabricate content.
 */
export function slugFromHref(href: string): string {
  return href.split("/").pop() ?? href;
}

const detailContent: Record<string, Pick<ServiceDetail, "overview" | "benefits" | "relatedSlugs">> = {
  "digital-strategy": {
    overview:
      "نبدأ بفهم عميق لنشاطك وسوقك، ثم نضع خارطة طريق رقمية واضحة تربط كل قرار استراتيجي بنتيجة قابلة للقياس، لضمان أن يكون كل جهد رقمي في خدمة أهدافك الفعلية.",
    benefits: [
      "خارطة نمو رقمية واضحة ومحددة",
      "ربط مباشر بين أهدافك التجارية والنتائج الرقمية",
      "أولويات عمل مبنية على أهدافك",
    ],
    relatedSlugs: ["data-analytics", "digital-marketing"],
  },
  "digital-marketing": {
    overview:
      "نصمم حملات تسويقية رقمية تصل إلى جمهورك المستهدف بدقة، وتُقاس نتائجها باستمرار لضمان أن كل جهد تسويقي يعمل على تحقيق نمو حقيقي.",
    benefits: [
      "استهداف دقيق للجمهور المناسب",
      "حملات رقمية مصممة لتحقيق نتائج فعلية",
      "نتائج قابلة للقياس والتحقق",
    ],
    relatedSlugs: ["digital-strategy", "data-analytics"],
  },
  "website-development": {
    overview:
      "نطوّر مواقع إلكترونية سريعة ومصممة بعناية، تعكس احترافية علامتك وتحوّل زوارها إلى عملاء فعليين.",
    benefits: [
      "أداء سريع واحترافي",
      "تصميم موجه لتحويل الزائر إلى عميل",
      "تجربة استخدام سلسة ومريحة للزائر",
    ],
    relatedSlugs: ["visual-identity", "e-commerce"],
  },
  "e-commerce": {
    overview:
      "نبني متاجر إلكترونية متكاملة، من التصميم إلى تجربة الدفع، لتحقيق تجربة شراء سلسة تنعكس مباشرة على مبيعاتك.",
    benefits: ["متاجر إلكترونية احترافية", "تجربة شراء محسّنة للعملاء", "مبيعات أفضل من خلال تجربة مستخدم متقنة"],
    relatedSlugs: ["website-development", "digital-marketing"],
  },
  "visual-identity": {
    overview:
      "نصمم هوية بصرية متكاملة تعبّر عن جوهر علامتك التجارية، وتمنحها حضورًا واضحًا ومتماسكًا في كل نقطة تواصل مع جمهورك.",
    benefits: ["هوية بصرية مميزة لعلامتك", "حضور أقوى وأوضح في السوق", "تناسق بصري يعكس قيمة علامتك"],
    relatedSlugs: ["website-development", "digital-marketing"],
  },
  "data-analytics": {
    overview:
      "نحلل بيانات أعمالك لنكشف الأنماط والفرص الحقيقية، ونحوّلها إلى قرارات عملية تُسرّع نمو أعمالك.",
    benefits: ["تحويل البيانات إلى قرارات عملية", "رؤية أوضح لأداء أعمالك", "قرارات أسرع مبنية على بيانات حقيقية"],
    relatedSlugs: ["digital-strategy", "digital-marketing"],
  },
};

export const serviceDetails: ServiceDetail[] = services.map((service) => {
  const slug = slugFromHref(service.href);
  const content = detailContent[slug];
  if (!content) {
    throw new Error(`Missing service-detail content for slug "${slug}" — update detailContent in service-details.ts`);
  }
  return {
    slug,
    title: service.label,
    icon: service.icon,
    description: service.description,
    ...content,
  };
});

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

export function getRelatedServices(detail: ServiceDetail): ServiceDetail[] {
  return detail.relatedSlugs
    .map((slug) => getServiceDetail(slug))
    .filter((s): s is ServiceDetail => s !== undefined);
}

/**
 * Related services in the original `ServiceNavItem` shape (label/
 * description/href/icon) — for direct reuse with the existing
 * `ServiceCard` component, no new card variant needed.
 */
export function getRelatedNavItems(detail: ServiceDetail) {
  return services.filter((service) => detail.relatedSlugs.includes(slugFromHref(service.href)));
}

/** Reused as-is for every service's Process section — see module docstring. */
export const serviceProcessSteps = methodologySteps;
