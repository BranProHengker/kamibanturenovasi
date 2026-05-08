import { MetadataRoute } from "next";

const CITIES = ["malang", "surabaya", "batu", "sidoarjo", "bali", "denpasar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kamibanturenovasi.vercel.app";

  const locationPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${baseUrl}/lokasi/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...locationPages,
  ];
}
