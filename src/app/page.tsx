import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { WhyRahalaSection } from "@/components/home/WhyRahalaSection";
import { MetricsSection } from "@/components/home/MetricsSection";
import { ServicesPreviewSection } from "@/components/home/ServicesPreviewSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "رحالة شركة سعودية متخصصة في النمو الرقمي المتكامل، تجمع بين الاستراتيجية والتنفيذ والقياس في منظومة واحدة لتحقيق نمو رقمي حقيقي وقابل للقياس.",
  alternates: {
    canonical: "/",
  },
};

/**
 * HOME — Phase 5.2
 * Section order per the approved High-Fidelity UI Specification:
 * Hero -> Why Rahala -> Metrics -> Services Preview -> Methodology
 * -> Industries -> Final CTA. No section added, removed, or reordered
 * beyond what was approved.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyRahalaSection />
      <MetricsSection />
      <ServicesPreviewSection />
      <MethodologySection />
      <IndustriesSection />
      <FinalCtaSection />
    </>
  );
}
