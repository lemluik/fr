"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

export function Faq() {
  const t = useTranslations("faq");
  const rootRef = useRef<HTMLDivElement>(null);

  const items = Array.from({ length: 8 }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  // Одна открытая секция за раз (нативный disclosure + синхронизация)
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const target = e.currentTarget;
    if (!target.open || !rootRef.current) return;
    rootRef.current
      .querySelectorAll("details[open]")
      .forEach((d) => {
        if (d !== target) (d as HTMLDetailsElement).open = false;
      });
  };

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[720px] px-6">
        <h2 className="text-[28px] font-bold leading-tight text-[var(--text)] sm:text-[44px] sm:leading-[1.2]">
          {t("title")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-3)]">{t("subtitle")}</p>

        <div ref={rootRef} className="mt-10">
          {items.map((item, i) => (
            <details key={i} className="faq-item" onToggle={handleToggle}>
              <summary className="py-5 text-base font-medium text-[var(--text)]">
                {item.q}
                <svg
                  className="faq-chevron h-4 w-4 text-[var(--text-3)]"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="faq-answer pb-5 text-sm leading-relaxed text-[var(--text-2)]">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#cta" className="btn-primary inline-flex h-12 items-center px-8 text-sm">
            <FaqCta />
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqCta() {
  const t = useTranslations("nav");
  return <>{t("cta")}</>;
}
