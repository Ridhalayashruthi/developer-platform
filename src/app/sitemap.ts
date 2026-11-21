import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://vercel.app";

function getActualToolSlugs(): string[] {
  const toolsDir = path.join(process.cwd(), "src/app/tools");
  if (!fs.existsSync(toolsDir)) return [];

  return fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("["))
    .map((entry) => entry.name);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/tools",
    "/interview",
    "/roadmaps",
    "/ai",
    "/about",
    "/privacy-policy",
    "/terms",
  ];

  const mainPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = getActualToolSlugs().map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...mainPages, ...toolPages];
}