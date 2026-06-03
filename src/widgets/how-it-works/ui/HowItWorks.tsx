import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";

const S = 24; // stroke icon size

function IconSignUp() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      <path d="M21 21v-2a4 4 0 0 0-3-3.87"/>
    </svg>
  );
}

function IconFund() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  );
}

function IconCard() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
      <line x1="6" y1="15" x2="10" y2="15"/>
      <circle cx="17" cy="15" r="1" fill="currentColor" stroke="none"/>
      <circle cx="20" cy="15" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconTravel() {
  return (
    <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

const STEPS = [
  { key: "step1", Icon: IconSignUp,  color: "var(--primary)" },
  { key: "step2", Icon: IconFund,    color: "var(--accent)"  },
  { key: "step3", Icon: IconCard,    color: "var(--primary)" },
  { key: "step4", Icon: IconTravel,  color: "var(--accent)"  },
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
            <div
              className="glass mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl"
              style={{ color: step.color }}
            >
              <step.Icon />
            </div>
            <div
              className="mx-auto mb-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-end))" }}
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
