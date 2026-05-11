import { useTranslations } from "next-intl";

export function TrustStrip() {
  const t = useTranslations("trust");

  return (
    <section className="border-y border-zinc-100 bg-white py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
          {t("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <span className="trust-logo text-lg font-bold tracking-tight text-zinc-800">Mastercard</span>
          <span className="trust-logo text-lg font-bold tracking-tight text-zinc-800">Visa</span>
          <span className="trust-logo text-lg font-bold text-zinc-800">Apple Pay</span>
          <span className="trust-logo text-lg font-bold text-zinc-800">Google Pay</span>
          <span className="trust-logo text-lg font-bold tracking-tight text-zinc-800">Stripe</span>

          <span className="hidden h-6 w-px bg-zinc-200 sm:block" />

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            {t("regulated")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            {t("compliant")}
          </span>
        </div>
      </div>
    </section>
  );
}
