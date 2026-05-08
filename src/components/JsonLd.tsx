export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "KamiBantuRenovasi — PT. DENZEN ARKATAMA Group",
    alternateName: "KamiBantuRenovasi",
    description:
      "Jasa renovasi rumah dan bangun rumah dari nol se-Jawa Timur & Bali. Melayani Malang, Surabaya, Sidoarjo, Batu, Denpasar & sekitarnya. Harga mulai ±4 juta per meter, bayar 100% setelah jadi. Gratis konsultasi.",
    url: "https://kamibanturenovasi.vercel.app",
    logo: "https://kamibanturenovasi.vercel.app/images/kamibanturenovasi-logo.PNG",
    image: "https://kamibanturenovasi.vercel.app/images/kamibanturenovasi-logo.PNG",
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
        "@type": "City",
        name: "Sidoarjo",
        containedInPlace: { "@type": "State", name: "Jawa Timur" },
      },
      {
        "@type": "City",
        name: "Batu",
        containedInPlace: { "@type": "State", name: "Jawa Timur" },
      },
      {
        "@type": "State",
        name: "Jawa Timur",
      },
      {
        "@type": "City",
        name: "Denpasar",
        containedInPlace: { "@type": "State", name: "Bali" },
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
    url: "https://kamibanturenovasi.vercel.app",
    description:
      "Jasa renovasi & bangun rumah terpercaya se-Jawa Timur & Bali.",
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
        name: "Berapa biaya renovasi rumah di Malang per meter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Biaya renovasi rumah di Malang Kota dan Kabupaten Malang mulai dari ±4 juta per meter, sudah termasuk biaya tukang, bahan-bahan, desain, dan estimasi pendanaan. Harga dapat menyesuaikan untuk wilayah di luar Jawa Timur & Bali.",
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
        name: "Apakah melayani renovasi di Kabupaten Malang?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, kami melayani seluruh wilayah Kabupaten Malang termasuk Kepanjen, Lawang, Singosari, Batu, Gondanglegi, Turen, dan sekitarnya. Tim kami berbasis di Malang sehingga respons cepat untuk area Malang Raya.",
        },
      },
      {
        "@type": "Question",
        name: "Wilayah mana saja yang dilayani?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Basis utama kami di Malang Raya (Kota Malang, Kabupaten Malang & Batu). Kami juga melayani se-Jawa Timur (Surabaya, Sidoarjo, dll.) dan Bali (Denpasar, dll.). Wilayah lain di Indonesia dilayani dengan penyesuaian biaya akomodasi.",
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
      {
        "@type": "Question",
        name: "Berapa lama proses renovasi rumah di Malang?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Durasi renovasi tergantung skala proyek. Renovasi ringan (pengecatan, plafon) bisa selesai 1-2 minggu. Renovasi menengah (dapur, kamar mandi) sekitar 2-4 minggu. Bangun rumah baru dari nol biasanya 3-6 bulan tergantung luas bangunan.",
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
