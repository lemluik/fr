import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";
import { EcosystemCard } from "./EcosystemCard";

function CardIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M2 10h20" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
    </svg>
  );
}

export function Ecosystem() {
  const t = useTranslations("ecosystem");

  return (
    <Section>
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-zinc-600">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <EcosystemCard
          icon={<CardIcon />}
          title={t("cards.banking.title")}
          description={t("cards.banking.description")}
          features={[
            t("cards.banking.feature1"),
            t("cards.banking.feature2"),
            t("cards.banking.feature3"),
          ]}
          className="lg:col-span-2"
        />
        <EcosystemCard
          icon={<GlobeIcon />}
          title={t("cards.travel.title")}
          description={t("cards.travel.description")}
          features={[
            t("cards.travel.feature1"),
            t("cards.travel.feature2"),
          ]}
        />
        <EcosystemCard
          icon={<WifiIcon />}
          title={t("cards.connectivity.title")}
          description={t("cards.connectivity.description")}
          features={[
            t("cards.connectivity.feature1"),
            t("cards.connectivity.feature2"),
          ]}
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
    </Section>
  );
}
