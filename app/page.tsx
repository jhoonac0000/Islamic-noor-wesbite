import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import {
  CATEGORIES,
  HOME_FAQS,
  SITE_NAME,
  SITE_URL,
  getAllArticles,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Islamic Stories for Kids & Everyday Answers | Noor",
  description:
    "Noor Islamic Website: original Islamic stories for kids and thoughtful answers to everyday questions for Muslim families. Free, simple English.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Islamic Stories for Kids & Everyday Answers | Noor",
    description:
      "Original Islamic stories for kids and thoughtful answers to everyday questions for Muslim families.",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  const all = getAllArticles();

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Original Islamic stories for kids and thoughtful answers to everyday questions for Muslim families.",
    inLanguage: "en",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={webSiteJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="hero">
        <div className="wrap">
          <h1>Islamic Stories for Kids &amp; Everyday Answers for Muslims</h1>
          <p className="lede">
            Noor is a small Islamic website for English-speaking Muslim
            families — original moral stories for children and careful,
            thoughtful answers to the questions of everyday life.
          </p>
          <div className="hero-cta">
            <Link href="/kids" className="btn">
              Kids Zone Stories
            </Link>
            <Link href="/everyday" className="btn btn-ghost">
              Everyday Answers
            </Link>
          </div>
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const items = all
          .filter((e) => e.category.dir === cat.dir)
          .slice(0, 6);
        return (
          <section key={cat.dir} className="section" aria-labelledby={`h-${cat.dir}`}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <h2 id={`h-${cat.dir}`}>{cat.name}</h2>
                  <p>{cat.blurb}</p>
                </div>
                <Link href={`/${cat.dir}`} className="more-link">
                  View all {cat.name} →
                </Link>
              </div>
              <ul className="cards">
                {items.map((entry) => (
                  <li key={entry.slug}>
                    <ArticleCard entry={entry} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="section" aria-labelledby="h-about">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2 id="h-about">About Noor</h2>
              <p>
                Noor publishes original stories and answers in simple, warm
                English — for children, parents, and anyone navigating
                everyday life with faith. We never copy content, we teach
                through kindness, and our answers are guidance, not fatwas.
              </p>
            </div>
            <Link href="/about" className="more-link">
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-faq">
        <div className="wrap">
          <h2 id="h-faq" style={{ color: "var(--emerald-900)" }}>
            Frequently Asked Questions
          </h2>
          <div className="faq">
            {HOME_FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
