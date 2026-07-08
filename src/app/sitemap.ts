import type { MetadataRoute } from "next";

const BASE_URL = "https://www.rahala.sa";

/**
 * Deliberately lists only routes that actually exist right now (just
 * "/" as of this phase). Listing the full approved sitemap (About,
 * Services, Industries, etc.) before those pages ship would have
 * search engines crawling and indexing 404s — worse for real SEO than
 * a temporarily-short sitemap. Add each route here in the same phase
 * it goes live; the shape is intentionally trivial to extend:
 *
 *   { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/industries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
