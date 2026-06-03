"use client";

import { useTranslations } from "next-intl";

function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function IconCard() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

const SCENARIO_ICONS = [<IconGlobe key="g"/>, <IconCard key="c"/>, <IconZap key="z"/>, <IconShield key="s"/>];

export function PersonaTabs() {
  const t = useTranslations("personas");

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="feature-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
              {SCENARIO_ICONS[i]}
            </div>
            <h3 className="text-base font-semibold text-[var(--text)]">
              {t(`scenarios.${i}.title`)}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-[var(--text-2)]">
            {t(`scenarios.${i}.desc`)}
          </p>
          <ul className="mt-auto flex flex-col gap-2">
            {[0, 1, 2].map((j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-2)]">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {t(`scenarios.${i}.feature${j}`)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
