import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import EmbedWidgetTool from "@/components/tools/EmbedWidgetTool";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Prayer Times Widget for Your Website | Noor",
  description:
    "Embed accurate daily prayer times on your mosque, school or blog website — free forever, no sign-up, no ads. Pick your city, copy one line of code, done.",
  alternates: { canonical: `${SITE_URL}/tools/embed-widget` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/tools/embed-widget`,
    title: "Free Prayer Times Widget for Your Website | Noor",
    description:
      "Add daily prayer times to any website with one copy-paste snippet. Free, private, no sign-up.",
  },
};

export default function EmbedWidgetPage() {
  return (
    <ToolPageShell
      title="Embed Our Prayer Times Widget — Free"
      lede="Run a mosque, Islamic school, blog or community website? Give your visitors today's prayer times with one copy-paste snippet — free forever, no sign-up, no ads, no tracking."
      path="/tools/embed-widget"
    >
      <EmbedWidgetTool />

      <div className="tool-panel" style={{ marginTop: "1.4rem" }}>
        <h2 style={{ marginTop: 0 }}>Why mosques and blogs embed this widget</h2>
        <ul>
          <li>
            <strong>Always up to date:</strong> times are calculated fresh
            every day for your city — nothing to maintain, ever.
          </li>
          <li>
            <strong>Accurate and adjustable:</strong> Muslim World League
            calculation with Standard or Hanafi Asr, and a live
            “next prayer” countdown your visitors will love.
          </li>
          <li>
            <strong>Private by design:</strong> the widget runs entirely in
            the visitor’s browser — no accounts, no cookies, no data
            collection.
          </li>
          <li>
            <strong>Lightweight:</strong> one small iframe that matches any
            website design and works on phones, tablets and desktops.
          </li>
        </ul>
        <p className="tool-note">
          The widget is free to use on any website. The small “Prayer Times
          by Noor Islamic Website” credit line at the bottom is part of the
          widget — please keep it in place so other communities can find
          and use it too. Jazakum Allahu khairan.
        </p>
      </div>
    </ToolPageShell>
  );
}
