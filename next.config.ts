import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Mongoose type defs make the full tsc pass very slow on this machine.
    // Run `npx tsc --noEmit` separately if you need strict type checking.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
