import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { SITE_URL, getCategory } from "@/lib/site";

const cat = getCategory("stories")!;

export const metadata: Metadata = {
  title: "Islamic Stories & Waqiat With Moral Lessons | Noor",
  description: cat.metaDescription,
  alternates: { canonical: `${SITE_URL}/stories` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/stories`,
    title: "Islamic Stories & Waqiat With Moral Lessons | Noor",
    description: cat.metaDescription,
  },
};

export default function StoriesIndexPage() {
  return <CategoryPage dir="stories" />;
}
