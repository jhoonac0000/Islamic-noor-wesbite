import type { Metadata } from "next";
import ArticleView from "@/components/ArticleView";
import {
  generateArticleMetadata,
  generateArticleStaticParams,
} from "@/components/articlePage";

export function generateStaticParams() {
  return generateArticleStaticParams("stories");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return generateArticleMetadata("stories", slug);
}

export default async function StoriesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleView dir="stories" slug={slug} />;
}
