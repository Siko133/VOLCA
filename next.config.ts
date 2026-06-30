import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dpwvhkrcaiekecvkqskp.supabase.co",
      },
    ],
  },
};

export default nextConfig;