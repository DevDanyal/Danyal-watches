"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Zap,
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
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import {
  formatPrice,
  getProductStock,
  getProductCode,
  type Product,
} from "@/lib/data/products";
import AuthModal from "@/components/auth/AuthModal";
import { cn } from "@/lib/utils";

const tabs = ["About", "Overview & Specs", "Warranty"] as const;
type Tab = (typeof tabs)[number];

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { user } = useAuth();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(isWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("About");
  const [copied, setCopied] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const code = getProductCode(product);
  const stock = getProductStock(product);
  const outOfStock = stock === 0;

  const discount = Math.round(
    ((product.regularPrice - product.price) / product.regularPrice) * 100
  );

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        code,
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

  const proceedToCheckout = () => {
    if (outOfStock) return;
    addItem(
      {
        id: product.id,
        slug: product.slug,
        code,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        regularPrice: product.regularPrice,
        image: product.images[0],
        color: selectedColor,
      },
      quantity
    );
    router.push("/checkout");
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    if (!user) {
      setAuthOpen(true);
      return;
    }
    proceedToCheckout();
  };

  const handleWishlist = () => {
    const next = !wishlisted;
    toggle(product.id);
    setWishlisted(next);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const data = { title: `${product.name} | CRYSMA`, text: product.name, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* ignore */
    }
  };

  const specs = [
    { name: "Brand", value: "CRYSMA" },
    { name: "Type", value: product.subtitle },
    { name: "Movement", value: "Quartz / Automatic" },
    { name: "Case Material", value: "Stainless Steel" },
    { name: "Case Size", value: "34-48mm" },
    { name: "Water Resistance", value: "3 ATM" },
    { name: "Warranty", value: "1 Year" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        <Link href="/" className="hover:text-text-primary">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/collections/${product.category}`}
          className="hover:text-text-primary"
        >
          {product.category === "men" ? "Men" : product.category}
        </Link>
        <span>/</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
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
              <span className="rounded bg-text-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Best Seller
              </span>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{product.subtitle}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-star">
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
            <span className="text-sm font-bold text-text-primary">
              {product.rating}
            </span>
            <span className="text-sm text-text-secondary">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <span className="text-3xl font-extrabold text-text-primary">
              {formatPrice(product.price)}
            </span>
            {product.regularPrice > product.price && (
              <span className="mb-1 text-lg text-text-secondary line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="mb-1.5 rounded bg-sale-badge/10 px-2 py-0.5 text-xs font-bold text-sale-badge">
                {discount}% OFF
              </span>
            )}
          </div>

          <p className="mt-2 text-xs font-medium text-success">
            You save {formatPrice(product.regularPrice - product.price)} — Cash on
            Delivery available
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {outOfStock ? (
              <span className="rounded-md border border-sale-badge/40 bg-sale-badge/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sale-badge">
                Out of Stock
              </span>
            ) : stock <= 5 ? (
              <span className="rounded-md border border-sale-badge/40 bg-sale-badge/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sale-badge">
                Hurry — only {stock} left
              </span>
            ) : (
              <span className="rounded-md border border-success/40 bg-success/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
                In Stock
              </span>
            )}
            <span className="text-xs text-text-secondary">
              Product Code: {code}
            </span>
          </div>

          {product.colors.length > 0 && (
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary">
                  Color
                </h3>
                <span className="text-sm font-semibold text-text-primary">
                  {selectedColor}
                </span>
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
                        "flex h-10 w-10 items-center justify-center rounded-full border transition-all",
                        active
                          ? "border-text-primary"
                          : "border-border hover:border-text-secondary/50"
                      )}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-border bg-card-background">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-12 w-12 items-center justify-center text-text-primary transition-colors hover:text-sale-badge"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold tabular-nums text-text-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="flex h-12 w-12 items-center justify-center text-text-primary transition-colors hover:text-sale-badge"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className={cn(
                  "flex h-12 flex-1 items-center justify-center gap-2 bg-text-primary px-5 text-sm font-bold uppercase tracking-wider text-white transition-colors duration-300",
                  added ? "bg-success" : "hover:bg-sale-badge",
                  outOfStock && "cursor-not-allowed opacity-50"
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
                onClick={handleBuyNow}
                disabled={outOfStock}
                className="flex h-12 flex-1 items-center justify-center gap-2 border border-text-primary px-5 text-sm font-bold uppercase tracking-wider text-text-primary transition-colors hover:bg-text-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Zap className="h-4 w-4" />
                Buy It Now
              </button>
            </div>

            <button
              onClick={handleWishlist}
              aria-label="Toggle wishlist"
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-md border transition-all",
                wishlisted
                  ? "border-sale-badge bg-sale-badge/10 text-sale-badge"
                  : "border-border text-text-primary hover:border-sale-badge hover:text-sale-badge"
              )}
            >
              <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
            </button>

            <button
              onClick={handleShare}
              aria-label="Share product"
              className="flex h-12 w-12 items-center justify-center rounded-md border border-border text-text-primary transition-all hover:border-text-primary"
            >
              {copied ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <Share2 className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-2 py-3 text-center">
              <Truck className="h-5 w-5 text-sale-badge" />
              <span className="text-[11px] font-medium text-text-primary">
                Free Shipping
              </span>
              <span className="text-[10px] leading-tight text-text-secondary">
                Nationwide 3-5 days
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-2 py-3 text-center">
              <RotateCcw className="h-5 w-5 text-sale-badge" />
              <span className="text-[11px] font-medium text-text-primary">
                30-Day Returns
              </span>
              <span className="text-[10px] leading-tight text-text-secondary">
                Easy exchange & refund
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-2 py-3 text-center">
              <ShieldCheck className="h-5 w-5 text-sale-badge" />
              <span className="text-[11px] font-medium text-text-primary">
                1-Year Warranty
              </span>
              <span className="text-[10px] leading-tight text-text-secondary">
                International coverage
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex gap-6 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "border-b-2 pb-3 text-sm font-semibold uppercase tracking-wider transition-colors",
                    activeTab === tab
                      ? "border-text-primary text-text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-5 text-sm leading-relaxed text-text-secondary">
              {activeTab === "About" && (
                <p>
                  The {product.name} is a premium {product.subtitle.toLowerCase()}{" "}
                  from the CRYSMA collection. Featuring a precision quartz
                  movement, scratch-resistant mineral glass, and a stainless
                  steel case, it delivers reliable timekeeping with timeless
                  elegance. Perfect for daily wear and special occasions —
                  every piece is quality-checked before it ships.
                </p>
              )}
              {activeTab === "Overview & Specs" && (
                <table className="w-full">
                  <tbody>
                    {specs.map((spec) => (
                      <tr
                        key={spec.name}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-2.5 pr-4 font-medium text-text-primary">
                          {spec.name}
                        </td>
                        <td className="py-2.5">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "Warranty" && (
                <div className="space-y-3">
                  <p className="font-semibold text-text-primary">
                    1-Year International Warranty
                  </p>
                  <p>
                    Every CRYSMA timepiece is covered by a full 1-year warranty
                    from the date of purchase against any defects due to faulty
                    material or workmanship.
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Free nationwide shipping on all orders</li>
                    <li>Expected delivery: 3-5 business days</li>
                    <li>30-day hassle-free exchange & return policy</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sale-badge">
              You may also like
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
              Related Products
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
            {related.map((p) => (
              <RelatedCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        title={`Buy ${product.name}`}
        subtitle="Sign in to continue. Your purchased product code will be saved to your profile."
        onSuccess={proceedToCheckout}
      />
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  const discount = Math.round(
    ((product.regularPrice - product.price) / product.regularPrice) * 100
  );
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-lg border border-border bg-card-background transition-all duration-300 hover:border-text-primary/20 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="relative aspect-square overflow-hidden bg-background-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded bg-sale-badge px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
            -{discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-text-primary">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-text-secondary">{product.subtitle}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold text-text-primary">
            {formatPrice(product.price)}
          </span>
          {product.regularPrice > product.price && (
            <span className="text-xs text-text-secondary line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}