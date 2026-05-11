import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="navbar-blur fixed top-0 left-0 right-0 z-50 border-b border-zinc-100/80 bg-white/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7]">
            <span className="text-sm font-bold text-white">F</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0F172A]">Frameless</span>
        </a>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#ecosystem" className="text-sm text-zinc-600 transition-colors hover:text-[#0F172A]">
            {t("features")}
          </a>
          <a href="#security" className="text-sm text-zinc-600 transition-colors hover:text-[#0F172A]">
            {t("security")}
          </a>
          <a href="#personas" className="text-sm text-zinc-600 transition-colors hover:text-[#0F172A]">
            {t("about")}
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#cta"
          className="hidden rounded-full bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-200 sm:inline-flex"
        >
          {t("cta")}
        </a>
      </div>
    </header>
  );
}
