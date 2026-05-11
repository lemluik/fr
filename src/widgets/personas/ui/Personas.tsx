import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";
import { PersonaTabs } from "./PersonaTabs";

export function Personas() {
  const t = useTranslations("personas");

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
      <div className="mt-10">
        <PersonaTabs />
      </div>
    </Section>
  );
}
