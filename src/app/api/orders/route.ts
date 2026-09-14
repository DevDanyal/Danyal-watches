import { NextRequest } from "next/server";
import { connectToDb } from "@/lib/db";
import { OrderModel } from "@/lib/models";
import { getSession, requireAdmin } from "@/lib/auth";
import { ok, err } from "@/lib/api";

export async function GET(request: NextRequest) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);

  const session = await getSession();
  if (!session) return err("Unauthorized: sign in required.", 401);

  const isAdmin = await requireAdmin();
  const orders = isAdmin
    ? await OrderModel.find().sort({ createdAt: -1 }).limit(100).lean()
    : await OrderModel.find({ email: session.email }).sort({ createdAt: -1 }).limit(100).lean();

  return ok(orders);
}

export async function POST(request: NextRequest) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);

  const body = await request.json();
  if (!body?.items?.length) return err("Order has no items.");
  if (!body?.email) return err("Email is required.");

  const orderId = body.orderId ?? `CRYSMA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  try {
    const order = await OrderModel.create({
      orderId,
      email: body.email.toLowerCase(),
      customerName: body.customerName ?? "",
      phone: body.phone ?? "",
      address: body.address ?? "",
      city: body.city ?? "",
      province: body.province ?? "",
      items: body.items,
      subtotal: body.subtotal ?? 0,
      shipping: body.shipping ?? 0,
      total: body.total ?? body.subtotal ?? 0,
      paymentMethod: body.paymentMethod ?? "cod",
      status: "pending",
    });
    return ok({ orderId: order.orderId }, 201);
  } catch {
    return err("Could not create order.");
  }
}