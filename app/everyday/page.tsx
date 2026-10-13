import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { SITE_URL, getCategory } from "@/lib/site";

const cat = getCategory("everyday")!;

export const metadata: Metadata = {
  title: "Everyday Issues — Islamic Answers for Daily Life",
  description: cat.metaDescription,
  alternates: { canonical: `${SITE_URL}/everyday` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/everyday`,
    title: "Everyday Issues — Islamic Answers for Daily Life | Noor",
    description: cat.metaDescription,
  },
};

export default function EverydayIndexPage() {
  return <CategoryPage dir="everyday" />;
}
