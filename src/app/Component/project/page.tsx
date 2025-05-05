"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

const siteUrl = "https://psgpraveen.me";
const authorName = "PSG Praveen";

const projects = [
  {
    title: "linktree",
    img: "/img/linktree.png",
    alt: "Linktree Clone Project",
    url: "https://linktree-psgpraveen.vercel.app",
    github: "https://github.com/psgpraveen/Linktree",
    desc: "A Linktree clone built with Next.js and modern web technologies.",
  },
  {
    title: "BulkEmail-Sender",
    img: "/img/bulkemail.jpg",
    alt: "Bulk Email Sender App",
    url: "https://bulkemails.vercel.app",
    github: "",
    desc: "Send bulk emails easily with this web app.",
  },
  {
    title: "FormBuilder",
    img: "https://www.svgrepo.com/show/217145/forms-document.svg",
    alt: "Form Builder Web Application",
    url: "https://forms-creater.vercel.app/",
    github: "https://github.com/psgpraveen/FormBuilder",
    desc: "Create and manage forms with a user-friendly interface.",
  },
  {
    title: "Movies-Blocks",
    img: "/img/Movies-Blocks.jpeg",
    alt: "Movies Blocks UI",
    url: "https://psgpraveen.github.io/Movies-Blocks/",
    github: "https://github.com/psgpraveen/Movies-Blocks.git",
    desc: "Modern movie block UI built for web.",
  },
  {
    title: "E-Commerce",
    img: "https://i.pinimg.com/736x/0a/1c/1b/0a1c1b70ebccc6ee21d0a5d8b40cec95.jpg",
    alt: "E-Commerce Website UI",
    url: "https://psgpraveen.github.io/E-commerce-website-/",
    github: "https://github.com/psgpraveen/E-commerce-website-.git",
    desc: "A responsive e-commerce website UI.",
  },
  {
    title: "News Website",
    img: "/img/news.webp",
    alt: "News Website UI",
    url: "https://psgpraveen.github.io/News-Hub/",
    github: "https://github.com/psgpraveen/News-Hub.git",
    desc: "Stay updated with the latest news.",
  },
  {
    title: "Live Chatting Web-APP",
    img: "/img/image.png",
    alt: "Live Chat App UI",
    url: "https://psgpraveen.github.io/chat/",
    github: "https://github.com/psgpraveen/chat.git",
    desc: "Real-time live chat web application.",
  },
  {
    title: "Video Conferencing",
    img: "https://pluspng.com/img-png/video-conferencing-png-assemble-communication-conference-consult-discuss-meeting-video-conference-icon-512.png",
    alt: "Video Conferencing App",
    url: "https://psgpraveen.github.io/video_/",
    github: "https://github.com/psgpraveen/video_.git/",
    desc: "Video conferencing app for seamless meetings.",
  },
  {
    title: "Robotic Arm",
    img: "/img/ROBOTIC ICON.png",
    alt: "Robotic Arm IoT Project",
    url: "/ROBO",
    github: "",
    desc: "IoT-based robotic arm project.",
  },
  {
    title: "Wireless Electric Transmission (Tesla Coil)",
    img: "/img/tesla-coil.jpg",
    alt: "Wireless Electricity Tesla Coil Project",
    url: "/Tesla",
    github: "",
    desc: "Tesla coil project for wireless electricity.",
  },
  {
    title: "Street Light",
    img: "/img/Ldr icone.png",
    alt: "Automatic Street Light Using LDR",
    url: "/Ldr",
    github: "",
    desc: "Automatic street light using LDR sensor.",
  },
];

const isInternal = (url:string) => url.startsWith("/");

function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "psgraveen Projects",
    "url": `${siteUrl}/project`,
    "itemListElement": projects.map((project, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": isInternal(project.url)
        ? `${siteUrl}${project.url}`
        : project.url,
      "name": project.title,
      "image": project.img.startsWith("http")
        ? project.img
        : `${siteUrl}${project.img}`,
      "description": project.desc,
      "author": {
        "@type": "Person",
        "name": authorName,
      },
    })),
  };
}

const ProjectList = () => (
  <>
    <Head>
      <title>Projects | PSG Praveen Portfolio</title>
      <meta
        name="description"
        content="Explore the whole collection of projects by PSG Praveen. Web apps, IoT, UI/UX, and more. See live demos and code samples showcasing modern web development skills."
      />
      <link rel="canonical" href={`${siteUrl}/project`} />

      {/* Open Graph for social sharing */}
      <meta property="og:title" content="Projects | PSG Praveen Portfolio" />
      <meta property="og:description" content="Explore the whole collection of projects by PSG Praveen. Web apps, IoT, UI/UX, and more. See live demos and code samples showcasing modern web development skills." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/project`} />
      <meta property="og:image" content={`${siteUrl}/img/linktree.png`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Projects | PSG Praveen Portfolio" />
      <meta name="twitter:description" content="Explore the whole collection of projects by psgpraveen. Web apps, IoT, UI/UX, and more. See live demos and code samples showcasing modern web development skills." />
      <meta name="twitter:image" content={`${siteUrl}/img/linktree.png`} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData()),
        }}
      />
    </Head>

    <section id="project" className="overflow-hidden">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } }}
            viewport={{ once: true }}
            className="mb-4 text-4xl tracking-tight font-extrabold text-green-500"
          >
            My Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
            className="font-light text-green-300 sm:text-xl"
          >
            Explore the whole collection of my projects and see my skill and proficiency level.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: idx * 0.1 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              className="text-center"
            >
              {isInternal(project.url) ? (
                <Link href={project.url}>
                  <Image
                    src={project.img}
                    alt={project.alt}
                    width={144}
                    height={144}
                    className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.img.startsWith("http") ? (
                    <img
                      className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                      src={project.img}
                      alt={project.alt}
                    />
                  ) : (
                    <Image
                      src={project.img}
                      alt={project.alt}
                      width={144}
                      height={144}
                      className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                    />
                  )}
                </a>
              )}

              <h3 className="mb-1 text-xl font-bold text-green-400">
                {isInternal(project.url) ? (
                  <Link href={project.url}>{project.title}</Link>
                ) : (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                )}
              </h3>

              {/* Optional: Add project description for SEO (hidden visually, visible to bots) */}
              <span className="sr-only">{project.desc}</span>

              {project.github && (
                <div className="mt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Link"
                    className="inline-flex items-center justify-center text-gray-300 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.48 2 2 6.477 2 12a10 10 0 006.84 9.5c.5.092.68-.218.68-.483 0-.237-.01-.868-.014-1.703-2.782.605-3.367-1.343-3.367-1.343-.454-1.159-1.11-1.466-1.11-1.466-.908-.619.069-.607.069-.607 1.003.07 1.53 1.032 1.53 1.032.893 1.53 2.342 1.088 2.91.832.092-.648.35-1.089.636-1.339-2.22-.253-4.554-1.113-4.554-4.95 0-1.094.39-1.989 1.028-2.688-.102-.254-.445-1.273.099-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.116 2.504.338 1.91-1.296 2.748-1.027 2.748-1.027.544 1.379.2 2.398.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.565 4.943.358.309.678.92.678 1.855 0 1.338-.012 2.417-.012 2.744 0 .267.18.578.687.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default ProjectList;
