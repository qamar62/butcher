import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are served straight from Unsplash's CDN (already resized via URL params).
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
