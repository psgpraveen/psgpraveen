import Hero from "@/components/Hero";
import Card from "@/app/Component/skill/page";
import Status from "@/app/Component/status/page";
import PROJECT from "@/app/Component/project/page";
import MyServices from "@/app/Component/MyService/page";
import Comment from "@/app/Component/comment/page";
import Phone from "@/app/Component/Phone/page";
import Cert from "@/app/Component/carousel/page";
import Feedback from "@/app/Component/feedback/page";
import Footer from "@/app/Component/Footer/page";
import Seo from "@/components/Seo";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const allKeywords = [
    // Personal & Role
    "Praveen Kumar Gupta","psgpraveen","psg praveen","Psgpraveen","Psg praveen","Psg Praveen","PSGPRAVEEN","PSG Praveen",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript Developer",
    "Web Developer India",
    "Freelance Developer",
    "Hire Web Developer","Looking For Job","JOB","Software","Software Developer","Than",

    // Portfolio & Services
    "Portfolio Website",
    "Web Development Services",
    "SEO Services",
    "Responsive Design",
    "Performance Optimization",
    "UI/UX Design",
    "Accessibility",

    // Skills
    "HTML CSS JavaScript",
    "React Skills",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Bootstrap",
    "Docker",
    "AWS EC2 S3",

    // Projects & Case Studies
    "Portfolio Projects",
    "Web Applications",
    "Next.js Projects",
    "React Case Study",
    "Node.js Examples",
    "Open Source Contributor",

    // Metrics & Testimonials
    "Projects Completed",
    "Years of Experience",
    "Client Testimonials",
    "User Feedback",
    "Testimonials Section",

    // Contact & Support
    "Contact Developer",
    "Call Praveen",
    "WhatsApp Chat",
    "Customer Support",
    "Get in Touch",

    // Certifications & Tools
    "Professional Certifications",
    "Technical Certifications",
    "Certifications Carousel",
    "GitHub Actions",
    "CI/CD",
    "Figma",
    "Postman",

    // Misc
    "Digital Company Services",
    "Smartphone Controlled Robotic Arm",
    "Automatic Street Light Project",
    "Wireless Power Transmission",
    "LDR Sensor Project",
    "Performance Monitoring",
    "Web Performance",

    // Website Builder Specific Keywords
    "Website Builder Expert",
    "Custom Website Development",
    "Business Website Developer",
    "E-commerce Website Builder",
    "WordPress Development",
    "Shopify Expert",
    "Small Business Websites",
    "Website Builder for Startups",
    "Local Business Website Design",
    "Affordable Website Developer",
    "Website Builder Near Me",
    "Website Maintenance Services",
    "Custom Web Design Solutions",
    "Professional Website Services",
    "Website Redesign Specialist",
    "Landing Page Development",

    // Location Keywords
    "Website Developer in Varanasi",
    "Web Designer in Ayodhya",
    "Website Builder Varanasi",
    "SEO Services Ayodhya",
    "Uttar Pradesh Web Developer",
    "Website Development Varanasi",
    "Ayodhya Website Design",
    "E-commerce Website Varanasi",
    "Business Website Ayodhya",
    "Local Web Developer UP",
    "Website Services Prayagraj",
    "Web Design Lucknow",
    "Affordable Website Varanasi",
    "UP Tech Services",
    "Banaras Web Development",

    // India-Wide Keywords
    "Indian Web Developer",
    "Top Developer India",
    "Website Development India",
    "Full Stack Developer India",
    "E-commerce Website India",
    "React Developer India",
    "Next.js Expert India",
    "Remote Web Developer India",
    "Technology Consultant India",
    "Web Services Delhi",
    "Website Design Mumbai",
    "Web Developer Bangalore",
    "SEO Services India",

    // Global Keywords
    "International Web Developer",
    "Offshore Development Services",
    "Remote Developer for Hire",
    "Global Web Solutions",
    "Cross-border Web Development",
    "International E-commerce Developer",
    "Worldwide Web Services",
    "Virtual Developer Team",
    "Remote Tech Partner",
    "Outsource Web Development",
    "English-Speaking Developer",
    "Time Zone Friendly Developer",
    "Global Tech Solutions",

    // Remote Work Keywords
    "Remote Web Developer",
    "Freelance Next.js Developer",
    "Work From Home Developer",
    "Virtual Web Development",
    "Hire Remote Developer",
    "Freelance Web Services",
    "Online Web Developer",
    "Remote Tech Talent",
    "Distance Web Development",
    "Distributed Team Developer",
  ];

  const openGraph = {
    title: "psgpraveen",
    description:
      "Explore the portfolio, skills, and services of Praveen Kumar Gupta, a Full Stack Developer specializing in Next.js, React, Node.js, and modern web technologies.",
    url: "https://psgpraveen.me",
    type: "website" as const,
    images: [
      {
        url: "https://psgpraveen.me/images/psglogo.png", 
        width: 1200,
        height: 630,
        alt: "Praveen Kumar Gupta - Full Stack Developer",
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Praveen Kumar Gupta",
    "url": "https://psgpraveen.me",
    "jobTitle": "Remote Full Stack Developer & Website Builder",
    "description": "Professional freelance website developer specializing in custom web solutions for global clients. Expert in Next.js, React & modern web technologies with SEO optimization.",
    "knowsAbout": ["Website Development", "E-commerce", "Business Websites", "Web Design", "SEO"],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Website Building Services",
        "description": "Custom website development for businesses with modern technologies"
      }
    },
    "sameAs": [
      "https://github.com/psgpraveen",
      "https://linkedin.com/in/psgpraveen"
    ],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varanasi",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "India"
      },
      "areaServed": [
        // Local regions
        "Varanasi", "Ayodhya", "Prayagraj", "Lucknow", 
        // Major Indian cities
        "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
        // Countries/regions
        "India", "United States", "United Kingdom", "Europe", "Australia", "Canada", 
        "UAE", "Singapore", "Global"
      ]
    },
    "availableFor": ["Remote Work", "Freelance Projects", "Contract Work"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "availableLanguage": ["en", "hi"]
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance",
      "description": "Independent web development services"
    }
  };

  return (
    <>
      <Seo
        title="psgpraveen | Remote Full Stack Developer & Website Builder"
        description="Professional freelance web developer specializing in Next.js, React, and modern web development. Providing remote services for businesses worldwide with SEO optimization."
        keywords={allKeywords}
        openGraph={openGraph}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What web development services do you offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "I offer custom website development, e-commerce solutions, web applications, SEO optimization, and website maintenance services."
                }
              },
              {
                "@type": "Question",
                "name": "Do you serve clients outside of Varanasi and Ayodhya?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, I work with clients across India and internationally, providing remote web development services."
                }
              },
              {
                "@type": "Question",
                "name": "What technologies do you specialize in?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "I specialize in Next.js, React, Node.js, Express, MongoDB, and modern web technologies including Tailwind CSS."
                }
              }
            ]
          })
        }}
      />

      <main className="relative w-full min-h-screen bg-default text-black dark:text-white overflow-x-hidden">
        <Hero />
        <Card />
        <Status />
        <PROJECT />
        <MyServices />
        <Comment />
        <Phone />
        <Cert />
        <Feedback />
        <Footer />
      </main>
    </>
  );
}
