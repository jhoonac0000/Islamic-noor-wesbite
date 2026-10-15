"use client";

import { useEffect, useMemo, useState } from "react";
import LocationPicker, { LatLng } from "./LocationPicker";
import {
  calculatePrayerTimes,
  formatPrayerTime,
  prayerDateTime,
  PRAYER_LABELS,
  PRAYER_ORDER,
  PrayerName,
  PrayerTimes,
} from "@/lib/tools/prayerTimes";

function countdownText(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

export default function PrayerTimesTool() {
  const [loc, setLoc] = useState<LatLng | null>(null);
  const [asrHanafi, setAsrHanafi] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  const times: PrayerTimes | null = useMemo(() => {
    if (!loc) return null;
    return calculatePrayerTimes(new Date(dayKey), loc.lat, loc.lng, {
      asrFactor: asrHanafi ? 2 : 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc, asrHanafi, dayKey]);

  const next = useMemo(() => {
    if (!loc || !times) return null;
    for (const name of PRAYER_ORDER) {
      const at = prayerDateTime(now, times[name]);
      if (at.getTime() > now.getTime()) return { name, at };
    }
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const t2 = calculatePrayerTimes(tomorrow, loc.lat, loc.lng, {
      asrFactor: asrHanafi ? 2 : 1,
    });
    return { name: "fajr" as PrayerName, at: prayerDateTime(tomorrow, t2.fajr) };
  }, [loc, times, now, asrHanafi]);

  const isNextToday = (name: PrayerName) =>
    next !== null && next.name === name && next.at.getDate() === now.getDate();

  return (
    <div>
      <LocationPicker value={loc} onChange={setLoc} />

      <div className="tool-panel" style={{ marginBottom: "1.4rem" }}>
        <fieldset className="tool-fieldset">
          <legend>Asr calculation</legend>
          <label className="tool-radio">
            <input
              type="radio"
              name="asr-method"
              checked={!asrHanafi}
              onChange={() => setAsrHanafi(false)}
            />
            Standard (Shafiʿi, Maliki, Hanbali)
          </label>
          <label className="tool-radio">
            <input
              type="radio"
              name="asr-method"
              checked={asrHanafi}
              onChange={() => setAsrHanafi(true)}
            />
            Hanafi
          </label>
        </fieldset>
        <p className="tool-note">
          Method: Muslim World League (Fajr 18°, Isha 17°).
        </p>
      </div>

      {!times || !next ? (
        <div className="tool-panel">
          <p style={{ margin: 0 }}>
            Choose a city or share your location above to see today&apos;s
            prayer times.
          </p>
        </div>
      ) : (
        <>
          <div className="next-prayer" aria-live="polite">
            <span className="next-prayer-label">Next prayer</span>
            <span className="next-prayer-name">
              {PRAYER_LABELS[next.name]}
              {next.at.getDate() !== now.getDate() ? " (tomorrow)" : ""}
            </span>
            <span className="next-prayer-time">
              {next.at.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}{" "}
              · in {countdownText(next.at.getTime() - now.getTime())}
            </span>
          </div>

          <div className="tool-panel">
            <table className="prayer-table">
              <caption>
                Prayer times for{" "}
                {now.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </caption>
              <tbody>
                {PRAYER_ORDER.map((name) => (
                  <tr key={name} className={isNextToday(name) ? "prayer-next" : ""}>
                    <th scope="row">{PRAYER_LABELS[name]}</th>
                    <td>{formatPrayerTime(times[name])}</td>
                    <td className="prayer-flag">
                      {isNextToday(name) ? (
                        <span className="next-badge">Next</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="tool-note" style={{ marginTop: "1.2rem" }}>
        Times are calculated on your device and are approximate. Please
        confirm with your local mosque — especially for Fajr and Maghrib.
      </p>
    </div>
  );
}
