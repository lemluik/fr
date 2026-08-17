import { useId } from "react";

/* ── Знак Frameless: открытая рамка + монета, выходящая за рамки ──
   Концепт: «без рамок» — деньги не заперты в кадре.
   Исполнения по бренд-буку: Deep Indigo на светлом, белый на тёмном,
   градиент бренда — только hero/splash/иконка. */

export type LogoTone = "indigo" | "white" | "gradient";

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
  const stroke = tone === "gradient" ? `url(#${gradId})` : tone === "white" ? "#FFFFFF" : "#1A1F36";

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
      {/* Открытая рамка: разрыв в правом верхнем углу */}
      <path
        d="M19 5h-8a6 6 0 0 0-6 6v10a6 6 0 0 0 6 6h10a6 6 0 0 0 6-6v-8"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Монета, вышедшая за рамки */}
      <circle cx="25.5" cy="6.5" r="3.25" fill={stroke} />
    </svg>
  );
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="#" className="inline-flex items-center gap-2.5" aria-label="Frameless.money">
      <LogoMark tone={onDark ? "white" : "indigo"} size={26} />
      <span
        className={`text-xl font-bold tracking-tight ${onDark ? "text-white" : "text-[#1A1F36]"}`}
      >
        frameless
        <span className={onDark ? "font-medium text-white/45" : "font-medium text-[#6B7280]"}>
          .money
        </span>
      </span>
    </a>
  );
}
