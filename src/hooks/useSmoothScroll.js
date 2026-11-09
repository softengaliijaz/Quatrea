import { useEffect } from 'react';
import Lenis from 'lenis';

// Inertia smooth scrolling for the whole site (skipped for reduced-motion users).
export default function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    window.__lenis = lenis;
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis; };
  }, []);
}

export const scrollToTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0));
export const scrollToEl = (el) => (window.__lenis ? window.__lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' }));
