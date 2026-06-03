import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-2)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)]">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--text)]">Frameless</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-3)]">{t("tagline")}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text)]">{t("product")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-3)]">
              <li><a href="#ecosystem" className="transition-colors hover:text-[var(--primary)]">{t("productCards")}</a></li>
              <li><a href="#ecosystem" className="transition-colors hover:text-[var(--primary)]">{t("productTravel")}</a></li>
              <li><a href="#ecosystem" className="transition-colors hover:text-[var(--primary)]">{t("productEsim")}</a></li>
              <li><a href="#security" className="transition-colors hover:text-[var(--primary)]">{t("productSecurity")}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text)]">{t("legal")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-3)]">
              <li><a href="#" className="transition-colors hover:text-[var(--primary)]">{t("privacy")}</a></li>
              <li><a href="#" className="transition-colors hover:text-[var(--primary)]">{t("terms")}</a></li>
              <li><a href="#" className="transition-colors hover:text-[var(--primary)]">{t("aml")}</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text)]">{t("social")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-3)]">
              <li><a href="#" className="transition-colors hover:text-[var(--primary)]">Telegram</a></li>
              <li><a href="#" className="transition-colors hover:text-[var(--primary)]">X (Twitter)</a></li>
              <li><a href="#" className="transition-colors hover:text-[var(--primary)]">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-[var(--text-3)]">&copy; {new Date().getFullYear()} Frameless. {t("rights")}</p>
          <p className="text-xs text-[var(--text-3)]">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
