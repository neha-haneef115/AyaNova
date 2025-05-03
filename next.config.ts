// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Environment variables configuration
  env: {
    // Remove client-side exposed secrets
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT
  },

  // Security headers for Vercel
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self' vercel.live vitals.vercel-insights.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src 'none'; object-src 'none'`
          },
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
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          }
        ],
      },
    ];
  },

  // Modern Next.js 15 features optimized for Vercel
  experimental: {
    optimizePackageImports: [
      '@heroicons/react/20/solid',
      '@heroicons/react/24/outline',
      'lucide-react'
    ],
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: [
        process.env.NEXT_PUBLIC_VERCEL_URL 
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : 'localhost:3000',
        'https://aya-nova-neha-haneef115-neha-haneefs-projects.vercel.app'
      ]
    },
  },

  // Production optimizations for Vercel
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  // Built-in font optimization (replace webpack config)
  optimizeFonts: true,
  optimizeCss: true,
};

export default nextConfig;