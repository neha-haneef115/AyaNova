// next.config.ts
import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          }
        ],
      },
    ];
  },

  // Modern Next.js 15 features (Turbopack compatible)
  experimental: {
    optimizePackageImports: [
      '@heroicons/react',
      'lucide-react'
    ],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: [
        process.env.VERCEL_ENV === 'production'
          ? 'your-production-domain.com'
          : process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}`
            : 'localhost:3000'
      ]
    },
  },

  // Production optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  // Webpack configuration (only if you need specific loaders)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  }
};

export default nextConfig;