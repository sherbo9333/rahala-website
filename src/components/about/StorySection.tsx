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
        <EyebrowLabel>قصتنا</EyebrowLabel>
        <h1 className="mt-5 font-arabic text-h2 text-navy-900">قصتنا</h1>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-3">
            {storyParagraphs.map((paragraph, i) => (
              <p key={i} className="font-arabic text-body leading-[1.9] text-gray-500">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative flex items-center justify-center lg:col-span-2">
            {/* Soft background panel + floating glow — gives the
                illustration visual weight instead of floating alone
                on plain white (Phase 6.0: "illustration area feels
                empty" feedback). */}
            <div
              aria-hidden="true"
              className="absolute h-64 w-64 animate-float rounded-full bg-navy-900/[0.06] blur-3xl sm:h-80 sm:w-80"
            />
            <div
              aria-hidden="true"
              className="absolute h-48 w-48 rounded-full border border-gray-200 bg-gray-50/80"
            />

            <svg
              viewBox="0 0 320 280"
              aria-hidden="true"
              className="relative h-auto w-full max-w-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Growth-network motif: connected nodes rising left-to-right,
                  echoing the "integrated system" narrative in قصتنا. */}
              <path
                d="M20 220 L 100 180 L 160 195 L 220 130 L 300 60"
                stroke="#8A0254"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                className="animate-dash-flow"
              />
              <path
                d="M100 180 L 160 130 L 220 130"
                stroke="#2A1730"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                className="animate-dash-flow"
              />
              <path
                d="M20 220 C 70 200, 90 160, 130 150 S 190 100, 220 90 S 270 50, 300 30"
                stroke="#8A0254"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <circle cx="300" cy="60" r="6" fill="#8A0254" />
              <circle cx="220" cy="130" r="5" fill="#8A0254" fillOpacity="0.85" />
              <circle cx="160" cy="195" r="4.5" fill="#2A1730" fillOpacity="0.8" />
              <circle cx="100" cy="180" r="4.5" fill="#8A0254" fillOpacity="0.7" />
              <circle cx="20" cy="220" r="4.5" fill="#8A0254" fillOpacity="0.6" />
              <circle cx="160" cy="130" r="3.5" fill="#2A1730" fillOpacity="0.6" />
            </svg>
          </div>
        </div>
      </Container>
    </Section>
  );
}
