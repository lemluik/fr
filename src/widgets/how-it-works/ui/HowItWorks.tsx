import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";

const STEPS = [
  { key: "step1", icon: "👤", accent: "from-[#4A6CF7]/10 to-[#6C5CE7]/10" },
  { key: "step2", icon: "💰", accent: "from-emerald-50 to-teal-50" },
  { key: "step3", icon: "📈", accent: "from-orange-50 to-amber-50" },
  { key: "step4", icon: "✈️", accent: "from-[#4A6CF7]/10 to-[#1E6F6B]/10" },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <Section id="how-it-works" className="py-24 bg-white">
      <div className="text-center">
        <span className="inline-block rounded-full border border-[#4A6CF7]/20 bg-[#4A6CF7]/5 px-4 py-1.5 text-xs font-semibold text-[#4A6CF7]">
          {t("label")}
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <div key={step.key} className="relative text-center">
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="absolute top-10 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-zinc-200 to-zinc-200 lg:block" />
            )}
            {/* Step number */}
            <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-3xl`}>
              {step.icon}
            </div>
            <div className="mx-auto mb-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#4A6CF7] text-xs font-bold text-white">
              {i + 1}
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A]">
              {t(`${step.key}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {t(`${step.key}Desc`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
