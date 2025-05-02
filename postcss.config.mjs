/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Optional: if you want to ignore TypeScript errors during build
  },
  experimental: {
    appDir: true, // Only if you're using the App Router
  },
  // PostCSS configuration should be in a separate postcss.config.js file
  // But if you want to include it here:
  postcssLoaderOptions: {
    postcssOptions: {
      plugins: [
        'tailwindcss',
        'autoprefixer',
        
      ],
    },
  },
};

module.exports = nextConfig;