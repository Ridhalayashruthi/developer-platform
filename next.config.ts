import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/categories/:path*",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/cheatsheets",
        destination: "/roadmaps",
        permanent: true,
      },
      {
        source: "/cheatsheets/:path*",
        destination: "/roadmaps",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;