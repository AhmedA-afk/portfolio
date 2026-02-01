import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental optimizations
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Modularize imports for tree-shaking
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
    },
  },
  // React optimizations
  reactStrictMode: true,
};

export default nextConfig;
