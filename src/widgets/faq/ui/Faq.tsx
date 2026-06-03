"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-8 text-sm font-medium text-[var(--text)] sm:text-base">{q}</span>
        <span className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-2)] text-[var(--text-3)] transition-transform",
          isOpen && "rotate-180"
        )}>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 pb-5" : "max-h-0"
      )}>
        <p className="text-sm leading-relaxed text-[var(--text-2)]">{a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-2)]">
          {t("subtitle")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl feature-card rounded-2xl p-6 sm:p-8">
        {FAQ_KEYS.map((key, i) => (
          <AccordionItem
            key={key}
            q={t(`q${key}`)}
            a={t(`a${key}`)}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
}
