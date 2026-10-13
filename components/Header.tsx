import Link from "next/link";
import { CATEGORIES, SITE_NAME } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label={`${SITE_NAME} — home`}>
          <span className="brand-mark" aria-hidden="true">
            ☾
          </span>
          <span className="brand-text">Noor</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {CATEGORIES.map((c) => (
            <Link key={c.dir} href={`/${c.dir}`}>
              {c.name}
            </Link>
          ))}
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
