import { useTranslations } from "next-intl";
import { Badge } from "@/shared/ui";

export function TrustStrip() {
  const t = useTranslations("trust");

  const partners = ["Mastercard", "Visa", "Apple Pay", "Google Pay", "Stripe"];

  return (
    <section className="border-y border-zinc-100 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-6">
        <Badge>{t("regulated")}</Badge>
        <Badge>{t("compliant")}</Badge>
        <span className="hidden h-4 w-px bg-zinc-200 sm:block" aria-hidden="true" />
        {partners.map((partner) => (
          <span
            key={partner}
            className="text-xs font-medium tracking-wide text-zinc-400"
          >
            {partner}
          </span>
        ))}
      </div>
    </section>
  );
}
