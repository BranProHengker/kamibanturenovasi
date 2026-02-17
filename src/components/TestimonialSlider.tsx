"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  project: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Hasil renovasi rumah kami benar-benar luar biasa. Tim KamiBantuRenovasi sangat profesional dan detail dalam setiap pekerjaan. Rumah lama kami terasa seperti baru.",
    name: "Budi Santoso",
    role: "Pemilik Rumah",
    project: "Renovasi Total — Kemang",
  },
  {
    quote:
      "Proses pembangunan berjalan lancar dan tepat waktu. Komunikasi selalu terjaga dan hasilnya melebihi ekspektasi. Sangat merekomendasikan untuk siapa saja.",
    name: "Sarah Wijaya",
    role: "Arsitek Interior",
    project: "Pembangunan Rumah — BSD City",
  },
  {
    quote:
      "Dari konsultasi hingga serah terima, semuanya fantastis. Material berkualitas tinggi dan pengerjaan sangat rapi. Ini adalah investasi terbaik untuk keluarga kami.",
    name: "Ahmad Rahman",
    role: "Pengusaha",
    project: "Renovasi Dapur & Living — Menteng",
  },
  {
    quote:
      "KamiBantuRenovasi mengubah kantor kami menjadi ruang kerja modern yang inspiratif. Desainnya fresh dan eksekusinya sempurna. Tim yang luar biasa!",
    name: "Diana Putri",
    role: "CEO Startup",
    project: "Renovasi Kantor — SCBD",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <div className="relative w-full h-screen bg-dark overflow-hidden flex items-center justify-center">
      {/* Background number */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="text-[30vw] font-bold text-white tabular-nums">
          {String(current + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-8 md:mb-12">
          Testimoni Klien
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="text-xl md:text-3xl lg:text-4xl font-light tracking-tight text-white/90 leading-snug mb-8 md:mb-12">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-1">
              <span className="text-gold font-medium text-base md:text-lg">{t.name}</span>
              <span className="text-white/40 text-sm">{t.role}</span>
              <span className="text-white/20 text-xs tracking-wider mt-1">{t.project}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === current
                  ? "bg-gold w-8"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-12 left-12 w-16 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
      <div className="absolute bottom-12 right-12 w-16 h-[1px] bg-gradient-to-l from-gold/30 to-transparent" />
    </div>
  );
}
