import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental optimizations
  experimental: {
    // Optimize CSS - helps with render-blocking CSS (requires 'critters' package)
    optimizeCss: true,
  },
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Modularize imports for tree-shaking (reduces unused JS)
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
    },
  },
  // React optimizations
  reactStrictMode: true,
  // Reduce bundle size by externalizing packages that shouldn't be bundled
  serverExternalPackages: ['feed'],
};

export default nextConfig;

