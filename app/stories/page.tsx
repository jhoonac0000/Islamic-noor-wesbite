import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { OG_IMAGE, SITE_URL, getCategory } from "@/lib/site";

const cat = getCategory("stories")!;

export const metadata: Metadata = {
  title: "Islamic Stories & Waqiat With Moral Lessons | Noor",
  description: cat.metaDescription,
  alternates: { canonical: `${SITE_URL}/stories` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/stories`,
    title: "Islamic Stories & Waqiat With Moral Lessons | Noor",
    description: cat.metaDescription,
  },
};

export default function StoriesIndexPage() {
  return <CategoryPage dir="stories" />;
}
