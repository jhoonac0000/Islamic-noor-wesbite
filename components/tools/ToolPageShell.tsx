import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { SITE_URL } from "@/lib/site";

/** Consistent page-head + breadcrumbs wrapper for /tools/* pages. */
export default function ToolPageShell({
  title,
  lede,
  path,
  children,
}: {
  title: string;
  lede: string;
  path: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Islamic Tools",
        item: `${SITE_URL}/tools`,
      },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <div className="wrap">
      <JsonLd data={breadcrumbJsonLd} />
      <Reveal>
        <div className="page-head">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Islamic Tools", href: "/tools" },
              { label: title },
            ]}
          />
          <div className="page-ornament" aria-hidden="true">
            ✦
          </div>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
        </div>
      </Reveal>
      <div className="tool-wrap">{children}</div>
    </div>
  );
}
