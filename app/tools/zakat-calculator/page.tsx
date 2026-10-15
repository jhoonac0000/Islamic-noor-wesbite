import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ZakatTool from "@/components/tools/ZakatTool";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zakat Calculator — 2.5% on Savings & Gold | Noor",
  description:
    "Calculate 2.5% zakat on cash, gold, silver and business assets with a nisab check. Simple, private, and free — with guidance for complex cases.",
  alternates: { canonical: `${SITE_URL}/tools/zakat-calculator` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/zakat-calculator`,
    title: "Zakat Calculator — 2.5% on Savings & Gold | Noor",
    description:
      "Work out zakat on cash, gold, silver and business assets, with a nisab check.",
  },
};

export default function ZakatCalculatorPage() {
  return (
    <ToolPageShell
      title="Zakat Calculator"
      lede="A simple 2.5% zakat calculator for cash, gold, silver and business assets — with a nisab check."
      path="/tools/zakat-calculator"
    >
      <ZakatTool />
    </ToolPageShell>
  );
}
