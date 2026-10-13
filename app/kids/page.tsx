import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { SITE_URL, getCategory } from "@/lib/site";

const cat = getCategory("kids")!;

export const metadata: Metadata = {
  title: "Kids Zone — Islamic Stories for Kids",
  description: cat.metaDescription,
  alternates: { canonical: `${SITE_URL}/kids` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/kids`,
    title: "Kids Zone — Islamic Stories for Kids | Noor",
    description: cat.metaDescription,
  },
};

export default function KidsIndexPage() {
  return <CategoryPage dir="kids" />;
}
