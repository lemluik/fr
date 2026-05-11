import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/ui";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#4A6CF7]/5 via-white to-[#6C5CE7]/5 py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-zinc-600">
          {t("subtitle")}
        </p>
        <p className="mt-2 text-sm font-medium text-[#4A6CF7]">
          {t("urgency")}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Input placeholder={t("placeholder")} className="sm:w-80" />
          <Button variant="primary" className="w-full sm:w-auto">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
