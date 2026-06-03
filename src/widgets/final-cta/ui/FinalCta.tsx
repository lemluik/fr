"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button, Input } from "@/shared/ui";

export function FinalCta() {
  const t = useTranslations("finalCta");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("errorInvalid"));
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else if (res.status === 409 && data.duplicate) {
        setError(t("errorDuplicate"));
      } else {
        setError(data.error ?? t("errorInvalid"));
      }
    } catch {
      setError(t("errorInvalid"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden py-24">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/8 via-transparent to-[var(--primary-end)]/6 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[var(--border-2)] to-transparent" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)] shadow-lg shadow-[var(--primary)]/30">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-[var(--text-2)]">
          {t("subtitle")}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/8 px-4 py-1.5 text-sm font-medium text-amber-400">
          <span className="pulse-dot h-2 w-2 rounded-full bg-amber-400" />
          {t("urgency")}
        </p>

        {submitted ? (
          <div className="mt-8 glass-2 rounded-2xl px-8 py-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15">
              <svg className="h-6 w-6 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[var(--text)]">{t("successTitle")}</p>
            <p className="mt-1 text-sm text-[var(--text-2)]">{t("successDesc")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Input
              placeholder={t("placeholder")}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="sm:w-72"
              disabled={loading}
            />
            <Button variant="primary" type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "..." : t("cta")}
            </Button>
          </form>
        )}
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    </section>
  );
}
