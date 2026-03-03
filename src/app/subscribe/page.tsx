"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Check } from "lucide-react";
import { LocaleProvider, useLocale } from "@/lib/locale-context";

function SubscribeContent() {
  const router = useRouter();
  const { dict } = useLocale();

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col px-6">
      {/* Top bar: centered title + close button */}
      <div className="relative flex h-14 items-center justify-center animate-fade-up stagger-1">
        <p className="text-base font-semibold">{dict.subscription}</p>
        <button
          onClick={() => router.back()}
          className="absolute right-0 flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted/40 active:scale-95"
        >
          <X className="h-5 w-5 text-muted-foreground/60" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-2 pt-6">
        {/* Grape illustration */}
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#FCFBF9] animate-scale-in stagger-2">
          <Image
            src="/images/type-fruit.png"
            alt=""
            width={128}
            height={128}
            className="h-24 w-24 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-[32px] font-bold leading-tight tracking-tight text-center animate-fade-up stagger-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          {dict.unlockForecast}
        </h1>
        <p className="mt-3 text-base text-muted-foreground/50 text-center animate-fade-up stagger-3" style={{ textWrap: "balance" } as React.CSSProperties}>
          {dict.unlockDesc}
        </p>

        {/* Price */}
        <div className="mt-12 flex items-baseline gap-1 animate-fade-up stagger-4">
          <span className="text-[52px] font-bold tracking-tight text-[#7B2D45]">€0.99</span>
          <span className="text-lg text-muted-foreground/50">{dict.perMonth}</span>
        </div>

        {/* Features */}
        <ul className="mt-10 mx-auto flex flex-col gap-5 animate-fade-up stagger-5">
          {([dict.feature1, dict.feature2, dict.feature3]).map((feature) => (
            <li key={feature} className="flex items-center gap-4">
              <Check className="h-5 w-5 shrink-0 text-[#7B2D45]" strokeWidth={2.5} />
              <span className="text-base font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Subscribe button */}
        <button
          disabled
          className="mt-12 w-full rounded-full bg-[#7B2D45] px-8 py-4.5 text-lg font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] animate-fade-up stagger-6"
        >
          {dict.subscribe}
        </button>
        <p className="mt-3 text-xs text-muted-foreground/40 animate-fade-up stagger-6">
          {dict.stripeNote}
        </p>
      </div>

    </main>
  );
}

export default function SubscribePage() {
  return (
    <LocaleProvider>
      <SubscribeContent />
    </LocaleProvider>
  );
}
