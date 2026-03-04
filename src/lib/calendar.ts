// Biodynamic wine calendar logic — Maria Thun method
// Uses real lunar ephemeris (astronomy-engine) mapped to IAU constellation boundaries
// Supports intra-day transitions with minute-level precision

import { EclipticGeoMoon } from "astronomy-engine";
import { getUnfavourableIntervals, splitPeriodsWithUnfavourable } from "./unfavourable";

export type DayType = "fruit" | "flower" | "leaf" | "root";

export interface DayPeriod {
  type: DayType;
  startHour: number; // 0–24, fractional (e.g. 14.5 = 2:30 PM)
  endHour: number;   // 0–24, fractional
  unfavourable?: boolean;
  unfavourableReason?: "node" | "perigee" | "transition";
}

export interface ForecastDay {
  date: Date;
  periods: DayPeriod[];
  primaryType: DayType; // Type occupying the most hours
  hasUnfavourable: boolean;
}

// Zodiac constellations grouped by element / day type:
// Fire (Fruit):  Aries, Leo, Sagittarius
// Air (Flower):  Gemini, Libra, Aquarius
// Water (Leaf):  Pisces, Cancer, Scorpio+Ophiuchus
// Earth (Root):  Taurus, Virgo, Capricorn

// IAU constellation boundaries along the ecliptic (degrees longitude)
// Scorpio and Ophiuchus are merged per Thun tradition (both = leaf/water)
const CONSTELLATIONS: { name: string; startLon: number; endLon: number; type: DayType }[] = [
  { name: "Pisces",            startLon: 351.650, endLon:  28.687, type: "leaf"   },
  { name: "Aries",             startLon:  28.687, endLon:  53.417, type: "fruit"  },
  { name: "Taurus",            startLon:  53.417, endLon:  90.140, type: "root"   },
  { name: "Gemini",            startLon:  90.140, endLon: 117.988, type: "flower" },
  { name: "Cancer",            startLon: 117.988, endLon: 138.038, type: "leaf"   },
  { name: "Leo",               startLon: 138.038, endLon: 173.851, type: "fruit"  },
  { name: "Virgo",             startLon: 173.851, endLon: 217.810, type: "root"   },
  { name: "Libra",             startLon: 217.810, endLon: 241.047, type: "flower" },
  { name: "Scorpio+Ophiuchus", startLon: 241.047, endLon: 266.238, type: "leaf"   },
  { name: "Sagittarius",       startLon: 266.238, endLon: 299.656, type: "fruit"  },
  { name: "Capricorn",         startLon: 299.656, endLon: 327.488, type: "root"   },
  { name: "Aquarius",          startLon: 327.488, endLon: 351.650, type: "flower" },
];

/** Get the moon's ecliptic longitude at a given date */
function getMoonLongitude(date: Date): number {
  return EclipticGeoMoon(date).lon;
}

/** Map ecliptic longitude to biodynamic day type */
function lonToType(lon: number): DayType {
  for (const c of CONSTELLATIONS) {
    if (c.startLon < c.endLon) {
      // Normal range
      if (lon >= c.startLon && lon < c.endLon) return c.type;
    } else {
      // Wraps around 360° (Pisces: 351.65° → 28.687°)
      if (lon >= c.startLon || lon < c.endLon) return c.type;
    }
  }
  return "leaf"; // Fallback (should not happen)
}

/** Get the biodynamic day type at a specific moment */
export function getTypeAtDate(date: Date): DayType {
  return lonToType(getMoonLongitude(date));
}

/** Build a Date for a given day + fractional hour */
function dateAtHour(day: Date, hour: number): Date {
  const d = new Date(day);
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  d.setHours(h, m, 0, 0);
  return d;
}

/**
 * Binary search for the exact transition moment between two times
 * where the day type changes. Returns fractional hour within the day.
 */
function binarySearchTransition(day: Date, hourA: number, hourB: number): number {
  let lo = hourA;
  let hi = hourB;
  // Converge to ~1 minute precision (1/60 hour ≈ 0.017)
  while (hi - lo > 0.02) {
    const mid = (lo + hi) / 2;
    const typeAtMid = getTypeAtDate(dateAtHour(day, mid));
    const typeAtLo = getTypeAtDate(dateAtHour(day, lo));
    if (typeAtMid === typeAtLo) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  // Round to nearest 5 minutes for display cleanliness
  const raw = (lo + hi) / 2;
  const minutes = raw * 60;
  const rounded = Math.round(minutes / 5) * 5;
  return rounded / 60;
}

/**
 * Find all transition hours within a day (midnight to midnight).
 * Uses 2-hour coarse sampling + binary search refinement.
 */
export function findTransitions(day: Date): number[] {
  const transitions: number[] = [];
  const SAMPLE_INTERVAL = 2; // hours
  const samples = Math.ceil(24 / SAMPLE_INTERVAL) + 1;

  let prevType = getTypeAtDate(dateAtHour(day, 0));

  for (let i = 1; i < samples; i++) {
    const hour = Math.min(i * SAMPLE_INTERVAL, 24);
    const type = getTypeAtDate(dateAtHour(day, hour));
    if (type !== prevType) {
      const transitionHour = binarySearchTransition(day, (i - 1) * SAMPLE_INTERVAL, hour);
      // Avoid duplicates and edge transitions
      if (transitionHour > 0.08 && transitionHour < 23.92) {
        transitions.push(transitionHour);
      }
      prevType = type;
    }
  }

  return transitions;
}

/** Get all day periods for a given date */
export function getDayPeriods(date: Date, precomputedTransitions?: number[]): DayPeriod[] {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const transitions = precomputedTransitions ?? findTransitions(day);

  if (transitions.length === 0) {
    // Whole day is one type
    return [{ type: getTypeAtDate(dateAtHour(day, 12)), startHour: 0, endHour: 24 }];
  }

  const raw: DayPeriod[] = [];
  let currentStart = 0;

  for (const t of transitions) {
    const type = getTypeAtDate(dateAtHour(day, currentStart + 0.01));
    raw.push({ type, startHour: currentStart, endHour: t });
    currentStart = t;
  }

  // Final period until end of day
  const lastType = getTypeAtDate(dateAtHour(day, currentStart + 0.01));
  raw.push({ type: lastType, startHour: currentStart, endHour: 24 });

  // Merge consecutive periods with the same type
  // (e.g. two leaf constellations back-to-back should show as "all day")
  const periods: DayPeriod[] = [raw[0]];
  for (let i = 1; i < raw.length; i++) {
    const prev = periods[periods.length - 1];
    if (raw[i].type === prev.type) {
      prev.endHour = raw[i].endHour;
    } else {
      periods.push(raw[i]);
    }
  }

  return periods;
}

/** Kept for backward compatibility */
export function getTypeAtHour(date: Date, hour: number): DayType {
  return getTypeAtDate(dateAtHour(date, hour));
}

/** Generate forecast for N days starting from a date */
export function getForecast(startDate: Date, days: number): ForecastDay[] {
  const forecast: ForecastDay[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const transitions = findTransitions(d);
    const basePeriods = getDayPeriods(d, transitions);

    // Overlay unfavourable intervals
    const unfavIntervals = getUnfavourableIntervals(d, transitions);
    const periods = splitPeriodsWithUnfavourable(basePeriods, unfavIntervals);

    // Primary type = whichever occupies the most hours (ignoring unfavourable flag)
    let primaryType = periods[0].type;
    let maxHours = 0;
    const typeHours: Partial<Record<DayType, number>> = {};
    for (const p of periods) {
      const hours = p.endHour - p.startHour;
      typeHours[p.type] = (typeHours[p.type] || 0) + hours;
    }
    for (const [type, hours] of Object.entries(typeHours)) {
      if (hours! > maxHours) {
        maxHours = hours!;
        primaryType = type as DayType;
      }
    }

    const hasUnfavourable = periods.some((p) => p.unfavourable);
    forecast.push({ date: d, periods, primaryType, hasUnfavourable });
  }
  return forecast;
}

export const DAY_TYPE_CONFIG: Record<DayType, { emoji: string; rating: number }> = {
  fruit: { emoji: "🍇", rating: 4 },
  flower: { emoji: "🌸", rating: 3 },
  leaf: { emoji: "🍃", rating: 2 },
  root: { emoji: "🌱", rating: 1 },
};
