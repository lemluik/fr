import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-zinc-100 bg-white py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <span className="text-lg font-bold text-[#0F172A]">Frameless</span>
          <p className="mt-2 text-sm text-zinc-500">{t("tagline")}</p>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold text-[#0F172A]">{t("legal")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-[#4A6CF7]">{t("privacy")}</a></li>
            <li><a href="#" className="hover:text-[#4A6CF7]">{t("terms")}</a></li>
            <li><a href="#" className="hover:text-[#4A6CF7]">{t("aml")}</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold text-[#0F172A]">{t("social")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-[#4A6CF7]">Telegram</a></li>
            <li><a href="#" className="hover:text-[#4A6CF7]">X (Twitter)</a></li>
            <li><a href="#" className="hover:text-[#4A6CF7]">Discord</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-zinc-100 px-6 pt-6">
        <p className="text-center text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} Frameless. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
