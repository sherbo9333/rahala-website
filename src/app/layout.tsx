import type { Metadata } from "next";
import "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rahala.sa"),
  title: {
    default: "رحالة | شريكك الاستراتيجي في النمو الرقمي",
    template: "%s | رحالة",
  },
  description:
    "رحالة شركة سعودية متخصصة في النمو الرقمي المتكامل، تجمع بين الاستراتيجية والتنفيذ والقياس في منظومة واحدة لتحقيق نمو رقمي حقيقي وقابل للقياس.",
  keywords: [
    "رحالة",
    "النمو الرقمي",
    "التسويق الرقمي السعودية",
    "التجارة الإلكترونية",
    "الاستراتيجية الرقمية",
    "تطوير المواقع",
  ],
  authors: [{ name: "رحالة للنمو الرقمي" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "رحالة",
    title: "رحالة | شريكك الاستراتيجي في النمو الرقمي",
    description:
      "منظومة نمو رقمي متكاملة تجمع بين الاستراتيجية والتنفيذ والقياس.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased">
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
