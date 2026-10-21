import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PrayerTimesTool from "@/components/tools/PrayerTimesTool";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prayer Times by Location — Daily Schedule | Noor",
  description:
    "Accurate daily prayer times (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) for your location, with a live countdown to the next prayer. Free, private, no sign-up.",
  alternates: { canonical: `${SITE_URL}/tools/prayer-times` },
  openGraph: {
    images: [OG_IMAGE],
    type: "website",
    url: `${SITE_URL}/tools/prayer-times`,
    title: "Prayer Times by Location — Daily Schedule | Noor",
    description:
      "Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha times for your location, with a live countdown to the next prayer.",
  },
};

export default function PrayerTimesPage() {
  return (
    <ToolPageShell
      title="Prayer Times"
      lede="Daily Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha times calculated for your location — right in your browser."
      path="/tools/prayer-times"
    >
      <PrayerTimesTool />
    </ToolPageShell>
  );
}
