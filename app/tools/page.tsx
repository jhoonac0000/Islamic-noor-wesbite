import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Islamic Tools: Prayer Times, Qibla & Zakat | Noor",
  description:
    "Free Islamic tools: accurate prayer times by location, Qibla compass, Hijri calendar and zakat calculator. 100% private — everything runs in your browser.",
  alternates: { canonical: `${SITE_URL}/tools` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/tools`,
    title: "Free Islamic Tools: Prayer Times, Qibla & Zakat | Noor",
    description:
      "Prayer times, Qibla compass, Hijri calendar and zakat calculator — free, private, no sign-up.",
  },
};

const TOOLS = [
  {
    href: "/tools/prayer-times",
    badge: "Daily",
    title: "Prayer Times",
    summary:
      "Accurate Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha times for your location — with a live countdown to the next prayer.",
  },
  {
    href: "/tools/qibla-compass",
    badge: "Direction",
    title: "Qibla Compass",
    summary:
      "Find the exact Qibla direction from anywhere on Earth, with a visual compass dial showing the angle to the Kaaba.",
  },
  {
    href: "/tools/hijri-calendar",
    badge: "Calendar",
    title: "Hijri Calendar",
    summary:
      "See today's Islamic date and browse the Hijri month calendar — Muharram to Dhu al-Hijjah.",
  },
  {
    href: "/tools/zakat-calculator",
    badge: "Calculator",
    title: "Zakat Calculator",
    summary:
      "Work out 2.5% zakat on cash, gold, silver and business assets — with a nisab check and clear steps.",
  },
];

export default function ToolsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Islamic Tools", item: `${SITE_URL}/tools` },
    ],
  };

  return (
    <div className="wrap">
      <JsonLd data={breadcrumbJsonLd} />
      <Reveal>
        <div className="page-head">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Islamic Tools" }]} />
          <div className="page-ornament" aria-hidden="true">
            ✦
          </div>
          <h1>Free Islamic Tools</h1>
          <p className="lede">
            Practical everyday tools for Muslim life — prayer times, Qibla
            direction, the Hijri date, and zakat math. Everything runs
            privately in your browser: no sign-up, no tracking, no data ever
            leaves your device.
          </p>
        </div>
      </Reveal>

      <section className="section" aria-label="Islamic tools">
        <ul className="cards tool-cards">
          {TOOLS.map((t) => (
            <li key={t.href} className="card">
              <span className="card-badge">{t.badge}</span>
              <h2 className="card-title">
                <Link href={t.href}>{t.title}</Link>
              </h2>
              <p className="card-summary">{t.summary}</p>
              <p className="card-meta">
                <Link href={t.href} aria-label={`Open ${t.title}`}>
                  Open tool →
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-label="About these tools">
        <div className="prose">
          <h2>Private by design</h2>
          <p>
            Unlike most online tools, nothing you type here is sent to any
            server. Prayer times are calculated from the sun&apos;s position,
            the Qibla angle from great-circle math, and Hijri dates from the
            tabular Islamic calendar — all with code that runs on your own
            device.
          </p>
          <p>
            Times and dates are good estimates for daily life. For Ramadan,
            Eid, and exact prayer times, please always confirm with your
            local mosque.
          </p>
        </div>
      </section>
    </div>
  );
}
