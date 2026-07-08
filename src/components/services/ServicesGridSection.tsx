import { services } from "@/data/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";

/**
 * Full services grid for the Services page. Unlike Home's
 * ServicesPreviewSection (which uses a mobile swipe carousel to keep
 * the homepage scroll short), this page IS the destination for
 * comparing all 6 services — a visitor here wants to see everything
 * at once, so mobile gets a plain single-column stack instead of a
 * carousel that could hide options from view.
 */
export function ServicesGridSection() {
  return (
    <Section background="gray" id="services-grid">
      <div className="sr-only">
        <h2>قائمة خدماتنا</h2>
      </div>
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
