"use client";

import { useLocale } from "@/lib/locale-context";
import { ForecastStrip } from "./forecast-strip";
import { InstallBanner } from "./install-banner";
import { ProfileMenu } from "./profile-menu";

export function ForecastPage() {
  const { dict } = useLocale();

  return (
    <main className="mx-auto min-h-svh max-w-lg px-5 pb-16 pt-4">
      {/* Header */}
      <header className="animate-fade-up stagger-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">{dict.appName}</h1>
          <ProfileMenu />
        </div>
      </header>

      {/* Install banner */}
      <div className="mt-6 animate-fade-up stagger-2">
        <InstallBanner />
      </div>

      {/* Forecast */}
      <div className="mt-10">
        <ForecastStrip />
      </div>
    </main>
  );
}
