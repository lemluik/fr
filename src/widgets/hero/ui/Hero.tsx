import { useTranslations } from "next-intl";
import { PhoneShowcase } from "./PhoneShowcase";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Один мягкий градиентный blob ≤ 20% opacity */}
      <div className="hero-blob" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Слева: текст */}
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl lg:text-[64px]">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-3)] sm:text-xl">
              {t("lead")}
            </p>

            <div className="mt-8">
              <a href="#cta" className="btn-primary inline-flex h-12 items-center px-8 text-sm">
                {t("cta")}
              </a>
              <p className="mt-3 text-xs text-[var(--text-3)]">{t("slogan")}</p>
            </div>
          </div>

          {/* Справа: живое демо приложения */}
          <div>
            <PhoneShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
