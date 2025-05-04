// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import GlobalCanvasBackground from "@/components/GlobalCanvasBackground";
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praveen | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased ">
        <div className="relative min-h-screen ">
          <GlobalCanvasBackground />
          <Toaster position="top-right" />

          {children}
        </div>
      </body>
    </html>
  );
}
