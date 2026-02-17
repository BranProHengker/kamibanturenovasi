"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const PORTFOLIO_ITEMS = [
  {
    image: "/images/bento-living.png",
    title: "Bangun Rumah",
    subtitle: "Dari Nol Sampai Jadi",
  },
  {
    image: "/images/bento-kitchen.png",
    title: "Renovasi Dapur",
    subtitle: "Desain Kontemporer",
  },
  {
    image: "/images/bento-kos.png",
    title: "Membangun Kos",
    subtitle: "Investasi Properti",
  },
  {
    image: "/images/bento-exterior.png",
    title: "Ruko & Toko",
    subtitle: "Bangunan Usaha",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-dark"
      style={{ height: `${PORTFOLIO_ITEMS.length * 100}vh` }}
    >
      {/* Sticky container — stays in view while user scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Header */}
        <div className="px-6 md:px-16 lg:px-24 pt-20 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between max-w-7xl mx-auto">
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
        </div>

        {/* Horizontal scrolling cards */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8 pl-6 md:pl-16 lg:pl-24 pr-[30vw]"
            style={{ x }}
          >
            {PORTFOLIO_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                className="group relative shrink-0 w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] h-[50vh] md:h-[55vh] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="text-white text-xl md:text-3xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Card number */}
                <div className="absolute top-6 right-6 text-white/10 text-6xl md:text-8xl font-bold tracking-tighter">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="px-6 md:px-16 lg:px-24 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold rounded-full"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-[10px] text-white/20 tracking-widest uppercase">Scroll untuk explore</span>
              <span className="text-[10px] text-white/20 tracking-widest">
                {PORTFOLIO_ITEMS.length} Proyek
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
