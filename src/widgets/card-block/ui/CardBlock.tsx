"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";
import { useScrollParallax } from "@/shared/hooks/useParallax";

/* Лёгкий 3D-tilt за курсором: только desktop, амплитуда ≤ 6°,
   отключается при prefers-reduced-motion */
function TiltCard() {
  const t = useTranslations("card");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`; // ≤ 6° от плоскости
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className="tilt-wrap mx-auto w-full max-w-md" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div ref={cardRef} className="tilt-card fcard rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide">frameless</span>
          <span className="text-xs font-bold tracking-wider opacity-80">VISA</span>
        </div>
        <div className="mt-10">
          <p className="text-xs text-white/50">{t("mockBalance")}</p>
          <p className="mt-1 font-mono text-3xl font-bold tracking-tight">$12,450</p>
        </div>
        <div className="mt-10 flex items-end justify-between">
          <p className="font-mono text-sm tracking-widest text-white/70">•••• •••• •••• 4829</p>
          <div className="flex h-6 items-end gap-1" aria-hidden="true">
            <span className="h-6 w-6 rounded-full bg-white/60" />
            <span className="-ml-3 h-6 w-6 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardBlock() {
  const t = useTranslations("card");
  const ref = useScrollReveal();
  const glowA = useScrollParallax<HTMLDivElement>(0.1);
  const glowB = useScrollParallax<HTMLDivElement>(-0.07);

  const features = [
    { title: t("f1Title"), desc: t("f1Desc") },
    { title: t("f2Title"), desc: t("f2Desc") },
    { title: t("f3Title"), desc: t("f3Desc") },
  ];
  const bullets = [t("b1"), t("b2"), t("b3"), t("b4")];

  return (
    <section id="card" className="dark-block relative overflow-hidden py-16 sm:py-24">
      {/* Градиентная линия на границе со светлой секцией */}
      <div className="gradient-hairline absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Фон: сетка + свечения, едущие со скроллом на разных скоростях */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid-dark mask-fade-b absolute inset-0" />
        <div ref={glowA} className="absolute -top-48 right-[6%] h-[480px] w-[480px] will-change-transform">
          <div
            className="glow-pulse h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(108,92,231,0.22) 0%, transparent 60%)" }}
          />
        </div>
        <div ref={glowB} className="absolute -bottom-40 left-[2%] h-[420px] w-[420px] will-change-transform">
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,108,247,0.18) 0%, transparent 60%)" }}
          />
        </div>
      </div>

      <div ref={ref} className="fade-up relative z-10 mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Текст и сценарий */}
          <div>
            <span className="section-label-dark">{t("label")}</span>
            <h2 className="mt-5 text-[28px] font-bold leading-tight text-white sm:text-[44px] sm:leading-[1.2]">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">{t("lead")}</p>

            {/* Три свойства карты */}
            <ul className="mt-10 space-y-6">
              {features.map((f, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Буллеты */}
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                  <svg className="h-4 w-4 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            <a href="#cta" className="btn-white mt-10 inline-flex h-12 items-center px-8 text-sm">
              {t("cta")}
            </a>
          </div>

          {/* Визуал карты */}
          <TiltCard />
        </div>
      </div>
    </section>
  );
}
