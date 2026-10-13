import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
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

const KIND_TO_DIR: Record<string, string> = {
  kids: "kids",
  waqiat: "stories",
  qa: "everyday",
};

export default function ArticleView({
  dir,
  slug,
}: {
  dir: string;
  slug: string;
}) {
  const entry = getArticle(dir, slug);
  if (!entry) notFound();
  const { article, category } = entry;
  const url = articleUrl(entry);
  const tag = article.lesson || article.topic;
  const metaBits = [tag, article.ages, article.mins].filter(Boolean);
  // Related: map links[] via kind+idx to real pages, fill with same-category others.
  const all = getAllArticles();
  const byDir = new Map<string, typeof all>();
  for (const e of all) {
    const list = byDir.get(e.category.dir) ?? [];
    list.push(e);
    byDir.set(e.category.dir, list);
  }
  const related: { label: string; href: string }[] = [];
  const used = new Set<string>([`${dir}/${slug}`]);
  if (article.links) {
    for (const l of article.links) {
      const targetDir = KIND_TO_DIR[l.kind];
      const target = targetDir ? byDir.get(targetDir)?.[l.idx] : undefined;
      const key = target
        ? `${target.category.dir}/${target.slug}`
        : null;
      if (target && key && !used.has(key)) {
        used.add(key);
        related.push({
          label: target.article.title,
          href: `/${target.category.dir}/${target.slug}`,
        });
      }
      if (related.length >= 3) break;
    }
  }
  for (const e of byDir.get(dir) ?? []) {
    if (related.length >= 3) break;
    const key = `${e.category.dir}/${e.slug}`;
    if (!used.has(key)) {
      used.add(key);
      related.push({
        label: e.article.title,
        href: `/${e.category.dir}/${e.slug}`,
      });
    }
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleTitle(article),
    description: articleDescription(article),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
        item: `${SITE_URL}/${dir}`,
      },
      { "@type": "ListItem", position: 3, name: articleTitle(article), item: url },
    ],
  };

  return (
    <div className="wrap">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Reveal>
        <div className="page-head">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: category.name, href: `/${dir}` },
              { label: articleTitle(article) },
            ]}
          />
          <div className="page-ornament" aria-hidden="true">
            ✦
          </div>
        </div>
      </Reveal>
      <article className="article-body">
        <h1>{article.title}</h1>
        {metaBits.length > 0 && (
          <p className="article-meta">{metaBits.join(" · ")}</p>
        )}
        {article.asked && <p className="article-meta">{article.asked}</p>}
        {article.body.map((para, i) => (
          <p key={i} className={i === 0 ? "lede-para" : undefined}>
            {para}
          </p>
        ))}
        {article.moral && (
          <Reveal>
            <aside className="moral-box" aria-label="Moral of the story">
              <h2>The Lesson</h2>
              <p>{article.moral}</p>
            </aside>
          </Reveal>
        )}
        {article.ref && <p className="source-note">{article.ref}</p>}
      </article>

      {related.length > 0 && (
        <section className="related" aria-label="Related stories">
          <h2>Related stories</h2>
          <Reveal className="reveal-group">
            <ul className="cards">
              {related.map((r) => (
                <li key={r.href} className="card">
                  <h3 className="card-title">
                    <Link href={r.href}>{r.label}</Link>
                  </h3>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      <nav className="back-links" aria-label="More from Noor">
        <Link href={`/${dir}`}>← More in {getCategory(dir)?.name}</Link>
        <Link href="/">← Back to home</Link>
      </nav>
    </div>
  );
}
