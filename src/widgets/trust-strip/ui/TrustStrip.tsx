import { useTranslations } from "next-intl";

function CheckIcon() {
  return (
    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  );
}

const PAYMENT_BRANDS = [
  {
    name: "VISA",
    className: "font-black italic tracking-tight text-white text-xl",
  },
  {
    name: "Mastercard",
    custom: (
      <span className="flex items-center gap-1">
        <span className="inline-block h-6 w-6 rounded-full bg-[#EB001B] opacity-90" />
        <span className="inline-block h-6 w-6 -ml-3 rounded-full bg-[#F79E1B] opacity-90" />
        <span className="ml-1.5 text-sm font-semibold text-white/70">Mastercard</span>
      </span>
    ),
  },
  {
    name: " Pay",
    custom: (
      <span className="flex items-center gap-0.5 text-sm font-semibold text-white/70">
        <svg className="h-4 w-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.4c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        Pay
      </span>
    ),
  },
  {
    name: "GPay",
    custom: (
      <span className="text-sm font-bold text-white/70">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-white/50">le Pay</span>
      </span>
    ),
  },
];

export function TrustStrip() {
  const t = useTranslations("trust");

  const badges = [
    { label: t("regulated"), desc: t("regulatedDesc"), color: "emerald" },
    { label: t("compliant"), desc: t("compliantDesc"), color: "emerald" },
    { label: t("safeguarded"), desc: t("safeguardedDesc"), color: "blue" },
    { label: t("audited"), desc: t("auditedDesc"), color: "blue" },
  ] as const;

  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-2)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-3)]">
          {t("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PAYMENT_BRANDS.map((brand) => (
            <div key={brand.name} className="trust-logo flex h-10 items-center justify-center">
              {brand.custom ?? (
                <span className={brand.className}>{brand.name}</span>
              )}
            </div>
          ))}

          <span className="hidden h-8 w-px bg-[var(--border-2)] sm:block" />

          {badges.map((badge, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${
                badge.color === "emerald"
                  ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-400"
                  : "border-blue-500/20 bg-blue-500/8 text-blue-400"
              }`}
            >
              <CheckIcon />
              <div className="leading-tight">
                <p className="text-xs font-medium">{badge.label}</p>
                <p className="text-[10px] opacity-60">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
