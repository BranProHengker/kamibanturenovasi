"use client";

import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-16 lg:px-24 overflow-hidden cta-gradient-bg"
    >
      {/* Animated particles / orbs */}
      <motion.div
        className="absolute top-20 left-[10%] w-64 h-64 bg-gold/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-[10%] w-80 h-80 bg-gold/8 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase text-gold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Mulai Proyek Anda
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Wujudkan Rumah
          <br />
          <span className="gold-gradient-text">Impian Anda</span>
        </motion.h2>

        <motion.p
          className="text-white/40 text-base md:text-lg max-w-lg mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Konsultasikan kebutuhan renovasi dan pembangunan rumah Anda secara GRATIS.
          Bayar 100% setelah proyek selesai — kami yang bangun, Anda yang tenang.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <MagneticButton
            href="https://wa.me/6288989505936"
            className="text-dark font-semibold"
          >
            Hubungi via WhatsApp <span className="ml-2">→</span>
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-wider">Pembayaran</p>
            <p className="text-white/50 text-sm font-medium mt-1">100% Setelah Jadi</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-wider">Konsultasi</p>
            <p className="text-white/50 text-sm font-medium mt-1">Gratis</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-wider">Include</p>
            <p className="text-white/50 text-sm font-medium mt-1">Tukang + Bahan + Desain</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
