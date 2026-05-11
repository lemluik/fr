import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";

function CardIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
      <circle cx="7" cy="15" r="1" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeLinecap="round" />
    </svg>
  );
}

type CardData = {
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  title: string;
  description: string;
  features: string[];
  highlight?: string;
};

function EcoCard({ icon, gradient, iconBg, title, description, features, highlight }: CardData) {
  return (
    <div className={`feature-card relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-7 shadow-sm ${gradient}`}>
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#0F172A]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
      {highlight && (
        <p className="mt-3 text-sm font-semibold text-[#4A6CF7]">{highlight}</p>
      )}
      <ul className="mt-5 space-y-2.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#4A6CF7]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Ecosystem() {
  const t = useTranslations("ecosystem");

  return (
    <Section id="ecosystem" className="py-24">
      <div className="text-center">
        <span className="inline-block rounded-full border border-[#4A6CF7]/20 bg-[#4A6CF7]/5 px-4 py-1.5 text-xs font-semibold text-[#4A6CF7]">
          {t("label")}
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EcoCard
          icon={<CardIcon />}
          gradient=""
          iconBg="bg-gradient-to-br from-[#4A6CF7]/10 to-[#6C5CE7]/10 text-[#4A6CF7]"
          title={t("cards.banking.title")}
          description={t("cards.banking.description")}
          highlight={t("cards.banking.highlight")}
          features={[
            t("cards.banking.feature1"),
            t("cards.banking.feature2"),
            t("cards.banking.feature3"),
          ]}
        />
        <EcoCard
          icon={<GlobeIcon />}
          gradient=""
          iconBg="bg-gradient-to-br from-emerald-50 to-teal-50 text-[#1E6F6B]"
          title={t("cards.travel.title")}
          description={t("cards.travel.description")}
          highlight={t("cards.travel.highlight")}
          features={[
            t("cards.travel.feature1"),
            t("cards.travel.feature2"),
            t("cards.travel.feature3"),
          ]}
        />
        <EcoCard
          icon={<WifiIcon />}
          gradient=""
          iconBg="bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600"
          title={t("cards.connectivity.title")}
          description={t("cards.connectivity.description")}
          highlight={t("cards.connectivity.highlight")}
          features={[
            t("cards.connectivity.feature1"),
            t("cards.connectivity.feature2"),
            t("cards.connectivity.feature3"),
          ]}
        />
      </div>
    </Section>
  );
}
