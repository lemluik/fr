"use client";

import { useMouseParallax } from "@/shared/hooks/useParallax";

/* Живой фон hero: мелкая сетка + два орба бренда.
   Орбы медленно дрейфуют (CSS) и смещаются за курсором (mouse-параллакс,
   разные знаки — эффект глубины). Opacity ≤ 20% по бренд-буку;
   на touch и при prefers-reduced-motion параллакс отключается в хуке. */
export function HeroBackdrop() {
  const orbA = useMouseParallax<HTMLDivElement>(26);
  const orbB = useMouseParallax<HTMLDivElement>(-16);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Сетка с радиальным затуханием к краям */}
      <div className="bg-grid-light mask-fade-hero absolute inset-0" />

      {/* Орб A — primary, справа сверху */}
      <div ref={orbA} className="absolute -top-28 right-[2%] h-[440px] w-[440px] will-change-transform">
        <div
          className="orb-drift h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(74,108,247,0.16) 0%, transparent 62%)" }}
        />
      </div>

      {/* Орб B — фиолетовый, слева снизу */}
      <div ref={orbB} className="absolute -bottom-36 left-[-2%] h-[400px] w-[400px] will-change-transform">
        <div
          className="orb-drift-slow h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(108,92,231,0.13) 0%, transparent 62%)" }}
        />
      </div>
    </div>
  );
}
