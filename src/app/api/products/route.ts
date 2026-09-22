import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/db";
import { ProductModel } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { toStoreProduct } from "@/lib/data/serverProducts";
import { ok, err } from "@/lib/api";

export async function GET(request: NextRequest) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured. Set MONGODB_URI.", 503);

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const onlyPublished = searchParams.get("published") !== "false";

  const filter: Record<string, unknown> = {};
  if (onlyPublished) filter.status = "published";
  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }

  const docs = await ProductModel.find(filter).sort({ _id: 1 }).lean();
  return ok(docs.map((d) => toStoreProduct(d)));
}

export async function POST(request: NextRequest) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  const admin = await requireAdmin();
  if (!admin) return err("Unauthorized: admin only.", 401);

  const body = await request.json();
  const slug = body.slug ?? body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  try {
    const product = await ProductModel.create({ ...body, slug });
    return ok(product, 201);
  } catch {
    return err("Could not create product. Slug may already exist.");
  }
}