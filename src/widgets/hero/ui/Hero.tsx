import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="hero-bg relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4A6CF7]/20 bg-[#4A6CF7]/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#4A6CF7] animate-pulse" />
              <span className="text-xs font-medium text-[#4A6CF7]">{t("badge")}</span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
              {t("titleLine1")}
              <br />
              <span className="gradient-text">{t("titleLine2")}</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" className="w-full sm:w-auto">
                {t("cta")}
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto">
                {t("ctaSecondary")} ▶
              </Button>
            </div>

            {/* App Store badges */}
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 opacity-60">
                <svg className="h-5 w-5 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.4c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="leading-tight">
                  <p className="text-[9px] text-zinc-500">{t("appBadge")}</p>
                  <p className="text-xs font-semibold text-zinc-800">App Store</p>
                </div>
              </div>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 opacity-60">
                <svg className="h-5 w-5 text-zinc-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.542 1.469c.577.334.577 1.148 0 1.482l-2.543 1.47-2.565-2.565 2.566-2.566zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="leading-tight">
                  <p className="text-[9px] text-zinc-500">{t("appBadge")}</p>
                  <p className="text-xs font-semibold text-zinc-800">Google Play</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-[#0F172A] font-mono">200+</p>
                <p className="text-xs text-zinc-500">{t("stat1")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] font-mono">0%</p>
                <p className="text-xs text-zinc-500">{t("stat2")}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F172A] font-mono">24/7</p>
                <p className="text-xs text-zinc-500">{t("stat3")}</p>
              </div>
            </div>
          </div>

          {/* Right: Virtual Card Mockup */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-80">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4A6CF7]/20 to-[#6C5CE7]/20 blur-3xl" />

              {/* Main card */}
              <div className="card-shine relative rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium opacity-80">Frameless</span>
                  <span className="text-xs opacity-60">VIRTUAL</span>
                </div>
                <div className="mt-8">
                  <p className="text-xs opacity-60">Balance</p>
                  <p className="mt-1 text-3xl font-bold font-mono tracking-tight">$12,450</p>
                  <p className="text-xs opacity-60">USDC</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm tracking-widest">•••• •••• •••• 4829</p>
                  </div>
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-white/20">
                    <span className="text-xs font-bold">VISA</span>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -right-4 top-8 rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#0F172A]">Payment received</p>
                    <p className="text-xs text-zinc-400">+2,500 USDC</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -left-4 bottom-12 rounded-xl border border-zinc-100 bg-white p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                    <span className="text-sm">🌍</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#0F172A]">eSIM Activated</p>
                    <p className="text-xs text-zinc-400">Thailand 🇹🇭</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
