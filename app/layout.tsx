import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { OG_IMAGE, SITE_NAME, SITE_URL, YOUTUBE_URL } from "@/lib/site";
import "./globals.css";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61595512130088";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Islamic Stories for Kids & Everyday Answers | Noor",
  description:
    "Noor Islamic Website: original Islamic stories for kids and thoughtful answers to everyday questions for Muslim families. Simple English, free to read.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Islamic Stories for Kids & Everyday Answers | Noor",
    description:
      "Original Islamic stories for kids and thoughtful answers to everyday questions for Muslim families.",
    url: SITE_URL,
    images: [OG_IMAGE],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "gmjCuIwCP437z4jrGWGsBJmK7czxBRf1gQ67l993trA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b3d2e",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "An independent Islamic website publishing original stories for kids and thoughtful answers to everyday questions for Muslim families in simple English.",
  sameAs: [YOUTUBE_URL, FACEBOOK_URL],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
