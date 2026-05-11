"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

export function SecurityToggle() {
  const t = useTranslations("security");
  const [mode, setMode] = useState<"user" | "tech">("user");

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-1">
          <button
            onClick={() => setMode("user")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              mode === "user"
                ? "bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white shadow-sm"
                : "text-zinc-600 hover:text-[#0F172A]"
            )}
          >
            {t("toggleUser")}
          </button>
          <button
            onClick={() => setMode("tech")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              mode === "tech"
                ? "bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white shadow-sm"
                : "text-zinc-600 hover:text-[#0F172A]"
            )}
          >
            {t("toggleTech")}
          </button>
        </div>
      </div>

      {/* Content panels */}
      <div className="mt-10 mx-auto max-w-2xl">
        {mode === "user" ? (
          <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0F172A]">{t("userTitle")}</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="mt-0.5 text-lg">🔐</span>
                {t("userItem1")}
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="mt-0.5 text-lg">👆</span>
                {t("userItem2")}
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-600">
                <span className="mt-0.5 text-lg">⚡</span>
                {t("userItem3")}
              </li>
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0F172A]">{t("techTitle")}</h3>
            <div className="mt-4 space-y-4">
              {/* MPC Architecture visualization */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#4A6CF7]/20 bg-[#4A6CF7]/5 p-4 text-center">
                  <p className="text-xs font-mono font-medium text-[#4A6CF7]">{t("techKey1")}</p>
                  <p className="mt-1 text-xs text-zinc-500">{t("techKey1Desc")}</p>
                </div>
                <div className="rounded-xl border border-[#6C5CE7]/20 bg-[#6C5CE7]/5 p-4 text-center">
                  <p className="text-xs font-mono font-medium text-[#6C5CE7]">{t("techKey2")}</p>
                  <p className="mt-1 text-xs text-zinc-500">{t("techKey2Desc")}</p>
                </div>
                <div className="rounded-xl border border-[#1E6F6B]/20 bg-[#1E6F6B]/5 p-4 text-center">
                  <p className="text-xs font-mono font-medium text-[#1E6F6B]">{t("techKey3")}</p>
                  <p className="mt-1 text-xs text-zinc-500">{t("techKey3Desc")}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600">{t("techDescription")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
