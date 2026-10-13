import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function StaticPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <div className="wrap">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="page-head">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <h1>{title}</h1>
      </div>
      <div className="prose">{children}</div>
      <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
        {SITE_NAME} — {url}
      </p>
    </div>
  );
}
