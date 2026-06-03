import { useTranslations } from "next-intl";

function MastercardLogo() {
  return (
    <svg viewBox="0 0 48 32" className="h-8" fill="none">
      <circle cx="16" cy="16" r="12" fill="#EB001B" opacity="0.9"/>
      <circle cx="32" cy="16" r="12" fill="#F79E1B" opacity="0.9"/>
      <path d="M24 6.4a12 12 0 010 19.2 12 12 0 000-19.2z" fill="#FF5F00" opacity="0.9"/>
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 48 16" className="h-5" fill="none">
      <path d="M18.5 15.5h-4L17.5.5h4l-3 15zm-8.3 0L6.1 5.3l-.4 1.8C4.5 9.8 2.3 12.5 0 13.7l3.2 1.8h4.7l2.3-15h-4l-3 15z" fill="#fff"/>
      <path d="M45.5.5h-3.4c-1.1 0-1.9.3-2.4 1.4L33 15.5h4.3l.9-2.3h5.2l.5 2.3H48L45.5.5zm-5.2 9.8l2-5.4 1.1 5.4h-3.1zM32.7.5L28.8 11l-.4-2.2c-.8-2.8-3.3-5.8-6.1-7.3l3.5 13.5h4.3L37 .5h-4.3z" fill="#fff"/>
      <path d="M21.5.5h-6.6l-.1.3c5.1 1.2 8.5 4.3 9.9 7.9L23.3 2c-.3-1-.9-1.4-1.8-1.5z" fill="#F9A51A"/>
    </svg>
  );
}

function ApplePayLogo() {
  return (
    <svg viewBox="0 0 56 22" className="h-5" fill="currentColor">
      <path d="M12.6 5.3c-.4.5-1 .9-1.6.8-.1-.6.2-1.2.5-1.6.5-.5 1.1-.8 1.7-.8.1.6-.2 1.3-.6 1.6zm.5.9c-.8-.5-1.4-.1-2 .5-.3.3-.5.6-.7 1 .7.2 1.4 0 2-.4.6-.5.9-1.1.7-1.1zm6.3 8.8c-.5 1.1-1.1 2.2-2 2.2-.8.1-1.1-.4-2-.4-1 0-1.3.5-2.1.5-.8 0-1.4-1-2-2.1-1.2-2.2-.7-5.4 1-6.3.1 0 .2-.1.3-.1.8 0 1.5.6 2 .6.5 0 1-.5 1.8-.5.9 0 1.3.5 2.1.5.5 0 1-.3 1.5-.9.6-.7.9-1.3.9-1.3s-1.3-.6-1.3-2.2c0-1.3 1.1-2 1.1-2s-.8-1.3-2.2-1.3c-.9 0-1.6.5-2.1.5-.5 0-1.2-.5-2-.5-.9 0-1.7.5-2.2 1.3-.9 1.5-.4 3.8.6 5.1.5.7 1.2 1.4 2 1.4.8 0 1.2-.5 2.1-.5.8 0 1.2.5 2.1.5.8 0 1.4-.7 1.9-1.4-.6-.2-1.1-.7-1.1-.7z"/>
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg viewBox="0 0 56 22" className="h-5" fill="none">
      <path d="M8 11c0-.6.1-1.2.2-1.7L3.3 6.3C2.5 7.8 2 9.5 2 11.3c0 1.7.4 3.4 1.2 4.9l4.9-2.9c-.1-.6-.1-1.2-.1-1.7" fill="#4285F4"/>
      <path d="M16.5 9.3H8.2c.2.6.3 1.2.3 1.8 0 .6-.1 1.2-.3 1.8h8.3c.2-.6.3-1.2.3-1.8 0-.6-.1-1.2-.3-1.8" fill="#E0E0E0"/>
      <path d="M8 11c0-.6.1-1.2.3-1.8L3.4 6.3C2.5 7.8 2 9.5 2 11.3c0 1.7.4 3.4 1.2 4.9L8 13.3c-.2-.6-.3-1.2-.3-1.8" fill="#34A853"/>
      <path d="M22 9v5h-1.2v-6.3h1.1v.9c.4-.6 1-.9 1.7-.9.9 0 1.5.4 1.8 1.2.5-.8 1.2-1.2 2.1-1.2 1.2 0 2 .8 2 2.2v4.1h-1.2v-3.8c0-.9-.4-1.4-1.2-1.4-.7 0-1.3.5-1.5 1.3v3.9h-1.2v-3.8c0-.9-.4-1.4-1.2-1.4-.7 0-1.2.5-1.4 1.3z" fill="#9AA0A6"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  );
}

export function TrustStrip() {
  const t = useTranslations("trust");

  const badges = [
    { label: t("regulated"), desc: t("regulatedDesc"), color: "emerald" },
    { label: t("compliant"), desc: t("compliantDesc"), color: "emerald" },
    { label: t("safeguarded"), desc: t("safeguardedDesc"), color: "blue" },
    { label: t("audited"), desc: t("auditedDesc"), color: "blue" },
  ] as const;

  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-2)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-[var(--text-3)]">
          {t("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          <div className="trust-logo flex h-10 items-center justify-center">
            <VisaLogo />
          </div>
          <div className="trust-logo flex h-10 items-center justify-center">
            <MastercardLogo />
          </div>
          <div className="trust-logo flex h-10 items-center justify-center text-[var(--text-2)]">
            <ApplePayLogo />
          </div>
          <div className="trust-logo flex h-10 items-center justify-center">
            <GooglePayLogo />
          </div>

          <span className="hidden h-8 w-px bg-[var(--border-2)] sm:block" />

          {badges.map((badge, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${
                badge.color === "emerald"
                  ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-400"
                  : "border-blue-500/20 bg-blue-500/8 text-blue-400"
              }`}
            >
              <CheckIcon />
              <div className="leading-tight">
                <p className="text-xs font-medium">{badge.label}</p>
                <p className="text-[10px] opacity-60">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
