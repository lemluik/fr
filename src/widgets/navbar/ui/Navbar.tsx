"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui";

const LOCALES = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  };

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const navLinks = [
    { href: "#product", label: t("product") },
    { href: "#card", label: t("card") },
    { href: "#security", label: t("security") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq", label: t("faq") },
  ];

  const wordmark = <Logo />;

  return (
    <>
      <header className="navbar-blur fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-6">
          {wordmark}

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-3)] transition-colors hover:text-[var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            {/* Language switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Language"
                className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-2)] transition-all hover:text-[var(--text)]"
              >
                <span>{currentLocale.label}</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="card-surface absolute right-0 top-full mt-2 w-24 py-1 shadow-xl">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLocale(l.code); setLangOpen(false); }}
                      className={cn(
                        "flex w-full items-center px-3 py-2 text-sm transition-colors hover:bg-[var(--bg)]",
                        l.code === locale ? "font-medium text-[var(--primary)]" : "text-[var(--text-2)]"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA — обязателен на всех брейкпоинтах, высота 44px */}
            <a href="#cta" className="btn-primary inline-flex h-[44px] items-center px-5 text-sm">
              {t("cta")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-[44px] w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--text-2)] lg:hidden"
              aria-label={t("menu")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--bg)]">
          <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-5">
            {wordmark}
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--text-2)]"
              aria-label={t("close")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-[var(--text)] transition-colors hover:bg-white"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2 px-4">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                    l.code === locale
                      ? "border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "border border-[var(--border)] bg-white text-[var(--text-2)]"
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-5 rounded-full px-5 py-3 text-center text-base font-medium"
            >
              {t("cta")}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
