"use client";

import { useMemo, useState } from "react";
import {
  formatHijri,
  gregorianToHijri,
  hijriMonthLength,
  hijriMonthName,
  hijriMonthStartWeekday,
  shiftHijriMonth,
} from "@/lib/tools/hijri";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function HijriTool() {
  const today = useMemo(() => gregorianToHijri(new Date()), []);
  const [view, setView] = useState({ year: today.year, month: today.month });

  const monthLen = hijriMonthLength(view.year, view.month);
  const startWd = hijriMonthStartWeekday(view.year, view.month);
  const isCurrentMonth = view.year === today.year && view.month === today.month;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWd; i++) cells.push(null);
  for (let d = 1; d <= monthLen; d++) cells.push(d);

  const shift = (delta: number) =>
    setView((v) => shiftHijriMonth(v.year, v.month, delta));

  return (
    <div>
      <div className="tool-panel hijri-today" aria-live="polite">
        <p className="section-kicker" style={{ marginBottom: "0.4rem" }}>
          Today&apos;s Islamic date
        </p>
        <p className="hijri-big">{formatHijri(today)}</p>
        <p className="hijri-greg">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="tool-panel" style={{ marginTop: "1.4rem" }}>
        <div className="hijri-nav">
          <button
            type="button"
            className="tool-btn tool-btn-gold"
            onClick={() => shift(-1)}
            aria-label="Previous Hijri month"
          >
            ‹ Prev
          </button>
          <h2 className="hijri-month-title">
            {hijriMonthName(view.month)} {view.year} AH
          </h2>
          <button
            type="button"
            className="tool-btn tool-btn-gold"
            onClick={() => shift(1)}
            aria-label="Next Hijri month"
          >
            Next ›
          </button>
        </div>

        {!isCurrentMonth && (
          <p style={{ textAlign: "center", margin: "0 0 0.8rem" }}>
            <button
              type="button"
              className="tool-link-btn"
              onClick={() => setView({ year: today.year, month: today.month })}
            >
              Back to current month
            </button>
          </p>
        )}

        <div className="hijri-grid" role="grid" aria-label={`${hijriMonthName(view.month)} ${view.year}`}>
          {WEEKDAYS.map((w) => (
            <div key={w} className="hijri-weekday" role="columnheader">
              {w}
            </div>
          ))}
          {cells.map((d, i) =>
            d === null ? (
              <div key={`e${i}`} className="hijri-day hijri-empty" />
            ) : (
              <div
                key={d}
                role="gridcell"
                aria-label={`${d} ${hijriMonthName(view.month)}`}
                className={
                  "hijri-day" +
                  (isCurrentMonth && d === today.day ? " hijri-today-cell" : "")
                }
              >
                {d}
              </div>
            )
          )}
        </div>
      </div>

      <p className="tool-note" style={{ marginTop: "1.2rem" }}>
        This uses the tabular (calculated) Islamic calendar. The observed
        date — based on actual moon sighting in your region — can differ by
        about a day. Please follow your local mosque for Ramadan and Eid.
      </p>
    </div>
  );
}
