import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/tools",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;