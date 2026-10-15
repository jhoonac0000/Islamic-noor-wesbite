/**
 * Prayer-time calculation — standard solar-position algorithm
 * (PrayTimes-style). 100% client-side, zero network calls.
 *
 * Defaults: Muslim World League (Fajr 18°, Isha 17°), Asr = Standard
 * (shadow factor 1). A Hanafi Asr option (factor 2) is supported.
 */

export interface PrayerTimes {
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

export type PrayerName = keyof PrayerTimes;

export const PRAYER_LABELS: Record<PrayerName, string> = {
  fajr: "Fajr",
  sunrise: "Sunrise",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
};

export const PRAYER_ORDER: PrayerName[] = [
  "fajr",
  "sunrise",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

function fixAngle(a: number): number {
  return a - 360 * Math.floor(a / 360);
}
function fixHour(h: number): number {
  return h - 24 * Math.floor(h / 24);
}
function dsin(d: number): number {
  return Math.sin(d * D2R);
}
function dcos(d: number): number {
  return Math.cos(d * D2R);
}
function dtan(d: number): number {
  return Math.tan(d * D2R);
}
function darcsin(x: number): number {
  return (Math.asin(x) * R2D);
}
function darccos(x: number): number {
  return (Math.acos(Math.min(1, Math.max(-1, x))) * R2D);
}
function darctan2(y: number, x: number): number {
  return (Math.atan2(y, x) * R2D);
}
function darccot(x: number): number {
  return (Math.atan(1 / x) * R2D);
}

/** Julian day number for a civil date (at noon). */
function julianDate(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  );
}

interface SunPos {
  declination: number;
  equation: number;
}

/** Solar declination (degrees) and equation of time (hours). */
function sunPosition(jd: number): SunPos {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * dsin(g) + 0.02 * dsin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = darctan2(dcos(e) * dsin(L), dcos(L)) / 15;
  return {
    declination: darcsin(dsin(e) * dsin(L)),
    equation: q / 15 - fixHour(RA),
  };
}

/** Solar noon in hours for a day-portion t. */
function midDay(jd: number, t: number): number {
  const eqt = sunPosition(jd + t).equation;
  return fixHour(12 - eqt);
}

/**
 * Time (hours) when the sun reaches `angle` below/above the horizon.
 * ccw = before noon (Fajr, Sunrise), otherwise after noon.
 */
function sunAngleTime(
  jd: number,
  lat: number,
  angle: number,
  t: number,
  ccw: boolean
): number {
  const decl = sunPosition(jd + t).declination;
  const noon = midDay(jd, t);
  const term =
    (-dsin(angle) - dsin(decl) * dsin(lat)) / (dcos(decl) * dcos(lat));
  const hourAngle = darccos(term) / 15;
  return noon + (ccw ? -hourAngle : hourAngle);
}

/** Asr time for a shadow-length factor (1 = Standard, 2 = Hanafi). */
function asrTime(
  jd: number,
  lat: number,
  factor: number,
  t: number
): number {
  const decl = sunPosition(jd + t).declination;
  const angle = -darccot(factor + dtan(Math.abs(lat - decl)));
  return sunAngleTime(jd, lat, angle, t, false);
}

export interface PrayerCalcOptions {
  /** degrees below horizon for Fajr (default 18, Muslim World League) */
  fajrAngle?: number;
  /** degrees below horizon for Isha (default 17, Muslim World League) */
  ishaAngle?: number;
  /** Asr shadow factor: 1 = Standard (default), 2 = Hanafi */
  asrFactor?: number;
}

/**
 * Compute prayer times (decimal hours, local time) for a date + coordinates.
 * Uses the device's local timezone (DST-aware for the given date).
 */
export function calculatePrayerTimes(
  date: Date,
  lat: number,
  lng: number,
  opts: PrayerCalcOptions = {}
): PrayerTimes {
  const fajrAngle = opts.fajrAngle ?? 18;
  const ishaAngle = opts.ishaAngle ?? 17;
  const asrFactor = opts.asrFactor ?? 1;

  const jd =
    julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate()) -
    lng / (15 * 24);

  // Initial guess (hours) -> day portions, refined over 3 iterations.
  let hours: PrayerTimes = {
    fajr: 5,
    sunrise: 6,
    dhuhr: 12,
    asr: 13,
    maghrib: 18,
    isha: 18,
  };
  for (let i = 0; i < 3; i++) {
    const p: PrayerTimes = {
      fajr: hours.fajr / 24,
      sunrise: hours.sunrise / 24,
      dhuhr: hours.dhuhr / 24,
      asr: hours.asr / 24,
      maghrib: hours.maghrib / 24,
      isha: hours.isha / 24,
    };
    hours = {
      fajr: sunAngleTime(jd, lat, fajrAngle, p.fajr, true),
      sunrise: sunAngleTime(jd, lat, 0.833, p.sunrise, true),
      dhuhr: midDay(jd, p.dhuhr),
      asr: asrTime(jd, lat, asrFactor, p.asr),
      maghrib: sunAngleTime(jd, lat, 0.833, p.maghrib, false),
      isha: sunAngleTime(jd, lat, ishaAngle, p.isha, false),
    };
  }

  // Adjust for longitude + local timezone.
  const tz = -date.getTimezoneOffset() / 60;
  const adjust = tz - lng / 15;
  const out = {} as PrayerTimes;
  (Object.keys(hours) as PrayerName[]).forEach((k) => {
    out[k] = fixHour(hours[k] + adjust);
  });
  return out;
}

/** Decimal hours -> "5:30 AM" style string. */
export function formatPrayerTime(hours: number): string {
  const h = fixHour(hours);
  const h24 = Math.floor(h);
  const mins = Math.floor((h - h24) * 60);
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${mins.toString().padStart(2, "0")} ${suffix}`;
}

/** Decimal hours on a date -> JS Date for countdown math. */
export function prayerDateTime(date: Date, hours: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const h = fixHour(hours);
  d.setHours(Math.floor(h), Math.floor((h - Math.floor(h)) * 60), 0, 0);
  return d;
}
