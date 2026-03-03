"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function PaywallCard() {
  const { dict } = useLocale();

  return (
    <div className="pb-10 mb-10 text-center">
      <p className="text-lg font-bold tracking-tight text-foreground">
        {dict.unlockForecast}
      </p>
      <p className="mt-2 text-sm text-muted-foreground/50">
        {dict.unlockDesc}
      </p>
      <Link
        href="/subscribe"
        className="mt-5 inline-flex items-center rounded-full bg-foreground px-10 py-3.5 text-base font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98]"
      >
        {dict.subscribe}
      </Link>
    </div>
  );
}
