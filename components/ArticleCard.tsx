import Link from "next/link";
import type { ArticleEntry } from "@/lib/site";
import { smartTrim } from "@/lib/site";

export default function ArticleCard({
  entry,
  headingAs = "h3",
}: {
  entry: ArticleEntry;
  headingAs?: "h2" | "h3";
}) {
  const { article, category, slug } = entry;
  const tag = article.lesson || article.topic;
  const Heading = headingAs;
  return (
    <article className="card">
      <span className="card-badge">{category.name}</span>
      <Heading className="card-title">
        <Link href={`/${category.dir}/${slug}`}>{article.title}</Link>
      </Heading>
      <p className="card-summary">{smartTrim(article.summary, 160)}</p>
      <p className="card-meta">
        {[tag, article.ages, article.mins].filter(Boolean).join(" · ")}
      </p>
    </article>
  );
}
