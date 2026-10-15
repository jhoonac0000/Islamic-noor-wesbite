import Link from "next/link";
import { CATEGORIES, SITE_NAME, YOUTUBE_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">Noor</p>
          <p className="footer-tag">
            Original Islamic stories for kids and thoughtful answers for
            everyday Muslim life — in simple English.
          </p>
        </div>
        <nav aria-label="Explore">
          <p className="footer-h">Explore</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.dir}>
                <Link href={`/${c.dir}`}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/tools">Islamic Tools</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="About Noor">
          <p className="footer-h">Noor</p>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="footer-h">Follow</p>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61595512130088"
                rel="noopener"
              >
                Facebook Page
              </a>
            </li>
            <li>
              <a href={YOUTUBE_URL} rel="noopener">
                YouTube Channel
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© 2026 {SITE_NAME}. All stories are original.</p>
      </div>
    </footer>
  );
}
