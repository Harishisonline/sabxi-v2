import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,  // match the live site URLs
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      { protocol: "https", hostname: "www.google.com" },
    ],
  },
};

export default nextConfig;
