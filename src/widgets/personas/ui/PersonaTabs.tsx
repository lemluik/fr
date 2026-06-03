"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/cn";

// Stroke SVG icons for persona tabs
function IconIT() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function IconCrypto() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}
function IconNomad() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function IconFreelancer() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}

// Larger versions for the content panel header
function IconITLg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function IconCryptoLg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}
function IconNomadLg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function IconFreelancerLg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}

const TABS = ["it", "crypto", "nomad", "freelancer"] as const;
type TabKey = (typeof TABS)[number];

const TAB_ICONS: Record<TabKey, React.ReactNode> = {
  it:         <IconIT />,
  crypto:     <IconCrypto />,
  nomad:      <IconNomad />,
  freelancer: <IconFreelancer />,
};

const TAB_ICONS_LG: Record<TabKey, React.ReactNode> = {
  it:         <IconITLg />,
  crypto:     <IconCryptoLg />,
  nomad:      <IconNomadLg />,
  freelancer: <IconFreelancerLg />,
};

export function PersonaTabs() {
  const t = useTranslations("personas");
  const [active, setActive] = useState<TabKey>("it");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex justify-center">
        <div className="glass inline-flex gap-2 overflow-x-auto rounded-2xl p-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all",
                active === tab
                  ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] text-white shadow-sm"
                  : "text-[var(--text-3)] hover:bg-white/5 hover:text-[var(--text-2)]"
              )}
            >
              {TAB_ICONS[tab]}
              {t(`tabs.${tab}.label`)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 mx-auto max-w-3xl feature-card rounded-2xl p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            {TAB_ICONS_LG[active]}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--text)]">
              {t(`tabs.${active}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-2)]">
              {t(`tabs.${active}.description`)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass rounded-xl p-4">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                <svg className="h-4 w-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="text-sm text-[var(--text-2)]">{t(`tabs.${active}.feature${i}`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#cta"
            className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium"
          >
            {t("cta", { role: t(`tabs.${active}.label`) })}
          </a>
        </div>
      </div>
    </div>
  );
}
