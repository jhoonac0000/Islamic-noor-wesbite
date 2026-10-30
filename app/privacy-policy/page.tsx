import type { Metadata } from "next";
import StaticPage from "@/components/StaticPage";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Noor Islamic Website",
  description:
    "Privacy Policy of Noor Islamic Website: a static site with no accounts, no login, and no database. Our tools run entirely in your browser.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/privacy-policy`,
    title: "Privacy Policy | Noor Islamic Website",
    description:
      "A static site with no accounts and no data collection. Our tools run 100% in your browser.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy" path="/privacy-policy">
      <p>
        <strong>Effective date:</strong> 22 October 2026
      </p>
      <p>
        Noor Islamic Website is a simple static website. Your privacy matters
        to us, and this policy is short because we collect almost nothing.
      </p>
      <h2>No accounts, no database</h2>
      <p>
        This website has <strong>no user accounts, no login, and no
        database</strong>. There is nothing to sign up for, and the website
        itself does not collect, store, or sell any personal information
        about its visitors.
      </p>
      <h2>Our tools run in your browser</h2>
      <p>
        All of our tools — Prayer Times, Qibla Compass, Hijri Calendar, Zakat
        Calculator, and the embeddable prayer-times widget — run{" "}
        <strong>100% in your own browser</strong> (client-side). Any
        information you enter into a tool, such as your city or the amounts in
        the Zakat Calculator, is processed on your device only and is never
        sent to us. If a tool asks for your location (for example, the Qibla
        Compass), your browser handles that request directly and the location
        is not transmitted to or stored by us.
      </p>
      <h2>Hosting</h2>
      <p>
        The site is hosted on Vercel. Like most hosting providers, Vercel may
        keep basic technical server logs (such as IP addresses and request
        times) in order to deliver the website securely and reliably. These
        logs are governed by Vercel&apos;s own privacy policy; we do not use
        them to identify or track individual visitors.
      </p>
      <h2>Advertising and cookies</h2>
      <p>
        At present, this website carries no advertising and sets no
        advertising or analytics cookies. If we enable advertising in the
        future (for example, Google AdSense), Google may use cookies to serve
        and personalise ads, as described in Google&apos;s own policies. If
        that ever happens, we will update this page first.
      </p>
      <h2>Children&apos;s privacy</h2>
      <p>
        Our Kids Zone stories are written for children, but the website
        collects no information from anyone — child or adult.
      </p>
      <h2>Changes to this policy</h2>
      <p>
        If this policy ever changes, the updated version will be posted on
        this page with a new effective date.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href="mailto:jhoonac0000@gmail.com">jhoonac0000@gmail.com</a>.
      </p>
    </StaticPage>
  );
}
