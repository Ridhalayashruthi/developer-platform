import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vercel.app";
  const routes = [
    "",
    "/tools",
    "/tools/json-formatter",
    "/tools/jwt-decoder",
    "/tools/uuid-generator",
    "/tools/base64-encoder",
    "/tools/color-picker",
    "/tools/regex-tester",
    "/tools/password-generator",
    "/interview",
    "/roadmaps",
    "/ai",
    "/about",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}