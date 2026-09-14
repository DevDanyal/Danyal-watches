import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

export function isDbConfigured() {
  return MONGODB_URI.length > 0;
}

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = { conn: null, promise: null };
}

export async function connectToDb() {
  if (!MONGODB_URI) return null;
  const cache = globalThis.mongooseCache!;
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => m);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}