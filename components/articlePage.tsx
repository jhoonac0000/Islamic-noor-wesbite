import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_URL,
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
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
    },
  };
}
