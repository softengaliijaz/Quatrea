import { useEffect } from "react";
import Lenis from "lenis";

// Inertia-based smooth scrolling for the whole site (disabled for reduced-motion users).
export default function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
