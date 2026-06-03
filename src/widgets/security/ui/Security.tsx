import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";
import { SecurityToggle } from "./SecurityToggle";

export function Security() {
  const t = useTranslations("security");

  return (
    <Section id="security">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-[var(--text-2)]">
          {t("subtitle")}
        </p>
      </div>
      <div className="mt-10">
        <SecurityToggle />
      </div>
    </Section>
  );
}
