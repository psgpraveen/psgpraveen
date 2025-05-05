// src/app/page.tsx
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
    "Hire Web Developer","Looking For Job","JOB","Software","Software Developer",

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
  ];

  const openGraph = {
    title: "psgpraveen",
    description:
      "Explore the portfolio, skills, and services of Praveen Kumar Gupta, a Full Stack Developer specializing in Next.js, React, Node.js, and modern web technologies.",
    url: "https://psgpraveen.me",
    type: "website" as const,
    images: [
      {
        url: "https://psgpraveen.me/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Praveen Kumar Gupta Portfolio",
      },
    ],
  };

  return (
    <>
      <Seo
        title="Praveen Kumar Gupta — Full Stack Developer Portfolio"
        description="Portfolio of Praveen Kumar Gupta, featuring projects in Next.js, React, Node.js, and more, plus web development & SEO services."
        keywords={allKeywords}
        openGraph={openGraph}
      />

      <main className="relative w-full min-h-screen bg-default text-colors_default">
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
