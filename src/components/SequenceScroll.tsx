"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "motion/react";

const TOTAL_FRAMES = 192;

function getImagePath(index: number): string {
  const num = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${num}.png`;
}

/* ============ MOBILE DETECTION ============ */
function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/* ============ FRAME STEP — skip frames on mobile ============ */
function getFrameStep(): number {
  if (typeof window === "undefined") return 1;
  // Mobile: load every 3rd frame (64 images ≈ 36MB instead of 107MB)
  // Tablet: load every 2nd frame (96 images ≈ 55MB)
  // Desktop: load every frame (192 images)
  if (window.innerWidth < 768) return 3;
  if (window.innerWidth < 1024) return 2;
  return 1;
}

/* ============ DPR CAP — limit resolution on weaker devices ============ */
function getCappedDPR(): number {
  if (typeof window === "undefined") return 1;
  const dpr = window.devicePixelRatio || 1;
  // Mobile: cap at 1x to save GPU memory
  // Tablet: cap at 1.5x
  // Desktop: use native (max 2x)
  if (window.innerWidth < 768) return Math.min(dpr, 1);
  if (window.innerWidth < 1024) return Math.min(dpr, 1.5);
  return Math.min(dpr, 2);
}

interface SequenceScrollProps {
  onProgress?: (progress: number) => void;
  onLoadingProgress?: (percent: number) => void;
  onLoadingComplete?: () => void;
  locationName?: string;
}

export default function SequenceScroll({
  onProgress,
  onLoadingProgress,
  onLoadingComplete,
  locationName,
}: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameMapRef = useRef<number[]>([]); // maps continuous index → actual frame index
  const currentFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameStepRef = useRef(1);
  const dprRef = useRef(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Build framemap and compute effective frame count
  const effectiveFrames = useRef(TOTAL_FRAMES);

  useEffect(() => {
    const step = getFrameStep();
    frameStepRef.current = step;
    dprRef.current = getCappedDPR();

    // Build the frame map: which source frames to load
    const map: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      map.push(i);
    }
    // Always include the last frame for smooth ending
    if (map[map.length - 1] !== TOTAL_FRAMES - 1) {
      map.push(TOTAL_FRAMES - 1);
    }
    frameMapRef.current = map;
    effectiveFrames.current = map.length;
  }, []);

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, effectiveFrames.current - 1]
  );

  // Preload images (only the frames we need)
  useEffect(() => {
    const map = frameMapRef.current;
    if (map.length === 0) return;

    let loadedCount = 0;
    const totalToLoad = map.length;
    const images: HTMLImageElement[] = new Array(totalToLoad);
    imagesRef.current = images; // Assign reference immediately
    let cancelled = false;

    // Fast startup: Hide preloader after EXACTLY 1 frame (the first one) to unlock LCP
    const minFramesToStart = 1;
    let hasCompletedLoadEvent = false;

    const loadImage = (mapIndex: number): Promise<void> => {
      return new Promise((resolve) => {
        const actualFrame = map[mapIndex];
        const img = new Image();
        img.src = getImagePath(actualFrame);
        img.onload = () => {
          if (cancelled) return;
          images[mapIndex] = img;
          loadedCount++;
          
          const percent = (loadedCount / totalToLoad) * 100;
          onLoadingProgress?.(percent);
          
          if (loadedCount >= minFramesToStart && !hasCompletedLoadEvent) {
            hasCompletedLoadEvent = true;
            setIsLoaded(true);
            onLoadingComplete?.();
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          resolve();
        };
      });
    };

    // Load first frame immediately for instant feedback
    loadImage(0).then(() => {
      if (cancelled) return;
      // Then batch-load the rest
      const batchSize = getIsMobile() ? 6 : 12;
      let batchStart = 1;

      const loadBatch = async () => {
        const end = Math.min(batchStart + batchSize, totalToLoad);
        const promises: Promise<void>[] = [];

        for (let i = batchStart; i < end; i++) {
          promises.push(loadImage(i));
        }

        await Promise.all(promises);
        batchStart = end;

        if (batchStart < totalToLoad && !cancelled) {
          // Add a tiny delay between batches to avoid locking the main thread completely
          setTimeout(() => {
            requestAnimationFrame(() => loadBatch());
          }, 50);
        }
      };

      // CRITICAL FOR MOBILE PERFORMANCE/LIGHTHOUSE:
      // Delay the massive 37MB background download by 2.5 seconds
      // so the browser can finish Initial Paint (FCP) and Largest Contentful Paint (LCP)
      // without network throttling fighting for bandwidth.
      setTimeout(() => {
        if (!cancelled) loadBatch();
      }, 2500);
    });

    return () => {
      cancelled = true;
    };
  }, [onLoadingProgress, onLoadingComplete]);

  // Draw frame to canvas
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || !imagesRef.current[index]) return;

      const img = imagesRef.current[index];
      const dpr = dprRef.current;

      // Set canvas size (with capped DPR)
      const targetW = canvas.offsetWidth * dpr;
      const targetH = canvas.offsetHeight * dpr;

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);
      }

      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;

      // Fill background with matching color
      const t = index / Math.max(effectiveFrames.current - 1, 1);
      const gray = Math.round(216 + t * (255 - 216));
      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.fillRect(0, 0, cw, ch);

      // Cover fit — fill entire canvas, center the image
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        drawX = 0;
        drawY = (ch - drawH) / 2;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
        drawX = (cw - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    []
  );

  // Subscribe to scroll — use requestAnimationFrame for smoothness
  const rafRef = useRef<number>(0);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(
      Math.round(latest),
      effectiveFrames.current - 1
    );
    if (index !== currentFrameRef.current && isLoaded) {
      currentFrameRef.current = index;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(index));
    }
  });

  // Draw first frame on load
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  // Handle resize — debounced
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isLoaded) {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              dprRef.current = getCappedDPR();
              const dpr = dprRef.current;
              canvas.width = canvas.offsetWidth * dpr;
              canvas.height = canvas.offsetHeight * dpr;
              ctx.scale(dpr, dpr);
            }
          }
          drawFrame(currentFrameRef.current);
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [isLoaded, drawFrame]);

  // Report scroll progress for text overlays
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    onProgress?.(latest);
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] md:h-[400vh]"
      style={{ background: "#d8d8d8" }}
    >
      <div
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        style={{ background: "#d8d8d8" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: isLoaded ? "block" : "none" }}
        />

        {/* Text Overlays */}
        <HeroTextOverlays scrollProgress={scrollYProgress} locationName={locationName} />
      </div>
    </section>
  );
}

/* ============ HERO TEXT OVERLAYS ============ */

function HeroTextOverlays({
  scrollProgress,
  locationName,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  locationName?: string;
}) {
  // Title at 0%
  const titleOpacity = useTransform(scrollProgress, [0, 0.05, 0.12, 0.18], [1, 1, 0, 0]);
  const titleY = useTransform(scrollProgress, [0, 0.12], [0, -60]);

  // Slogan 1 at 20%
  const slogan1Opacity = useTransform(scrollProgress, [0.15, 0.20, 0.30, 0.35], [0, 1, 1, 0]);
  const slogan1Y = useTransform(scrollProgress, [0.15, 0.20], [40, 0]);

  // Slogan 2 at 40%
  const slogan2Opacity = useTransform(scrollProgress, [0.38, 0.43, 0.53, 0.58], [0, 1, 1, 0]);
  const slogan2Y = useTransform(scrollProgress, [0.38, 0.43], [40, 0]);

  // CTA at 60% (Visible until covered by next section at ~75-80%)
  const ctaOpacity = useTransform(scrollProgress, [0.60, 0.65, 0.85, 0.9], [0, 1, 1, 0]);
  const ctaScale = useTransform(scrollProgress, [0.60, 0.65], [0.9, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Title — centered */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <motion.p
          className="text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase text-gray-500 mb-3 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Jasa Renovasi & Bangun Rumah
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="gold-gradient-text">KAMIBANTU</span>
          <br />
          <span className="text-gray-800">RENOVASI</span>
        </motion.h1>
        <motion.p
          className="text-xs md:text-lg text-gray-500 mt-3 md:mt-8 max-w-md tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          Wujudkan Rumah Impian Anda {locationName ? `di ${locationName}` : ""}
        </motion.p>
        <motion.div
          className="mt-6 md:mt-8 flex items-center gap-3 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        >
          {/* Animated chevrons */}
          <div className="flex flex-col items-center gap-[2px]">
            {[0, 1, 2].map((i) => (
              <motion.svg
                key={i}
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="text-gray-800"
                animate={{
                  y: [0, 3, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            ))}
          </div>
          <span className="text-[11px] md:text-sm tracking-[0.25em] uppercase font-semibold text-gray-700">
            Scroll Down
          </span>
        </motion.div>
      </motion.div>

      {/* Slogan 1 — Left aligned on all screens */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24"
        style={{ opacity: slogan1Opacity, y: slogan1Y }}
      >
        <div className="max-w-xl text-left">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-2 md:mb-4 drop-shadow-md">Visi Kami</p>
          <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-gray-800 drop-shadow-lg">
            Membangun Impian,
            <br />
            <span className="gold-gradient-text drop-shadow-sm">Mewujudkan Kenyataan</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 md:text-gray-500 mt-4 max-w-sm leading-relaxed font-medium md:font-normal drop-shadow-md">
            Setiap proyek dimulai dari sebuah visi. Kami hadir untuk merancang dan membangun ruang
            yang mencerminkan impian Anda.
          </p>
        </div>
      </motion.div>

      {/* Slogan 2 — Right aligned on all screens */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24"
        style={{ opacity: slogan2Opacity, y: slogan2Y }}
      >
        <div className="max-w-xl text-right">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-2 md:mb-4 drop-shadow-md">Komitmen</p>
          <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-gray-800 drop-shadow-lg">
            Renovasi Tanpa Batas,
            <br />
            <span className="gold-gradient-text drop-shadow-sm">Kualitas Tanpa Kompromi</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 md:text-gray-500 mt-4 max-w-sm ml-auto leading-relaxed font-medium md:font-normal drop-shadow-md">
            Dengan material terbaik dan tim ahli berpengalaman, kami menjamin hasil yang melebihi
            ekspektasi Anda.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 pointer-events-auto"
        style={{ opacity: ctaOpacity, scale: ctaScale }}
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-4 md:mb-6">Siap Memulai?</p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-gray-800 mb-6 md:mb-8">
          Konsultasi <span className="gold-gradient-text">Gratis</span>
        </h2>
        <MagneticCTA />
      </motion.div>
    </div>
  );
}

/* ============ INLINE MAGNETIC CTA ============ */

function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className="magnetic-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
    >
      <a
        href="#contact"
        className="magnetic-btn-inner text-dark font-semibold text-sm md:text-base"
      >
        Hubungi Kami
        <span className="ml-2">→</span>
      </a>
    </motion.div>
  );
}
