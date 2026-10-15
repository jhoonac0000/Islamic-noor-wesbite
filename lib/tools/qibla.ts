/**
 * Qibla direction — great-circle initial bearing from any point
 * on Earth to the Kaaba in Makkah. 100% client-side, zero network calls.
 */

export const KAABA_LAT = 21.4225;
export const KAABA_LNG = 39.8262;

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

/**
 * Initial great-circle bearing (degrees clockwise from true north, 0–360).
 */
export function qiblaBearing(lat: number, lng: number): number {
  const phi1 = lat * D2R;
  const phi2 = KAABA_LAT * D2R;
  const deltaLng = (KAABA_LNG - lng) * D2R;
  const theta = Math.atan2(
    Math.sin(deltaLng),
    Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLng)
  );
  return (theta * R2D + 360) % 360;
}

/** Great-circle distance to the Kaaba in kilometres. */
export function qiblaDistanceKm(lat: number, lng: number): number {
  const R = 6371;
  const phi1 = lat * D2R;
  const phi2 = KAABA_LAT * D2R;
  const dPhi = (KAABA_LAT - lat) * D2R;
  const dLng = (KAABA_LNG - lng) * D2R;
  const a =
    Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** 0–360° -> 16-point compass label (N, NNE, NE, …). */
export function bearingToCompass(deg: number): string {
  const points = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW",
  ];
  return points[Math.round(deg / 22.5) % 16];
}
