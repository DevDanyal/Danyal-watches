import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SECRET = process.env.AUTH_SECRET ?? "";

export function authSecretConfigured(): boolean {
  return SECRET.length > 0;
}

export type SessionUser = {
  email: string;
  name: string;
  role: "admin" | "customer";
};

export async function createSessionToken(user: SessionUser) {
  if (!authSecretConfigured()) {
    throw new Error("AUTH_SECRET is not configured.");
  }
  return await new SignJWT({ role: user.role, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(SECRET));
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  if (!authSecretConfigured()) return null;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET));
    return {
      email: payload.sub ?? "",
      name: (payload.name as string) ?? "",
      role: (payload.role as SessionUser["role"]) ?? "customer",
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get("danyal_session")?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set("danyal_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function requireAdmin() {
  const session = await getSession();
  return session?.role === "admin" ? session : null;
}