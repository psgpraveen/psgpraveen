// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import GlobalCanvasBackground from "@/components/GlobalCanvasBackground";
import { Toaster } from "react-hot-toast";
import Seo from "@/components/Seo";
import Script from "next/script";
import { layoutKeywords } from "@/data/seoKeywords";

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

  description:
    "Praveen Kumar Gupta — Full Stack Developer. View projects in Next.js, React, Node.js, and more.",
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
    description:
      "Portfolio of Praveen Kumar Gupta — Next.js, React, Node.js projects and services.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Title must be string
  const titleString = metadata.title as string;

  // WebSite Schema for enhanced search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "psgpraveen - Praveen Kumar Gupta Portfolio",
    alternateName: "Praveen Kumar Gupta",
    url: "https://psgpraveen.me",
    description:
      "Professional portfolio of Praveen Kumar Gupta, Full Stack Developer specializing in Next.js, React, Node.js, and modern web technologies",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://psgpraveen.me?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    creator: {
      "@type": "Person",
      name: "Praveen Kumar Gupta",
      url: "https://psgpraveen.me",
    },
  };

  // Person/Professional Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Praveen Kumar Gupta",
    url: "https://psgpraveen.me",
    image: "https://psgpraveen.me/images/psglogo.png",
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description:
      "Experienced Full Stack Developer specializing in Next.js, React, Node.js, MongoDB, and modern web technologies. Expert in building scalable web applications, IoT projects, and automation systems.",
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web Development",
      "SEO Optimization",
      "UI/UX Design",
      "IoT Projects",
      "Arduino",
      "Robotics",
      "API Development",
      "Full Stack Development",
    ],
    sameAs: [
      "https://github.com/psgpraveen",
      "https://linkedin.com/in/psgpraveen",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Engineering College",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7985942726",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "psgpraveen Web Development Services",
    description:
      "Professional web development and software engineering services including custom website development, web applications, SEO optimization, and IoT solutions",
    provider: {
      "@type": "Person",
      name: "Praveen Kumar Gupta",
    },
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "API Development",
      "Database Design",
      "SEO Optimization",
      "Web Performance Optimization",
      "UI/UX Design",
      "Responsive Web Design",
      "E-commerce Development",
      "Custom Web Applications",
      "IoT Solutions",
      "Arduino Projects",
      "Robotics Projects",
    ],
  };

  // Breadcrumb Schema for homepage
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://psgpraveen.me",
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        {/* Enhanced SEO Structured Data Schemas */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="professional-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
          strategy="beforeInteractive"
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          strategy="beforeInteractive"
        />

        {/* Advanced Meta Tags for Better SEO */}
        <meta name="author" content="Praveen Kumar Gupta" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <link rel="canonical" href="https://psgpraveen.me" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Varanasi" />
        <meta name="geo.position" content="25.3176;82.9739" />
        <meta name="ICBM" content="25.3176, 82.9739" />

        {/* Language */}
        <meta httpEquiv="content-language" content="en" />
        <link rel="alternate" hrefLang="en" href="https://psgpraveen.me" />
        <link rel="alternate" hrefLang="hi" href="https://psgpraveen.me" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://psgpraveen.me"
        />

        {/* Verification Tags (Add your verification codes) */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}

        {/* <Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8510113161583635"
  strategy="afterInteractive"
  crossOrigin="anonymous"
/> */}
        <meta
          name="google-adsense-account"
          content="ca-pub-8510113161583635"></meta>
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
          keywords={layoutKeywords}
          image="/images/psglogo.png"
          author="Praveen Kumar Gupta"
        />
        <meta name="keywords" content={layoutKeywords.join(", ")} />
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
