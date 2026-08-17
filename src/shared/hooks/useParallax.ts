"use client";

import { useEffect, useRef } from "react";

function motionOK() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Скролл-параллакс: элемент смещается относительно центра вьюпорта.
   Позиция считается по offsetTop (не учитывает transform) — без feedback-loop. */
export function useScrollParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.08) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK()) return;

    let raf = 0;
    let baseTop = 0;
    let height = 0;

    const measure = () => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      baseTop = top;
      height = el.offsetHeight;
    };

    const update = () => {
      raf = 0;
      const mid = baseTop + height / 2 - (window.scrollY + window.innerHeight / 2);
      el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0)`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

/* Mouse-параллакс: элемент плавно следует за курсором (lerp).
   Только fine-pointer, отключается при prefers-reduced-motion. */
export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(strength = 20) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * strength;
      ty = (e.clientY / window.innerHeight - 0.5) * strength;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
