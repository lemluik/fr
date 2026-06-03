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
        <div className="glass inline-flex rounded-full p-1">
          <button
            onClick={() => setMode("user")}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-medium transition-all",
              mode === "user"
                ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] text-white shadow-sm"
                : "text-[var(--text-3)] hover:text-[var(--text-2)]"
            )}
          >
            {t("toggleUser")}
          </button>
          <button
            onClick={() => setMode("tech")}
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-medium transition-all",
              mode === "tech"
                ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] text-white shadow-sm"
                : "text-[var(--text-3)] hover:text-[var(--text-2)]"
            )}
          >
            {t("toggleTech")}
          </button>
        </div>
      </div>

      {/* Content panels */}
      <div className="mt-12 mx-auto max-w-3xl">
        {mode === "user" ? (
          <div className="feature-card rounded-2xl p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-[var(--text)]">{t("userTitle")}</h3>
            <p className="mt-2 text-sm text-[var(--text-3)]">{t("userSubtitle")}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {(["🔐", "👆", "⚡"] as const).map((icon, i) => (
                <div key={i} className="glass rounded-xl p-5 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                    <span className="text-xl">{icon}</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--text)]">{t(`userFeature${i + 1}Title`)}</p>
                  <p className="mt-1 text-xs text-[var(--text-3)]">{t(`userFeature${i + 1}Desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="feature-card rounded-2xl p-8 sm:p-10">
            <h3 className="text-xl font-semibold text-[var(--text)]">{t("techTitle")}</h3>
            <p className="mt-2 text-sm text-[var(--text-3)]">{t("techSubtitle")}</p>

            <div className="mt-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[var(--primary)]/25 bg-[var(--primary)]/6 p-5">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/12">
                    <svg className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                  </div>
                  <p className="font-mono text-xs font-bold text-[var(--primary)]">{t("techKey1")}</p>
                  <p className="mt-1 text-xs text-[var(--text-3)]">{t("techKey1Desc")}</p>
                </div>
                <div className="rounded-xl border border-[var(--primary-end)]/25 bg-[var(--primary-end)]/6 p-5">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-end)]/12">
                    <svg className="h-5 w-5 text-[var(--primary-end)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                  </div>
                  <p className="font-mono text-xs font-bold text-[var(--primary-end)]">{t("techKey2")}</p>
                  <p className="mt-1 text-xs text-[var(--text-3)]">{t("techKey2Desc")}</p>
                </div>
                <div className="rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/6 p-5">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/12">
                    <svg className="h-5 w-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <p className="font-mono text-xs font-bold text-[var(--accent)]">{t("techKey3")}</p>
                  <p className="mt-1 text-xs text-[var(--text-3)]">{t("techKey3Desc")}</p>
                </div>
              </div>

              <div className="my-4 flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />
                <span className="glass rounded-full px-3 py-1 text-xs font-medium text-[var(--text-2)]">TSS Protocol</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />
              </div>

              <p className="text-sm leading-relaxed text-[var(--text-2)]">{t("techDescription")}</p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-end)]"
          >
            {t("cta")} →
          </a>
        </div>
      </div>
    </div>
  );
}
