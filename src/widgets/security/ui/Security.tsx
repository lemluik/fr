"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import { useScrollParallax } from "@/shared/hooks/useParallax";

/* Иконки: плоские, палитра бренда (без стоковых сейфов/замков) */
const ICONS = {
  key: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a4 4 0 01-4 4m0 0L4.5 17.5M11 11l2.5 2.5M15 7l2-2m-4.5 6.5L15 14M15 7a4 4 0 114 4" />
    </svg>
  ),
  receipt: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h4M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3z" />
    </svg>
  ),
  shield: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 4.5-3.2 7.7-8 9-4.8-1.3-8-4.5-8-9V6l8-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
};

export function Security() {
  const t = useTranslations("security");
  const ref = useScrollReveal();
  const glow = useScrollParallax<HTMLDivElement>(0.09);
  const [open, setOpen] = useState<number | null>(null);

  const claims = [
    { icon: ICONS.key, title: t("c1Title"), desc: t("c1Desc") },
    { icon: ICONS.receipt, title: t("c2Title"), desc: t("c2Desc") },
    { icon: ICONS.shield, title: t("c3Title"), desc: t("c3Desc") },
  ];

  const accordion = [
    { q: t("h1q"), a: t("h1a") },
    { q: t("h2q"), a: t("h2a") },
    { q: t("h3q"), a: t("h3a") },
  ];

  return (
    <section id="security" className="dark-block-2 relative overflow-hidden py-16 sm:py-24">
      {/* Фон: сетка + холодное свечение со scroll-параллаксом */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid-dark mask-fade-b absolute inset-0 opacity-70" />
        <div ref={glow} className="absolute -top-32 left-[24%] h-[420px] w-[520px] will-change-transform">
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,108,247,0.14) 0%, transparent 62%)" }}
          />
        </div>
      </div>

      <div ref={ref} className="fade-up relative z-10 mx-auto max-w-[960px] px-6">
        <span className="section-label-dark">{t("label")}</span>
        <h2 className="mt-5 text-[28px] font-bold leading-tight text-white sm:text-[44px] sm:leading-[1.2]">
          {t("title")}
        </h2>

        {/* Три конкретных обещания */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {claims.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/20 text-[#8fa5ff]">
                {c.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Аккордеон «Как это устроено» — одна открытая секция за раз */}
        <div className="mt-14">
          <h3 className="text-lg font-semibold text-white">{t("howTitle")}</h3>
          <div className="mt-4 border-t border-white/10">
            {accordion.map((item, i) => (
              <div key={i} className={`acc-item ${open === i ? "open" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  {item.q}
                  <svg className="acc-chevron h-4 w-4 flex-shrink-0 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="acc-body">
                  <div>
                    <p className="pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="#cta" className="btn-white mt-12 inline-flex h-12 items-center px-8 text-sm">
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
