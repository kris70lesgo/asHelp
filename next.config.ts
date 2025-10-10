import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "@lottiefiles/dotlottie-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withBundleAnalyzer(nextConfig);