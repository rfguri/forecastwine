"use client";

import { LocaleProvider } from "@/lib/locale-context";
import { ForecastPage } from "@/components/forecast-page";

export default function Home() {
  return (
    <LocaleProvider>
      <ForecastPage />
    </LocaleProvider>
  );
}
