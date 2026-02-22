"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { LuPenLine } from "react-icons/lu";
import TestimonialForm from "@/components/ui/TestimonialForm";

export default function Footer() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <footer className="bg-[#f1f1f1] py-16 md:py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Top */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 pb-12 border-b border-dark/5">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-2">
                <img src="/images/kamibanturenovasi-logo.PNG" alt="KamiBantuRenovasi Logo" className="w-10 h-10 object-contain" />
                <h3 className="text-2xl font-bold tracking-tighter text-dark">
                  <span className="gold-gradient-text">KAMIBANTU</span>RENOVASI
                </h3>
              </div>
              <p className="text-dark/40 text-sm mb-4">PT. DENZEN ARKATAMA Group</p>
              <p className="text-dark/50 text-base leading-relaxed max-w-xs">
                Jasa renovasi dan pembangunan rumah dari awal sampai jadi. Melayani Jawa Timur, Bali, dan seluruh Indonesia.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-dark/40 text-sm tracking-[0.2em] uppercase mb-6">Navigasi</p>
              <ul className="space-y-3">
                {["Beranda", "Tentang", "Layanan", "Testimoni", "Kontak"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-dark/60 text-base hover:text-gold transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Layanan */}
            <div>
              <p className="text-dark/40 text-sm tracking-[0.2em] uppercase mb-6">Layanan</p>
              <ul className="space-y-3">
                {["Bangun Rumah Baru", "Renovasi Rumah", "Pengecatan", "Instalasi Air & Listrik", "Plafon & Finishing"].map(
                  (item) => (
                    <li key={item} className="text-dark/50 text-base">{item}</li>
                  )
                )}
              </ul>
            </div>

            {/* Area Layanan (Programmatic SEO Links) */}
            <div>
              <p className="text-dark/40 text-sm tracking-[0.2em] uppercase mb-6">Area Layanan</p>
              <ul className="space-y-3">
                {["Malang", "Surabaya", "Batu", "Sidoarjo", "Bali"].map((city) => (
                  <li key={city}>
                    <a
                      href={`/lokasi/${city.toLowerCase()}`}
                      className="text-dark/60 text-base hover:text-gold transition-colors duration-200"
                    >
                      Jasa Renovasi {city}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-dark/40 text-sm tracking-[0.2em] uppercase mb-6">Kontak</p>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+6288989505936" className="text-dark/60 text-base hover:text-gold transition-colors duration-200">
                    088-989-505-936
                  </a>
                </li>
                <li className="text-dark/50 text-base">
                  Jawa Timur & Bali, Indonesia
                </li>
              </ul>

              <p className="text-dark/40 text-sm tracking-[0.2em] uppercase mt-8 mb-4">Sosial Media</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/kamibanturenovasi" className="text-dark/60 text-base hover:text-gold transition-colors duration-200" target="_blank" rel="noopener">
                  Instagram
                </a>
                <a href="https://tiktok.com/@kamibanturenovasi" className="text-dark/60 text-base hover:text-gold transition-colors duration-200" target="_blank" rel="noopener">
                  TikTok
                </a>
                <a href="https://wa.me/6288989505936" className="text-dark/60 text-base hover:text-gold transition-colors duration-200" target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
            <p className="text-dark/25 text-sm tracking-wider">
              © 2026 PT. DENZEN ARKATAMA Group. All rights reserved.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-sm text-dark/40 hover:text-gold hover:border-gold/30 transition-all duration-300 cursor-pointer"
            >
              <LuPenLine className="w-3.5 h-3.5" />
              Tulis Ulasan
            </button>

            <p className="text-dark/25 text-sm tracking-wider">
              @kamibanturenovasi
            </p>
          </div>
        </div>
      </footer>

      {/* Testimonial Form Modal */}
      <AnimatePresence>
        {showForm && <TestimonialForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </>
  );
}
