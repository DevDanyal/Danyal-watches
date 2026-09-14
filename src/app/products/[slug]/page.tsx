import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import Reviews from "@/components/product/Reviews";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { products } from "@/lib/data/products";

export const dynamicParams = false;

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
  if (!product) return { title: "Product | CRYSMA" };
  return {
    title: `${product.name} | CRYSMA Watches`,
    description: `${product.name} - ${product.subtitle}. ${product.price} PKR. Free shipping, 7-day returns, 1-year warranty.`,
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

  return (
    <>
      <ProductDetail product={product} related={related} />
      <Reviews rating={product.rating} count={product.reviews} />
      <StickyAddToCart
        product={product}
        color={product.colors[0]?.name}
        quantity={1}
      />
    </>
  );
}