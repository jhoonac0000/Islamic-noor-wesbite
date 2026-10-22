"use client";

import { useEffect, useMemo, useState } from "react";
import { CITY_PRESETS } from "./LocationPicker";
import {
  calculatePrayerTimes,
  formatPrayerTime,
  prayerDateTime,
  PRAYER_LABELS,
  PRAYER_ORDER,
  PrayerName,
  PrayerTimes,
} from "@/lib/tools/prayerTimes";
import { formatHijri, gregorianToHijri } from "@/lib/tools/hijri";
import { SITE_URL } from "@/lib/site";

interface WidgetLoc {
  lat: number;
  lng: number;
  label: string;
}

const DEFAULT_LOC: WidgetLoc = {
  lat: CITY_PRESETS[0].lat,
  lng: CITY_PRESETS[0].lng,
  label: CITY_PRESETS[0].name,
};

function countdownText(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/**
 * Compact prayer-times widget designed to be embedded in an <iframe>
 * on other Islamic websites. 100% client-side (same calculation engine
 * as /tools/prayer-times). Optional URL parameters:
 *   ?lat=24.86&lng=67.00&name=Karachi,%20Pakistan&hanafi=1
 */
export default function PrayerTimesWidget() {
  const [loc, setLoc] = useState<WidgetLoc>(DEFAULT_LOC);
  const [presetIdx, setPresetIdx] = useState("0");
  const [hanafi, setHanafi] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Read embed parameters once on mount; explicit lat/lng always wins.
  // Otherwise try the visitor's own location silently.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("hanafi") === "1") setHanafi(true);
    const lat = parseFloat(q.get("lat") ?? "");
    const lng = parseFloat(q.get("lng") ?? "");
    if (
      !Number.isNaN(lat) &&
      !Number.isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      const name = (q.get("name") ?? "").trim();
      setLoc({ lat, lng, label: name || "Selected location" });
      setPresetIdx("");
      return;
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLoc({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: "Your location",
          });
          setPresetIdx("");
        },
        () => {},
        { timeout: 8000, maximumAge: 300000 }
      );
    }
  }, []);

  // Refresh every 30 seconds so the "next prayer" highlight stays right.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const dayKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  const times: PrayerTimes = useMemo(
    () =>
      calculatePrayerTimes(new Date(dayKey), loc.lat, loc.lng, {
        asrFactor: hanafi ? 2 : 1,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loc, hanafi, dayKey]
  );

  const next = useMemo(() => {
    for (const name of PRAYER_ORDER) {
      const at = prayerDateTime(now, times[name]);
      if (at.getTime() > now.getTime()) return { name, at };
    }
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const t2 = calculatePrayerTimes(tomorrow, loc.lat, loc.lng, {
      asrFactor: hanafi ? 2 : 1,
    });
    return { name: "fajr" as PrayerName, at: prayerDateTime(tomorrow, t2.fajr) };
  }, [times, now, loc, hanafi]);

  const isNextToday = (name: PrayerName) =>
    next.name === name && next.at.getDate() === now.getDate();

  const pickPreset = (idxStr: string) => {
    setPresetIdx(idxStr);
    const idx = parseInt(idxStr, 10);
    if (!Number.isNaN(idx) && CITY_PRESETS[idx]) {
      setLoc({
        lat: CITY_PRESETS[idx].lat,
        lng: CITY_PRESETS[idx].lng,
        label: CITY_PRESETS[idx].name,
      });
    }
  };

  return (
    <div className="pw">
      <div className="pw-head">
        <div className="pw-title">🕌 Prayer Times</div>
        <div className="pw-date">
          {now.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {formatHijri(gregorianToHijri(now))}
        </div>
      </div>

      <div className="pw-body">
        <select
          className="pw-select"
          aria-label="Choose a city"
          value={presetIdx}
          onChange={(e) => pickPreset(e.target.value)}
        >
          <option value="">{loc.label}</option>
          {CITY_PRESETS.map((p, i) => (
            <option key={p.name} value={String(i)}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="pw-next" aria-live="polite">
          Next: <strong>{PRAYER_LABELS[next.name]}</strong> ·{" "}
          {next.at.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}{" "}
          · in {countdownText(next.at.getTime() - now.getTime())}
        </div>

        <table className="pw-table">
          <tbody>
            {PRAYER_ORDER.map((name) => (
              <tr key={name} className={isNextToday(name) ? "pw-row-next" : ""}>
                <th scope="row">
                  {PRAYER_LABELS[name]}
                  {isNextToday(name) ? (
                    <span className="pw-badge">Next</span>
                  ) : null}
                </th>
                <td>{formatPrayerTime(times[name])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pw-asr">
          <span>Asr:</span>
          <button
            type="button"
            aria-pressed={!hanafi}
            onClick={() => setHanafi(false)}
          >
            Standard
          </button>
          <button
            type="button"
            aria-pressed={hanafi}
            onClick={() => setHanafi(true)}
          >
            Hanafi
          </button>
        </div>
      </div>

      <div className="pw-foot">
        Prayer Times by{" "}
        <a href={`${SITE_URL}/tools`} target="_blank" rel="noopener">
          Noor Islamic Website
        </a>
      </div>
    </div>
  );
}
