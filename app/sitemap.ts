import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { specialties } from "@/data/specialties";
import { serviceAreas } from "@/data/serviceAreas";

const BASE_URL = "https://mdbillinghouston.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/revenue-leakage-analysis`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/houston`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/service-areas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/specialties`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/process`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const specialtyRoutes: MetadataRoute.Sitemap = specialties.map((s) => ({
    url: `${BASE_URL}/specialties/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceAreaRoutes: MetadataRoute.Sitemap = serviceAreas.map((s) => ({
    url: `${BASE_URL}/service-areas/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...specialtyRoutes,
    ...serviceAreaRoutes,
  ];
}
