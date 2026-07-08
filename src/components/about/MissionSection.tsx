import { mission, missionPillars } from "@/data/about";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/**
 * "رسالتنا" — statement immediately followed by the three supporting
 * pillars from the same PDF slide (Measurable Results, Long-Term
 * Partnership, Professional Execution). Vision = aspiration, Mission =
 * how — pairing them back-to-back (Vision directly above) tells one
 * continuous "what we believe → how we act on it" story.
 */
export function MissionSection() {
  return (
    <Section background="white" id="mission" className="text-center">
      <Container>
        <div className="flex justify-center">
          <EyebrowLabel number="٠٣">رسالتنا</EyebrowLabel>
        </div>
        <h2 className="mt-4 font-arabic text-h2 text-navy-900">رسالتنا</h2>

        <p className="mx-auto mt-6 max-w-3xl font-arabic text-xl leading-relaxed text-gray-500">
          {mission}
        </p>

        <div className="mx-auto mt-14 flex max-w-3xl flex-col divide-y divide-gray-200 sm:flex-row sm:divide-x sm:divide-y-0 sm:divide-x-reverse">
          {missionPillars.map((pillar) => (
            <div key={pillar.label} className="flex flex-1 flex-col items-center gap-2 px-6 py-6 sm:py-0">
              <pillar.icon size={22} aria-hidden="true" className="text-blue-600" strokeWidth={1.75} />
              <p className="font-arabic text-base font-semibold text-navy-900">{pillar.label}</p>
              <p className="font-arabic text-sm text-gray-500">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
