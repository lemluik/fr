import { useTranslations } from "next-intl";

export function Pricing() {
  const t = useTranslations("pricing");

  const rows = [
    { op: t("r1op"), bank: t("r1bank"), fr: t("r1fr") },
    { op: t("r2op"), bank: t("r2bank"), fr: t("r2fr") },
    { op: t("r3op"), bank: t("r3bank"), fr: t("r3fr") },
    { op: t("r4op"), bank: t("r4bank"), fr: t("r4fr") },
    { op: t("r5op"), bank: t("r5bank"), fr: t("r5fr") },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[960px] px-6">
        <span className="section-label">{t("label")}</span>
        <h2 className="mt-5 text-[28px] font-bold leading-tight text-[var(--text)] sm:text-[44px] sm:leading-[1.2]">
          {t("title")}
        </h2>

        {/* Early Adopter баннер */}
        <div className="mt-8 rounded-2xl border border-[var(--primary)]/25 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary-end)]/10 px-6 py-4">
          <p className="text-sm font-semibold text-[var(--text)] sm:text-base">
            {t("banner")}
          </p>
        </div>

        {/* Таблица-карточка (desktop) / стопка карточек (mobile) */}
        <div className="card-surface mt-6 divide-y divide-[var(--border)] overflow-hidden">
          {/* Шапка — только desktop */}
          <div className="hidden grid-cols-3 border-b border-[var(--border)] sm:grid">
            <p className="px-6 py-4 text-sm font-semibold text-[var(--text)]">{t("col1")}</p>
            <p className="px-6 py-4 text-sm font-medium text-[var(--text-3)]">{t("col2")}</p>
            <p className="px-6 py-4 text-sm font-semibold text-[var(--primary)]">{t("col3")}</p>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-1 gap-2 px-5 py-5 sm:grid-cols-3 sm:gap-0 sm:px-0 sm:py-0">
              <p className="px-0 py-0 text-sm font-medium text-[var(--text)] sm:px-6 sm:py-5">{r.op}</p>
              <p className="text-sm text-[var(--text-3)] sm:px-6 sm:py-5">
                <span className="text-xs text-[var(--text-3)] sm:hidden">{t("col2")}: </span>
                {r.bank}
              </p>
              <p className="font-mono text-sm font-semibold text-[var(--green)] sm:px-6 sm:py-5">
                <span className="font-sans text-xs font-normal text-[var(--text-3)] sm:hidden">{t("col3")}: </span>
                {r.fr}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-[var(--text-3)]">{t("footnote")}</p>

        <a href="#cta" className="btn-primary mt-8 inline-flex h-12 items-center px-8 text-sm">
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
