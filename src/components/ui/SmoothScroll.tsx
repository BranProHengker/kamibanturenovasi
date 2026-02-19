"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.06,                // Lower = smoother (more buttery), was 0.08
      smoothWheel: true,
      wheelMultiplier: 0.7,      // Slightly slower wheel for more premium feel
      touchMultiplier: 1.5,      // Better touch response on mobile
      infinite: false,
      autoResize: true,          // Auto-handle resize events
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
