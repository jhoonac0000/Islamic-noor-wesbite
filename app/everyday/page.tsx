import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { OG_IMAGE, SITE_URL, getCategory } from "@/lib/site";

const cat = getCategory("everyday")!;

export const metadata: Metadata = {
  title: "Islamic Answers to Everyday Questions | Noor",
  description: cat.metaDescription,
  alternates: { canonical: `${SITE_URL}/everyday` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/everyday`,
    title: "Islamic Answers to Everyday Questions | Noor",
    description: cat.metaDescription,
  },
};

export default function EverydayIndexPage() {
  return <CategoryPage dir="everyday" />;
}
