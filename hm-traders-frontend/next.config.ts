import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    dangerouslyAllowLocalIP: true, // ⭐ important
    domains: ["localhost"],
  },

};

export default nextConfig;
