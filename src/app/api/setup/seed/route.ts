import { connectToDb } from "@/lib/db";
import { ProductModel, UserModel } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ok, err } from "@/lib/api";
import { products } from "@/lib/data/products";
import { getProductStock } from "@/lib/data/products";
import bcrypt from "bcryptjs";

export async function POST() {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);

  const userCount = await UserModel.estimatedDocumentCount();
  if (userCount === 0) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
      await UserModel.create({
        name: "Admin",
        email: adminEmail.toLowerCase(),
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: "admin",
      });
    }
  }

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
    stock: getProductStock(p),
    status: "published" as const,
  }));

  await ProductModel.insertMany(docs);
  return ok({ seeded: docs.length }, 201);
}