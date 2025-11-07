import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove i18n config - using react-i18next instead for App Router
  experimental: {
    // Add any experimental features you need here
  },
  // Fix multiple lockfiles warning
  outputFileTracingRoot: __dirname,
}

export default nextConfig;
