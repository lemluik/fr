import { useTranslations } from "next-intl";

export function Partners() {
  const t = useTranslations("partners");

  const roles = [
    { tag: t("p1Tag"), title: t("p1Title"), desc: t("p1Desc") },
    { tag: t("p2Tag"), title: t("p2Title"), desc: t("p2Desc") },
    { tag: t("p3Tag"), title: t("p3Title"), desc: t("p3Desc") },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <span className="section-label">{t("label")}</span>
        <h2 className="mt-5 text-[28px] font-bold leading-tight text-[var(--text)] sm:text-[44px] sm:leading-[1.2]">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-3)]">{t("subtitle")}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {roles.map((r, i) => (
            <div key={i} className="card-surface flex flex-col p-6">
              {/* Тег роли */}
              <span className="inline-flex w-fit items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                {r.tag}
              </span>
              <h3 className="mt-4 text-base font-semibold text-[var(--text)]">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-3)]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
