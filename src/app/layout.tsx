import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://kamibanturenovasi.vercel.app";
const SITE_NAME = "KamiBantuRenovasi";
const SITE_TITLE =
  "Jasa Renovasi & Bangun Rumah di Malang — Terpercaya se-Jawa Timur & Bali | KamiBantuRenovasi";
const SITE_DESCRIPTION =
  "KamiBantuRenovasi — Jasa renovasi rumah & bangun rumah dari nol di Malang Kota, Kabupaten Malang & se-Jawa Timur hingga Bali. Harga mulai ±4jt/meter, bayar 100% setelah jadi. Gratis konsultasi! ☎ 088-989-505-936";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Primary — Malang Kota
    "jasa renovasi rumah Malang",
    "kontraktor renovasi rumah Malang",
    "jasa bangun rumah Malang",
    "renovasi rumah Malang",
    "jasa renovasi rumah Malang Kota",
    "kontraktor bangunan Malang",
    "biaya renovasi rumah Malang",
    "harga renovasi rumah Malang",
    "tukang renovasi rumah Malang",
    "jasa renovasi dapur Malang",
    "jasa renovasi kamar mandi Malang",
    "jasa pengecatan rumah Malang",
    "bangun rumah minimalis Malang",
    // Primary — Kabupaten Malang
    "jasa renovasi rumah Kabupaten Malang",
    "jasa bangun rumah Kabupaten Malang",
    "kontraktor rumah Kabupaten Malang",
    "renovasi rumah Kepanjen",
    "jasa bangun rumah Lawang",
    "kontraktor rumah Singosari",
    "jasa renovasi rumah Batu Malang",
    "jasa bangun kos Malang",
    // Secondary — Surabaya
    "jasa renovasi rumah Surabaya",
    "kontraktor renovasi rumah Surabaya",
    "jasa bangun rumah Surabaya",
    "renovasi rumah Surabaya",
    "biaya renovasi rumah Surabaya",
    "jasa bangun kos Surabaya",
    // Secondary — Bali
    "jasa renovasi rumah Bali",
    "kontraktor bangunan Bali",
    "jasa bangun rumah Bali",
    "jasa bangun villa Bali",
    "renovasi rumah Bali",
    // Broader — Jawa Timur
    "jasa renovasi rumah Jawa Timur",
    "kontraktor rumah Jawa Timur",
    "jasa bangun rumah dari nol",
    "jasa renovasi rumah Sidoarjo",
    "renovasi rumah minimalis modern",
    "jasa pengecatan rumah",
    "kontraktor rumah bayar setelah jadi",
    "harga renovasi rumah per meter",
    "jasa renovasi rumah terpercaya",
    "renovasi rumah murah berkualitas",
  ],
  authors: [{ name: "PT. DENZEN ARKATAMA Group", url: SITE_URL }],
  creator: "KamiBantuRenovasi",
  publisher: "PT. DENZEN ARKATAMA Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "KamiBantuRenovasi — Jasa Renovasi & Bangun Rumah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Uncomment and add your verification code after registering at Google Search Console
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
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
