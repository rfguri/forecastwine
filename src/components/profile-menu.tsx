"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function ProfileMenu() {
  const { dict } = useLocale();

  return (
    <Link
      href="/profile"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F4F2] transition-all hover:brightness-95 active:scale-95"
      aria-label={dict.profile}
    >
      <User className="h-5 w-5 text-[#8A8A8A]" strokeWidth={1.8} />
    </Link>
  );
}
