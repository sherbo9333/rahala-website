"use client";

import { motion } from "framer-motion";
import { whyRahalaCards } from "@/data/whyRahala";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { MOTION } from "@/lib/tokens";

/**
 * "لماذا تختار رحالة؟" — placed immediately after the hero because
 * trust needs to be earned before asking for further scroll commitment.
 * The middle card carries the gold-border emphasis, matching the PDF's
 * own visual treatment of that card.
 */
export function WhyRahalaSection() {
  return (
    <Section background="white" id="why-rahala">
      <Container>
        <EyebrowLabel number="٠٢">فلسفتنا</EyebrowLabel>
        <h2 className="mt-4 font-arabic text-h2 text-navy-900">لماذا تختار رحالة؟</h2>
        <p className="mt-4 max-w-2xl font-arabic text-body text-gray-500">
          لأن النمو الحقيقي يتحقق عندما تجتمع الاستراتيجية والتنفيذ والقياس في منظومة واحدة.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyRahalaCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={MOTION.reveal.initial}
              whileInView={MOTION.reveal.animate}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...MOTION.reveal.transition, delay: index * 0.1 }}
            >
              <Card emphasized={card.emphasized} className="h-full">
                <IconBadge icon={card.icon} tone={card.emphasized ? "gold" : "blue"} size="lg" className="mb-5" />
                <h3 className={`font-arabic text-h3 ${card.emphasized ? "text-gold-400" : "text-navy-900"}`}>
                  {card.title}
                </h3>
                <p className="mt-2 font-arabic text-[15px] leading-relaxed text-gray-500">{card.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
