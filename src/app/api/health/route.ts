import { connectToDb, isDbConfigured } from "@/lib/db";
import { ok } from "@/lib/api";

export async function GET() {
  const configured = isDbConfigured();
  const conn = configured ? await connectToDb() : null;
  return ok({
    status: conn ? "connected" : configured ? "error" : "not_configured",
    database: configured ? "mongodb" : "local_fallback",
    hint: configured
      ? "MongoDB connected."
      : "Add MONGODB_URI to .env.local. The site currently runs on in-browser localStorage.",
  });
}