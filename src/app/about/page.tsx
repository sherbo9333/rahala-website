import type { Metadata } from "next";
import { aboutAnchors } from "@/data/navigation";
import { StickySubNav } from "@/components/ui/StickySubNav";
import { StorySection } from "@/components/about/StorySection";
import { VisionSection } from "@/components/about/VisionSection";
import { MissionSection } from "@/components/about/MissionSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على قصة رحالة، رؤيتنا ورسالتنا، وقيمنا الجوهرية التي توجّه كل قرار نتخذه في رحلة النمو الرقمي مع عملائنا.",
  alternates: {
    canonical: "/about",
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
      <StickySubNav items={aboutAnchors} />
      <StorySection />
      <VisionSection />
      <MissionSection />
      <ValuesSection />
      <FinalCtaSection />
    </>
  );
}
