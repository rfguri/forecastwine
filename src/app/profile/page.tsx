"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ArrowLeft, ChevronRight, Globe, Shield, FileText, Crown } from "lucide-react";
import { LocaleProvider, useLocale } from "@/lib/locale-context";
import { hasPremiumAccess, toggleDevPremium } from "@/lib/entitlements";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

function ProfileContent() {
  const router = useRouter();
  const { locale, dict, setLocale } = useLocale();
  const [isPremium, setIsPremium] = useState(() => hasPremiumAccess());

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col px-6">
      {/* Top bar: back arrow + centered title */}
      <div className="relative flex h-14 items-center justify-center animate-fade-up stagger-1">
        <button
          onClick={() => router.back()}
          className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted/40 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <p className="text-base font-semibold">{dict.profile}</p>
      </div>

      {/* Avatar + name */}
      <div className="mt-6 flex flex-col items-center animate-fade-up stagger-2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F4F2]">
          <User className="h-8 w-8 text-[#8A8A8A]" strokeWidth={1.5} />
        </div>
        <p className="mt-4 text-xl font-bold tracking-tight">{dict.anonymous}</p>
        <button
          className="mt-1.5 text-sm font-medium text-[#7B2D45]"
          onClick={() => {
            // TODO: Replace with actual Stripe customer portal URL
            window.open("https://billing.stripe.com/p/login/test", "_blank");
          }}
        >
          {dict.signIn}
        </button>
      </div>

      {/* Sections */}
      <div className="mt-10 flex flex-col animate-fade-up stagger-3">
        {/* Separator */}
        <div className="h-px bg-border/40" />

        {/* Plan */}
        <div className="py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
            {dict.plan}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Crown className={cn("h-5 w-5", isPremium ? "text-[#7B2D45]" : "text-muted-foreground/60")} />
              <p className="text-base font-medium">{isPremium ? dict.premiumPlan : dict.freePlan}</p>
            </div>
            <button
              onClick={() => {
                const next = toggleDevPremium();
                setIsPremium(next);
                window.location.href = "/";
              }}
              className="text-xs font-medium text-[#7B2D45]"
            >
              {isPremium ? "Switch to Free" : "Switch to Premium"}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-border/40" />

        {/* Language */}
        <div className="py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
            {dict.language}
          </p>
          <div className="mt-3 flex gap-3">
            {(["en", "es"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={cn(
                  "flex-1 rounded-full py-3.5 text-base font-semibold transition-all active:scale-[0.98]",
                  locale === l
                    ? "bg-foreground text-background"
                    : "bg-[#F5F4F2] text-muted-foreground hover:brightness-95",
                )}
              >
                {l === "en" ? "English" : "Español"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-1 pb-8 animate-fade-up stagger-4">
        <Link
          href="/privacy"
          className="flex items-center justify-between rounded-xl px-1 py-3 text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          <span className="flex items-center gap-2.5">
            <Shield className="h-[18px] w-[18px]" />
            {dict.privacy}
          </span>
          <ChevronRight className="h-3 w-3 opacity-30" />
        </Link>
        <Link
          href="/terms"
          className="flex items-center justify-between rounded-xl px-1 py-3 text-sm text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          <span className="flex items-center gap-2.5">
            <FileText className="h-[18px] w-[18px]" />
            {dict.terms}
          </span>
          <ChevronRight className="h-3 w-3 opacity-30" />
        </Link>
        <p className="mt-4 text-center text-xs text-muted-foreground/30">
          v1.0.0
        </p>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <LocaleProvider>
      <ProfileContent />
    </LocaleProvider>
  );
}
