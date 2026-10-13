import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import {
  CATEGORIES,
  HOME_FAQS,
  SITE_NAME,
  SITE_URL,
  YOUTUBE_URL,
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

const SECTION_KICKERS: Record<string, string> = {
  kids: "For Little Muslims",
  stories: "For Teens & Adults",
  everyday: "Guidance, Not Fatwas",
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
          <p className="kicker">
            <span aria-hidden="true">✦</span> Original Islamic Stories &amp; Answers
          </p>
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
              <Reveal>
                <div className="section-head">
                  <div>
                    <p className="section-kicker">
                      {SECTION_KICKERS[cat.dir] ?? cat.name}
                    </p>
                    <h2 id={`h-${cat.dir}`}>{cat.name}</h2>
                    <p>{cat.blurb}</p>
                  </div>
                  <Link href={`/${cat.dir}`} className="more-link">
                    View all {cat.name} →
                  </Link>
                </div>
              </Reveal>
              <Reveal className="reveal-group">
                <ul className="cards">
                  {items.map((entry) => (
                    <li key={entry.slug}>
                      <ArticleCard entry={entry} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="section" aria-labelledby="h-about">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <div>
                <p className="section-kicker">Our Promise</p>
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
          </Reveal>
        </div>
      </section>

      <section className="section youtube-cta" aria-labelledby="h-youtube">
        <div className="wrap">
          <Reveal>
            <div className="youtube-cta-inner">
              <div>
                <p className="section-kicker">Watch &amp; Listen</p>
                <h2 id="h-youtube">Noor on YouTube</h2>
                <p>
                  Prefer watching? Our Islamic stories come alive on the
                  Arhamasif22 YouTube channel — new moral stories, shorts,
                  and reminders for the whole family.
                </p>
              </div>
              <a
                href={YOUTUBE_URL}
                className="btn btn-youtube"
                rel="noopener"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
                </svg>
                Subscribe on YouTube
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="h-faq">
        <div className="wrap">
          <Reveal>
            <p className="section-kicker">Good To Know</p>
            <h2 id="h-faq" style={{ color: "var(--emerald-900)" }}>
              Frequently Asked Questions
            </h2>
            <div className="faq" style={{ marginTop: "1.1rem" }}>
              {HOME_FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
