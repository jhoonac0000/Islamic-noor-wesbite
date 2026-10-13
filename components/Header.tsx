import Link from "next/link";
import { CATEGORIES, SITE_NAME, YOUTUBE_URL } from "@/lib/site";

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
          <a
            href={YOUTUBE_URL}
            className="nav-yt"
            rel="noopener"
            aria-label="Noor on YouTube"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
            </svg>
            <span>YouTube</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
