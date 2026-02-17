"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface PreloaderProps {
  progress: number;
  isComplete: boolean;
}

export default function Preloader({ progress, isComplete }: PreloaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <motion.h1
              className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="gold-gradient-text">KAMIBANTU</span>
              <span className="text-white">RENOVASI</span>
            </motion.h1>

            <motion.p
              className="text-sm text-white/40 tracking-[0.3em] uppercase mt-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Memuat Pengalaman
            </motion.p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center mt-12"
          >
            <div className="preloader-progress-track">
              <div
                className="preloader-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            <motion.span
              className="text-white/60 text-xs tracking-widest mt-4 tabular-nums"
              key={Math.round(progress)}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>

          {/* Decorative corners */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-white/10" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-white/10" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
