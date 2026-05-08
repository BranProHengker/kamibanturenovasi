import dynamic from "next/dynamic";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import FloatingContact from "@/components/ui/FloatingContact";
import JsonLd from "@/components/JsonLd";

const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const TestimonialSection = dynamic(() => import("@/components/TestimonialSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <SmoothScroll>
      <JsonLd />
      <Navbar />

      <main>
        {/* Visually hidden h1 for SEO — the visual heading is inside SequenceScroll canvas */}
        <h1 className="sr-only">
          Jasa Renovasi & Bangun Rumah Terpercaya se-Jawa Timur & Bali — KamiBantuRenovasi
        </h1>

        {/* ====== HERO — Sequence Scroll ====== */}
        <SequenceScroll />

        {/* ====== REMAINING SECTIONS ====== */}
        <div className="-mt-[100vh] relative z-10">
          <AboutSection />
          <PortfolioSection />
          <StatsSection />
          <TestimonialSection />
          <CTASection />
          <Footer />
        </div>
      </main>

      <FloatingContact />
    </SmoothScroll>
  );
}
