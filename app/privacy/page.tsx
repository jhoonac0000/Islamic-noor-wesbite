import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Noor Islamic Website",
  description:
    "Privacy Policy of Noor Islamic Website: a simple static site with no accounts, no cookies, and no data collection. Read how your privacy is protected.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/privacy`,
    title: "Privacy Policy | Noor Islamic Website",
    description:
      "A simple static site with no accounts, no cookies, and no data collection.",
  },
};

const FB = "https://www.facebook.com/profile.php?id=61595512130088";

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" path="/privacy">
      <p>
        <strong>Last updated:</strong> 13 October 2026
      </p>
      <p>
        Noor is a simple static website. Your privacy matters to us, and our
        policy is short because our data collection is minimal.
      </p>
      <h2>What we collect</h2>
      <p>
        <strong>Nothing.</strong> We do not have user accounts, comments,
        newsletters, or contact forms that store data on our servers. We do
        not use analytics cookies or advertising trackers.
      </p>
      <h2>Third parties</h2>
      <p>
        Our site is hosted on Cloudflare Pages, which may process standard
        technical logs (such as IP addresses) to deliver the website securely
        — governed by Cloudflare&apos;s own privacy policy. We do not receive
        or store these logs.
      </p>
      <h2>Children&apos;s privacy</h2>
      <p>
        Our Kids Zone stories are written for children, but the website
        collects no information from anyone — child or adult.
      </p>
      <h2>Changes</h2>
      <p>
        If this policy ever changes, the updated version will be posted on
        this page with a new date.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy: reach us via our{" "}
        <a href={FB} rel="noopener">
          Facebook page
        </a>
        .
      </p>
    </StaticPage>
  );
}
