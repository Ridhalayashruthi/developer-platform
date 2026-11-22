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
      {
        source: "/tools/duplicate-line-remover",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/hmac-generator",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/image-compressor",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/tools/subnet-calculator",
        destination: "/tools",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
