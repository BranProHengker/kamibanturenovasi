"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import dynamic from "next/dynamic";

import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import TextReveal from "@/components/TextReveal";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import TestimonialSlider from "@/components/TestimonialSlider";


   

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingProgress = useCallback((percent: number) => {
    setLoadingProgress(percent);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <SmoothScroll>
      <Preloader progress={loadingProgress} isComplete={isLoaded} />
      <Navbar />

      <main>
        {/* ====== HERO — Sequence Scroll ====== */}
        <SequenceScroll
          onLoadingProgress={handleLoadingProgress}
          onLoadingComplete={handleLoadingComplete}
        />

        {/* ====== REMAINING SECTIONS ====== */}
        <div className="-mt-[100vh] relative z-10">
          <AboutSection />
          <BentoSection />
          <StatsSection />
          <TestimonialSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */
function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-white py-32 md:py-48 px-6 md:px-16 lg:px-24"
    >
      {/* Decorative top line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-20" />

      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase text-gold mb-8"
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
              text="Kami adalah tim profesional yang berdedikasi untuk mengubah setiap ruang menjadi karya seni arsitektur yang fungsional dan estetis."
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-gray-900"
              as="h2"
            />
          </div>

          <div className="flex flex-col justify-end">
            <TextReveal
              text="Dengan pengalaman lebih dari satu dekade di industri konstruksi dan renovasi, kami memahami bahwa setiap rumah memiliki cerita unik. Pendekatan kami menggabungkan keahlian teknis dengan sensibilitas desain untuk menciptakan ruang yang benar-benar mencerminkan kepribadian pemiliknya."
              className="text-base md:text-lg text-gray-500 leading-relaxed"
              as="p"
            />

            <motion.div
              className="mt-12 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-xs tracking-wider text-gold uppercase">
                Renovasi
              </span>
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-xs tracking-wider text-gold uppercase">
                Pembangunan
              </span>
              <span className="inline-block px-4 py-2 border border-gold/30 rounded-full text-xs tracking-wider text-gold uppercase">
                Desain Interior
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BENTO SECTION
   ============================================================ */
const BENTO_ITEMS = [
  {
    image: "/images/bento-living.png",
    title: "Living Room",
    subtitle: "Renovasi Modern",
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    image: "/images/bento-kitchen.png",
    title: "Kitchen",
    subtitle: "Desain Kontemporer",
    className: "col-span-2 md:col-span-1 row-span-1",
  },
  {
    image: "/images/bento-bathroom.png",
    title: "Bathroom",
    subtitle: "Spa Experience",
    className: "col-span-2 md:col-span-1 row-span-1",
  },
  {
    image: "/images/bento-bedroom.png",
    title: "Bedroom",
    subtitle: "Comfort Retreat",
    className: "col-span-2 md:col-span-1 row-span-1",
  },
  {
    image: "/images/bento-exterior.png",
    title: "Exterior",
    subtitle: "Arsitektur Modern",
    className: "col-span-2 md:col-span-1 row-span-1",
  },
];

function BentoSection() {
  return (
    <section id="services" className="relative bg-dark py-32 md:py-48 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <div>
            <motion.p
              className="text-xs tracking-[0.4em] uppercase text-gold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portfolio
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Karya<span className="gold-gradient-text"> Terbaik</span> Kami
            </motion.h2>
          </div>
          <motion.p
            className="text-white/40 text-sm md:text-base max-w-sm mt-6 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Setiap proyek adalah bukti komitmen kami terhadap kualitas dan keindahan.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {BENTO_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className={`bento-card group ${item.className}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-20">
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1">
                  {item.subtitle}
                </p>
                <h3 className="text-white text-lg md:text-2xl font-semibold tracking-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   STATS SECTION
   ============================================================ */
const STATS = [
  { number: 350, suffix: "+", label: "Proyek Selesai" },
  { number: 12, suffix: "+", label: "Tahun Pengalaman" },
  { number: 98, suffix: "%", label: "Klien Puas" },
  { number: 45, suffix: "+", label: "Tim Profesional" },
];

function StatsSection() {
  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-y-12">
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className="stat-divider mx-8 md:mx-16 hidden md:block" />}
              <motion.div
                className="text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                  <span className="gold-gradient-text">
                    <CountUp end={stat.number} suffix={stat.suffix} />
                  </span>
                </div>
                <p className="text-gray-400 text-sm md:text-base mt-2 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIAL SECTION
   ============================================================ */
function TestimonialSection() {
  return (
    <section id="testimonials">
      <TestimonialSlider />
    </section>
  );
}

/* ============================================================
   CTA SECTION
   ============================================================ */
function CTASection() {
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
          Konsultasikan kebutuhan renovasi dan pembangunan rumah Anda dengan tim ahli kami.
          Gratis dan tanpa komitmen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <MagneticButton
            href="https://wa.me/6281234567890"
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
            <p className="text-white/20 text-xs tracking-wider">Respon Cepat</p>
            <p className="text-white/50 text-sm font-medium mt-1">{'< 1 Jam'}</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-wider">Konsultasi</p>
            <p className="text-white/50 text-sm font-medium mt-1">Gratis</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-white/20 text-xs tracking-wider">Garansi</p>
            <p className="text-white/50 text-sm font-medium mt-1">5 Tahun</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="bg-[#050505] py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tighter text-white mb-4">
              <span className="gold-gradient-text">KAMIBANTU</span>RENOVASI
            </h3>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Jasa renovasi dan pembangunan rumah premium dengan kualitas terbaik dan desain modern.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Navigasi</p>
            <ul className="space-y-3">
              {["Beranda", "Tentang", "Layanan", "Portfolio", "Testimoni", "Kontak"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="footer-link text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Kontak</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@kamibanturenovasi.com" className="footer-link text-sm">
                  hello@kamibanturenovasi.com
                </a>
              </li>
              <li>
                <a href="tel:+6281234567890" className="footer-link text-sm">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="text-white/30 text-sm">
                Jakarta, Indonesia
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              {["Instagram", "WhatsApp", "Facebook"].map((social) => (
                <a key={social} href="#" className="footer-link text-xs">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-white/15 text-xs tracking-wider">
            © 2026 KamiBantuRenovasi. All rights reserved.
          </p>
          <p className="text-white/15 text-xs tracking-wider">
            Designed with ♥ in Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
