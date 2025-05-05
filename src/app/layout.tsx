// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import GlobalCanvasBackground from "@/components/GlobalCanvasBackground";
import { Toaster } from "react-hot-toast";
import Seo from "@/components/Seo";
import Script from "next/script";

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

// Next.js built‑in metadata
export const metadata: Metadata = {
  title: "Praveen | Portfolio",
  description: "Praveen Kumar Gupta — Full Stack Developer. View projects in Next.js, React, Node.js, and more.",
  keywords: [
    "Praveen Kumar Gupta",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "React Native",
    "Web Development",
    "SEO",
    "Portfolio",
    "Freelance Developer",
    "Hire Web Developer",
    "psgpraveen.me",
  ],
  openGraph: {
    title: "Praveen | Portfolio",
    description: "Portfolio of Praveen Kumar Gupta — Next.js, React, Node.js projects and services.",
    url: "https://psgpraveen.me",
    type: "website",
    images: [
      {
        url: "https://psgpraveen.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Praveen Kumar Gupta Portfolio",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Expanded keywords covering domain, projects, services, technologies
  const allKeywords = [
    // Branding & Domain
    "Praveen Kumar Gupta",
    "psgpraveen.me",
    "Praveen Portfolio",
    "Portfolio Next.js React",
    "Portfolio Full Stack Developer",

    // Core Tech
    "Next.js Developer",
    "React Developer",
    "Node.js Backend",
    "Express.js APIs",
    "MongoDB NoSQL",
    "React Native Apps",
    "Tailwind CSS Design",
    "DaisyUI Components",
    "Framer Motion Animations",
    "Three.js 3D Canvas",
    "React Three Fiber",

    // Services
    "Web Development Services",
    "SEO Optimization",
    "Performance Tuning",
    "Responsive Web Design",
    "Accessibility Audit",
    "UI/UX Design",

    // Projects
    "Programmable Robotic Arm",
    "Smartphone Controlled Arm",
    "4 DOF Robotic Arm Project",
    "LDR Street Light Automation",
    "Automatic Street Light",
    "Wireless Power Transmission",
    "Tesla Coil Demo",
    "Interior Design Website",
    "Government School Website",
    "GHSC School Website",

    // Metrics & Feedback
    "Projects Completed",
    "Client Testimonials",
    "User Feedback",
    "Testimonials Section",

    // Contact
    "Contact Praveen",
    "+91 7985942726",
    "WhatsApp Chat",
    "Link to Call",
    "Get in Touch",

    // Tools & CI/CD
    "GitHub Actions",
    "CI/CD Workflows",
    "Docker Containerization",
    "AWS EC2 Hosting",
    "Vercel Deployment",
    "Netlify Hosting",
    "Firebase Realtime Database",
    "Postman API Testing",

    // Certifications
    "Professional Certifications",
    "Technical Certifications",
    "Developer Certificates",
  ];

  // Title must be string
  const titleString = metadata.title as string;
  

  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Site‑wide SEO */}
        <Seo
          title={titleString}
          description={metadata.description!}
          keywords={allKeywords}
          image='/images/psglogo.png'
          author="Praveen Kumar Gupta"
        />
      </head>
      <body className="antialiased">
        <div className="relative min-h-screen">
          <GlobalCanvasBackground />
          <Toaster position="bottom-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
