import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { SITE_URL, articleUrl, getAllArticles, getCategory } from "@/lib/site";

const H1: Record<string, string> = {
  kids: "Kids Zone — Islamic Stories for Kids",
  stories: "Stories & Waqiat — Islamic Moral Stories",
  everyday: "Everyday Issues — Islamic Answers for Daily Life",
};

export default function CategoryPage({ dir }: { dir: string }) {
  const category = getCategory(dir);
  if (!category) return null;
  const entries = getAllArticles().filter((e) => e.category.dir === dir);
  const url = `${SITE_URL}/${dir}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: category.name, item: url },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} — ${category.blurb}`,
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: articleUrl(e),
      name: e.article.title,
    })),
  };

  return (
    <div className="wrap">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <Reveal>
        <div className="page-head">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: category.name }]}
          />
          <div className="page-ornament" aria-hidden="true">
            ✦
          </div>
          <h1>{H1[dir] ?? category.name}</h1>
          <p className="lede">{category.blurb}</p>
        </div>
      </Reveal>
      <section className="section" aria-label={`${category.name} articles`}>
        <Reveal className="reveal-group">
          <ul className="cards">
            {entries.map((entry) => (
              <li key={entry.slug}>
                <ArticleCard entry={entry} headingAs="h2" />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </div>
  );
}
