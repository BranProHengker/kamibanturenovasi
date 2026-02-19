"use client";

import { motion } from "motion/react";
import TextReveal from "@/components/ui/TextReveal";
import { LuBuilding2, LuHammer, LuWrench } from "react-icons/lu";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#f1f1f1] py-32 md:py-48 px-6 md:px-16 lg:px-24"
    >
      {/* Decorative top line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-20" />

      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-sm tracking-[0.4em] uppercase text-gold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tentang Kami
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <TextReveal
              text="Kami merenovasi rumah dan membangun dari awal sampai jadi — dengan kualitas premium dan harga transparan."
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-gray-900"
              as="h2"
            />
          </div>

          <div className="flex flex-col justify-end">
            <TextReveal
              text="PT. DENZEN ARKATAMA Group melayani jasa renovasi dan pembangunan rumah di Jawa Timur & Bali sebagai wilayah utama, serta seluruh Indonesia dengan penyesuaian biaya akomodasi. Harga mulai dari ±4 juta per meter, sudah termasuk tukang, bahan, desain, dan estimasi pendanaan."
              className="text-lg md:text-xl text-gray-500 leading-relaxed"
              as="p"
            />

            <motion.div
              className="mt-12 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="inline-block px-4 py-2.5 border border-gold/30 rounded-full text-sm tracking-wider text-gold uppercase">
                Bangun Baru
              </span>
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-sm tracking-wider text-gold uppercase">
                Renovasi
              </span>
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-sm tracking-wider text-gold uppercase">
                Pengecatan
              </span>
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-sm tracking-wider text-gold uppercase">
                Instalasi
              </span>
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-sm tracking-wider text-gold uppercase">
                Plafon & Finishing
              </span>
            </motion.div>
          </div>
        </div>

        {/* Services detail cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            {
              title: "Bangun Baru",
              desc: "Rumah tinggal, rumah kost, ruko, toko, dan bangunan usaha lainnya.",
              icon: LuBuilding2,
            },
            {
              title: "Renovasi",
              desc: "Renovasi rumah, dapur, kamar mandi, dan seluruh ruangan.",
              icon: LuHammer,
            },
            {
              title: "Pekerjaan Spesifik",
              desc: "Pengecatan interior & eksterior, instalasi air & listrik, plafon, dan finishing.",
              icon: LuWrench,
            },
          ].map((service, i) => {
            const Icon = service.icon;
            return (
            <motion.div
              key={service.title}
              className="p-8 rounded-2xl border border-gray-100 hover:border-gold/20 transition-colors duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed">{service.desc}</p>
            </motion.div>
            );
          })}
        </div>

        {/* Pricing & Coverage info */}
        <motion.div
          className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Estimasi Harga</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-900">±4 Juta <span className="text-lg font-normal text-gray-400">/ meter</span></p>
              <p className="text-base text-gray-500 mt-3 leading-relaxed">
                Sudah termasuk tukang, bahan-bahan, desain, dan estimasi pendanaan.
                Harga dapat menyesuaikan untuk wilayah di luar Jawa & Bali.
              </p>
            </div>
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">Wilayah Layanan</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-base font-medium text-gray-700">Jawa Timur & Bali</span>
                  <span className="text-sm px-3 py-1 bg-gold/10 text-gold rounded-full">Utama</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-base text-gray-500">Diluar Wilayah Utama </span>
                  <span className="text-sm text-gray-400">Harga menyesuaikan</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
