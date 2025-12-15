import type { NextConfig } from 'next'
import withMDX from '@next/mdx'

// Tell the MDX plugin which extensions to handle
const mdxExtensions = /\.(md|mdx)$/

// Base Next.js config
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Include MDX files in page routing
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
  
  // Performance optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Compression
  compress: true,
  
  // Optimize production builds
  swcMinify: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons', '@react-three/fiber', '@react-three/drei'],
  },
}

// Wrap it with MDX support
export default withMDX({
  // Pass your base Next config
  ...nextConfig,
  // Configure the MDX plugin
  extension: mdxExtensions
})
