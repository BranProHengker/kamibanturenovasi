import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KAMIBANTURENOVASI — Jasa Renovasi & Bangun Rumah Premium",
  description:
    "Kami Bantu Renovasi hadir untuk mewujudkan rumah impian Anda. Layanan renovasi dan pembangunan rumah berkualitas tinggi dengan desain modern.",
  keywords: [
    "renovasi rumah",
    "bangun rumah",
    "jasa renovasi",
    "kontraktor",
    "desain interior",
  ],
  openGraph: {
    title: "KAMIBANTURENOVASI — Jasa Renovasi & Bangun Rumah Premium",
    description: "Mewujudkan rumah impian Anda dengan kualitas premium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${outfit.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
