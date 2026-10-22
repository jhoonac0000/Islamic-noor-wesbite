import type { MetadataRoute } from "next";
import { SITE_URL, articleUrl, getAllArticles } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/kids",
    "/stories",
    "/everyday",
    "/tools",
    "/tools/prayer-times",
    "/tools/qibla-compass",
    "/tools/hijri-calendar",
    "/tools/zakat-calculator",
    "/tools/embed-widget",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const urls: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1 : p.startsWith("/kids") || p.startsWith("/stories") || p.startsWith("/everyday") ? 0.8 : 0.9,
  }));

  for (const entry of getAllArticles()) {
    urls.push({
      url: articleUrl(entry),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return urls;
}
