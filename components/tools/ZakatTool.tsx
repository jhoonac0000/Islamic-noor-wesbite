"use client";

import { useMemo, useState } from "react";

function parseAmount(raw: string): number {
  const n = parseFloat(raw.replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder = "0",
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="tool-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="tool-input"
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="tool-hint">{hint}</p>}
    </div>
  );
}

export default function ZakatTool() {
  const [currency, setCurrency] = useState("USD");
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [receivables, setReceivables] = useState("");
  const [debts, setDebts] = useState("");
  const [nisab, setNisab] = useState("");

  const result = useMemo(() => {
    const total =
      parseAmount(cash) +
      parseAmount(gold) +
      parseAmount(silver) +
      parseAmount(business) +
      parseAmount(receivables);
    const net = total - parseAmount(debts);
    const nisabValue = parseAmount(nisab);
    const hasNisabInput = nisab.trim() !== "";
    const meetsNisab = hasNisabInput ? net >= nisabValue : null;
    const zakatDue = meetsNisab === true ? net * 0.025 : 0;
    return { total, net, hasNisabInput, meetsNisab, zakatDue };
  }, [cash, gold, silver, business, receivables, debts, nisab]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  const cur = currency.trim() || "USD";

  return (
    <div>
      <div className="tool-panel" style={{ marginBottom: "1.4rem" }}>
        <div className="tool-row">
          <div className="tool-field" style={{ flex: "1 1 12rem", marginBottom: 0 }}>
            <label htmlFor="zakat-currency">Currency (label only)</label>
            <input
              id="zakat-currency"
              className="tool-input"
              type="text"
              maxLength={8}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="USD"
            />
          </div>
          <div className="tool-field" style={{ flex: "2 1 16rem", marginBottom: 0 }}>
            <label htmlFor="zakat-nisab">Nisab threshold (optional)</label>
            <input
              id="zakat-nisab"
              className="tool-input"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="e.g. 5500"
              value={nisab}
              onChange={(e) => setNisab(e.target.value)}
            />
          </div>
        </div>
        <p className="tool-hint" style={{ marginTop: "0.6rem" }}>
          Nisab is the value of 87.48 g of gold or 612.36 g of silver in
          your area — ask your local mosque or check a trusted source for
          today&apos;s figure, then enter it here.
        </p>
      </div>

      <div className="tool-panel" style={{ marginBottom: "1.4rem" }}>
        <h2 className="tool-h2">Your zakatable wealth</h2>
        <Field
          id="zakat-cash"
          label="Cash, bank savings & investments"
          value={cash}
          onChange={setCash}
        />
        <Field
          id="zakat-gold"
          label="Gold (current market value)"
          hint="Include jewellery you own, at today's resale value."
          value={gold}
          onChange={setGold}
        />
        <Field
          id="zakat-silver"
          label="Silver (current market value)"
          value={silver}
          onChange={setSilver}
        />
        <Field
          id="zakat-business"
          label="Business / trade goods"
          hint="Stock and trade assets held for sale, at current value."
          value={business}
          onChange={setBusiness}
        />
        <Field
          id="zakat-receivables"
          label="Money owed to you"
          hint="Loans you expect to be repaid."
          value={receivables}
          onChange={setReceivables}
        />
        <Field
          id="zakat-debts"
          label="Debts & liabilities (subtracted)"
          hint="Money you owe that is due now."
          value={debts}
          onChange={setDebts}
        />
      </div>

      <div className="result-box" aria-live="polite">
        <h2 className="tool-h2">Result</h2>
        <dl className="result-list">
          <div>
            <dt>Total zakatable wealth</dt>
            <dd>
              {cur} {fmt(result.total)}
            </dd>
          </div>
          <div>
            <dt>Minus debts</dt>
            <dd>
              {cur} {fmt(parseAmount(debts))}
            </dd>
          </div>
          <div className="result-net">
            <dt>Net zakatable wealth</dt>
            <dd>
              {cur} {fmt(result.net)}
            </dd>
          </div>
        </dl>

        {!result.hasNisabInput ? (
          <p className="result-note">
            Enter your local nisab threshold above to check whether zakat is
            due. As a general guide, zakat is 2.5% of net wealth held for a
            full lunar year, when it reaches nisab.
          </p>
        ) : result.meetsNisab ? (
          <p className="result-due">
            Zakat due (2.5%):{" "}
            <strong>
              {cur} {fmt(result.zakatDue)}
            </strong>
          </p>
        ) : (
          <p className="result-note">
            Your net wealth is below the nisab you entered, so no zakat is
            due on it. (Voluntary charity — sadaqah — is always rewarded.)
          </p>
        )}
      </div>

      <div className="moral-box" style={{ marginTop: "1.4rem" }}>
        <h2>Please note</h2>
        <p>
          This is a simplified calculator for common cases. Zakat rules have
          important details — lunar-year holding, mixed assets, business
          inventory, agricultural produce, and more. For complex situations,
          please consult a qualified local scholar.
        </p>
      </div>
    </div>
  );
}
