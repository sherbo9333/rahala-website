interface JsonLdProps {
  data: object;
}

/**
 * Renders a single JSON-LD <script> tag. `dangerouslySetInnerHTML` is
 * the standard, safe pattern here since `data` always comes from our
 * own structured-data.ts helpers (never raw user input) — there is no
 * injection risk from data we fully control server-side.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
