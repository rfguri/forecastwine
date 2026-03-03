"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getForecast } from "@/lib/calendar";
import { getVisibleDays, hasPremiumAccess } from "@/lib/entitlements";
import { useLocale } from "@/lib/locale-context";
import { DayCard } from "./day-card";
import { PaywallCard } from "./paywall-card";

export function ForecastStrip() {
  const { dict } = useLocale();
  const router = useRouter();
  const visibleDays = getVisibleDays();
  const isPremium = hasPremiumAccess();
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = sessionStorage.getItem("fw-selected-day");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const navigate = useCallback((index: number) => {
    setSelectedIndex((prev) => {
      setDirection(index >= prev ? "forward" : "backward");
      sessionStorage.setItem("fw-selected-day", String(index));
      return index;
    });
  }, []);

  const totalCards = isPremium ? visibleDays : visibleDays + 3;

  const forecast = useMemo(
    () => getForecast(new Date(), totalCards),
    [totalCards],
  );

  // Split into hero, upcoming (after selected), and previous (before selected)
  const heroDay = forecast[selectedIndex];
  const upcomingDays = forecast.slice(selectedIndex + 1, totalCards);
  const previousDays = selectedIndex > 0 ? forecast.slice(0, selectedIndex) : [];

  return (
    <div className="flex flex-col">
      {/* Hero card */}
      <DayCard
        day={heroDay}
        isHero
        direction={direction}
        animationDelay={0}
      />

      {/* Previous days (when a future day is selected) */}
      {previousDays.length > 0 && (
        <>
          <div className="mt-8 mb-2 flex items-center gap-3">
            <div className="h-px w-8 bg-muted-foreground/20" />
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
              {dict.previousDays}
            </h3>
          </div>
          {previousDays.map((day, i) => (
            <DayCard
              key={day.date.toISOString()}
              day={day}
              direction={direction}
              onSelect={() => navigate(i)}
              animationDelay={0}
            />
          ))}
        </>
      )}

      {/* Upcoming days */}
      {upcomingDays.length > 0 && (
        <>
          <div className="mt-8 mb-2 flex items-center gap-3">
            <div className="h-px w-8 bg-muted-foreground/20" />
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
              {dict.upcoming}
            </h3>
          </div>
          {upcomingDays.map((day, i) => {
            const globalIndex = selectedIndex + 1 + i;
            const isLocked = !isPremium && globalIndex >= visibleDays;

            return (
              <DayCard
                key={day.date.toISOString()}
                day={day}
                isLocked={isLocked}
                direction={direction}
                onSelect={isLocked ? () => router.push("/subscribe") : () => navigate(globalIndex)}
                animationDelay={0}
              />
            );
          })}
        </>
      )}

      {/* End of forecast (premium) */}
      {isPremium && (
        <div className="mt-4 text-center">
          <p className="text-[11px] font-medium text-muted-foreground/50">{dict.forecastEndTitle}</p>
          <p className="mt-0.5 text-[10px] font-light text-muted-foreground/40">{dict.forecastEndDesc}</p>
        </div>
      )}

      {/* Paywall CTA (free) */}
      {!isPremium && <div className="mt-7"><PaywallCard /></div>}
    </div>
  );
}
