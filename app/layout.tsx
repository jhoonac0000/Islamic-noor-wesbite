import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
