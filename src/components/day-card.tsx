"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import { type DayType, type DayPeriod, type ForecastDay, DAY_TYPE_CONFIG } from "@/lib/calendar";
import { useLocale } from "@/lib/locale-context";
import { formatDayLabel, formatHeroDate, formatCompactDate } from "@/lib/i18n";
import type { Locale, Dictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface DayCardProps {
  day: ForecastDay;
  isHero?: boolean;
  isLocked?: boolean;
  onSelect?: () => void;
  animationDelay?: number;
  direction?: "forward" | "backward";
}

// --- Type colors for compact cards ---
const COMPACT_COLORS: Record<DayType, { dot: string; text: string }> = {
  fruit:  { dot: "bg-[#7B2D45]", text: "text-[#7B2D45]" },
  flower: { dot: "bg-[#D4899A]", text: "text-[#D4899A]" },
  leaf:   { dot: "bg-[#4A7C59]", text: "text-[#4A7C59]" },
  root:   { dot: "bg-[#B8A898]", text: "text-[#B8A898]" },
};

const RATING_LABELS_EN = ["", "Bad", "Fair", "Good", "Excellent"];
const RATING_LABELS_ES = ["", "Malo", "Regular", "Bueno", "Excelente"];

// --- Type emoji (fallback until images are provided) ---
const TYPE_EMOJI: Record<DayType, string> = {
  fruit: "🍇",
  flower: "🌸",
  leaf: "🍃",
  root: "🌱",
};

function formatHour(hour: number, locale: Locale = "en"): string {
  const totalMinutes = Math.round(hour * 60 / 5) * 5;
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  if (locale === "es") {
    return m === 0 ? `${h}:00` : `${h}:${String(m).padStart(2, "0")}`;
  }
  const h12 = h === 0 || h === 24 ? 12 : h > 12 ? h - 12 : h;
  const suffix = h < 12 || h === 24 ? "am" : "pm";
  return m === 0 ? `${h12}${suffix}` : `${h12}:${String(m).padStart(2, "0")}${suffix}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Merge periods by constellation type, ignoring unfavourable splits */
function getDisplayTypes(periods: DayPeriod[]): { type: DayType; startHour: number; endHour: number }[] {
  const merged: { type: DayType; startHour: number; endHour: number }[] = [
    { type: periods[0].type, startHour: periods[0].startHour, endHour: periods[0].endHour },
  ];
  for (let i = 1; i < periods.length; i++) {
    const prev = merged[merged.length - 1];
    if (periods[i].type === prev.type) {
      prev.endHour = periods[i].endHour;
    } else {
      merged.push({ type: periods[i].type, startHour: periods[i].startHour, endHour: periods[i].endHour });
    }
  }
  return merged;
}

/** Compute good windows: fruit/flower periods that are not unfavourable */
function getGoodWindows(periods: DayPeriod[]): { startHour: number; endHour: number }[] {
  const windows: { startHour: number; endHour: number }[] = [];
  for (const p of periods) {
    const isGood = !p.unfavourable && DAY_TYPE_CONFIG[p.type].rating >= 3;
    if (!isGood) continue;
    const prev = windows[windows.length - 1];
    if (prev && Math.abs(prev.endHour - p.startHour) < 0.1) {
      prev.endHour = p.endHour;
    } else {
      windows.push({ startHour: p.startHour, endHour: p.endHour });
    }
  }
  return windows;
}

/** Weighted rating (unfavourable periods count as rating 1) */
function getWeightedRating(periods: DayPeriod[]): number {
  if (periods.length === 1 && !periods[0].unfavourable) return DAY_TYPE_CONFIG[periods[0].type].rating;
  const total = periods.reduce((sum, p) => {
    const hours = p.endHour - p.startHour;
    const rating = p.unfavourable ? 1 : DAY_TYPE_CONFIG[p.type].rating;
    return sum + rating * hours;
  }, 0);
  return Math.round(total / 24);
}

interface BestMomentResult {
  isYes: boolean;
  headerLabel: "bestMoment" | "noWindow";
  timeText: string;
  contextKey: string;
  startHour?: number;
  endHour?: number;
}

/** Compute the "Mejor momento" / "Best moment" section data */
function computeBestMoment(periods: DayPeriod[], locale: Locale, dict: Dictionary): BestMomentResult {
  const goodWindows = getGoodWindows(periods);

  if (goodWindows.length === 0) {
    return { isYes: false, headerLabel: "noWindow", timeText: "—", contextKey: "notRecommended" };
  }

  const totalGood = goodWindows.reduce((sum, w) => sum + (w.endHour - w.startHour), 0);
  if (totalGood >= 23) {
    return { isYes: true, headerLabel: "bestMoment", timeText: dict.allDay, contextKey: "noTimeRestriction", startHour: 0, endHour: 24 };
  }

  // Find best practical window (most overlap with 10:00-22:00)
  let best = goodWindows[0];
  let bestOverlap = 0;
  for (const w of goodWindows) {
    const overlapStart = Math.max(w.startHour, 10);
    const overlapEnd = Math.min(w.endHour, 22);
    const overlap = Math.max(0, overlapEnd - overlapStart);
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = w;
    }
  }

  const timeText = `${formatHour(best.startHour, locale)} – ${formatHour(best.endHour, locale)}`;

  // If window ends before 10am → too early
  if (best.endHour <= 10) {
    return { isYes: false, headerLabel: "bestMoment", timeText, contextKey: "tooEarly", startHour: best.startHour, endHour: best.endHour };
  }

  // Practical window — compute time-of-day context based on range
  const span = best.endHour - best.startHour;
  const s = best.startHour;
  const e = best.endHour;
  let contextKey: string;

  if (span >= 16) {
    contextKey = "mostOfTheDay";
  } else if (s < 6 && e <= 10) {
    contextKey = "earlyMorning";
  } else if (s < 6 && e <= 14) {
    contextKey = "morningToMidday";
  } else if (s < 6 && e <= 20) {
    contextKey = "morningToAfternoon";
  } else if (s < 6) {
    contextKey = "mostOfTheDay";
  } else if (s < 12 && e <= 14) {
    contextKey = "morning";
  } else if (s < 12 && e <= 17) {
    contextKey = "morningToMidday";
  } else if (s < 12 && e <= 22) {
    contextKey = "morningToAfternoon";
  } else if (s < 12) {
    contextKey = "mostOfTheDay";
  } else if (s < 15 && e <= 18) {
    contextKey = "midday";
  } else if (s < 15 && e <= 22) {
    contextKey = "afternoonToEvening";
  } else if (s < 18 && e <= 22) {
    contextKey = "afternoon";
  } else if (s < 18) {
    contextKey = "afternoonToEvening";
  } else {
    contextKey = "evening";
  }

  return { isYes: true, headerLabel: "bestMoment", timeText, contextKey, startHour: best.startHour, endHour: best.endHour };
}

/** Get the headline key based on Yes/No and type */
function getHeadline(isYes: boolean, primaryType: DayType, hasTransition: boolean, dict: Dictionary): string {
  if (!isYes) return dict.headlineBad;
  if (primaryType === "fruit" && !hasTransition) return dict.headlineExcellent;
  return dict.headlineGood;
}

/** Get the hero description text */
function getDescription(
  isYes: boolean,
  isAllDay: boolean,
  primaryType: DayType,
  hasTransition: boolean,
  displayTypes: { type: DayType }[],
  contextKey: string,
  dict: Dictionary,
): string {
  if (!hasTransition) {
    // Single type
    if (primaryType === "fruit") return isAllDay ? dict.descFruitAllDay : dict.descFruit;
    if (primaryType === "flower") return isAllDay ? dict.descFlowerAllDay : dict.descFlower;
    if (primaryType === "leaf") return dict.descLeaf;
    return dict.descRoot;
  }

  // Transition — build composite description
  const t1 = dict[displayTypes[0].type].toLowerCase();
  const t2 = dict[displayTypes[displayTypes.length - 1].type].toLowerCase();

  if (!isYes && contextKey === "tooEarly") {
    return dict.descTransitionTooEarly.replace("{t1}", t1).replace("{t2}", t2);
  }
  if (!isYes) {
    return dict.descTransitionNoWindow.replace("{t1}", t1).replace("{t2}", t2);
  }
  const timeLabel = dict[contextKey as keyof typeof dict] || contextKey;
  return dict.descTransitionShort.replace("{t1}", t1).replace("{t2}", t2).replace("{time}", timeLabel);
}

export function DayCard({ day, isHero, isLocked, onSelect, animationDelay = 0 }: DayCardProps) {
  const { locale, dict } = useLocale();
  const { date, periods, primaryType, hasUnfavourable } = day;
  const ratingLabels = locale === "es" ? RATING_LABELS_ES : RATING_LABELS_EN;
  const displayTypes = getDisplayTypes(periods);
  const hasTransition = displayTypes.length > 1;

  // --- LOCKED CARD ---
  if (isLocked) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className="flex items-center justify-between py-4 border-t border-border/20 w-full text-left opacity-40"
      >
        <span className="text-[15px] font-medium text-muted-foreground/60">
          {formatCompactDate(date, locale)}
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/20" />
          <span className="text-sm text-muted-foreground/40">—</span>
          <Lock className="h-3.5 w-3.5 text-muted-foreground/30" />
        </div>
      </button>
    );
  }

  // --- HERO CARD ---
  if (isHero) {
    const moment = computeBestMoment(periods, locale, dict);
    const headline = getHeadline(moment.isYes, primaryType, hasTransition, dict);
    const isAllDay = moment.contextKey === "noTimeRestriction";
    const description = getDescription(moment.isYes, isAllDay, primaryType, hasTransition, displayTypes, moment.contextKey, dict);
    const heroDate = formatHeroDate(date, locale);
    const dayLabel = formatDayLabel(date, locale, dict);

    // Type pill text
    const typePillText = hasTransition
      ? displayTypes.map((dt) => dict[dt.type]).join(" · ")
      : dict[primaryType];

    return (
      <div className="text-center pb-2">
        {/* Type illustration circle */}
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-[#FCFBF9]">
          <Image
            src={`/images/type-${primaryType}.png`}
            alt={dict[primaryType]}
            width={110}
            height={110}
            className="object-contain scale-125"
            priority
          />
        </div>

        {/* Date */}
        <p className="mt-6 text-[15px] font-bold text-foreground">{dayLabel}</p>
        <p className="mt-0.5 text-[15px] text-muted-foreground/50">{heroDate}</p>

        {/* Headline */}
        <h2 className="mt-5 max-w-[260px] mx-auto text-[40px] font-semibold leading-[1.15] tracking-tight text-foreground text-center">
          {headline}
        </h2>

        {/* Type pill */}
        <div className="mt-6 inline-flex rounded-full bg-[#F5F4F2] px-5 py-2">
          <span className="text-[15px] font-medium text-[#8A8A8A]">{typePillText}</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground/50" style={{ textWrap: "balance" } as React.CSSProperties}>
          {description}
        </p>

        {/* Best moment + Yes/No */}
        <div className="mt-8 flex gap-3">
          {/* Left: Best moment */}
          <div className="flex-1 rounded-2xl border border-border px-6 py-5 text-left">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground/50">
              {dict[moment.headerLabel]}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {moment.timeText}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground/50">
              {dict[moment.contextKey as keyof typeof dict] || moment.contextKey}
            </p>
          </div>

          {/* Right: Yes/No */}
          <div
            className={cn(
              "flex w-28 shrink-0 flex-col items-center justify-center rounded-2xl",
              moment.isYes ? "bg-[#7B2D45]" : "bg-[#c4c0b8]",
            )}
          >
            <span className="text-2xl font-bold text-white">
              {moment.isYes ? dict.yes : dict.no}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPACT CARD (list row) ---
  const compactDate = formatCompactDate(date, locale);
  const effectiveRating = getWeightedRating(periods);
  const ratingText = ratingLabels[effectiveRating];
  const colors = COMPACT_COLORS[primaryType];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex items-center justify-between py-4 border-t border-border/20 w-full text-left transition-colors hover:bg-muted/10 active:bg-muted/20"
    >
      <span className="text-[15px] font-semibold text-foreground">
        {compactDate}
      </span>
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", colors.dot)} />
        <span className={cn("text-sm font-semibold", colors.text)}>
          {dict[primaryType]}
        </span>
        <span className="text-sm text-muted-foreground/50">
          · {ratingText}
        </span>
      </div>
    </button>
  );
}
