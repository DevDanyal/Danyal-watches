import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { ok, err } from "@/lib/api";

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return err("Unauthorized: admin only.", 401);

  const body = await request.json().catch(() => ({}));
  const slug = typeof body?.slug === "string" ? body.slug : null;

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/track-order");
  revalidatePath("/account");
  revalidatePath("/collections/[slug]", "page");
  revalidatePath("/products/[slug]", "page");
  if (slug) revalidatePath(`/products/${slug}`, "page");

  return ok({ revalidated: true });
}