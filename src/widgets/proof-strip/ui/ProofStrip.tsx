"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function AnimatedNumber({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 800); // 800ms по ТЗ
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}

type StatProps = { value: string; suffix: string; label: string };

function Stat({ value, suffix, label }: StatProps) {
  const num = /^\d+$/.test(value) ? Number(value) : null;

  return (
    <div className="text-center lg:text-left">
      <p className="font-mono text-4xl font-bold text-[var(--text)]">
        {num !== null ? <AnimatedNumber target={num} /> : value}
        {suffix}
      </p>
      <p className="mt-2 text-sm leading-snug text-[var(--text-3)]">{label}</p>
    </div>
  );
}

export function ProofStrip() {
  const t = useTranslations("proof");

  const stats: StatProps[] = [
    { value: t("s1Value"), suffix: t("s1Suffix"), label: t("s1Label") },
    { value: t("s3Value"), suffix: t("s3Suffix"), label: t("s3Label") },
    { value: t("s4Value"), suffix: t("s4Suffix"), label: t("s4Label") },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
          {stats.map((s, i) => (
            <Stat key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
