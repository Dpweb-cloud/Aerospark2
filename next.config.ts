import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.trycloudflare.com",
  ],
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
  ],
};

export default nextConfig;