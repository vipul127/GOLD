import type { NextConfig } from "next";
import path from "node:path";



const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* turbopack: {
    // rules: {
    //   "*.{jsx,tsx}": {
    //     loaders: [LOADER]
    //   }
    // }
  } */
};

export default nextConfig;
// Orchids restart: 1770280251340
