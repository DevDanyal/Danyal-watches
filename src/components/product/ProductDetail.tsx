"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Share2,
  Star,
  Check,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import Accordion from "@/components/product/Accordion";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round(
    ((product.regularPrice - product.price) / product.regularPrice) * 100
  );

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        regularPrice: product.regularPrice,
        image: product.images[0],
        color: selectedColor,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = [
    { name: "Brand", value: "CRYSMA" },
    { name: "Type", value: product.subtitle },
    { name: "Movement", value: "Quartz / Automatic" },
    { name: "Case Material", value: "Stainless Steel" },
    { name: "Water Resistance", value: "3 ATM" },
    { name: "Warranty", value: "1 Year" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-xs text-text-secondary">
        <Link href="/" className="hover:text-accent-gold">Home</Link>
        <span>/</span>
        <Link
          href={`/collections/${product.category}`}
          className="hover:text-accent-gold"
        >
          {product.category === "men" ? "Men" : product.category}
        </Link>
        <span>/</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.regularPrice > product.price && (
              <span className="rounded bg-sale-badge px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                -{discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="rounded bg-new-badge px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="rounded bg-accent-gold px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
                Best Seller
              </span>
            )}
          </div>

          <h1 className="mt-4 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{product.subtitle}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-1 text-accent-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    "h-4 w-4",
                    s <= Math.round(product.rating)
                      ? "fill-current"
                      : "fill-current opacity-25"
                  )}
                />
              ))}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {product.rating}
            </span>
            <span className="text-sm text-text-secondary">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-montserrat text-3xl font-bold text-accent-gold">
              {formatPrice(product.price)}
            </span>
            {product.regularPrice > product.price && (
              <span className="mb-1 text-lg text-text-secondary line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          <p className="mt-2 text-xs text-success">
            You save {formatPrice(product.regularPrice - product.price)}
          </p>

          {product.colors.length > 0 && (
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                  Color
                </h3>
                <span className="text-sm text-text-secondary">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const active = color.name === selectedColor;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      aria-label={color.name}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                        active
                          ? "border-accent-gold shadow-lg shadow-accent-gold/20"
                          : "border-background-secondary hover:border-text-secondary/50"
                      )}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-background-secondary bg-card-background">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-12 items-center justify-center text-text-primary transition-colors hover:text-accent-gold"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold tabular-nums text-text-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="flex h-12 w-12 items-center justify-center text-text-primary transition-colors hover:text-accent-gold"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={cn(
                "flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 sm:flex-none sm:px-10",
                added
                  ? "bg-success text-white"
                  : "bg-accent-gold text-black hover:scale-105 hover:bg-accent-gold-light"
              )}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              aria-label="Add to wishlist"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-all",
                wishlisted
                  ? "border-sale-badge bg-sale-badge/10 text-sale-badge"
                  : "border-background-secondary text-text-primary hover:border-sale-badge hover:text-sale-badge"
              )}
            >
              <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
            </button>

            <button
              aria-label="Share product"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-background-secondary text-text-primary transition-all hover:border-accent-gold hover:text-accent-gold"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Accordion
              items={[
                {
                  title: "Description",
                  content: (
                    <p>
                      The {product.name} is a premium {product.subtitle.toLowerCase()}{" "}
                      from the CRYSMA collection. Featuring a precision quartz
                      movement, scratch-resistant mineral glass, and a stainless
                      steel case, it delivers reliable timekeeping with timeless
                      elegance. Perfect for daily wear and special occasions.
                    </p>
                  ),
                },
                {
                  title: "Specifications",
                  content: (
                    <table className="w-full">
                      <tbody>
                        {specs.map((spec) => (
                          <tr key={spec.name} className="border-b border-background-secondary last:border-0">
                            <td className="py-2.5 pr-4 font-medium text-text-primary">
                              {spec.name}
                            </td>
                            <td className="py-2.5 text-text-secondary">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ),
                },
                {
                  title: "Shipping & Returns",
                  content: (
                    <div className="space-y-2">
                      <p>Free nationwide shipping on all orders.</p>
                      <p>Expected delivery: 3-5 business days.</p>
                      <p>7-day hassle-free exchange & return policy.</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-background-secondary bg-card-background p-3 text-center">
              <Truck className="h-5 w-5 text-accent-gold" />
              <span className="text-[11px] text-text-secondary">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-background-secondary bg-card-background p-3 text-center">
              <RotateCcw className="h-5 w-5 text-accent-gold" />
              <span className="text-[11px] text-text-secondary">7-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl border border-background-secondary bg-card-background p-3 text-center">
              <ShieldCheck className="h-5 w-5 text-accent-gold" />
              <span className="text-[11px] text-text-secondary">1 Yr Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-gold">
              You may also like
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
              Related Products
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-xl border border-background-secondary bg-card-background transition-all duration-300 hover:-translate-y-1 hover:border-accent-gold/40 hover:shadow-xl hover:shadow-black/50"
    >
      <div className="relative aspect-square overflow-hidden bg-background-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-medium text-text-primary group-hover:text-accent-gold">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-text-secondary">{product.subtitle}</p>
        <p className="mt-2 font-montserrat text-sm font-bold text-text-primary">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}