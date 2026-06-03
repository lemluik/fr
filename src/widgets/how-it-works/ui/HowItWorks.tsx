import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";

const STEPS = [
  { key: "step1", icon: "👤", color: "var(--primary)" },
  { key: "step2", icon: "💰", color: "var(--accent)" },
  { key: "step3", icon: "📈", color: "#f59e0b" },
  { key: "step4", icon: "✈️", color: "var(--primary)" },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <Section id="how-it-works" className="py-24">
      <div className="text-center">
        <span className="section-label">{t("label")}</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-2)]">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div key={step.key} className="relative text-center">
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="absolute top-10 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-[var(--border-2)] to-transparent lg:block" />
            )}
            {/* Icon */}
            <div className="glass mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl text-3xl">
              {step.icon}
            </div>
            <div
              className="mx-auto mb-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-end))` }}
            >
              {i + 1}
            </div>
            <h3 className="text-base font-semibold text-[var(--text)]">
              {t(`${step.key}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-3)]">
              {t(`${step.key}Desc`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
