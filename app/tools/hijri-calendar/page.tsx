import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import HijriTool from "@/components/tools/HijriTool";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hijri Calendar — Today's Islamic Date | Noor",
  description:
    "See today's Hijri date and browse the Islamic calendar month by month, from Muharram to Dhu al-Hijjah. Free, private, no sign-up.",
  alternates: { canonical: `${SITE_URL}/tools/hijri-calendar` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/hijri-calendar`,
    title: "Hijri Calendar — Today's Islamic Date | Noor",
    description:
      "Today's Islamic date and a browsable Hijri month calendar.",
  },
};

export default function HijriCalendarPage() {
  return (
    <ToolPageShell
      title="Hijri Calendar"
      lede="Today's date in the Islamic calendar, plus a month grid you can browse — from Muharram to Dhu al-Hijjah."
      path="/tools/hijri-calendar"
    >
      <HijriTool />
    </ToolPageShell>
  );
}
