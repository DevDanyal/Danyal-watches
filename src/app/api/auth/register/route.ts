import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { err } from "@/lib/api";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);

  const { name, email, password } = await request.json();
  if (!name || !email || !password) return err("Name, email and password are required.");
  if (password.length < 6) return err("Password must be at least 6 characters.");

  const existing = await UserModel.findOne({ email: email.toLowerCase() });
  if (existing) return err("An account with this email already exists.", 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ name, email: email.toLowerCase(), passwordHash, role: "customer" });

  const token = await createSessionToken({ email: user.email, name: user.name, role: user.role });
  const res = NextResponse.json({
    ok: true,
    data: { name: user.name, email: user.email, role: user.role },
  });
  setSessionCookie(res, token);
  return res;
}