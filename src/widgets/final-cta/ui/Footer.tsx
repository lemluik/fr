import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7]">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0F172A]">Frameless</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">{t("tagline")}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A]">{t("product")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              <li><a href="#ecosystem" className="transition-colors hover:text-[#4A6CF7]">{t("productCards")}</a></li>
              <li><a href="#ecosystem" className="transition-colors hover:text-[#4A6CF7]">{t("productTravel")}</a></li>
              <li><a href="#ecosystem" className="transition-colors hover:text-[#4A6CF7]">{t("productEsim")}</a></li>
              <li><a href="#security" className="transition-colors hover:text-[#4A6CF7]">{t("productSecurity")}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A]">{t("legal")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="transition-colors hover:text-[#4A6CF7]">{t("privacy")}</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4A6CF7]">{t("terms")}</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4A6CF7]">{t("aml")}</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A]">{t("social")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="transition-colors hover:text-[#4A6CF7]">Telegram</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4A6CF7]">X (Twitter)</a></li>
              <li><a href="#" className="transition-colors hover:text-[#4A6CF7]">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-zinc-400">&copy; {new Date().getFullYear()} Frameless. {t("rights")}</p>
          <p className="text-xs text-zinc-400">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
