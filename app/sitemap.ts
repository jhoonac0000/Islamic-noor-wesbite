import type { MetadataRoute } from "next";
import { SITE_URL, articleUrl, getAllArticles } from "@/lib/site";

export const dynamic = "force-static";

// lastmod anchors (factual, from the repo build and the daily publish
// log): the homepage and the three category hubs list the newest
// articles, so they change with every publish batch (latest batch
// 2026-11-05). The site-info pages date from the 2026-10-13 build in
// the repo history. Tool pages carry no lastmod rather than a guessed
// date — their exact publish dates are not recorded.
const HUB_LASTMOD = new Date("2026-11-05");
const INFO_LASTMOD = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; lastModified?: Date }[] = [
    { path: "", lastModified: HUB_LASTMOD },
    { path: "/kids", lastModified: HUB_LASTMOD },
    { path: "/stories", lastModified: HUB_LASTMOD },
    { path: "/everyday", lastModified: HUB_LASTMOD },
    { path: "/tools" },
    { path: "/tools/prayer-times" },
    { path: "/tools/qibla-compass" },
    { path: "/tools/hijri-calendar" },
    { path: "/tools/zakat-calculator" },
    { path: "/tools/embed-widget" },
    { path: "/about", lastModified: INFO_LASTMOD },
    { path: "/contact", lastModified: INFO_LASTMOD },
    { path: "/privacy-policy", lastModified: INFO_LASTMOD },
    { path: "/terms", lastModified: INFO_LASTMOD },
  ];

  const urls: MetadataRoute.Sitemap = staticPages.map(({ path: p, lastModified }) => ({
    url: `${SITE_URL}${p}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1 : p.startsWith("/kids") || p.startsWith("/stories") || p.startsWith("/everyday") ? 0.8 : 0.9,
  }));

  for (const entry of getAllArticles()) {
    // Each article's real publish date (daily publish log), stored on
    // the article as `date`. No date recorded → no lastmod, never a
    // guessed one.
    const published = (entry.article as { date?: string }).date;
    urls.push({
      url: articleUrl(entry),
      ...(published ? { lastModified: new Date(published) } : {}),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return urls;
}
