import { connectToDb } from "@/lib/db";
import { ProductModel } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ok, err } from "@/lib/api";
import { products } from "@/lib/data/products";

export async function POST() {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  if (!(await requireAdmin())) return err("Unauthorized: admin only.", 401);

  const count = await ProductModel.estimatedDocumentCount();
  if (count > 0) return ok({ seeded: 0, message: "Products already exist — skipping." });

  const docs = products.map((p, i) => ({
    name: p.name,
    subtitle: p.subtitle,
    category: p.category,
    slug: p.slug,
    price: p.price,
    regularPrice: p.regularPrice,
    rating: p.rating,
    reviews: p.reviews,
    badge: p.badge,
    colors: p.colors,
    images: p.images,
    sku: `CRL-${1000 + i}`,
    stock: [12, 8, 3, 0, 15, 6, 2, 9][i % 8],
    status: "published" as const,
  }));

  await ProductModel.insertMany(docs);
  return ok({ seeded: docs.length }, 201);
}