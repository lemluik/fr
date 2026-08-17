import { useId } from "react";

/* ── Знак Frameless v2: «рамка как след» ──────────────────────────────
   Рамка сведена к минимуму — двум диагональным углам (⌜ и ⌟),
   между которыми свободно висит монета. Рамка подразумевается,
   но не рисуется: «без рамок» буквально.
   Три элемента, монолиния с круглыми концами — читается от 12px.
   Исполнения по бренд-буку: Deep Indigo на светлом, белый на тёмном,
   градиент бренда — только hero/splash/иконка. */

export type LogoTone = "indigo" | "white" | "gradient";

/* Геометрия знака в сетке 32×32 — общая для React и favicon */
export const LOGO_PATHS = {
  topLeft: "M13.5 5H9.5A4.5 4.5 0 0 0 5 9.5V13.5",
  bottomRight: "M18.5 27H22.5A4.5 4.5 0 0 0 27 22.5V18.5",
  coin: { cx: 16, cy: 16, r: 5 },
  strokeWidth: 3.5,
};

export function LogoMark({
  tone = "indigo",
  size = 26,
  className,
}: {
  tone?: LogoTone;
  size?: number;
  className?: string;
}) {
  const uid = useId();
  const gradId = `flg-${uid.replace(/[^a-zA-Z0-9]/g, "")}`;
  const paint = tone === "gradient" ? `url(#${gradId})` : tone === "white" ? "#FFFFFF" : "#1A1F36";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {tone === "gradient" && (
        <defs>
          <linearGradient id={gradId} x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A6CF7" />
            <stop offset="1" stopColor="#6C5CE7" />
          </linearGradient>
        </defs>
      )}
      {/* Верхний левый угол рамки */}
      <path d={LOGO_PATHS.topLeft} stroke={paint} strokeWidth={LOGO_PATHS.strokeWidth} strokeLinecap="round" />
      {/* Нижний правый угол рамки */}
      <path d={LOGO_PATHS.bottomRight} stroke={paint} strokeWidth={LOGO_PATHS.strokeWidth} strokeLinecap="round" />
      {/* Монета — свободна между углами */}
      <circle cx={LOGO_PATHS.coin.cx} cy={LOGO_PATHS.coin.cy} r={LOGO_PATHS.coin.r} fill={paint} />
    </svg>
  );
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="#" className="inline-flex items-center gap-2.5" aria-label="Frameless.money">
      <LogoMark tone={onDark ? "white" : "indigo"} size={26} />
      <span
        className={`text-[19px] font-bold leading-none tracking-[-0.02em] ${onDark ? "text-white" : "text-[#1A1F36]"}`}
      >
        frameless
        <span className={onDark ? "font-medium text-white/45" : "font-medium text-[#6B7280]"}>
          .money
        </span>
      </span>
    </a>
  );
}
