"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuMessageCircle, LuX } from "react-icons/lu";
import { FaWhatsapp, FaInstagram, FaLink } from "react-icons/fa6";

const CONTACT_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/6288989505936?text=Permisi%20Kak%2C%20saya%20ingin%20berkonsultasi%20tentang%20jasa%20renovasi%2Fpembangunan%20rumah.%20Boleh%20minta%20info%20lebih%20lanjut%3F%20%F0%9F%99%8F",
    icon: FaWhatsapp,
    color: "bg-[#25D366]",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/kamibanturenovasi",
    icon: FaInstagram,
    color: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/kamibanturenovasi",
    icon: FaLink,
    color: "bg-[#43E660]",
  },
];

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const ctaSection = document.getElementById("contact");
      if (!ctaSection) return;

      const rect = ctaSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show when CTA section is in view (top of section hits bottom of viewport)
      setIsVisible(rect.top <= windowHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Expanded menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="flex flex-col gap-3 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {CONTACT_LINKS.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group outline-none"
                      aria-label={`Buka ${link.label}`}
                      initial={{ opacity: 0, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.8 }}
                      transition={{
                        duration: 0.3,
                        delay: (CONTACT_LINKS.length - 1 - i) * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {/* Label tooltip */}
                      <span className="px-3 py-1.5 bg-dark/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                        {link.label}
                      </span>

                      {/* Icon button */}
                      <div
                        className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LuX className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaWhatsapp className="w-7 h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
