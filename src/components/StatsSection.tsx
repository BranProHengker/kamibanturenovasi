"use client";

import { motion } from "motion/react";
import CountUp from "@/components/ui/CountUp";
import { LuBuilding2, LuShieldCheck, LuMessageCircle, LuBadgeCheck } from "react-icons/lu";

export default function StatsSection() {
  const advantages = [
    {
      number: 100,
      suffix: "+",
      label: "Proyek Selesai",
      desc: "Pengalaman menangani berbagai jenis proyek renovasi dan pembangunan",
      IconComponent: LuBuilding2,
    },
    {
      number: 100,
      suffix: "%",
      label: "Bayar Setelah Jadi",
      desc: "Sistem pembayaran fleksibel — bayar penuh setelah proyek selesai",
      IconComponent: LuShieldCheck,
    },
    {
      label: "Gratis Konsultasi",
      desc: "Konsultasikan kebutuhan Anda tanpa biaya apapun, tanpa komitmen",
      IconComponent: LuMessageCircle,
      isText: true,
      displayText: "GRATIS",
    },
    {
      number: 4,
      suffix: "Jt/m",
      label: "Mulai Dari",
      desc: "Harga sudah termasuk tukang, bahan, desain, dan estimasi pendanaan",
      IconComponent: LuBadgeCheck,
    },
  ];

  return (
    <section className="relative bg-white py-28 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-125 h-125 bg-gold/5 rounded-full blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-150 h-150 bg-gold/5 rounded-full blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase text-gold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Mengapa Memilih Kami
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Keunggulan <span className="gold-gradient-text">Kami</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {advantages.map((item, i) => {
            const Icon = item.IconComponent;
            return (
              <motion.div
                key={i}
                className="group relative p-7 md:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-gold/20 hover:bg-white hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top gold accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-gold/0 group-hover:via-gold/30 to-transparent transition-all duration-500" />

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gold" />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-1">
                  {'isText' in item && item.isText ? (
                    <span className="gold-gradient-text">{item.displayText}</span>
                  ) : (
                    <span className="gold-gradient-text">
                      <CountUp end={item.number!} suffix={item.suffix} />
                    </span>
                  )}
                </div>

                {/* Label */}
                <p className="text-sm font-medium text-gray-600 mb-3">{item.label}</p>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
