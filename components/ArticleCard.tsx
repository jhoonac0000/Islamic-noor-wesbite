import Link from "next/link";
import type { ArticleEntry } from "@/lib/site";
import { smartTrim } from "@/lib/site";

export default function ArticleCard({ entry }: { entry: ArticleEntry }) {
  const { article, category, slug } = entry;
  const tag = article.lesson || article.topic;
  return (
    <article className="card">
      <span className="card-badge">{category.name}</span>
      <h3 className="card-title">
        <Link href={`/${category.dir}/${slug}`}>{article.title}</Link>
      </h3>
      <p className="card-summary">{smartTrim(article.summary, 160)}</p>
      <p className="card-meta">
        {[tag, article.ages, article.mins].filter(Boolean).join(" · ")}
      </p>
    </article>
  );
}
