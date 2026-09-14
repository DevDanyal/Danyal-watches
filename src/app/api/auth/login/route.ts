import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import { UserModel } from "@/lib/models";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { err } from "@/lib/api";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);

  const { email, password } = await request.json();
  if (!email || !password) return err("Email and password are required.");

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) return err("No account found with this email.", 404);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return err("Incorrect password.", 401);

  const token = await createSessionToken({ email: user.email, name: user.name, role: user.role });
  const res = NextResponse.json({
    ok: true,
    data: { name: user.name, email: user.email, role: user.role },
  });
  setSessionCookie(res, token);
  return res;
}