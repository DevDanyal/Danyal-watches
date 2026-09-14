import { NextResponse } from "next/server";

export function ok(data: unknown, init?: number) {
  return NextResponse.json({ ok: true, data }, { status: init ?? 200 });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}