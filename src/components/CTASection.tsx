"use client";

import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { LuClock, LuTrendingUp } from "react-icons/lu";

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
          className="text-sm tracking-[0.4em] uppercase text-gold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          Mulai Proyek Anda
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Wujudkan Rumah
          <br />
          <span className="gold-gradient-text">Impian Anda</span>
        </motion.h2>

        <motion.p
          className="text-white/40 text-lg md:text-xl max-w-lg mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3 }}
        >
          Konsultasikan kebutuhan renovasi dan pembangunan rumah Anda secara GRATIS.
          Bayar 100% setelah proyek selesai — kami yang bangun, Anda yang tenang.
        </motion.p>

        {/* Urgency & Loss Aversion */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5">
            <LuClock className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">Slot konsultasi minggu ini terbatas</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <LuTrendingUp className="w-4 h-4 text-white/50" />
            <span className="text-sm text-white/50">Harga material terus naik — mulai sekarang lebih hemat</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <MagneticButton
            href="https://wa.me/6288989505936?text=Permisi%20Kak%2C%20saya%20ingin%20berkonsultasi%20tentang%20jasa%20renovasi%2Fpembangunan%20rumah.%20Boleh%20minta%20info%20lebih%20lanjut%3F%20%F0%9F%99%8F"
            className="text-dark font-semibold"
          >
            Hubungi via WhatsApp <span className="ml-2">→</span>
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center">
            <p className="text-white/20 text-sm tracking-wider">Pembayaran</p>
            <p className="text-white/50 text-base font-medium mt-1">100% Setelah Jadi</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-white/20 text-sm tracking-wider">Konsultasi</p>
            <p className="text-white/50 text-base font-medium mt-1">Gratis</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-white/20 text-sm tracking-wider">Include</p>
            <p className="text-white/50 text-base font-medium mt-1">Tukang + Bahan + Desain</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
          <div className="text-center">
            <p className="text-white/20 text-sm tracking-wider">Proyek Selesai</p>
            <p className="text-gold text-base font-semibold mt-1">100+</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
