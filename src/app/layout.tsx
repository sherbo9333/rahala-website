import type { Metadata } from "next";
import "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rahala.sa"),
  title: {
    default: "رسالة | شريكك الاستراتيجي في النمو الرقمي",
    template: "%s | رسالة",
  },
  description:
    "رسالة شركة سعودية متخصصة في النمو الرقمي المتكامل، تجمع بين الاستراتيجية والتنفيذ والقياس في منظومة واحدة لتحقيق نمو رقمي حقيقي وقابل للقياس.",
  keywords: [
    "رسالة",
    "النمو الرقمي",
    "التسويق الرقمي السعودية",
    "التجارة الإلكترونية",
    "الاستراتيجية الرقمية",
    "تطوير المواقع",
  ],
  authors: [{ name: "رسالة للنمو الرقمي" }],
  alternates: {
    // Placeholder canonical for the root route; every page-level
    // metadata export should set its own relative canonical the same way.
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "ar_SA",
    siteName: "رسالة",
    title: "رسالة | شريكك الاستراتيجي في النمو الرقمي",
    description: "منظومة نمو رقمي متكاملة تجمع بين الاستراتيجية والتنفيذ والقياس.",
    // og:image is auto-populated from src/app/opengraph-image.tsx —
    // no need to list it manually here.
  },
  twitter: {
    card: "summary_large_image",
    title: "رسالة | شريكك الاستراتيجي في النمو الرقمي",
    description: "منظومة نمو رقمي متكاملة تجمع بين الاستراتيجية والتنفيذ والقياس.",
    // twitter:image is likewise auto-populated from opengraph-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // icon/apple-icon are auto-detected from src/app/icon.png by Next.js's
  // Metadata Files convention — no manual <link rel="icon"> needed.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900 focus:shadow-soft-lg"
        >
          تخطَّ إلى المحتوى الرئيسي
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
