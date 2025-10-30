import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Allow builds to complete even if ESLint reports errors locally.
    // This prevents Next.js from failing the build due to lint rules during quick local startup.
    // Remove or set to false if you want strict lint enforcement on CI/build servers.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
