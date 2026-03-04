"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Download, Share } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function getInitialState() {
  if (typeof window === "undefined") {
    return { isStandalone: false, isIos: false, isAndroid: false, dismissed: true };
  }
  const standalone = window.matchMedia("(display-mode: standalone)").matches
    || ("standalone" in navigator && (navigator as Record<string, unknown>).standalone === true);
  const ua = navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  return { isStandalone: standalone, isIos, isAndroid, dismissed: false };
}

export function InstallBanner() {
  const { dict } = useLocale();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [{ isIos, isAndroid, isStandalone, dismissed }, setState] = useState(getInitialState);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else if (isIos) {
      setShowIosInstructions(true);
    }
  }, [deferredPrompt, isIos]);

  const handleDismiss = () => {
    setState((s) => ({ ...s, dismissed: true }));
  };

  if (isStandalone || dismissed) return null;
  if (!deferredPrompt && !isIos) return null;

  const installDesc = isIos ? dict.installDescIos : isAndroid ? dict.installDescAndroid : dict.installDesc;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-3 rounded-full p-0.5 text-muted-foreground/40 transition-colors hover:text-muted-foreground"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="pr-6">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-violet-500" />
          <p className="text-sm font-semibold text-foreground">{dict.installTitle}</p>
        </div>
        <p className="mt-0.5 text-xs font-light text-muted-foreground">{installDesc}</p>
      </div>

      {showIosInstructions ? (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-muted/30 p-3">
          <Share className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{dict.installIosSteps}</p>
        </div>
      ) : (
        <button
          onClick={handleInstall}
          className="mt-3 inline-flex items-center rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {dict.installAction}
        </button>
      )}
    </div>
  );
}
