import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import JsonLd from "@/components/JsonLd";
import FloatingContact from "@/components/ui/FloatingContact";

// Lazy load below-the-fold components
const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"));
const StatsSection = dynamic(() => import("@/components/StatsSection"));
const TestimonialSection = dynamic(() => import("@/components/TestimonialSection"));
const CTASection = dynamic(() => import("@/components/CTASection"));
const Footer = dynamic(() => import("@/components/Footer"));

// Supported cities for Programmatic SEO
const CITIES = [
  { slug: "malang", name: "Malang", province: "Jawa Timur" },
  { slug: "surabaya", name: "Surabaya", province: "Jawa Timur" },
  { slug: "batu", name: "Batu", province: "Jawa Timur" },
  { slug: "sidoarjo", name: "Sidoarjo", province: "Jawa Timur" },
  { slug: "bali", name: "Bali", province: "Bali" },
  { slug: "denpasar", name: "Denpasar", province: "Bali" },
];

export function generateStaticParams() {
  return CITIES.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const cityData = CITIES.find((c) => c.slug === resolvedParams.city);
  if (!cityData) return {};

  const cityName = cityData.name;

  return {
    title: `Jasa Renovasi & Bangun Rumah di ${cityName} — KamiBantuRenovasi`,
    description: `Layanan jasa renovasi dan bangun rumah premium di ${cityName}, ${cityData.province}. Tukang profesional, material berkualitas, dan harga transparan mulai 4 Jt/m.`,
    keywords: [
      `renovasi rumah ${cityName}`,
      `jasa bangun rumah ${cityName}`,
      `kontraktor ${cityName}`,
      `pemborong ${cityName}`,
      `desain interior ${cityName}`,
    ],
    openGraph: {
      title: `Jasa Renovasi & Bangun Rumah di ${cityName}`,
      description: `Wujudkan rumah impian Anda di ${cityName} bersama ahlinya.`,
      url: `https://kamibanturenovasi.com/lokasi/${resolvedParams.city}`,
    },
    alternates: {
      canonical: `https://kamibanturenovasi.com/lokasi/${resolvedParams.city}`,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const cityData = CITIES.find((c) => c.slug === resolvedParams.city);

  if (!cityData) {
    notFound();
  }

  const cityName = cityData.name;

  // Render a customized localized version of the homepage
  return (
    <SmoothScroll>
      {/* We could pass city to JsonLd to localize the schema further if needed */}
      <JsonLd />
      
      {/* We skip preloader on internal pages or pass fixed 100% to avoid double loading screens depending on navigation style */}
      <Navbar />

      <main>
        {/* We pass the cityName keyword to SequenceScroll to replace 'Wujudkan Rumah Impian Anda' with localized text */}
        <SequenceScroll locationName={cityName} />

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
