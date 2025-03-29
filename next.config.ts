import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env.local

const nextConfig: NextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY, // Expose API key (be careful with security)
  },
};

export default nextConfig;
