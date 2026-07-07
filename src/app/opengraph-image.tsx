import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "رحالة — شريكك الاستراتيجي في النمو الرقمي";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// No dynamic params on this route, so Next.js statically generates it
// once at build time — safe to use Node's fs here (not edge-restricted).
const fontPath = join(
  process.cwd(),
  "node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff"
);

/**
 * Auto-wired by Next.js Metadata Files convention: generates
 * /opengraph-image, picked up automatically for openGraph.images and
 * twitter.images — no external asset or manual <meta> tag needed.
 *
 * The Arabic wordmark needs its font embedded explicitly — Satori
 * (the renderer behind ImageResponse) has no default Arabic-script
 * glyph coverage, so "رحالة" would render as empty boxes without this.
 */
export default async function OgImage() {
  const arabicFont = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1220",
        }}
      >
        <div style={{ display: "flex", color: "#C9A24B", fontSize: 28, letterSpacing: 4 }}>
          RAHALA DIGITAL GROWTH
        </div>
        <div style={{ display: "flex", color: "#FFFFFF", fontSize: 130, fontFamily: "IBM Plex Sans Arabic", marginTop: 16 }}>
          رحالة
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ width: 40, height: 2, background: "#C9A24B" }} />
          <div style={{ width: 6, height: 6, borderRadius: 999, background: "#C9A24B" }} />
          <div style={{ width: 40, height: 2, background: "#C9A24B" }} />
        </div>
        <div
          style={{ display: "flex", color: "#FFFFFF", fontSize: 34, fontFamily: "IBM Plex Sans Arabic" }}
        >
          شريكك الاستراتيجي في النمو الرقمي
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "IBM Plex Sans Arabic", data: arabicFont, style: "normal", weight: 700 }],
    }
  );
}
