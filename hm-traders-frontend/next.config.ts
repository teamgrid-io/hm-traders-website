import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ REQUIRED for static export

  images: {
    unoptimized: true, // ✅ MUST be true for static export
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;