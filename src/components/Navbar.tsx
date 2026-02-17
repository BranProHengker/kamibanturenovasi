"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

const MOBILE_LINKS = [
  { label: "Beranda", href: "#" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

/* ============ EASE CURVES ============ */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT_QUART: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  // Track scroll position for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ============ TOP BAR ============ */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.7)"
            : "transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT_EXPO }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-16 py-4 md:py-5">
          {/* Left: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-[13px] font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300 uppercase"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-400 ease-out" />
              </a>
            ))}
          </nav>

          {/* Mobile: Brand Logo (left side) */}
          <a href="#" className="md:hidden text-white font-bold text-lg tracking-tight">
            <span className="gold-gradient-text">KAMIBANTU</span>
            <span className="text-white/90">RENOVASI</span>
          </a>

          {/* Right: Contact Info (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* Desktop contact */}
            <a
              href="tel:+6288989505936"
              className="hidden md:block text-[13px] font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300"
            >
              +62 88-989-505-936
            </a>
            <a
              href="https://instagram.com/kamibanturenovasi"
              target="_blank"
              rel="noopener"
              className="hidden lg:block text-[13px] font-medium tracking-wide text-white/70 hover:text-white transition-colors duration-300"
            >
              @kamibanturenovasi
            </a>

            {/* Hamburger — all screens */}
            <button
              onClick={toggle}
              className="relative z-[60] w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-white/50 transition-colors duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="w-[18px] h-[14px] flex flex-col justify-between">
                <motion.span
                  className="block w-full h-[1.5px] bg-white origin-center"
                  animate={
                    isOpen
                      ? { rotate: 45, y: 6.25, width: "100%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.4, ease: EASE_IN_OUT_QUART }}
                />
                <motion.span
                  className="block h-[1.5px] bg-white origin-center"
                  animate={
                    isOpen
                      ? { opacity: 0, width: 0 }
                      : { opacity: 1, width: "70%" }
                  }
                  transition={{ duration: 0.3, ease: EASE_IN_OUT_QUART }}
                />
                <motion.span
                  className="block w-full h-[1.5px] bg-white origin-center"
                  animate={
                    isOpen
                      ? { rotate: -45, y: -6.25, width: "100%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.4, ease: EASE_IN_OUT_QUART }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Subtle bottom border when scrolled */}
        <motion.div
          className="h-px w-full"
          style={{
            background: scrolled
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
              : "transparent",
          }}
        />
      </motion.header>

      {/* ============ FULLSCREEN MENU OVERLAY ============ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed inset-0 z-[45] bg-black/80 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_IN_OUT_QUART }}
            >
              {/* Main content area */}
              <div className="flex-1 flex flex-col md:flex-row items-stretch pt-24 md:pt-32 px-6 md:px-16 lg:px-24">
                {/* Left column: Navigation */}
                <nav className="flex-1 flex flex-col justify-center gap-1 md:gap-2">
                  {MOBILE_LINKS.map((link, i) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group block"
                    >
                      <div className="overflow-hidden">
                        <motion.div
                          className="flex items-baseline gap-4 md:gap-6 py-2 md:py-3"
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={{ y: "100%", opacity: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.1 + i * 0.05,
                            ease: EASE_OUT_EXPO,
                          }}
                        >
                          <span className="text-[11px] md:text-xs font-light text-white/25 tracking-widest tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white/90 group-hover:text-gold transition-colors duration-400">
                            {link.label}
                          </span>
                          <motion.span
                            className="text-gold/0 group-hover:text-gold text-lg md:text-2xl transition-all duration-400 ml-2"
                            initial={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                          >
                            →
                          </motion.span>
                        </motion.div>
                      </div>
                      <motion.div
                        className="h-px bg-white/8"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.2 + i * 0.05,
                          ease: EASE_OUT_EXPO,
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </a>
                  ))}
                </nav>

                {/* Right column: Info (desktop only) */}
                <motion.div
                  className="hidden md:flex flex-col justify-end pb-8 pl-16 lg:pl-24 w-80 lg:w-96"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_EXPO }}
                >
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
                        Hubungi Kami
                      </p>
                      <a
                        href="tel:+6281234567890"
                        className="block text-sm text-white/60 hover:text-white transition-colors duration-300 mb-1"
                      >
                        088-989-505-936
                      </a>
                      <a
                        href="mailto:hello@kamibanturenovasi.com"
                        className="block text-sm text-white/60 hover:text-white transition-colors duration-300"
                      >
                        hello@kamibanturenovasi.com
                      </a>
                    </div>

                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
                        Ikuti Kami
                      </p>
                      <div className="flex gap-5">
                        {[
                          { label: "Instagram", href: "https://instagram.com/kamibanturenovasi" },
                          { label: "TikTok", href: "https://tiktok.com/@kamibanturenovasi" },
                          { label: "WhatsApp", href: "https://wa.me/6288989505936" },
                        ].map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener"
                            className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-3">
                        Lokasi
                      </p>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Jawa Timur & Bali, Indonesia
                      </p>
                      <p className="text-xs text-white/30 mt-1">
                        PT. DENZEN ARKATAMA Group
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom bar (mobile) */}
              <motion.div
                className="md:hidden px-6 py-6 border-t border-white/8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <a
                      href="tel:+6281234567890"
                      className="text-xs text-white/50 hover:text-white transition-colors"
                    >
                      +62 812-3456-7890
                    </a>
                  </div>
                  <div className="flex gap-4">
                    {["IG", "WA", "FB"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
