import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Trim bundle size by optimizing ESM imports for these libraries
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "react-fast-marquee",
    ],
  },
  eslint: {
    // Allow builds to complete while we iterate on lint/type fixes
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
