import { NextRequest } from "next/server";
import { connectToDb, isDbConfigured } from "@/lib/db";
import { ContactMessageModel } from "@/lib/models";
import { ok, err } from "@/lib/api";

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };
  try {
    body = await request.json();
  } catch {
    return err("Invalid request body.");
  }

  const name = (body?.name ?? "").toString().trim();
  const email = (body?.email ?? "").toString().trim().toLowerCase();
  const message = (body?.message ?? "").toString().trim();

  if (!name || !message) return err("Name and message are required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return err("Please enter a valid email address.");
  }

  if (!isDbConfigured()) {
    return ok({ stored: false, note: "Demo mode — saved in the visitor's browser." });
  }

  const conn = await connectToDb();
  if (!conn) return err("Database not ready.", 503);

  try {
    const saved = await ContactMessageModel.create({
      name,
      email,
      phone: (body?.phone ?? "").toString().trim(),
      subject: (body?.subject ?? "").toString().trim(),
      message,
    });
    return ok({ stored: true, id: saved._id }, 201);
  } catch {
    return err("Could not save your message.");
  }
}