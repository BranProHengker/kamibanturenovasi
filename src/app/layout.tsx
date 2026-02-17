import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
        className={`${plusJakarta.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
