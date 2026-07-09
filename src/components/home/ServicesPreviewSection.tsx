import { services } from "@/data/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";

/**
 * Home's services preview — gray-50 background deliberately separates
 * this as its own commercial zone, distinct from the trust-building
 * sections around it. Each card teases the PDF's one-line description
 * and links to the full service page; Home never over-explains.
 *
 * Mobile: horizontal snap-scroll carousel (85% card width + peek of
 * the next card signals swipeability) instead of a tall vertical
 * stack, to keep the homepage scroll length reasonable.
 */
export function ServicesPreviewSection() {
  return (
    <Section background="gray" id="services">
      <Container>
        <EyebrowLabel number="٠٦" latin>
          OUR SERVICES
        </EyebrowLabel>
        <h2 className="mt-4 font-arabic text-h2 text-navy-900">خدماتنا</h2>

        {/* Mobile: snap-scroll carousel */}
        <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden">
          {services.map((service) => (
            <div key={service.href} className="w-[85%] shrink-0 snap-center">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Tablet/Desktop: grid */}
        <div className="mt-10 hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
