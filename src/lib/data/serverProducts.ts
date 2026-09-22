import { connectToDb, isDbConfigured } from "@/lib/db";
import { ProductModel } from "@/lib/models";
import {
  products as seedProducts,
  getProductCode,
  getProductStock,
  type Product,
} from "@/lib/data/products";

export type StoreProduct = Product & {
  _id: string;
  stock: number;
  status: "draft" | "published";
  description?: string;
};

const DEFAULT_IMAGE = "/images/products/images (17).jpg";
const DEFAULT_COLORS = [
  { name: "Full Black", hex: "#0A0A0A" },
  { name: "Golden", hex: "#C9A96E" },
];

export type DbProductDoc = {
  _id: unknown;
  slug?: string;
  sku?: string;
  name?: string;
  category?: string;
  subtitle?: string;
  price?: number;
  regularPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  colors?: { name: string; hex: string }[];
  images?: string[];
  stock?: number;
  status?: string;
  description?: string;
};

export function toStoreProduct(doc: DbProductDoc): StoreProduct {
  const id = String(doc._id);
  const slug = doc.slug ?? `product-${id}`;
  const name = doc.name ?? "Danyal Watch";
  return {
    id,
    _id: id,
    slug,
    code: doc.sku || getProductCode({ slug }),
    name,
    category: doc.category || "men",
    subtitle: doc.subtitle || name,
    price: doc.price ?? 0,
    regularPrice: doc.regularPrice ?? doc.price ?? 0,
    rating: doc.rating ?? 0,
    reviews: doc.reviews ?? 0,
    badge: doc.badge as Product["badge"] | undefined,
    isNew: doc.badge === "new",
    isBestSeller: doc.badge === "bestseller",
    colors: doc.colors?.length ? doc.colors : DEFAULT_COLORS,
    images: doc.images?.length ? doc.images : [DEFAULT_IMAGE],
    stock: doc.stock ?? getProductStock({ slug }),
    status: (doc.status as StoreProduct["status"]) ?? "draft",
    description: doc.description,
  };
}

const toStoreProductFromSeed = (p: Product): StoreProduct => ({
  ...p,
  _id: p.id,
  stock: getProductStock(p),
  status: "published",
});

export async function getPublishedProducts(): Promise<Product[]> {
  if (isDbConfigured()) {
    try {
      const conn = await connectToDb();
      if (conn) {
        const docs = await ProductModel.find({ status: "published" })
          .sort({ _id: 1 })
          .lean();
        if (docs.length) return docs.map((d) => toStoreProduct(d));
      }
    } catch {
      // fall through to seed data
    }
  }
  return seedProducts;
}

export async function getStoreProductBySlug(
  slug: string
): Promise<StoreProduct | null> {
  if (isDbConfigured()) {
    try {
      const conn = await connectToDb();
      if (conn) {
        const doc = await ProductModel.findOne({ slug, status: "published" }).lean();
        if (doc) return toStoreProduct(doc);
      }
    } catch {
      // fall through to seed lookup
    }
  }
  const seed = seedProducts.find((p) => p.slug === slug);
  return seed ? toStoreProductFromSeed(seed) : null;
}