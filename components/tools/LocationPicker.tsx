"use client";

import { useState } from "react";

export interface LatLng {
  lat: number;
  lng: number;
  label: string;
}

const PRESETS: { name: string; lat: number; lng: number }[] = [
  { name: "Makkah, Saudi Arabia", lat: 21.4225, lng: 39.8262 },
  { name: "Madinah, Saudi Arabia", lat: 24.5247, lng: 39.5692 },
  { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
  { name: "Karachi, Pakistan", lat: 24.8607, lng: 67.0011 },
  { name: "Lahore, Pakistan", lat: 31.5204, lng: 74.3587 },
  { name: "Dhaka, Bangladesh", lat: 23.8103, lng: 90.4125 },
  { name: "Delhi, India", lat: 28.6139, lng: 77.209 },
  { name: "Jakarta, Indonesia", lat: -6.2088, lng: 106.8456 },
  { name: "Kuala Lumpur, Malaysia", lat: 3.139, lng: 101.6869 },
  { name: "Istanbul, Turkey", lat: 41.0082, lng: 28.9784 },
  { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832 },
  { name: "New York, USA", lat: 40.7128, lng: -74.006 },
];

export default function LocationPicker({
  value,
  onChange,
}: {
  value: LatLng | null;
  onChange: (v: LatLng) => void;
}) {
  const [latInput, setLatInput] = useState("");
  const [lngInput, setLngInput] = useState("");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoError(
        "Geolocation is not supported by your browser. Please choose a city or enter coordinates manually."
      );
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        onChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Your current location",
        });
      },
      () => {
        setGeoLoading(false);
        setGeoError(
          "Could not get your location (permission denied or timed out). Please choose a city or enter coordinates manually."
        );
      },
      { timeout: 12000 }
    );
  };

  const applyManual = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setGeoError("Please enter valid numbers for latitude and longitude.");
      return;
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setGeoError(
        "Latitude must be between -90 and 90, longitude between -180 and 180."
      );
      return;
    }
    setGeoError(null);
    onChange({ lat, lng, label: `${lat.toFixed(3)}°, ${lng.toFixed(3)}°` });
  };

  return (
    <div className="tool-panel" style={{ marginBottom: "1.4rem" }}>
      <div className="tool-field">
        <label htmlFor="tool-city">Choose a city</label>
        <select
          id="tool-city"
          className="tool-select"
          value=""
          onChange={(e) => {
            const idx = parseInt(e.target.value, 10);
            if (!Number.isNaN(idx) && PRESETS[idx]) {
              setGeoError(null);
              onChange({
                lat: PRESETS[idx].lat,
                lng: PRESETS[idx].lng,
                label: PRESETS[idx].name,
              });
            }
          }}
        >
          <option value="">— Select a city —</option>
          {PRESETS.map((p, i) => (
            <option key={p.name} value={i}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="tool-field">
        <button
          type="button"
          className="tool-btn"
          onClick={useMyLocation}
          disabled={geoLoading}
        >
          {geoLoading ? "Locating…" : "📍 Use my current location"}
        </button>
      </div>

      <details className="tool-details">
        <summary>Or enter coordinates manually</summary>
        <div className="tool-row" style={{ marginTop: "0.8rem" }}>
          <div className="tool-field" style={{ flex: "1 1 10rem", marginBottom: 0 }}>
            <label htmlFor="tool-lat">Latitude</label>
            <input
              id="tool-lat"
              className="tool-input"
              type="number"
              inputMode="decimal"
              step="any"
              min={-90}
              max={90}
              placeholder="e.g. 24.8607"
              value={latInput}
              onChange={(e) => setLatInput(e.target.value)}
            />
          </div>
          <div className="tool-field" style={{ flex: "1 1 10rem", marginBottom: 0 }}>
            <label htmlFor="tool-lng">Longitude</label>
            <input
              id="tool-lng"
              className="tool-input"
              type="number"
              inputMode="decimal"
              step="any"
              min={-180}
              max={180}
              placeholder="e.g. 67.0011"
              value={lngInput}
              onChange={(e) => setLngInput(e.target.value)}
            />
          </div>
          <div className="tool-field" style={{ alignSelf: "flex-end", marginBottom: 0 }}>
            <button type="button" className="tool-btn tool-btn-gold" onClick={applyManual}>
              Apply
            </button>
          </div>
        </div>
      </details>

      {geoError && (
        <p className="tool-error" role="alert">
          {geoError}
        </p>
      )}
      {value && (
        <p className="tool-current">
          Showing results for: <strong>{value.label}</strong> ({value.lat.toFixed(3)}°,{" "}
          {value.lng.toFixed(3)}°)
        </p>
      )}
      <p className="tool-privacy">
        Your location never leaves your device — all calculations happen in
        your browser.
      </p>
    </div>
  );
}
