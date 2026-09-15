import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/db";
import { ProductModel } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ok, err } from "@/lib/api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  if (!(await requireAdmin())) return err("Unauthorized: admin only.", 401);

  const { id } = await params;
  const body = await request.json();
  const { _id, createdAt, updatedAt, ...patch } = body;
  void _id;
  void createdAt;
  void updatedAt;

  const product = await ProductModel.findByIdAndUpdate(id, patch, { new: true }).lean();
  if (!product) return err("Product not found.", 404);
  return ok(product);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  if (!(await requireAdmin())) return err("Unauthorized: admin only.", 401);

  const { id } = await params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) return err("Product not found.", 404);
  return ok({ deleted: true });
}