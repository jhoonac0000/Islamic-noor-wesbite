import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found | Noor Islamic Website",
  description:
    "The page you were looking for could not be found. Explore Noor's Islamic stories for kids, stories & waqiat, everyday answers and free Islamic tools.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="wrap">
      <div className="not-found">
        <div className="page-ornament" aria-hidden="true">
          ✦
        </div>
        <p className="not-found-code" aria-hidden="true">
          404
        </p>
        <h1>This page could not be found</h1>
        <p className="lede">
          The page may have moved, or the link may have a small mistake in
          it. Everything on Noor is still here — start from one of these:
        </p>
        <div className="hero-cta not-found-cta">
          <Link href="/" className="btn">
            Go to Home
          </Link>
          <Link href="/tools" className="btn btn-ghost-dark">
            Free Islamic Tools
          </Link>
        </div>
        <nav className="back-links not-found-links" aria-label="Browse Noor">
          {CATEGORIES.map((c) => (
            <Link key={c.dir} href={`/${c.dir}`}>
              {c.name} →
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
