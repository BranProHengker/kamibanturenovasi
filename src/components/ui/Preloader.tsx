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
          {/* Hammer & Nail Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Camera zoom in/out container */}
            <motion.div
              className="relative w-44 h-44 md:w-56 md:h-56 mb-6"
              animate={{
                scale: [1, 1.15, 1.15, 1, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.45, 0.7, 1],
              }}
            >
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* ===== WOOD PLANK ===== */}
                <rect x="25" y="148" width="150" height="28" rx="4" fill="#7A5C14" />
                <rect x="25" y="148" width="150" height="8" rx="3" fill="#8B6914" opacity="0.7" />
                {/* Wood grain */}
                <line x1="40" y1="158" x2="75" y2="158" stroke="#6B5210" strokeWidth="0.8" opacity="0.35" />
                <line x1="90" y1="161" x2="145" y2="161" stroke="#6B5210" strokeWidth="0.8" opacity="0.35" />
                <line x1="55" y1="168" x2="130" y2="168" stroke="#6B5210" strokeWidth="0.8" opacity="0.25" />

                {/* ===== NAIL — sinks down on each hit ===== */}
                <motion.g
                  animate={{
                    y: [0, 0, 5, 5, 5, 10, 10, 10, 15, 15],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.18, 0.22, 0.4, 0.58, 0.62, 0.8, 0.88, 0.92, 1],
                  }}
                >
                  {/* Nail head */}
                  <rect x="94" y="120" width="12" height="3.5" rx="1.5" fill="#D0D0D0" />
                  <rect x="94" y="120" width="12" height="1.5" rx="1" fill="#E8E8E8" />
                  {/* Nail body */}
                  <rect x="98" y="123.5" width="4" height="26" fill="#B0B0B0" />
                  <rect x="98" y="123.5" width="1.8" height="26" fill="#CCCCCC" opacity="0.6" />
                  {/* Nail tip */}
                  <polygon points="98,149.5 102,149.5 100,155" fill="#999999" />
                </motion.g>

                {/* ===== HAMMER — swings to hit nail head ===== */}
                <motion.g
                  style={{ transformOrigin: "140px 60px" }}
                  animate={{
                    rotate: [
                      -50,   // raised up
                      -50,   // hold
                      8,     // STRIKE down
                      -5,    // small bounce
                      -50,   // raise back up
                      -50,   // hold
                      8,     // STRIKE down
                      -5,    // small bounce
                      -50,   // raise back up
                      -50,   // hold
                      8,     // STRIKE down
                      -5,    // small bounce
                      -50,   // raise back up
                    ],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                    times: [0, 0.15, 0.2, 0.24, 0.36, 0.55, 0.6, 0.64, 0.76, 0.85, 0.9, 0.94, 1],
                  }}
                >
                  {/* Handle — long wooden stick */}
                  <rect x="97" y="40" width="7" height="80" rx="3" fill="#C8923A" />
                  <rect x="97" y="40" width="3.5" height="80" rx="2" fill="#D9A64E" opacity="0.5" />

                  {/* Hammer head — positioned at the TOP of handle, hitting face faces DOWN */}
                  <rect x="82" y="30" width="36" height="16" rx="3" fill="#555E68" />
                  {/* Top highlight */}
                  <rect x="82" y="30" width="36" height="6" rx="3" fill="#6B7580" opacity="0.6" />
                  {/* Hitting face — bottom-left surface */}
                  <rect x="82" y="38" width="10" height="8" rx="1" fill="#444C54" />
                  {/* Claw side — right */}
                  <path d="M114 46 L120 52 L118 52 L112 46 Z" fill="#4A525A" />
                  <path d="M116 46 L122 54 L120 54 L114 46 Z" fill="#4A525A" />
                </motion.g>

                {/* ===== IMPACT EFFECTS ===== */}
                {/* Sparks on hit */}
                <motion.g
                  animate={{
                    opacity: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                    scale: [0.3, 0.3, 1.2, 0.3, 0.3, 0.3, 1.2, 0.3, 0.3, 0.3, 1.2, 0.3, 0.3],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.18, 0.22, 0.3, 0.36, 0.58, 0.62, 0.7, 0.76, 0.88, 0.92, 0.98, 1],
                  }}
                  style={{ transformOrigin: "100px 120px" }}
                >
                  {/* Spark lines */}
                  <line x1="85" y1="115" x2="78" y2="110" stroke="#E0B85C" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="115" y1="115" x2="122" y2="110" stroke="#E0B85C" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="82" y1="122" x2="74" y2="124" stroke="#D4A04A" strokeWidth="1" strokeLinecap="round" />
                  <line x1="118" y1="122" x2="126" y2="124" stroke="#D4A04A" strokeWidth="1" strokeLinecap="round" />
                  {/* Spark dots */}
                  <circle cx="75" cy="108" r="2" fill="#E0B85C" />
                  <circle cx="125" cy="108" r="1.5" fill="#E0B85C" />
                  <circle cx="72" cy="120" r="1.2" fill="#D4A04A" opacity="0.7" />
                  <circle cx="128" cy="118" r="1" fill="#D4A04A" opacity="0.7" />
                </motion.g>

                {/* Screen shake / impact ring */}
                <motion.circle
                  cx="100"
                  cy="122"
                  r="15"
                  stroke="#E0B85C"
                  strokeWidth="1"
                  fill="none"
                  animate={{
                    opacity: [0, 0, 0.4, 0, 0, 0, 0.4, 0, 0, 0, 0.4, 0, 0],
                    r: [5, 5, 25, 5, 5, 5, 25, 5, 5, 5, 25, 5, 5],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    times: [0, 0.18, 0.28, 0.36, 0.36, 0.58, 0.68, 0.76, 0.76, 0.88, 0.98, 1, 1],
                  }}
                />
              </svg>
            </motion.div>

            {/* Logo */}
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
              Mohon Tunggu
            </motion.p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center mt-10"
          >
            <div className="preloader-progress-track">
              <div
                className="preloader-progress-bar"
                style={{ width: `${isComplete ? 100 : progress}%` }}
              />
            </div>

            <motion.span
              className="text-white/60 text-xs tracking-widest mt-4 tabular-nums"
              key={isComplete ? 100 : Math.round(progress)}
            >
              {isComplete ? 100 : Math.round(progress)}%
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
