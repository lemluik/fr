import { useTranslations } from "next-intl";
import { Logo } from "@/shared/ui";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="dark-block">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Бренд */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo onDark />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">{t("tagline")}</p>
            {/* Соцсети — X, Telegram */}
            <div className="mt-6 flex gap-4">
              <a href="#" aria-label="X (Twitter)" className="text-white/70 transition-colors hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="Telegram" className="text-white/70 transition-colors hover:text-white">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Продукт */}
          <div>
            <h4 className="text-sm font-semibold text-white">{t("product")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li><a href="#pay" className="transition-colors hover:text-white">{t("verbPay")}</a></li>
              <li><a href="#travel" className="transition-colors hover:text-white">{t("verbTravel")}</a></li>
              <li><a href="#send" className="transition-colors hover:text-white">{t("verbSend")}</a></li>
              <li><a href="#save" className="transition-colors hover:text-white">{t("verbSave")}</a></li>
              <li><a href="#card" className="transition-colors hover:text-white">{t("productCard")}</a></li>
              <li><a href="#security" className="transition-colors hover:text-white">{t("productSecurity")}</a></li>
              <li><a href="#pricing" className="transition-colors hover:text-white">{t("productPricing")}</a></li>
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h4 className="text-sm font-semibold text-white">{t("company")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li><a href="#" className="transition-colors hover:text-white">{t("about")}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t("investors")}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t("bankPartner")}</a></li>
            </ul>
          </div>

          {/* Правовое */}
          <div>
            <h4 className="text-sm font-semibold text-white">{t("legal")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li><a href="#" className="transition-colors hover:text-white">{t("terms")}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t("privacy")}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t("risks")}</a></li>
            </ul>
          </div>
        </div>

        {/* Регуляторная строка (формулировки согласовать с юристом до публикации) */}
        <p className="mt-12 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/40">
          {t("regulatory")}
        </p>
      </div>

      {/* Копирайт */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-6">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Frameless. {t("rights")}</p>
          <a
            href={`mailto:${t("email")}`}
            aria-label={t("contact")}
            className="text-xs text-white/40 transition-colors hover:text-white"
          >
            {t("email")}
          </a>
        </div>
      </div>
    </footer>
  );
}
