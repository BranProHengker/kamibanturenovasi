"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Beranda", href: "#" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
  { label: "Facebook", href: "#" },
];

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 flex items-center justify-between mix-blend-difference">
        <motion.a
          href="#"
          className="text-white text-xl font-bold tracking-tighter z-[101]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <span className="gold-gradient-text">KAMIBANTU</span>RENOVASI
        </motion.a>

        <motion.button
          onClick={toggle}
          className="z-[101] w-10 h-10 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-[1.5px] bg-white origin-center"
            animate={isOpen ? { rotate: 45, y: 3.75 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="block w-6 h-[1.5px] bg-white origin-center"
            animate={isOpen ? { rotate: -45, y: -3.75 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.button>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-[#0a0a0a] flex flex-col justify-between px-6 md:px-16 py-24 md:py-32"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center gap-2 md:gap-4">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative overflow-hidden block"
                >
                  <div className="overflow-hidden">
                    <motion.div
                      className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white/90 group-hover:text-gold transition-colors duration-500 flex"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <span className="text-sm md:text-base font-light text-white/30 mr-4 md:mr-8 self-center tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                      <span className="ml-auto text-gold/0 group-hover:text-gold/60 transition-all duration-500 text-2xl md:text-4xl self-center">
                        ↗
                      </span>
                    </motion.div>
                  </div>
                  <motion.div
                    className="h-[1px] bg-white/10 w-full mt-2 md:mt-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </a>
              ))}
            </nav>

            {/* Bottom Row */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-3">Ikuti Kami</p>
                <div className="flex gap-6">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="footer-link text-sm"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-3">Hubungi Kami</p>
                <a href="mailto:hello@kamibanturenovasi.com" className="footer-link text-sm">
                  hello@kamibanturenovasi.com
                </a>
                <br />
                <a href="tel:+6281234567890" className="footer-link text-sm">
                  +62 812-3456-7890
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
