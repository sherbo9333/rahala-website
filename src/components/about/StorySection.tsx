import { storyParagraphs } from "@/data/about";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/**
 * "قصتنا" — the one section with no direct PDF slide to transcribe
 * (flagged as a content gap in Phase 4 and filled in the approved
 * brand content document). Eyebrow follows the same Arabic-repeat
 * pattern the PDF uses for its narrative slides (رؤيتنا/رسالتنا),
 * since Our Story is thematically the same kind of section.
 *
 * The illustration is a hand-drawn abstract ascending-line SVG (gold
 * strokes, transparent background) rather than stock photography or
 * a literal chart — matching the Design System's imagery direction.
 */
export function StorySection() {
  return (
    <Section background="white" id="story">
      <Container>
        <EyebrowLabel number="٠١">قصتنا</EyebrowLabel>
        <h1 className="mt-4 font-arabic text-h2 text-navy-900">قصتنا</h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-3">
            {storyParagraphs.map((paragraph, i) => (
              <p key={i} className="font-arabic text-body leading-[1.9] text-gray-500">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center lg:col-span-2">
            <svg
              viewBox="0 0 320 240"
              aria-hidden="true"
              className="h-auto w-full max-w-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 200 C 70 180, 90 140, 130 130 S 190 90, 220 80 S 270 40, 300 30"
                stroke="#C9A24B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M20 220 C 80 210, 120 190, 160 175 S 230 140, 300 100"
                stroke="#C9A24B"
                strokeOpacity="0.35"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="300" cy="30" r="5" fill="#C9A24B" />
              <circle cx="220" cy="80" r="3.5" fill="#C9A24B" fillOpacity="0.7" />
              <circle cx="130" cy="130" r="3.5" fill="#C9A24B" fillOpacity="0.7" />
              <circle cx="20" cy="200" r="3.5" fill="#C9A24B" fillOpacity="0.7" />
            </svg>
          </div>
        </div>
      </Container>
    </Section>
  );
}
