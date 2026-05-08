import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/dashboard/", "/login/"],
    },
    sitemap: "https://kamibanturenovasi.vercel.app/sitemap.xml",
  };
}
