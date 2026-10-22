import type { Metadata } from "next";
import PrayerTimesWidget from "@/components/tools/PrayerTimesWidget";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prayer Times Widget | Noor",
  description:
    "Free embeddable prayer times widget by Noor Islamic Website — daily Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha times for any city.",
  alternates: { canonical: `${SITE_URL}/widget/prayer-times` },
  robots: { index: false, follow: true },
};

export default function PrayerTimesWidgetPage() {
  return <PrayerTimesWidget />;
}
