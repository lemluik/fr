"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/shared/lib/cn";

const LOCALES = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
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
    { href: "#ecosystem", label: t("features") },
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#security", label: t("security") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <>
      <header className="navbar-blur fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)]">
              <span className="text-sm font-bold text-white">F</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--text)]">Frameless</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
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
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[var(--text-2)] transition-all hover:text-[var(--text)]"
              >
                <span>{currentLocale.flag}</span>
                <span>{currentLocale.label}</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="glass-2 absolute right-0 top-full mt-2 w-28 rounded-xl py-1 shadow-xl">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLocale(l.code); setLangOpen(false); }}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-white/5",
                        l.code === locale ? "text-[var(--primary)] font-medium" : "text-[var(--text-2)]"
                      )}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop CTA */}
            <a
              href="#cta"
              className="btn-primary hidden h-9 items-center rounded-full px-5 text-sm sm:inline-flex"
            >
              {t("cta")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="glass flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-2)] md:hidden"
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
          <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--border)]">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)]">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--text)]">Frameless</span>
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="glass flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-2)]"
              aria-label={t("close")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-[var(--text)] transition-colors hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="my-4 divider" />
            <div className="flex gap-2 px-4">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                    l.code === locale
                      ? "bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)]"
                      : "glass text-[var(--text-2)]"
                  )}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-4 rounded-full px-5 py-3 text-center text-base font-medium"
            >
              {t("cta")}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
