"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";

interface PreloaderProps {
  progress: number;
  isComplete: boolean;
}

export default function Preloader({ progress, isComplete }: PreloaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  const p = isComplete ? 100 : progress;

  // Building stages based on progress
  const stage = useMemo(() => ({
    ground:    p >= 0,    // Always visible
    foundation: p >= 5,   // Concrete foundation
    leftWall:  p >= 12,   // Left wall frame
    rightWall: p >= 20,   // Right wall frame
    backWall:  p >= 28,   // Back wall fill
    frontWall: p >= 35,   // Front wall fill
    roofFrame: p >= 45,   // Roof triangle frame
    roofFill:  p >= 55,   // Roof shingles
    door:      p >= 65,   // Front door
    windows:   p >= 72,   // Windows
    chimney:   p >= 80,   // Chimney
    details:   p >= 88,   // Final details (steps, plants)
    done:      p >= 95,   // Smoke from chimney, finished!
  }), [p]);

  // Worker position moves along with building progress
  const workerX = useMemo(() => {
    if (p < 20) return 55;
    if (p < 40) return 135;
    if (p < 60) return 95;
    if (p < 80) return 65;
    return 145;
  }, [p]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* House Building SVG */}
            <div className="relative w-64 h-48 md:w-80 md:h-56 mb-6">
              <svg
                viewBox="-15 -5 300 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* ===== GROUND ===== */}
                <rect x="10" y="170" width="280" height="30" rx="2" fill="#2A2016" />
                <rect x="10" y="170" width="280" height="4" rx="2" fill="#3D2E1C" />
                {/* Grass tufts */}
                <line x1="30" y1="170" x2="35" y2="164" stroke="#3A5A28" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="33" y1="170" x2="37" y2="163" stroke="#4A6A35" strokeWidth="1" strokeLinecap="round" />
                <line x1="250" y1="170" x2="255" y2="165" stroke="#3A5A28" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="253" y1="170" x2="257" y2="164" stroke="#4A6A35" strokeWidth="1" strokeLinecap="round" />

                {/* ===== FOUNDATION ===== */}
                {stage.foundation && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <rect x="55" y="160" width="150" height="12" rx="1" fill="#6B6B6B" />
                    <rect x="55" y="160" width="150" height="3" rx="1" fill="#888" opacity="0.5" />
                    {/* Foundation lines */}
                    <line x1="80" y1="166" x2="180" y2="166" stroke="#555" strokeWidth="0.5" />
                  </motion.g>
                )}

                {/* ===== LEFT WALL FRAME ===== */}
                {stage.leftWall && (
                  <motion.g
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "80px 160px" }}
                  >
                    {/* Left vertical beam */}
                    <rect x="58" y="95" width="6" height="65" fill="#9B7432" />
                    <rect x="58" y="95" width="2.5" height="65" fill="#B08840" opacity="0.5" />
                  </motion.g>
                )}

                {/* ===== RIGHT WALL FRAME ===== */}
                {stage.rightWall && (
                  <motion.g
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "190px 160px" }}
                  >
                    {/* Right vertical beam */}
                    <rect x="196" y="95" width="6" height="65" fill="#9B7432" />
                    <rect x="196" y="95" width="2.5" height="65" fill="#B08840" opacity="0.5" />
                    {/* Top connecting beam */}
                    <rect x="58" y="93" width="144" height="5" fill="#9B7432" />
                    <rect x="58" y="93" width="144" height="2" fill="#B08840" opacity="0.5" />
                  </motion.g>
                )}

                {/* ===== BACK WALL ===== */}
                {stage.backWall && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <rect x="64" y="98" width="132" height="62" fill="#C4A56C" />
                    <rect x="64" y="98" width="132" height="62" fill="url(#wallPattern)" opacity="0.15" />
                  </motion.g>
                )}

                {/* ===== FRONT WALL DETAILS ===== */}
                {stage.frontWall && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Horizontal support beam mid */}
                    <rect x="58" y="128" width="144" height="4" fill="#8B6520" />
                    {/* Vertical center beam */}
                    <rect x="127" y="93" width="5" height="67" fill="#8B6520" />
                  </motion.g>
                )}

                {/* ===== ROOF FRAME ===== */}
                {stage.roofFrame && (
                  <motion.g
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Left roof slope */}
                    <line x1="45" y1="95" x2="130" y2="50" stroke="#7A5C14" strokeWidth="5" strokeLinecap="round" />
                    {/* Right roof slope */}
                    <line x1="215" y1="95" x2="130" y2="50" stroke="#7A5C14" strokeWidth="5" strokeLinecap="round" />
                  </motion.g>
                )}

                {/* ===== ROOF FILL ===== */}
                {stage.roofFill && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <polygon points="130,48 42,97 218,97" fill="#8B6914" />
                    <polygon points="130,48 42,97 130,97" fill="#9B7A24" opacity="0.6" />
                    {/* Roof ridge highlight */}
                    <line x1="85" y1="75" x2="175" y2="75" stroke="#7A5C14" strokeWidth="0.8" opacity="0.5" />
                    <line x1="70" y1="85" x2="190" y2="85" stroke="#7A5C14" strokeWidth="0.8" opacity="0.4" />
                  </motion.g>
                )}

                {/* ===== DOOR ===== */}
                {stage.door && (
                  <motion.g
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "115px 160px" }}
                  >
                    <rect x="108" y="125" width="22" height="35" rx="2" fill="#5C3D1A" />
                    <rect x="108" y="125" width="22" height="4" rx="1" fill="#6B4A24" opacity="0.6" />
                    {/* Door knob */}
                    <circle cx="125" cy="144" r="2" fill="#D4A04A" />
                    {/* Door panels */}
                    <rect x="111" y="129" width="7" height="12" rx="1" stroke="#4A2E10" strokeWidth="0.5" fill="none" />
                    <rect x="120" y="129" width="7" height="12" rx="1" stroke="#4A2E10" strokeWidth="0.5" fill="none" />
                  </motion.g>
                )}

                {/* ===== WINDOWS ===== */}
                {stage.windows && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Left window */}
                    <rect x="72" y="108" width="22" height="18" rx="1" fill="#4A7090" />
                    <rect x="72" y="108" width="22" height="18" rx="1" stroke="#8B6520" strokeWidth="2" fill="none" />
                    <line x1="83" y1="108" x2="83" y2="126" stroke="#8B6520" strokeWidth="1.5" />
                    <line x1="72" y1="117" x2="94" y2="117" stroke="#8B6520" strokeWidth="1.5" />
                    {/* Window light reflection */}
                    <rect x="74" y="110" width="8" height="6" fill="#6090B0" opacity="0.5" />

                    {/* Right window */}
                    <rect x="155" y="108" width="22" height="18" rx="1" fill="#4A7090" />
                    <rect x="155" y="108" width="22" height="18" rx="1" stroke="#8B6520" strokeWidth="2" fill="none" />
                    <line x1="166" y1="108" x2="166" y2="126" stroke="#8B6520" strokeWidth="1.5" />
                    <line x1="155" y1="117" x2="177" y2="117" stroke="#8B6520" strokeWidth="1.5" />
                    {/* Window light reflection */}
                    <rect x="157" y="110" width="8" height="6" fill="#6090B0" opacity="0.5" />
                  </motion.g>
                )}

                {/* ===== CHIMNEY ===== */}
                {stage.chimney && (
                  <motion.g
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "170px 70px" }}
                  >
                    <rect x="168" y="38" width="14" height="32" fill="#8B5E3C" />
                    <rect x="166" y="35" width="18" height="5" rx="1" fill="#7A5030" />
                    <rect x="168" y="38" width="5" height="32" fill="#9B6E4C" opacity="0.4" />
                  </motion.g>
                )}

                {/* ===== DETAILS (steps, plants, finished) ===== */}
                {stage.details && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Door step */}
                    <rect x="104" y="158" width="30" height="4" rx="1" fill="#777" />
                    <rect x="100" y="162" width="38" height="3" rx="1" fill="#6B6B6B" />

                    {/* Small bush left */}
                    <circle cx="48" cy="166" r="6" fill="#3A5A28" />
                    <circle cx="43" cy="164" r="5" fill="#4A6A35" />
                    <circle cx="53" cy="164" r="4.5" fill="#3D5D2B" />

                    {/* Small bush right */}
                    <circle cx="222" cy="166" r="5" fill="#3A5A28" />
                    <circle cx="227" cy="165" r="4.5" fill="#4A6A35" />

                    {/* Path to door */}
                    <path d="M119 165 L115 170 L123 170 Z" fill="#888" opacity="0.3" />
                  </motion.g>
                )}

                {/* ===== CHIMNEY SMOKE (done!) ===== */}
                {stage.done && (
                  <motion.g>
                    {[0, 1, 2].map((i) => (
                      <motion.circle
                        key={i}
                        cx={175}
                        cy={30}
                        r={3 + i}
                        fill="#888"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0, 0.4, 0.2, 0],
                          y: [0, -10 - i * 8, -20 - i * 12, -30 - i * 15],
                          x: [0, 3 + i * 2, 6 + i * 3, 10 + i * 4],
                          scale: [0.5, 1, 1.5, 2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.g>
                )}

                {/* ===== WORKER ===== */}
                <motion.g
                  animate={{ x: workerX }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Body */}
                  <rect x="-3" y="149" width="6" height="12" rx="1" fill="#E0B85C" />
                  {/* Head */}
                  <circle cx="0" cy="146" r="4" fill="#D4A04A" />
                  {/* Hard hat */}
                  <rect x="-5" y="141" width="10" height="3" rx="1" fill="#E8C84A" />
                  <rect x="-4" y="143" width="8" height="2" rx="0.5" fill="#D4B040" />
                  {/* Legs */}
                  <rect x="-3" y="161" width="3" height="9" rx="1" fill="#556B7A" />
                  <rect x="0" y="161" width="3" height="9" rx="1" fill="#4A5F6E" />
                  {/* Arm animation — hammering motion */}
                  <motion.line
                    x1="3" y1="152"
                    x2="10" y2="148"
                    stroke="#D4A04A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      x2: [10, 8, 10],
                      y2: [148, 155, 148],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.g>

                {/* Pattern definitions */}
                <defs>
                  <pattern id="wallPattern" patternUnits="userSpaceOnUse" width="20" height="10">
                    <rect width="20" height="10" fill="none" />
                    <line x1="0" y1="5" x2="20" y2="5" stroke="#8B6520" strokeWidth="0.5" />
                    <line x1="10" y1="0" x2="10" y2="5" stroke="#8B6520" strokeWidth="0.5" />
                    <line x1="0" y1="5" x2="0" y2="10" stroke="#8B6520" strokeWidth="0.5" />
                    <line x1="20" y1="5" x2="20" y2="10" stroke="#8B6520" strokeWidth="0.5" />
                  </pattern>
                </defs>
              </svg>
            </div>

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
              Sedang Membangun...
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
                style={{ width: `${p}%` }}
              />
            </div>

            <motion.span
              className="text-white/60 text-xs tracking-widest mt-4 tabular-nums"
              key={Math.round(p)}
            >
              {Math.round(p)}%
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
