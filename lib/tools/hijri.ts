/**
 * Tabular (Kuwaiti algorithm) Islamic calendar conversion.
 * 100% client-side, zero network calls.
 *
 * Note: this is the arithmetic/tabular calendar. The observed Hijri date
 * (moon sighting) can differ by ±1 day in some places and months.
 */

export interface HijriDate {
  year: number;
  month: number; // 1–12
  day: number;
}

export const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabiʿ al-Awwal",
  "Rabiʿ al-Thani",
  "Jumada al-Ula",
  "Jumada al-Akhirah",
  "Rajab",
  "Shaʿban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qaʿdah",
  "Dhu al-Hijjah",
];

/** Integer Julian Day Number for a civil date. */
function jdFromGregorian(y: number, m: number, d: number): number {
  let yy = y;
  let mm = m;
  if (mm <= 2) {
    yy -= 1;
    mm += 12;
  }
  const A = Math.floor(yy / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (yy + 4716)) +
    Math.floor(30.6001 * (mm + 1)) +
    d +
    B -
    1524
  );
}

/** Julian Day Number for a tabular Hijri date (at noon). */
function jdFromHijri(y: number, m: number, d: number): number {
  return (
    d +
    Math.ceil(29.5 * (m - 1)) +
    (y - 1) * 354 +
    Math.floor((3 + 11 * y) / 30) +
    1948439.5 -
    1
  );
}

/** Convert a Gregorian date to the tabular Hijri date. */
export function gregorianToHijri(date: Date): HijriDate {
  const jd = jdFromGregorian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

/** True when a Hijri year is a leap year (355 days) in the tabular calendar. */
export function isHijriLeapYear(year: number): boolean {
  return ((11 * year + 14) % 30) < 11;
}

/** Days in a tabular Hijri month (29 or 30). */
export function hijriMonthLength(year: number, month: number): number {
  if (month === 12) return isHijriLeapYear(year) ? 30 : 29;
  return month % 2 === 1 ? 30 : 29;
}

/**
 * Weekday of the 1st of a Hijri month: 0 = Sunday … 6 = Saturday.
 */
export function hijriMonthStartWeekday(year: number, month: number): number {
  const jdn = Math.floor(jdFromHijri(year, month, 1));
  return (((jdn + 1) % 7) + 7) % 7;
}

export function hijriMonthName(month: number): string {
  return HIJRI_MONTHS[month - 1] ?? "";
}

export function formatHijri(h: HijriDate): string {
  return `${h.day} ${hijriMonthName(h.month)} ${h.year} AH`;
}

/** Shift a Hijri month by delta months (for the calendar grid). */
export function shiftHijriMonth(
  year: number,
  month: number,
  delta: number
): { year: number; month: number } {
  let m = month + delta;
  let y = year;
  while (m < 1) {
    m += 12;
    y -= 1;
  }
  while (m > 12) {
    m -= 12;
    y += 1;
  }
  return { year: y, month: m };
}
