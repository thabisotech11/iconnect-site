import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/mock-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iconnectpreowned.co.za";

const STATIC_ROUTES = [
  "",
  "/shop",
  "/trade-in",
  "/sell-your-device",
  "/repairs",
  "/financing",
  "/about",
  "/contact",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
