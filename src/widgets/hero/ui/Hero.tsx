import { useTranslations } from "next-intl";
import { Button, Input } from "@/shared/ui";

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
              <Input placeholder={t("placeholder")} className="sm:w-72" />
              <Button variant="primary" className="w-full sm:w-auto">
                {t("cta")}
              </Button>
            </div>

            <p className="mt-3 text-xs text-zinc-400">{t("privacy")}</p>

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
