import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-[#0F172A] sm:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder={t("hero.placeholder")}
              className="h-12 w-full max-w-sm rounded-full border border-zinc-200 bg-white px-5 text-sm outline-none transition-colors focus:border-[#4A6CF7] focus:ring-2 focus:ring-[#4A6CF7]/20 sm:w-80"
            />
            <button className="h-12 w-full rounded-full bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] px-8 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
              {t("hero.cta")}
            </button>
          </div>
        </div>
      </main>

      {/* Trust Strip */}
      <section className="border-t border-zinc-100 bg-white py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-8 px-6 text-xs font-medium text-zinc-400">
          <span>{t("trust.regulated")}</span>
          <span className="h-4 w-px bg-zinc-200" />
          <span>{t("trust.compliant")}</span>
          <span className="h-4 w-px bg-zinc-200" />
          <span>Visa</span>
          <span className="h-4 w-px bg-zinc-200" />
          <span>Apple Pay</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-xs text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Frameless. {t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
}
