import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://sabxi.com"
    : "http://localhost:3000");

const base = siteUrl.replace(/\/$/, "");

const STATIC_ROUTES = [
  "/",
  "/products/",
  "/reviews/",
  "/blog/",
  "/areas/",
  "/about/",
  "/studio/",
  "/company/",
  "/privacy/",
  "/terms/",
  "/refund/",
  "/hi/",
  "/blog/cut-veg-vs-whole/",
  "/blog/mumbai-meal-prep-guide/",
  "/blog/why-we-cut-after-you-order/",
  "/blog/fresh-juice-delivery-chembur/",
  "/blog/best-cut-veg-chembur/",
  "/blog/chembur-30-min-meal-kits/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.6 : 0.7,
  }));
}
