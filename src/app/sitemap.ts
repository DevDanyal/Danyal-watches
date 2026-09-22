import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { collections } from "@/lib/data/collections";
import { getPublishedProducts } from "@/lib/data/serverProducts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://danyal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbProducts = await getPublishedProducts();
  const listedProducts = dbProducts.length
    ? dbProducts
    : products;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/wishlist`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/track-order`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/search`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/cart`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/checkout`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/account`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/exchange-return`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = listedProducts.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    "how-to-choose-the-perfect-watch",
    "caring-for-your-stainless-steel-watch",
    "outfit-ideas-to-match-your-watch",
  ].map((slug) => ({
    url: `${SITE_URL}/blogs/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}