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
      <header className="navbar-blur fixed top-0 left-0 right-0 z-50 border-b border-zinc-100/80 bg-white/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7]">
              <span className="text-sm font-bold text-white">F</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0F172A]">Frameless</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-600 transition-colors hover:text-[#0F172A]"
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
                className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-[#0F172A]"
              >
                <span>{currentLocale.flag}</span>
                <span>{currentLocale.label}</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-28 rounded-xl border border-zinc-100 bg-white py-1 shadow-lg">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { switchLocale(l.code); setLangOpen(false); }}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-zinc-50",
                        l.code === locale ? "text-[#4A6CF7] font-medium" : "text-zinc-600"
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
              className="hidden rounded-full bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-200 sm:inline-flex"
            >
              {t("cta")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 md:hidden"
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
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex h-16 items-center justify-between px-6 border-b border-zinc-100">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7]">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0F172A]">Frameless</span>
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600"
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
                className="rounded-xl px-4 py-3 text-base font-medium text-[#0F172A] transition-colors hover:bg-zinc-50"
              >
                {link.label}
              </a>
            ))}
            <div className="my-4 h-px bg-zinc-100" />
            <div className="flex gap-2 px-4">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    l.code === locale
                      ? "border-[#4A6CF7]/20 bg-[#4A6CF7]/5 text-[#4A6CF7]"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                  )}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-full bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] px-5 py-3 text-center text-base font-medium text-white"
            >
              {t("cta")}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
