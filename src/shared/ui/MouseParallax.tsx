"use client";

import type { ReactNode } from "react";
import { useMouseParallax } from "@/shared/hooks/useParallax";

/* Обёртка: содержимое плавно смещается за курсором (эффект глубины).
   Отключается на touch-устройствах и при prefers-reduced-motion. */
export function MouseParallax({
  strength = 20,
  className = "",
  children,
}: {
  strength?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useMouseParallax<HTMLDivElement>(strength);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
