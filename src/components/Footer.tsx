"use client";

export default function Footer() {
  return (
    <footer className="bg-[#050505] py-16 md:py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tighter text-white mb-2">
              <span className="gold-gradient-text">KAMIBANTU</span>RENOVASI
            </h3>
            <p className="text-white/20 text-xs mb-4">PT. DENZEN ARKATAMA Group</p>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Jasa renovasi dan pembangunan rumah dari awal sampai jadi. Melayani Jawa Timur, Bali, dan seluruh Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Navigasi</p>
            <ul className="space-y-3">
              {["Beranda", "Tentang", "Layanan", "Testimoni", "Kontak"].map(
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

          {/* Layanan */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Layanan</p>
            <ul className="space-y-3">
              {["Bangun Rumah Baru", "Renovasi Rumah", "Pengecatan", "Instalasi Air & Listrik", "Plafon & Finishing"].map(
                (item) => (
                  <li key={item} className="text-white/40 text-sm">{item}</li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-6">Kontak</p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+6288989505936" className="footer-link text-sm">
                  088-989-505-936
                </a>
              </li>
              <li className="text-white/30 text-sm">
                Jawa Timur & Bali, Indonesia
              </li>
            </ul>

            <p className="text-white/30 text-xs tracking-[0.2em] uppercase mt-8 mb-4">Sosial Media</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/kamibanturenovasi" className="footer-link text-sm" target="_blank" rel="noopener">
                Instagram
              </a>
              <a href="https://tiktok.com/@kamibanturenovasi" className="footer-link text-sm" target="_blank" rel="noopener">
                TikTok
              </a>
              <a href="https://wa.me/6288989505936" className="footer-link text-sm" target="_blank" rel="noopener">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-white/15 text-xs tracking-wider">
            © 2026 PT. DENZEN ARKATAMA Group. All rights reserved.
          </p>
          <p className="text-white/15 text-xs tracking-wider">
            @kamibanturenovasi
          </p>
        </div>
      </div>
    </footer>
  );
}
