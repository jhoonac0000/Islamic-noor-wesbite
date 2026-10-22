"use client";

import { useMemo, useState } from "react";
import { CITY_PRESETS } from "./LocationPicker";
import { SITE_URL } from "@/lib/site";

/**
 * Configurator for the embeddable prayer-times widget: pick a city
 * (and Asr method), copy the ready-made iframe snippet, and see a
 * live preview of exactly what visitors will get.
 */
export default function EmbedWidgetTool() {
  const [presetIdx, setPresetIdx] = useState("3"); // Karachi default
  const [hanafi, setHanafi] = useState(false);
  const [copied, setCopied] = useState(false);

  const city = CITY_PRESETS[parseInt(presetIdx, 10)] ?? CITY_PRESETS[0];

  const widgetUrl = useMemo(() => {
    const params = new URLSearchParams({
      lat: String(city.lat),
      lng: String(city.lng),
      name: city.name,
    });
    if (hanafi) params.set("hanafi", "1");
    return `${SITE_URL}/widget/prayer-times?${params.toString()}`;
  }, [city, hanafi]);

  const snippet = `<iframe src="${widgetUrl}" width="360" height="440" style="border:0;max-width:100%;border-radius:14px" loading="lazy" title="Prayer Times by Noor Islamic Website"></iframe>`;

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="tool-panel" style={{ marginBottom: "1.4rem" }}>
        <div className="tool-field">
          <label htmlFor="embed-city">1. Choose your city</label>
          <select
            id="embed-city"
            className="tool-select"
            value={presetIdx}
            onChange={(e) => setPresetIdx(e.target.value)}
          >
            {CITY_PRESETS.map((p, i) => (
              <option key={p.name} value={String(i)}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="tool-field" style={{ marginBottom: 0 }}>
          <label>
            <input
              type="checkbox"
              checked={hanafi}
              onChange={(e) => setHanafi(e.target.checked)}
              style={{ marginRight: "0.5rem" }}
            />
            Hanafi Asr calculation
          </label>
        </div>
      </div>

      <div className="tool-panel" style={{ marginBottom: "1.4rem" }}>
        <p className="tool-note" style={{ marginTop: 0 }}>
          <strong>2. Copy this code</strong> and paste it into your website
          where you want the prayer times to appear (in WordPress: a
          “Custom HTML” block; in most site builders: an “Embed / HTML”
          element).
        </p>
        <pre className="embed-code">{snippet}</pre>
        <button type="button" className="tool-btn tool-btn-gold" onClick={copySnippet}>
          {copied ? "✓ Copied!" : "Copy the embed code"}
        </button>
      </div>

      <div className="tool-panel">
        <p className="tool-note" style={{ marginTop: 0 }}>
          <strong>3. Live preview</strong> — this is exactly what your
          visitors will see:
        </p>
        <div className="embed-preview">
          <iframe
            src={widgetUrl}
            width="360"
            height="440"
            style={{ border: 0, maxWidth: "100%", borderRadius: "14px" }}
            loading="lazy"
            title="Prayer Times widget preview"
          />
        </div>
      </div>
    </div>
  );
}
