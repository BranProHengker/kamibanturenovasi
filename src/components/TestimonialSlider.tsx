"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase";
import { LuStar } from "react-icons/lu";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  project: string;
  rating: number;
}

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved testimonials from Supabase
  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: Testimonial[] = data.map((t) => ({
          quote: t.pesan,
          name: t.nama,
          role: t.jenis_proyek || "Klien",
          project: t.lokasi || "",
          rating: t.rating || 5,
        }));
        setTestimonials(mapped);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, testimonials.length]);

  // Empty state — no approved testimonials yet
  if (!loading && testimonials.length === 0) {
    return (
      <div className="relative w-full h-screen bg-dark overflow-hidden flex items-center justify-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-8 md:mb-12">
            Testimoni Klien
          </p>
          <p className="text-2xl md:text-4xl font-light tracking-tight text-white/40 leading-snug">
            Belum ada ulasan.
          </p>
          <p className="text-base text-white/20 mt-4">
            Jadilah yang pertama memberikan ulasan!
          </p>
        </div>
        <div className="absolute top-12 left-12 w-16 h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
        <div className="absolute bottom-12 right-12 w-16 h-[1px] bg-gradient-to-l from-gold/30 to-transparent" />
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-screen bg-dark overflow-hidden flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const t = testimonials[current];

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
        <p className="text-sm tracking-[0.4em] uppercase text-gold mb-8 md:mb-12">
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
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <LuStar
                  key={star}
                  className={`w-4 h-4 ${
                    star <= t.rating ? "fill-gold text-gold" : "text-white/10"
                  }`}
                />
              ))}
            </div>

            <blockquote
              className={`font-light tracking-tight text-white/90 leading-relaxed mb-8 md:mb-12 max-h-[40vh] overflow-y-auto break-words [word-break:break-word] ${
                t.quote.length > 200
                  ? "text-base md:text-lg lg:text-xl"
                  : t.quote.length > 100
                    ? "text-lg md:text-2xl lg:text-3xl"
                    : "text-xl md:text-3xl lg:text-4xl"
              }`}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-1">
              <span className="text-gold font-medium text-base md:text-lg">{t.name}</span>
              <span className="text-white/40 text-base">{t.role}</span>
              {t.project && (
                <span className="text-white/20 text-sm tracking-wider mt-1">{t.project}</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
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
