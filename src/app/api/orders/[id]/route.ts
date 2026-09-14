import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/db";
import { OrderModel } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ok, err } from "@/lib/api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  const { id } = await params;
  const order = await OrderModel.findOne({ orderId: id }).lean();
  if (!order) return err("Order not found.", 404);
  return ok(order);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  if (!(await requireAdmin())) return err("Unauthorized: admin only.", 401);

  const { id } = await params;
  const { status, ...body } = await request.json();
  const order = await OrderModel.findOneAndUpdate(
    { orderId: id },
    { ...(status ? { status } : body) },
    { new: true }
  ).lean();
  if (!order) return err("Order not found.", 404);
  return ok(order);
}