import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/peoples",
        permanent: true,
      }
    ]
  }  
};

export default nextConfig;
