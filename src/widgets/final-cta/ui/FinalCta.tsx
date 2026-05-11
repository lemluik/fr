import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/ui";

export function FinalCta() {
  const t = useTranslations("finalCta");

  return (
    <section id="cta" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A6CF7]/5 via-transparent to-[#6C5CE7]/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] shadow-lg shadow-indigo-200">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-zinc-600">
          {t("subtitle")}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          {t("urgency")}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Input placeholder={t("placeholder")} className="sm:w-72" />
          <Button variant="primary" className="w-full sm:w-auto">
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
