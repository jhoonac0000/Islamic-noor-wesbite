import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { SITE_URL, getCategory } from "@/lib/site";

const cat = getCategory("kids")!;

export const metadata: Metadata = {
  title: "Islamic Stories for Kids | Bedtime & Moral Tales | Noor",
  description: cat.metaDescription,
  alternates: { canonical: `${SITE_URL}/kids` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/kids`,
    title: "Islamic Stories for Kids | Bedtime & Moral Tales | Noor",
    description: cat.metaDescription,
  },
};

export default function KidsIndexPage() {
  return <CategoryPage dir="kids" />;
}
