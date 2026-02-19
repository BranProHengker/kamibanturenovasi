"use client";

import { useState, useCallback } from "react";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import StatsSection from "@/components/StatsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import JsonLd from "@/components/JsonLd";

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
      <JsonLd />
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
