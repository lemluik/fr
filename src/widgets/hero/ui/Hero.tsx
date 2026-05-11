import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/ui";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Gradient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Input
            placeholder={t("placeholder")}
            className="sm:w-80"
          />
          <Button variant="primary" className="w-full sm:w-auto">
            {t("cta")}
          </Button>
        </div>
        <p className="mt-4 text-xs text-zinc-400">
          {t("privacy")}
        </p>
      </div>
    </section>
  );
}
