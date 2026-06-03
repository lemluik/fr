import { useTranslations } from "next-intl";

function CheckIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function TrustStrip() {
  const t = useTranslations("trust");

  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-2)] py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">

          {/* VISA */}
          <span className="font-black italic tracking-tight text-white/80 text-xl select-none">
            VISA
          </span>

          {/* Mastercard */}
          <span className="flex items-center gap-1 select-none">
            <span className="inline-block h-5 w-5 rounded-full bg-[#EB001B] opacity-85" />
            <span className="inline-block h-5 w-5 -ml-2.5 rounded-full bg-[#F79E1B] opacity-85" />
          </span>

          <span className="h-6 w-px bg-[var(--border-2)]" />

          {/* VARA Regulated */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-1.5 text-emerald-400">
            <CheckIcon />
            <span className="text-xs font-medium">{t("regulated")}</span>
          </span>

          {/* MiCA Ready */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-1.5 text-emerald-400">
            <CheckIcon />
            <span className="text-xs font-medium">{t("compliant")}</span>
          </span>

          {/* Audited */}
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-4 py-1.5 text-blue-400">
            <CheckIcon />
            <span className="text-xs font-medium">{t("audited")}</span>
          </span>

        </div>
      </div>
    </section>
  );
}
