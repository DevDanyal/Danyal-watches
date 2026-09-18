import { NextRequest } from "next/server";
import { ok, err } from "@/lib/api";

const validMethods = ["cod", "jazzcash", "easypaisa", "card", "bank"];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const method = body.paymentMethod;

  if (!validMethods.includes(method)) return err("Invalid payment method.", 400);
  if (!body.amount || body.amount <= 0) return err("Invalid amount.", 400);

  // Cash on Delivery is the primary, recommended payment method.
  if (method === "cod") {
    return ok({
      method,
      status: "pending",
      message: "Pay cash when your order arrives at your doorstep. No advance payment required.",
    });
  }

  if (method === "bank") {
    // Bank transfer — the customer pays into the store account and shares the slip via WhatsApp.
    return ok({
      method,
      status: "awaiting_confirmation",
      message: "Please transfer the total to our bank account and share the slip via WhatsApp for confirmation.",
    });
  }

  if (method === "jazzcash" || method === "easypaisa") {
    // In production: redirect to the respective gateway. Demo returns a reference.
    return ok({
      method,
      status: "pending",
      reference: `${method.toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      message: "Demo: substitute with real gateway credentials (JazzCash/EasyPaisa) here.",
    });
  }

  // "card" — in production this calls Stripe createCheckoutSession.
  // The store is a static demo; return a mock instead of requiring keys.
  return ok({
    method: "card",
    status: "demo",
    message: "Demo: point this route at Stripe createCheckoutSession with process.env.STRIPE_SECRET_KEY for real cards.",
  });
}