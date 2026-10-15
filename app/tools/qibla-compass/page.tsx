import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QiblaTool from "@/components/tools/QiblaTool";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Qibla Compass — Find Your Qibla Direction | Noor",
  description:
    "Find the exact Qibla direction from anywhere with a visual compass dial showing the angle to the Kaaba in Makkah. Free, private, no sign-up.",
  alternates: { canonical: `${SITE_URL}/tools/qibla-compass` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/qibla-compass`,
    title: "Qibla Compass — Find Your Qibla Direction | Noor",
    description:
      "The exact Qibla angle to the Kaaba from your location, with a visual compass dial.",
  },
};

export default function QiblaCompassPage() {
  return (
    <ToolPageShell
      title="Qibla Compass"
      lede="The exact direction of the Kaaba from your location — calculated with great-circle math, shown on a compass dial."
      path="/tools/qibla-compass"
    >
      <QiblaTool />
    </ToolPageShell>
  );
}
