import { Article, kidsStories, waqiat, qaItems } from "@/data/articles";

export const SITE_URL = "https://islamic-noor-wesbite.vercel.app";
export const SITE_NAME = "Noor Islamic Website";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const OG_IMAGE = {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "Noor Islamic Website — Islamic stories for kids and everyday answers for Muslim families",
};
export const YOUTUBE_URL = "https://youtube.com/@arhamasif22_official";

export interface Category {
  key: "kidsStories" | "waqiat" | "qaItems";
  dir: string; // URL segment
  name: string;
  blurb: string;
  metaDescription: string;
}

export const CATEGORIES: Category[] = [
  {
    key: "kidsStories",
    dir: "kids",
    name: "Kids Zone",
    blurb:
      "Short moral stories for little Muslims (ages 4–10). One clear lesson in every story — kindness, honesty, cleanliness, gratitude — told in gentle, simple English.",
    metaDescription:
      "Islamic stories for kids: short moral stories for little Muslims about kindness, honesty, cleanliness and gratitude. Simple English, one clear lesson each.",
  },
  {
    key: "waqiat",
    dir: "stories",
    name: "Stories & Waqiat",
    blurb:
      "Longer Islamic stories and reflections for teens and adults — honesty in business, patience in hardship, and the quiet beauty of a sincere heart.",
    metaDescription:
      "Islamic stories and waqiat for adults: inspiring moral stories about honesty, patience, gratitude and faith. Original English stories for Muslim readers.",
  },
  {
    key: "qaItems",
    dir: "everyday",
    name: "Everyday Issues",
    blurb:
      "Honest, careful answers to real questions Muslims ask about daily life — prayer at work, family matters, money worries. Always with a reminder to consult a local scholar.",
    metaDescription:
      "Everyday Islamic questions answered: prayer at work, family issues, money and daily Muslim life. Thoughtful, careful answers in simple English.",
  },
];

const RAW: Record<Category["key"], Article[]> = { kidsStories, waqiat, qaItems };

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 8)
    .join("-")
    .replace(/-+/g, "-");
}

export interface ArticleEntry {
  category: Category;
  slug: string;
  article: Article;
}

function buildEntries(): ArticleEntry[] {
  const entries: ArticleEntry[] = [];
  for (const cat of CATEGORIES) {
    const seen = new Set<string>();
    for (const article of RAW[cat.key]) {
      let slug = (article.slug || "").trim() || slugify(article.title);
      let candidate = slug;
      let n = 2;
      while (seen.has(candidate)) {
        candidate = `${slug}-${n}`;
        n++;
      }
      seen.add(candidate);
      entries.push({ category: cat, slug: candidate, article });
    }
  }
  return entries;
}

let cache: ArticleEntry[] | null = null;
export function getAllArticles(): ArticleEntry[] {
  if (!cache) cache = buildEntries();
  return cache;
}

export function getArticle(
  dir: string,
  slug: string
): ArticleEntry | undefined {
  return getAllArticles().find(
    (e) => e.category.dir === dir && e.slug === slug
  );
}

export function getCategory(dir: string): Category | undefined {
  return CATEGORIES.find((c) => c.dir === dir);
}

/** Trim to a max length at a word boundary, adding an ellipsis if cut. */
export function smartTrim(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.lastIndexOf(" ", max - 1);
  const end = cut > max * 0.6 ? cut : max - 1;
  return t.slice(0, end).trimEnd() + "…";
}

export function articleTitle(a: Article): string {
  return smartTrim(a.seoTitle || a.title, 60);
}

export function articleDescription(a: Article): string {
  const raw = a.seoDescription || a.summary || (a.body && a.body[0]) || a.title;
  return smartTrim(raw, 160);
}

export function articleUrl(e: ArticleEntry): string {
  return `${SITE_URL}/${e.category.dir}/${e.slug}`;
}

export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: "Is Noor Islamic Website free to use?",
    a: "Yes. Every story and answer on Noor is completely free to read. There are no accounts, no subscriptions, and no paywalls — open any page and start reading.",
  },
  {
    q: "Are the stories on Noor original?",
    a: "Yes. Every story and answer is written fresh for Noor in simple English. We never copy articles, books, or religious texts from other websites.",
  },
  {
    q: "Is the content suitable for children?",
    a: "The Kids Zone is written specially for children ages 4–10, with gentle language and one clear moral lesson per story. We teach through warmth, never fear.",
  },
  {
    q: "Can I ask a question about everyday Muslim life?",
    a: "Yes. Send your question through our Facebook page and we may publish it with a careful answer in the Everyday Issues section. Your name appears only if you choose to share it.",
  },
  {
    q: "Are the answers on this site religious rulings (fatwas)?",
    a: "No. Our answers are thoughtful general guidance, not fatwas. For personal religious rulings, please always consult a qualified local scholar.",
  },
];
