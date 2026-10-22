import type { Metadata } from "next";
import Link from "next/link";
import StaticPage from "@/components/StaticPage";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Noor Islamic Website",
  description:
    "Privacy Policy of Noor Islamic Website: a simple static site with no accounts, no cookies, and no data collection. Read how your privacy is protected.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/privacy-policy`,
    title: "Privacy Policy | Noor Islamic Website",
    description:
      "A simple static site with no accounts, no cookies, and no data collection.",
  },
};

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" path="/privacy">
      <p>
        Our Privacy Policy has moved. You can read the current version here:
      </p>
      <p>
        <Link href="/privacy-policy">
          Privacy Policy — Noor Islamic Website
        </Link>
      </p>
    </StaticPage>
  );
}
