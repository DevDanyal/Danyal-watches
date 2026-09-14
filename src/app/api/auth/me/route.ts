import { connectToDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ok, err } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  if (!session) return ok(null);
  const conn = await connectToDb();
  if (!conn) return err("Database not configured.", 503);
  return ok({ name: session.name, email: session.email, role: session.role });
}