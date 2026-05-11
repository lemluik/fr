"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

const TABS = ["it", "crypto", "nomad", "freelancer"] as const;
type TabKey = (typeof TABS)[number];

const ICONS: Record<TabKey, string> = {
  it: "💻",
  crypto: "📈",
  nomad: "🌏",
  freelancer: "✨",
};

export function PersonaTabs() {
  const t = useTranslations("personas");
  const [active, setActive] = useState<TabKey>("it");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 overflow-x-auto rounded-2xl border border-zinc-100 bg-white p-2 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all",
                active === tab
                  ? "bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-[#0F172A]"
              )}
            >
              <span>{ICONS[tab]}</span>
              {t(`tabs.${tab}.label`)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A6CF7]/10 to-[#6C5CE7]/10 text-2xl">
            {ICONS[active]}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A]">
              {t(`tabs.${active}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {t(`tabs.${active}.description`)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A6CF7]/10">
                <svg className="h-4 w-4 text-[#4A6CF7]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-sm text-zinc-700">{t(`tabs.${active}.feature${i}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
