import type { Metadata } from "next";
import {
  OG_IMAGE,
  SITE_NAME,
  articleDescription,
  articleTitle,
  articleUrl,
  getAllArticles,
  getArticle,
  getCategory,
} from "@/lib/site";

export function generateArticleStaticParams(dir: string) {
  return getAllArticles()
    .filter((e) => e.category.dir === dir)
    .map((e) => ({ slug: e.slug }));
}

export function generateArticleMetadata(
  dir: string,
  slug: string
): Metadata {
  const entry = getArticle(dir, slug);
  const category = getCategory(dir);
  if (!entry || !category) return {};
  const url = articleUrl(entry);
  const title = articleTitle(entry.article);
  const description = articleDescription(entry.article);
  // seoTitle already ends with "| Noor" — build the social title from the
  // bare headline so the brand is not doubled ("… | Noor | Noor Islamic Website").
  const socialTitle = `${title.replace(/\s*\|\s*Noor$/, "")} | ${SITE_NAME}`;
  // Articles carry no publish date in the data today; use one only if present.
  const published = (entry.article as { date?: string }).date;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      ...(published
        ? { publishedTime: published, section: category.name }
        : { section: category.name }),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
