interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * Consistent h2 + prose wrapper for legal document sections. Both
 * Privacy Policy and Terms & Conditions have ~8-9 top-level sections
 * each — extracting this avoids repeating the same heading/spacing/
 * typography utility classes 17+ times across two pages.
 *
 * Renders an <h2> — the page's single <h1> lives in PageHeader above.
 * Content (paragraphs/lists) is passed as children so each page keeps
 * full control of its own semantic structure (p/ul/ol/h3 as needed).
 */
export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-b border-gray-200 py-10 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="font-arabic text-h3 text-navy-900">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 font-arabic text-[15px] leading-[1.9] text-gray-500 [&_ol]:list-decimal [&_ol]:ps-6 [&_ul]:list-disc [&_ul]:ps-6 [&_li]:leading-[1.9]">
        {children}
      </div>
    </section>
  );
}
