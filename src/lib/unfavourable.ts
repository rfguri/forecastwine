// Unfavourable periods detection — Maria Thun method
// Detects grey zones where wine quality is diminished regardless of constellation:
// 1. Constellation transitions: ±2h around boundary crossings
// 2. Lunar nodes: ±2h around ecliptic plane crossings
// 3. Perigee: ±12h around moon's closest approach to Earth

import {
  SearchMoonNode,
  NextMoonNode,
  SearchLunarApsis,
  NextLunarApsis,
  ApsisKind,
} from "astronomy-engine";
import type { DayPeriod } from "./calendar";

export interface UnfavourableInterval {
  startHour: number; // 0–24, fractional
  endHour: number;
  reason: "node" | "perigee" | "transition";
}

/** Convert a Date to fractional hour offset from dayStart (midnight) */
function toFractionalHour(event: Date, dayStart: Date): number {
  return (event.getTime() - dayStart.getTime()) / (1000 * 60 * 60);
}

/** Clamp an interval to [0, 24] and return null if no overlap */
function clampInterval(
  startHour: number,
  endHour: number,
  reason: UnfavourableInterval["reason"],
): UnfavourableInterval | null {
  const s = Math.max(0, startHour);
  const e = Math.min(24, endHour);
  if (e <= s) return null;
  return { startHour: s, endHour: e, reason };
}

/** Merge overlapping intervals (same reason only) and sort */
function mergeIntervals(intervals: UnfavourableInterval[]): UnfavourableInterval[] {
  if (intervals.length <= 1) return intervals;
  const sorted = [...intervals].sort((a, b) => a.startHour - b.startHour);
  const merged: UnfavourableInterval[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    if (sorted[i].startHour <= prev.endHour && sorted[i].reason === prev.reason) {
      prev.endHour = Math.max(prev.endHour, sorted[i].endHour);
    } else {
      merged.push(sorted[i]);
    }
  }
  return merged;
}

/**
 * Find all unfavourable intervals for a given day.
 * @param dayStart - midnight of the day
 * @param transitionHours - constellation transition hours from findTransitions()
 */
export function getUnfavourableIntervals(
  dayStart: Date,
  transitionHours: number[],
): UnfavourableInterval[] {
  const intervals: UnfavourableInterval[] = [];

  // 1. Constellation transition buffers: ±2h
  for (const t of transitionHours) {
    const interval = clampInterval(t - 2, t + 2, "transition");
    if (interval) intervals.push(interval);
  }

  // 2. Lunar nodes: ±2h
  // Search from 2h before the day to catch nodes whose buffer extends into our day
  const searchStart = new Date(dayStart.getTime() - 2 * 60 * 60 * 1000);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  const searchEnd = new Date(dayEnd.getTime() + 2 * 60 * 60 * 1000);

  try {
    let node = SearchMoonNode(searchStart);
    while (node.time.date.getTime() < searchEnd.getTime()) {
      const hourOffset = toFractionalHour(node.time.date, dayStart);
      const interval = clampInterval(hourOffset - 2, hourOffset + 2, "node");
      if (interval) intervals.push(interval);
      node = NextMoonNode(node);
      // Safety: nodes are ~13.6 days apart, so at most 1 per day window
      if (node.time.date.getTime() > searchEnd.getTime()) break;
    }
  } catch {
    // Graceful fallback if astronomy-engine search fails
  }

  // 3. Perigee: ±12h
  // Search from 12h before the day to catch perigees whose buffer extends in
  const perigeeSearchStart = new Date(dayStart.getTime() - 12 * 60 * 60 * 1000);
  const perigeeSearchEnd = new Date(dayEnd.getTime() + 12 * 60 * 60 * 1000);

  try {
    let apsis = SearchLunarApsis(perigeeSearchStart);
    // Check up to 2 apsides (perigee/apogee alternate, ~13.8 days apart)
    for (let i = 0; i < 2; i++) {
      if (apsis.time.date.getTime() > perigeeSearchEnd.getTime()) break;
      if (apsis.kind === ApsisKind.Pericenter) {
        const hourOffset = toFractionalHour(apsis.time.date, dayStart);
        const interval = clampInterval(hourOffset - 12, hourOffset + 12, "perigee");
        if (interval) intervals.push(interval);
      }
      apsis = NextLunarApsis(apsis);
    }
  } catch {
    // Graceful fallback
  }

  return mergeIntervals(intervals);
}

/**
 * Split constellation periods with unfavourable overlays.
 * Preserves the underlying type but marks overlapping segments as unfavourable.
 */
export function splitPeriodsWithUnfavourable(
  periods: DayPeriod[],
  unfavIntervals: UnfavourableInterval[],
): DayPeriod[] {
  if (unfavIntervals.length === 0) return periods;

  const result: DayPeriod[] = [];

  for (const period of periods) {
    // Find all unfavourable intervals that overlap this period
    const overlapping = unfavIntervals.filter(
      (u) => u.startHour < period.endHour && u.endHour > period.startHour,
    );

    if (overlapping.length === 0) {
      result.push(period);
      continue;
    }

    // Build split points from overlapping intervals
    const cuts: number[] = [period.startHour];
    for (const u of overlapping) {
      const s = Math.max(u.startHour, period.startHour);
      const e = Math.min(u.endHour, period.endHour);
      cuts.push(s, e);
    }
    cuts.push(period.endHour);

    // Deduplicate and sort
    const uniqueCuts = [...new Set(cuts)].sort((a, b) => a - b);

    // Create sub-periods between consecutive cuts
    for (let i = 0; i < uniqueCuts.length - 1; i++) {
      const start = uniqueCuts[i];
      const end = uniqueCuts[i + 1];
      if (end - start < 0.01) continue; // Skip negligible segments

      // Check if this sub-period falls within any unfavourable interval
      const midpoint = (start + end) / 2;
      const unfav = overlapping.find(
        (u) => midpoint >= u.startHour && midpoint < u.endHour,
      );

      result.push({
        type: period.type,
        startHour: start,
        endHour: end,
        ...(unfav ? { unfavourable: true, unfavourableReason: unfav.reason } : {}),
      });
    }
  }

  // Merge consecutive periods with same type + same unfavourable state
  if (result.length <= 1) return result;
  const merged: DayPeriod[] = [result[0]];
  for (let i = 1; i < result.length; i++) {
    const prev = merged[merged.length - 1];
    if (
      result[i].type === prev.type &&
      result[i].unfavourable === prev.unfavourable &&
      result[i].unfavourableReason === prev.unfavourableReason
    ) {
      prev.endHour = result[i].endHour;
    } else {
      merged.push(result[i]);
    }
  }

  return merged;
}
