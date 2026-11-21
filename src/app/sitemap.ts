import type { MetadataRoute } from "next";

const BASE_URL = "https://vercel.app";

// Update these slugs to match the exact route names in your app
const toolSlugs = [
  "json-formatter",
  "jwt-decoder",
  "uuid-generator",
  "regex-tester",
  "base64",
  "password-generator",
  "url-encoder",
];

const staticRoutes = [
  "",
  "/tools",
  "/interview",
  "/roadmaps",
  "/ai",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const mainPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...mainPages, ...toolPages];
}