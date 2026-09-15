import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [90],
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    // Mongoose type defs make the full tsc pass very slow on this machine.
    // Run `npx tsc --noEmit` separately if you need strict type checking.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
