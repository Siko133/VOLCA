import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dpwvhkrcaiekecvkqskp.supabase.co"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "dpwvhkrcaiekecvkqskp.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;