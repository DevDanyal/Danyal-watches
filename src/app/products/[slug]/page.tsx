import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import Reviews from "@/components/product/Reviews";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { products, getProductStock } from "@/lib/data/products";

export const dynamicParams = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product | Danyal" };
  return {
    title: `${product.name} | Danyal Watches`,
    description: `${product.name} - ${product.subtitle}. ${product.price} PKR. Free shipping, 7-day returns, 1-year warranty.`,
    openGraph: {
      title: `${product.name} | Danyal Watches`,
      description: `${product.name} - ${product.subtitle}`,
      type: "website",
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.name} - ${product.subtitle}`,
    image: product.images.map((img) => `${SITE_URL}${img}`),
    sku: product.slug.toUpperCase(),
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: getProductStock(product) > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} related={related} />
      <Reviews product={product} />
      <StickyAddToCart
        product={product}
        color={product.colors[0]?.name}
        quantity={1}
      />
    </>
  );
}