import { services } from "@/data/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { ServiceDetailRow } from "@/components/ui/ServiceDetailRow";

/**
 * Expanded presentation of each service, one per row, alternating
 * icon side left/right for visual rhythm. Same exact content as the
 * grid above (verbatim PDF descriptions) — no invented bullets or
 * technical claims, since the approved content defines none per
 * service beyond the one-line description.
 */
export function ServiceDetailsSection() {
  return (
    <Section background="white" id="service-details">
      <Container>
        <EyebrowLabel>تفاصيل الخدمات</EyebrowLabel>
        <h2 className="mt-5 font-arabic text-h2 text-navy-900">كيف نساعدك في كل خدمة</h2>

        <div className="mt-10">
          {services.map((service, index) => (
            <ServiceDetailRow key={service.href} service={service} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
