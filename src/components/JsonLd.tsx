export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "KamiBantuRenovasi — PT. DENZEN ARKATAMA Group",
    alternateName: "KamiBantuRenovasi",
    description:
      "Jasa renovasi rumah dan bangun rumah dari nol di Malang, Surabaya, Jawa Timur & Bali. Harga mulai ±4 juta per meter, bayar 100% setelah jadi. Gratis konsultasi.",
    url: "https://kamibanturenovasi.com",
    logo: "https://kamibanturenovasi.com/images/kamibanturenovasi-logo.PNG",
    image: "https://kamibanturenovasi.com/images/kamibanturenovasi-logo.PNG",
    telephone: "+6288989505936",
    email: "kamibanturenovasi@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malang",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -7.9778,
      longitude: 112.6349,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Malang",
        containedInPlace: { "@type": "State", name: "Jawa Timur" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Kabupaten Malang",
        containedInPlace: { "@type": "State", name: "Jawa Timur" },
      },
      {
        "@type": "City",
        name: "Surabaya",
        containedInPlace: { "@type": "State", name: "Jawa Timur" },
      },
      {
        "@type": "State",
        name: "Jawa Timur",
      },
      {
        "@type": "State",
        name: "Bali",
      },
    ],
    priceRange: "Mulai ±4 Juta / meter",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Bank Transfer",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
    sameAs: [
      "https://instagram.com/kamibanturenovasi",
      "https://tiktok.com/@kamibanturenovasi",
      "https://wa.me/6288989505936",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Renovasi & Pembangunan",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bangun Rumah Baru",
            description:
              "Pembangunan rumah tinggal, rumah kost, ruko, toko dari awal sampai jadi.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Renovasi Rumah",
            description:
              "Renovasi rumah, dapur, kamar mandi, dan seluruh ruangan dengan kualitas premium.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pengecatan Interior & Eksterior",
            description:
              "Jasa pengecatan rumah interior dan eksterior profesional.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Instalasi Air & Listrik",
            description:
              "Pemasangan dan perbaikan instalasi air bersih dan kelistrikan.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plafon & Finishing",
            description:
              "Pemasangan plafon dan pekerjaan finishing interior rumah.",
          },
        },
      ],
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KamiBantuRenovasi",
    url: "https://kamibanturenovasi.com",
    description:
      "Jasa renovasi & bangun rumah terpercaya di Malang, Surabaya, Jawa Timur, dan Bali.",
    publisher: {
      "@type": "Organization",
      name: "PT. DENZEN ARKATAMA Group",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Berapa biaya renovasi rumah per meter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harga mulai dari ±4 juta per meter, sudah termasuk biaya tukang, bahan-bahan, desain, dan estimasi pendanaan. Harga dapat menyesuaikan untuk wilayah di luar Jawa Timur & Bali.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah bisa bayar setelah proyek selesai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, kami menyediakan sistem pembayaran 100% setelah proyek selesai. Anda bayar penuh setelah pekerjaan selesai dan sesuai kesepakatan.",
        },
      },
      {
        "@type": "Question",
        name: "Wilayah mana saja yang dilayani?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wilayah utama kami adalah Malang Kota, Kabupaten Malang, Surabaya, dan Bali. Kami juga melayani seluruh wilayah Jawa Timur dan Indonesia dengan penyesuaian biaya akomodasi.",
        },
      },
      {
        "@type": "Question",
        name: "Apa saja layanan yang tersedia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Layanan kami meliputi: bangun rumah baru, renovasi rumah, pembangunan kos/ruko, pengecatan interior & eksterior, instalasi air & listrik, serta plafon & finishing.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
