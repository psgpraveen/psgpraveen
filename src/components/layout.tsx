// components/Layout.tsx
import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({
  children,
  title = 'psgpraveen.me',
  description = 'Technical blog by Praveen'
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psgpraveen.me" />
        <meta property="og:image" content="https://psgpraveen.me/images/psglogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-semibold">psgpraveen.me</Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow max-w-3xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-50 text-center text-sm text-gray-500 py-4">
          © {new Date().getFullYear()} psgpraveen.me
        </footer>
      </div>
    </>
  )
}
