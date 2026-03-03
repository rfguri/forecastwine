"use client";

import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocale } from "@/lib/locale-context";

export function InfoModal() {
  const { dict } = useLocale();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground/60 transition-all hover:text-muted-foreground active:scale-95"
          aria-label={dict.infoTitle}
        >
          <Info className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold tracking-tight font-display">
            {dict.infoTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-1 flex flex-col gap-4 text-xs leading-relaxed text-muted-foreground">
          <p className="font-light">{dict.infoP1}</p>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-50/30 px-3 py-2.5">
              <span className="mt-0.5 text-base">🍇</span>
              <p className="text-[11px] leading-relaxed text-amber-900/80">{dict.infoP2Fruit}</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-rose-50/30 px-3 py-2.5">
              <span className="mt-0.5 text-base">🌸</span>
              <p className="text-[11px] leading-relaxed text-rose-900/80">{dict.infoP2Flower}</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-50/30 px-3 py-2.5">
              <span className="mt-0.5 text-base">🍃</span>
              <p className="text-[11px] leading-relaxed text-emerald-900/80">{dict.infoP2Leaf}</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-stone-50 to-stone-100/30 px-3 py-2.5">
              <span className="mt-0.5 text-base">🌱</span>
              <p className="text-[11px] leading-relaxed text-stone-700/80">{dict.infoP2Root}</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-zinc-100/50 to-zinc-50/30 px-3 py-2.5">
              <span className="mt-0.5 text-base">🌙</span>
              <p className="text-[11px] leading-relaxed text-zinc-500/80">{dict.infoP2Unfavourable}</p>
            </div>
          </div>

          <p className="font-light">{dict.infoP3}</p>

          <div className="rounded-xl bg-muted/30 px-3.5 py-3">
            <p className="text-[10px] font-light italic leading-relaxed text-muted-foreground/70">
              {dict.infoDisclaimer}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
