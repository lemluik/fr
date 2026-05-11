"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

const TABS = ["it", "crypto", "nomad", "freelancer"] as const;
type TabKey = (typeof TABS)[number];

export function PersonaTabs() {
  const t = useTranslations("personas");
  const [active, setActive] = useState<TabKey>("it");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              active === tab
                ? "bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white shadow-sm"
                : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-[#0F172A]"
            )}
          >
            {t(`tabs.${tab}.label`)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-[#0F172A]">
          {t(`tabs.${active}.title`)}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          {t(`tabs.${active}.description`)}
        </p>
        <ul className="mt-5 space-y-2">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A6CF7]" />
              {t(`tabs.${active}.feature${i}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
