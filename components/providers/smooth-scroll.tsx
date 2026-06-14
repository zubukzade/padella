"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth-scroll provider. Respects prefers-reduced-motion and
 * exposes the instance on window for GSAP / anchor links.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    // expose for other modules (anchor scrolling)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

/** Smoothly scroll to an anchor (#id) using Lenis when available. */
export function scrollToId(id: string) {
  const target = document.getElementById(id.replace("#", ""));
  if (!target) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.2 });
  else target.scrollIntoView({ behavior: "smooth" });
}
