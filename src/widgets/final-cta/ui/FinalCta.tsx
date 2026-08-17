"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const PRIORITIES = ["pr1", "pr2", "pr3", "pr4"] as const;

export function FinalCta() {
  const t = useTranslations("finalCta");
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [residence, setResidence] = useState("");
  const [priority, setPriority] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");
  const [position, setPosition] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [shared, setShared] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://frameless.money";

  const handleShare = async () => {
    const data = { title: "Frameless", text: t("shareText"), url: shareUrl };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(`${t("shareText")} ${shareUrl}`);
      }
      setShared(true);
    } catch {
      // пользователь отменил — не ошибка
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("errorInvalid"));
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        email,
        website: honeypot, // honeypot — сервер отклонит, если заполнен
        residence: residence || null,
        priority: priority || null,
        locale,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_w: window.screen.width,
        referrer: document.referrer || null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      };

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPosition(typeof data.position === "number" ? data.position : null);
        setStatus("success");
      } else if (res.status === 409 && data.duplicate) {
        setStatus("duplicate");
      } else {
        setError(t("errorServer"));
        setStatus("idle");
      }
    } catch {
      setError(t("errorServer"));
      setStatus("idle");
    }
  };

  return (
    <section id="cta" className="dark-block relative overflow-hidden py-16 sm:py-24">
      {/* Градиентная подложка ≤ 20% opacity */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(74,108,247,0.20) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[640px] px-6 text-center">
        <h2 className="text-[28px] font-bold leading-tight text-white sm:text-[44px] sm:leading-[1.2]">
          {t("title")}
        </h2>
        <p className="mt-4 text-base text-white/60 sm:text-lg">{t("subtitle")}</p>

        {status === "success" ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--green)]/20">
              <svg className="h-6 w-6 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-white">{t("successTitle")}</p>
            <p className="mt-1 font-mono text-sm text-white/70">
              {position ? t("successPosition", { position }) : t("successNoPosition")}
            </p>
            <button
              type="button"
              onClick={handleShare}
              className="btn-white mt-6 inline-flex h-11 items-center px-6 text-sm"
            >
              {shared ? "✓" : t("share")}
            </button>
          </div>
        ) : status === "duplicate" ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-8">
            <p className="text-base font-semibold text-white">{t("duplicate")}</p>
            <p className="mt-1 text-sm text-white/60">{t("duplicateHint")}</p>
            <button
              type="button"
              onClick={handleShare}
              className="btn-white mt-6 inline-flex h-11 items-center px-6 text-sm"
            >
              {shared ? "✓" : t("share")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 text-left" noValidate>
            {/* Honeypot — скрыто от людей */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="wl-email" className="mb-1.5 block text-sm text-white/70">
                  {t("emailLabel")}
                </label>
                <input
                  id="wl-email"
                  type="email"
                  name="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  disabled={status === "loading"}
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 disabled:opacity-50"
                />
              </div>

              {/* Страна проживания */}
              <div>
                <label htmlFor="wl-country" className="mb-1.5 block text-sm text-white/70">
                  {t("countryLabel")} <span className="text-white/40">({t("countryOptional")})</span>
                </label>
                <select
                  id="wl-country"
                  name="country"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  disabled={status === "loading"}
                  className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-white/[0.07] px-4 text-sm text-white focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 disabled:opacity-50"
                >
                  <option value="" className="text-[#1A1F36]">{t("countryNotSet")}</option>
                  <option value="th" className="text-[#1A1F36]">{t("countryTh")}</option>
                  <option value="ae" className="text-[#1A1F36]">{t("countryAe")}</option>
                  <option value="ge" className="text-[#1A1F36]">{t("countryGe")}</option>
                  <option value="tr" className="text-[#1A1F36]">{t("countryTr")}</option>
                  <option value="vn" className="text-[#1A1F36]">{t("countryVn")}</option>
                  <option value="other" className="text-[#1A1F36]">{t("countryOther")}</option>
                </select>
              </div>

              {/* Приоритет */}
              <div>
                <span className="mb-1.5 block text-sm text-white/70">{t("priorityLabel")}</span>
                <div className="grid grid-cols-2 gap-2">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(priority === p ? "" : p)}
                      aria-pressed={priority === p}
                      disabled={status === "loading"}
                      className={`h-12 rounded-xl border px-2 text-xs font-medium transition-all disabled:opacity-50 ${
                        priority === p
                          ? "border-[var(--primary)] bg-[var(--primary)]/25 text-white"
                          : "border-white/15 bg-white/[0.07] text-white/70 hover:border-white/30"
                      }`}
                    >
                      {t(p)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-[var(--red)]" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary mt-6 flex h-12 w-full items-center justify-center text-sm disabled:opacity-60"
            >
              {status === "loading" ? t("loading") : t("cta")}
            </button>

            {/* Fallback без JS */}
            <noscript>
              <p className="mt-3 text-xs text-white/50">{t("noscript")}</p>
            </noscript>
          </form>
        )}
      </div>
    </section>
  );
}
