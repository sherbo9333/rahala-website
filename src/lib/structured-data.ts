import { contactInfo } from "@/data/navigation";
import type { ServiceDetail } from "@/data/service-details";

const BASE_URL = "https://www.rahala.sa";

/**
 * Sitewide Organization schema — rendered once, in the root layout,
 * so it's present on every page. Uses only approved contact data
 * (data/navigation.ts) — no invented business details.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "رسالة للنمو الرقمي",
  alternateName: "Resala Digital Growth Company",
  url: BASE_URL,
  logo: `${BASE_URL}/assets/logo-navy.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: contactInfo.phone,
      email: contactInfo.email,
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["Arabic"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
};

/** Sitewide WebSite schema — also rendered once in the root layout. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "رسالة",
  url: BASE_URL,
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Builds a BreadcrumbList schema from an ordered list of {name, path}.
 * Every page (except Home) should include Home as the first crumb.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

/** Service schema for each individual service detail page. */
export function buildServiceSchema(detail: ServiceDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: detail.title,
    description: detail.description,
    provider: {
      "@type": "Organization",
      name: "رسالة للنمو الرقمي",
      url: BASE_URL,
    },
    areaServed: "SA",
    url: `${BASE_URL}/services/${detail.slug}`,
  };
}

/** ContactPage schema for the Contact page. */
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "تواصل معنا",
  url: `${BASE_URL}/contact`,
};
