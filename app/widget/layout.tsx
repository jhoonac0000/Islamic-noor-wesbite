import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/**
 * Layout for /widget/* embed pages. These pages are loaded inside
 * iframes on other websites, so the Noor site header/footer are
 * hidden and the page chrome is stripped to a bare canvas.
 * (The framing permissions themselves live in vercel.json.)
 */
export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        .site-header, .site-footer { display: none !important; }
        main { padding: 0 !important; margin: 0 !important; max-width: none !important; }
        body { background: transparent !important; }
      `}</style>
      {children}
    </>
  );
}
