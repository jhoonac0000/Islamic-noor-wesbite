"use client";

import { useMemo, useState } from "react";
import LocationPicker, { LatLng } from "./LocationPicker";
import {
  bearingToCompass,
  KAABA_LAT,
  KAABA_LNG,
  qiblaBearing,
  qiblaDistanceKm,
} from "@/lib/tools/qibla";

function CompassDial({ bearing }: { bearing: number }) {
  // SVG compass: fixed dial, needle rotated to the Qibla bearing.
  const ticks = [];
  for (let d = 0; d < 360; d += 15) {
    const major = d % 90 === 0;
    const r1 = major ? 88 : 93;
    const rad = (d * Math.PI) / 180;
    ticks.push(
      <line
        key={d}
        x1={100 + r1 * Math.sin(rad)}
        y1={100 - r1 * Math.cos(rad)}
        x2={100 + 97 * Math.sin(rad)}
        y2={100 - 97 * Math.cos(rad)}
        stroke={major ? "#a88420" : "#c9a227"}
        strokeOpacity={major ? 0.9 : 0.45}
        strokeWidth={major ? 3 : 1.5}
      />
    );
  }
  const labels: { t: string; d: number }[] = [
    { t: "N", d: 0 },
    { t: "E", d: 90 },
    { t: "S", d: 180 },
    { t: "W", d: 270 },
  ];
  return (
    <svg
      viewBox="0 0 200 200"
      className="compass-svg"
      role="img"
      aria-label={`Compass showing Qibla at ${bearing.toFixed(1)} degrees`}
    >
      <circle cx="100" cy="100" r="98" fill="#0b3d2e" />
      <circle
        cx="100"
        cy="100"
        r="98"
        fill="none"
        stroke="#c9a227"
        strokeWidth="2.5"
      />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#c9a227" strokeOpacity="0.25" />
      {ticks}
      {labels.map(({ t, d }) => {
        const rad = (d * Math.PI) / 180;
        return (
          <text
            key={t}
            x={100 + 68 * Math.sin(rad)}
            y={100 - 68 * Math.cos(rad)}
            textAnchor="middle"
            dominantBaseline="central"
            fill={t === "N" ? "#e3c76a" : "#dcebe2"}
            fontSize={t === "N" ? 20 : 16}
            fontWeight="800"
            fontFamily="inherit"
          >
            {t}
          </text>
        );
      })}
      {/* Qibla marker on the ring */}
      <g transform={`rotate(${bearing} 100 100)`}>
        <rect
          x="94"
          y="2"
          width="12"
          height="12"
          rx="2"
          fill="#e3c76a"
          stroke="#0b3d2e"
          strokeWidth="1.5"
        />
      </g>
      {/* Needle pointing at the Qibla bearing */}
      <g transform={`rotate(${bearing} 100 100)`}>
        <polygon points="100,18 106,100 100,112 94,100" fill="#e3c76a" />
        <polygon points="100,182 106,100 100,112 94,100" fill="#5c6f66" opacity="0.85" />
      </g>
      <circle cx="100" cy="100" r="9" fill="#c9a227" stroke="#0b3d2e" strokeWidth="2" />
      <circle cx="100" cy="100" r="3.5" fill="#0b3d2e" />
    </svg>
  );
}

export default function QiblaTool() {
  const [loc, setLoc] = useState<LatLng | null>(null);

  const result = useMemo(() => {
    if (!loc) return null;
    const bearing = qiblaBearing(loc.lat, loc.lng);
    return {
      bearing,
      compass: bearingToCompass(bearing),
      km: qiblaDistanceKm(loc.lat, loc.lng),
    };
  }, [loc]);

  return (
    <div>
      <LocationPicker value={loc} onChange={setLoc} />

      {!result ? (
        <div className="tool-panel">
          <p style={{ margin: 0 }}>
            Choose a city or share your location above to find your Qibla
            direction.
          </p>
        </div>
      ) : (
        <div className="tool-panel qibla-panel">
          <div className="qibla-readout" aria-live="polite">
            <p className="qibla-degrees">
              {result.bearing.toFixed(1)}°
              <span className="qibla-compass-point"> {result.compass}</span>
            </p>
            <p className="qibla-sub">
              clockwise from true north ·{" "}
              {Math.round(result.km).toLocaleString("en-US")} km from the
              Kaaba ({KAABA_LAT}°N, {KAABA_LNG}°E)
            </p>
          </div>
          <CompassDial bearing={result.bearing} />
          <p className="tool-note">
            The gold needle points toward the Qibla. To use it with your
            phone, open your phone&apos;s compass app and turn until it reads{" "}
            {result.bearing.toFixed(0)}° — the direction you face is the
            Qibla. (Phone compasses can be affected by metal objects nearby.)
          </p>
        </div>
      )}
    </div>
  );
}
