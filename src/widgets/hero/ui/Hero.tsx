import { useTranslations } from "next-intl";
import { LogoMark, MouseParallax } from "@/shared/ui";
import { HeroBackdrop } from "./HeroBackdrop";
import { PhoneShowcase } from "./PhoneShowcase";

/* Бегущая строка: проприетарные названия не переводятся (как «VISA» в мокапе) */
const MARQUEE_WORDS = [
  "Visa", "USDT", "USDC", "Apple Pay", "Google Pay", "eSIM", "Grab", "Hotels", "Flights", "Gift Cards",
];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Живой фон: сетка + орбы с mouse-параллаксом */}
      <HeroBackdrop />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-16 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Слева: текст */}
          <div>
            <div className="section-label mb-6">
              <LogoMark tone="gradient" size={14} />
              {t("slogan")}
            </div>

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
            </div>
          </div>

          {/* Справа: живое демо приложения (едет за курсором в противофазе с орбами) */}
          <MouseParallax strength={-12}>
            <PhoneShowcase />
          </MouseParallax>
        </div>
      </div>

      {/* Бегущая строка: что принимает карта */}
      <div className="mask-fade-x relative z-10 border-y border-[var(--border)] bg-white/60 py-3" aria-hidden="true">
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {MARQUEE_WORDS.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="flex items-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-3)]/80"
                >
                  <span className="px-6">{word}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--primary)]/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
