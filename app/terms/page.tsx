import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use | Noor Islamic Website",
  description:
    "Terms of Use for Noor Islamic Website: our stories are for inspiration and learning, not religious rulings. Read the simple terms before using the site.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms`,
    title: "Terms of Use | Noor Islamic Website",
    description:
      "Our stories are for inspiration and learning, not religious rulings.",
  },
};

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Use" path="/terms">
      <p>
        <strong>Last updated:</strong> 13 October 2026
      </p>
      <h2>1. Purpose</h2>
      <p>
        Noor publishes original Islamic stories and general educational
        answers for Muslim families. Our content is for inspiration and
        learning.
      </p>
      <h2>2. Not religious rulings</h2>
      <p>
        Stories and answers on this site are <strong>not fatwas</strong> and do
        not replace the guidance of a qualified scholar. For personal
        religious rulings, please consult a trusted local scholar.
      </p>
      <h2>3. Use of content</h2>
      <p>
        You are welcome to read and share links to our pages for personal,
        non-commercial use. Please do not copy our articles onto other
        websites without permission.
      </p>
      <h2>4. Accuracy</h2>
      <p>
        We write carefully and correct mistakes promptly, but we make no
        guarantees of completeness. If you spot an error, please tell us.
      </p>
      <h2>5. External links</h2>
      <p>
        We may occasionally link to outside websites. We are not responsible
        for their content or privacy practices.
      </p>
    </StaticPage>
  );
}
