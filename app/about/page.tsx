import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/StaticPage";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Noor Islamic Website",
  description:
    "About Noor: an independent Islamic website publishing original stories for kids and thoughtful answers for Muslim families in simple English.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/about`,
    title: "About Noor Islamic Website",
    description:
      "An independent Islamic website with original stories for kids and thoughtful answers for Muslim families.",
  },
};

export default function AboutPage() {
  return (
    <StaticPage title="About Noor Islamic Website" path="/about">
      <p>
        Noor is a small, independent Islamic website for English-speaking
        Muslim families. We publish original stories and thoughtful answers —
        written in simple, warm English — for three readers in every home:
        children, parents, and anyone navigating everyday life with faith.
      </p>
      <h2>What you will find here</h2>
      <p>
        <strong>Kids Zone</strong> — Short moral stories for little Muslims
        (ages 4–10). Each story carries one clear lesson — kindness, honesty,
        cleanliness, gratitude — told in gentle language, never fear.
      </p>
      <p>
        <strong>Stories &amp; Waqiat</strong> — Longer Islamic stories and
        reflections for teens and adults: honesty in business, patience in
        hardship, and the quiet beauty of a sincere heart.
      </p>
      <p>
        <strong>Everyday Issues</strong> — Honest, careful answers to real
        questions Muslims ask about daily life: prayer at work, family
        disagreements, money worries, and more. Every answer is written with
        care, notes where scholars differ, and always encourages consulting a
        trusted local scholar for personal religious rulings.
      </p>
      <h2>Our promise</h2>
      <ul>
        <li>
          <strong>Original content.</strong> Every story and answer is written
          fresh for Noor. We never copy articles, fatwas, or books.
        </li>
        <li>
          <strong>No harshness.</strong> We teach through warmth, not fear —
          especially for children.
        </li>
        <li>
          <strong>Honesty over authority.</strong> We are storytellers and
          writers, not muftis. For personal religious rulings, please consult
          a qualified local scholar.
        </li>
      </ul>
      <p>
        Noor is a one-person project, published daily and growing slowly. If
        our stories helped your family, share them — that is the greatest
        support you can give. Start with our <Link href="/kids">Kids Zone</Link>{" "}
        or <Link href="/everyday">Everyday Issues</Link>.
      </p>
    </StaticPage>
  );
}
