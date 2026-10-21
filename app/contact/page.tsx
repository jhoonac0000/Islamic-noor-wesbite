import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Noor Islamic Website",
  description:
    "Contact Noor Islamic Website: send a salam, a suggestion, a correction, or a question for our Everyday Issues column via our Facebook page.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/contact`,
    title: "Contact Noor Islamic Website",
    description:
      "Send a salam, a suggestion, a correction, or a question for our Everyday Issues column.",
  },
};

const FB = "https://www.facebook.com/profile.php?id=61595512130088";

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us" path="/contact">
      <p>
        We would love to hear from you — a salam, a suggestion, a correction,
        or a question for our Everyday Issues column.
      </p>
      <h2>Ask a question</h2>
      <p>
        Have a question about everyday Muslim life? Send it through our{" "}
        <a href={FB} rel="noopener">
          Facebook page
        </a>
        . We read every question in the evening and publish selected questions
        with careful answers the next day, so other readers benefit too. Your
        name appears only if you choose to share it.
      </p>
      <h2>Follow Noor</h2>
      <ul>
        <li>
          <strong>Facebook:</strong>{" "}
          <a href={FB} rel="noopener">
            Noor Islamic Website
          </a>
        </li>
        <li>
          <strong>Website:</strong> {SITE_URL}/
        </li>
      </ul>
      <h2>Corrections</h2>
      <p>
        Found a mistake in a story or an answer? Please tell us — accuracy is
        an amanah (trust), and we correct errors promptly.
      </p>
    </StaticPage>
  );
}
