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
  title: "psgpraveen ",
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
    title: "psgpraveen",
    description: "Portfolio of Praveen Kumar Gupta — Next.js, React, Node.js projects and services.",
    url: "https://psgpraveen.me",
    type: "website",
    images: [
      {
        url: "https://psgpraveen.me/images/psglogo.png",
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

    // Project Names & Types
    "Linktree Clone",
    "Bulk Email Sender",
    "Form Builder",
    "Movies Blocks UI",
    "E-Commerce Website",
    "News Website",
    "Live Chat App",
    "Video Conferencing App",
    "Robotic Arm IoT",
    "Tesla Coil Project",
    "Automatic Street Light LDR",

    // Project Features & Tech
    "Next.js Projects",
    "React Projects",
    "Modern Web Apps",
    "Open Source Projects",
    "GitHub Portfolio",
    "Live Demo",
    "UI/UX Projects",
    "IoT Projects",
    "Real-time Chat App",
    "Video Conferencing Web App",
    "Responsive Web UI",
    "Web Application Showcase",

    // Deployment & Analytics
    "Vercel Deployment",
    "Vercel App",
    "Google Analytics",
    "GA4",
    "NEXT_PUBLIC_URL",
    "NEXT_PUBLIC_GA_ID",
    ".env.local",

    // SEO & Social
    "Open Graph Portfolio",
    "Twitter Card Portfolio",
    "Structured Data Portfolio",
    "Schema.org Portfolio",
    "Portfolio Meta Tags",
    "Portfolio SEO",

    // My Services & Project Showcase (from MyService/page.tsx)
    "My Services",
    "Project Showcase",
    "Interior Design Website",
    "Interior Design Portfolio",
    "Production Ready Website",
    "High Performance Website",
    "GHSC Government School",
    "Government School Website",
    "Quality Education Website",
    "Holistic Development",
    "Modern School Facilities",
    "Academic Growth",
    "Personal Growth",
    "Website Carousel",
    "Animated Project Showcase",
    "Framer Motion Animation",
    "Image Slider",
    "Visit Website Button",
    "Production Use Website",
    "Professional Website",
    "Portfolio Website",
    "React Carousel",
    "Next.js Carousel",
    "Responsive Project Showcase",
    "Modern UI Showcase",
    "School Portfolio",
    "Design Portfolio",
    "Web Project Slider",
    "Animated Services Section",
    "Showcase Section",
    "Service Description",
    "Project Description",
    "Web Project Gallery",
    "Web Project Presentation",
    "Live Website Preview",
    "Website Preview",
    "Portfolio Gallery",
    "Web App Gallery",
    "Web App Portfolio",
    "Web App Showcase",
    "Animated Portfolio",
    "Portfolio Animation",
    "Interactive Portfolio",
    "Interactive Showcase",
    "Interactive Services",
    "React Project Gallery",
    "Next.js Project Gallery",
    "Modern Portfolio",
    "Modern Web Portfolio",
    "Modern Web Project",
    "Modern Web Service",
    "Web Service Portfolio",
    "Web Service Showcase",
    "Web Service Presentation",
    "Web Service Gallery",
    "Web Service Animation",

    // Personal & Role
    "psgpraveen",
    "psg praveen",
    "Psgpraveen",
    "Psg praveen",
    "Psg Praveen",
    "PSGPRAVEEN",
    "PSG Praveen",
    "psgprave",         // Added
    "psg prave",        // Added
    "Psgprave",         // Added
    "Psg prave",        // Added
    "Psg Prave",        // Added
    "PSGPRAVE",         // Added
    "PSG Prave",        // Added
    "JavaScript Developer",
    "Web Developer India",
    "Looking For Job",
    "JOB",
    "Software",
    "Software Developer",

    // Portfolio & Services
    "Portfolio",
    "psgpraveen Portfolio",
    "psgprave Portfolio",
    "My Project",
    "My Projects",
    "psgpraveen My Project",
    "psgprave My Project",
    "SEO Services",
    "Responsive Design",
    "Performance Optimization",

    // Example for other keywords (repeat for main sections)
    "Portfolio Projects",
    "psgpraveen Projects",
    "psgprave Projects",
    "My Project Projects",
    // Add similar/related keywords for each main section
    "Portfolio Work",
    "psgpraveen Work",
    "psgprave Work",
    "My Project Work",
    "Portfolio Tasks",
    "psgpraveen Tasks",
    "psgprave Tasks",
    "My Project Tasks",
    "Portfolio Solutions",
    "psgpraveen Solutions",
    "psgprave Solutions",
    "My Project Solutions",
    "Portfolio Creations",
    "psgpraveen Creations",
    "psgprave Creations",
    "My Project Creations",
    "Portfolio Development",
    "psgpraveen Development",
    "psgprave Development",
    "My Project Development",
    "Portfolio Showcase",
    "psgpraveen Showcase",
    "psgprave Showcase",
    "My Project Showcase",

    // More similar/related keywords
    "Portfolio Portfolio",
    "psgpraveen Portfolio",
    "psgprave Portfolio",
    "My Project Portfolio",
    "Portfolio Highlights",
    "psgpraveen Highlights",
    "psgprave Highlights",
    "My Project Highlights",
    "Portfolio Achievements",
    "psgpraveen Achievements",
    "psgprave Achievements",
    "My Project Achievements",
    "Portfolio Accomplishments",
    "psgpraveen Accomplishments",
    "psgprave Accomplishments",
    "My Project Accomplishments",
    "Portfolio Collection",
    "psgpraveen Collection",
    "psgprave Collection",
    "My Project Collection",
    "Portfolio Presentation",
    "psgpraveen Presentation",
    "psgprave Presentation",
    "My Project Presentation",
    "Portfolio Display",
    "psgpraveen Display",
    "psgprave Display",
    "My Project Display",
    "Portfolio List",
    "psgpraveen List",
    "psgprave List",
    "My Project List",
    "Portfolio Archive",
    "psgpraveen Archive",
    "psgprave Archive",
    "My Project Archive",
    "Portfolio Compilation",
    "psgpraveen Compilation",
    "psgprave Compilation",
    "My Project Compilation",
    "Portfolio Record",
    "psgpraveen Record",
    "psgprave Record",
    "My Project Record",
    "Portfolio Exhibit",
    "psgpraveen Exhibit",
    "psgprave Exhibit",
    "My Project Exhibit",

    // Skills
    "HTML CSS JavaScript",
    "React Skills",
    "Bootstrap",
    "AWS EC2 S3",

    // Projects & Case Studies
    "Portfolio Projects",
    "Web Applications",
    "React Case Study",
    "Node.js Examples",
    "Open Source Contributor",

    // Metrics & Testimonials
    "Years of Experience",

    // Contact & Support
    "Contact Developer",
    "Call Praveen",
    "Customer Support",

    // Certifications & Tools
    "Certifications Carousel",
    "CI/CD",
    "Figma",

    // Misc
    "Digital Company Services",
    "Smartphone Controlled Robotic Arm",
    "Automatic Street Light Project",
    "Wireless Power Transmission",
    "LDR Sensor Project",
    "Performance Monitoring",
    "Web Performance",

    // AvatarModel & 3D Model related keywords
    "Avatar Model",
    "Avatar 3D Model",
    "3D Avatar",
    "GLTF Model",
    "GLB Model",
    "React Three Fiber Avatar",
    "React Three Fiber Model",
    "useGLTF",
    "useAnimations",
    "3D Animation",
    "Animated Avatar",
    "3D Character",
    "3D Character Animation",
    "3D Model Viewer",
    "Three.js Avatar",
    "Three.js Model",
    "3D Model Preload",
    "Model Preloading",
    "3D Model Scene",
    "3D Model Actions",
    "3D Model Group",
    "3D Model Scale",
    "3D Model Position",
    "3D Model Primitive",
    "3D Model Import",
    "3D Model File",
    "3D Model Number",
    "3D Model Switch",
    "3D Model Loader",
    "3D Model Error",
    "3D Model Animation Play",
    "3D Model Animation Actions",
    "3D Model Animation Key",
    "3D Model Animation UseEffect",
    "3D Model Animation Control",
    "3D Model Animation Start",
    "3D Model Animation Scene",
    "3D Model Animation Group",
    "3D Model Animation Ref",
    "3D Model Animation Drei",
    "3D Model Animation React",
    "3D Model Animation useRef",
    "3D Model Animation useEffect",
    "3D Model Animation useAnimations",
    "3D Model Animation useGLTF",

    // GlobalCanvasBackground & visual effects keywords
    "psgpraveen Global Background",
    "psgpraveen Canvas Background",
    "psgpraveen 3D Background",
    "psgpraveen Visual Effects",
    "psgpraveen Snow Particles",
    "psgpraveen Snow Animation",
    "psgpraveen Stars",
    "psgpraveen OrbitControls",
    "psgpraveen Ambient Light",
    "psgpraveen Directional Light",
    "psgpraveen Float Animation",
    "psgpraveen Mesh Distort Material",
    "psgpraveen Sphere Geometry",
    "psgpraveen Pointer Events",
    "psgpraveen Mouse Move",
    "psgpraveen 3D Canvas",
    "psgpraveen Three.js Effects",
    "psgpraveen React Three Fiber",
    "psgpraveen Drei",
    "psgpraveen Animation",
    "psgpraveen 3D Visuals",
    "psgpraveen Interactive Background",
    "psgpraveen Animated Background",
    "psgpraveen Custom Background",
    "psgpraveen Fixed Background",
    "psgpraveen Fullscreen Canvas",

    // psgpraveen section & related keywords (from Hero)
    "psgpraveen Section",
    "psgpraveen Banner",
    "psgpraveen Animation",
    "psgpraveen 3D Canvas",
    "psgpraveen Overlay",
    "psgpraveen Text",
    "psgpraveen Title",
    "psgpraveen Subtitle",
    "psgpraveen Tagline",
    "psgpraveen Call To Action",
    "psgpraveen CTA",
    "psgpraveen Tech Stack",
    "psgpraveen Badges",
    "psgpraveen Projects Button",
    "psgpraveen Resume Button",
    "psgpraveen Download Resume",
    "psgpraveen View Projects",
    "psgpraveen Full Stack Developer",
    "psgpraveen Electronics Engineer",
    "psgpraveen Praveen",
    "psgpraveen Avatar",
    "psgpraveen Snow Particles",
    "psgpraveen Stars",
    "psgpraveen OrbitControls",
    "psgpraveen Canvas Layer",
    "psgpraveen Responsive",
    "psgpraveen Mobile Friendly",
    "psgpraveen Section Animation",
    "psgpraveen Framer Motion",
    "psgpraveen Next.js",
    "psgpraveen React",
    "psgpraveen Node.js",
    "psgpraveen MongoDB",
    "psgpraveen TypeScript",
    "psgpraveen IoT",
    "psgpraveen Three.js",
    "psgpraveen 3D Model",
    "psgpraveen Interactive",
    "psgpraveen Modern UI",
    "psgpraveen Digital Solutions",
    "psgpraveen Web Experiences",
    "psgpraveen Intelligent Systems",
    "psgpraveen Smart Automation",
    "psgpraveen Software Electronics",
    "psgpraveen Impact",
    "psgpraveen Portfolio",
  ];

  // Title must be string
  const titleString = metadata.title as string;
  

  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8510113161583635"
     crossorigin="anonymous"></script>
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

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8510113161583635"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

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
