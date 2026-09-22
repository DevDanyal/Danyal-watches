import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { connectToDb, isDbConfigured } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { err } from "@/lib/api";
import bcrypt from "bcryptjs";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return err("Invalid request body.");
  }

  const email = (body?.email ?? "").toString().trim().toLowerCase();
  const password = (body?.password ?? "").toString();
  if (!email || !password) return err("Email and password are required.");

  if (isDbConfigured()) {
    const conn = await connectToDb();
    if (!conn) return err("Database not ready.", 503);

    const user = await UserModel.findOne({ email });
    if (!user) return err("No account found with this email.", 404);
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return err("Incorrect password.", 401);
    if (user.role !== "admin") {
      return err("Forbidden: this account is not an administrator.", 403);
    }

    let token: string;
    try {
      token = await createSessionToken({ email: user.email, name: user.name, role: "admin" });
    } catch (e) {
      return err((e as Error).message, 500);
    }
    const res = NextResponse.json({ ok: true, data: { email: user.email, role: "admin" } });
    setSessionCookie(res, token);
    return res;
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!adminEmail || !adminPassword) {
    return err(
      "Admin access is locked. The site owner must set ADMIN_EMAIL and ADMIN_PASSWORD (or connect a database) to enable the admin panel.",
      503
    );
  }
  if (
    !safeEqual(email, adminEmail.trim().toLowerCase()) ||
    !safeEqual(password, adminPassword)
  ) {
    return err("Incorrect email or password.", 401);
  }

  let token: string;
  try {
    token = await createSessionToken({ email, name: "Admin", role: "admin" });
  } catch (e) {
    return err((e as Error).message, 500);
  }
  const res = NextResponse.json({ ok: true, data: { email, role: "admin" } });
  setSessionCookie(res, token);
  return res;
}