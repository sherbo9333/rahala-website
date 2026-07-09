import type { Metadata } from "next";
import { aboutAnchors } from "@/data/navigation";
import { StickySubNav } from "@/components/ui/StickySubNav";
import { StorySection } from "@/components/about/StorySection";
import { VisionSection } from "@/components/about/VisionSection";
import { MissionSection } from "@/components/about/MissionSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

const title = "من نحن";
const description =
  "تعرّف على قصة رسالة، رؤيتنا ورسالتنا، وقيمنا الجوهرية التي توجّه كل قرار نتخذه في رحلة النمو الرقمي مع عملائنا.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `${title} | رسالة`,
    description,
    url: "/about",
  },
  twitter: {
    title: `${title} | رسالة`,
    description,
  },
};

/**
 * ABOUT — Phase 5.3
 * Single scrollable page with a sticky in-page sub-nav, per the
 * approved UX recommendation (Phase 4, section 0): About Us content
 * is short and narrative, so four separate page loads would add
 * friction without adding real IA value. Section order per spec:
 * Our Story -> Vision -> Mission -> Core Values -> CTA.
 *
 * FinalCtaSection is reused as-is from the Home page components
 * (it's generic closing-CTA content, not Home-specific) rather than
 * duplicated here.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "من نحن", path: "/about" }])} />
      <StickySubNav items={aboutAnchors} />
      <StorySection />
      <VisionSection />
      <MissionSection />
      <ValuesSection />
      <FinalCtaSection />
    </>
  );
}
