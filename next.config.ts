import type { NextConfig } from 'next'
import withMDX from '@next/mdx'

// Tell the MDX plugin which extensions to handle
const mdxExtensions = /\.(md|mdx)$/

// Base Next.js config
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Include MDX files in page routing
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
  // …any other Next.js config options you already have
}

// Wrap it with MDX support
export default withMDX({
  // Pass your base Next config
  ...nextConfig,
  // Configure the MDX plugin
  extension: mdxExtensions
})
