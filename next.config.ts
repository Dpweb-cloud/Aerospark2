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
  images: {
    remotePatterns: [
      // NASA images
      { protocol: "https", hostname: "apod.nasa.gov" },
      { protocol: "https", hostname: "*.nasa.gov" },
      // Spaceflight News sources
      { protocol: "https", hostname: "*.spaceflightnow.com" },
      { protocol: "https", hostname: "*.spacenews.com" },
      { protocol: "https", hostname: "*.nasaspaceflight.com" },
      { protocol: "https", hostname: "cdn.mos.cms.futurecdn.net" },
      { protocol: "https", hostname: "*.universetoday.com" },
      { protocol: "https", hostname: "*.space.com" },
      { protocol: "https", hostname: "*.sciencealert.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Generic
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;