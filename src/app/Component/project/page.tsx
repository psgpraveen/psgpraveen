"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

const siteUrl = "https://psgpraveen.me";
const authorName = "PSG Praveen";

// Add categories for filtering
const categories = ["All", "Web Development", "Frontend", "Backend", "IoT", "UI/UX"];

// Projects array remains unchanged
const projects = [
  {
    title: "Linktree Clone",
    img: "/img/linktree.png",
    alt: "Linktree Clone Project",
    url: "https://linktree-psgpraveen.vercel.app",
    github: "https://github.com/psgpraveen/Linktree",
    desc: "A fully responsive Linktree clone with custom animations and theme options.",
    featured: true,
    category: ["Web Development", "Frontend"],
    tech: ["Next.js", "React", "Tailwind CSS"]
  },
  {
    title: "Bulk Email Sender",
    img: "/img/bulkemail.jpg",
    alt: "Bulk Email Sender App",
    url: "https://bulkemails.vercel.app",
    github: "",
    desc: "A web application for sending personalized bulk emails with analytics and scheduling features.",
    featured: true,
    category: ["Web Development", "Backend"],
    tech: ["Next.js", "Node.js", "MongoDB"]
  },
  {
    title: "Form Builder",
    img: "https://www.svgrepo.com/show/217145/forms-document.svg",
    alt: "Form Builder Web Application",
    url: "https://forms-creater.vercel.app/",
    github: "https://github.com/psgpraveen/FormBuilder",
    desc: "Create custom forms with drag-and-drop interface, validation rules, and response analytics.",
    featured: false,
    category: ["Web Development", "Frontend"],
    tech: ["React", "TypeScript", "Firebase"]
  },
  {
    title: "Movies Blocks",
    img: "/img/Movies-Blocks.jpeg",
    alt: "Movies Blocks UI",
    url: "https://psgpraveen.github.io/Movies-Blocks/",
    github: "https://github.com/psgpraveen/Movies-Blocks.git",
    desc: "Modern movie catalog with dynamic sorting, filtering, and responsive grid layout.",
    featured: false,
    category: ["Frontend", "UI/UX"],
    tech: ["JavaScript", "CSS3", "HTML5"]
  },
  {
    title: "E-Commerce",
    img: "https://i.pinimg.com/736x/0a/1c/1b/0a1c1b70ebccc6ee21d0a5d8b40cec95.jpg",
    alt: "E-Commerce Website UI",
    url: "https://psgpraveen.github.io/E-commerce-website-/",
    github: "https://github.com/psgpraveen/E-commerce-website-.git",
    desc: "A responsive e-commerce platform with product filtering, cart functionality, and payment integration.",
    featured: false,
    category: ["Web Development", "Frontend"],
    tech: ["JavaScript", "CSS3", "HTML5"]
  },
  {
    title: "News Hub",
    img: "/img/news.webp",
    alt: "News Website UI",
    url: "https://psgpraveen.github.io/News-Hub/",
    github: "https://github.com/psgpraveen/News-Hub.git",
    desc: "Real-time news aggregator with customizable categories and social sharing.",
    featured: false,
    category: ["Frontend", "UI/UX"],
    tech: ["JavaScript", "API Integration", "Responsive Design"]
  },
  {
    title: "Live Chat",
    img: "/img/image.png",
    alt: "Live Chat App UI",
    url: "https://psgpraveen.github.io/chat/",
    github: "https://github.com/psgpraveen/chat.git",
    desc: "Real-time messaging platform with typing indicators, read receipts, and media sharing.",
    featured: false,
    category: ["Web Development", "Frontend", "Backend"],
    tech: ["Socket.io", "Node.js", "Express"]
  },
  {
    title: "Video Conferencing",
    img: "https://pluspng.com/img-png/video-conferencing-png-assemble-communication-conference-consult-discuss-meeting-video-conference-icon-512.png",
    alt: "Video Conferencing App",
    url: "https://psgpraveen.github.io/video_/",
    github: "https://github.com/psgpraveen/video_.git/",
    desc: "High-quality video conferencing solution with screen sharing and recording capabilities.",
    featured: false,
    category: ["Web Development", "Frontend"],
    tech: ["WebRTC", "JavaScript", "CSS3"]
  },
  {
    title: "Robotic Arm",
    img: "/img/ROBOTIC ICON.png",
    alt: "Robotic Arm IoT Project",
    url: "/ROBO",
    github: "",
    desc: "IoT-based robotic arm with precision control and programmable movement patterns.",
    featured: true,
    category: ["IoT"],
    tech: ["Arduino", "C++", "Electronics"]
  },
  {
    title: "Tesla Coil",
    img: "/img/tesla-coil.jpg",
    alt: "Wireless Electricity Tesla Coil Project",
    url: "/Tesla",
    github: "",
    desc: "Wireless electricity transmission project based on Tesla's principles for educational demonstrations.",
    featured: false,
    category: ["IoT"],
    tech: ["Electronics", "Physics", "Power Systems"]
  },
  {
    title: "Smart Street Light",
    img: "/img/Ldr icone.png",
    alt: "Automatic Street Light Using LDR",
    url: "/Ldr",
    github: "",
    desc: "Energy-efficient street lighting system with ambient light sensing and motion detection.",
    featured: false,
    category: ["IoT"],
    tech: ["Arduino", "Sensors", "Automation"]
  },
];

const isInternal = (url:string) => url.startsWith("/");

function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "PSG Praveen Projects",
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

const ProjectList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Filter projects based on category and search term
  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === "All" || project.category.includes(selectedCategory);
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <>
      <Head>
        <title>Projects | PSG Praveen Portfolio</title>
        <meta
          name="description"
          content="Explore the whole collection of projects by PSG Praveen. Web apps, IoT, UI/UX, and more. See live demos and code samples showcasing modern web development skills."
        />
        <link rel="canonical" href={`${siteUrl}/project`} />
        <meta property="og:title" content="Projects | PSG Praveen Portfolio" />
        <meta property="og:description" content="Explore the whole collection of projects by PSG Praveen. Web apps, IoT, UI/UX, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/project`} />
        <meta property="og:image" content={`${siteUrl}/img/linktree.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | PSG Praveen Portfolio" />
        <meta name="twitter:description" content="Explore the whole collection of projects by PSG Praveen." />
        <meta name="twitter:image" content={`${siteUrl}/img/linktree.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getStructuredData()),
          }}
        />
      </Head>

      {/* Changed to white background */}
      <section id="project" className="min-h-screen overflow-hidden ">
        <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto mb-12 max-w-screen-sm lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
              viewport={{ once: true }}
              className="mb-4 text-4xl tracking-tight font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
            >
              My Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } }}
              viewport={{ once: true }}
              className="font-light text-gray-700 sm:text-xl max-w-2xl"
            >
              Explore my portfolio showcasing diverse projects from web development to IoT solutions. Each project demonstrates my passion for creating impactful technology solutions.
            </motion.p>
          </div>
          
          {/* Search and Filter Controls - Updated for light theme */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center"
          >
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              />
              <svg 
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Filter buttons - Updated for light theme */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Projects - Updated for light theme */}
          {selectedCategory === "All" && searchTerm === "" && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Projects</h3>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.filter(p => p.featured).map((project, idx) => (
                  <motion.div
                    key={`featured-${project.title}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all group"
                  >
                    {/* Featured project image container */}
                    <div className="h-48 overflow-hidden relative">
                      {project.img.startsWith("http") ? (
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={project.img}
                          alt={project.alt}
                          loading="lazy"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={project.img}
                            alt={project.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="View GitHub repository"
                          className="absolute top-3 right-3 bg-gray-900/70 p-2 rounded-full hover:bg-gray-900 transition-all z-10"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.477 2 12a10 10 0 006.84 9.5c.5.092.68-.218.68-.483 0-.237-.01-.868-.014-1.703-2.782.605-3.367-1.343-3.367-1.343-.454-1.159-1.11-1.466-1.11-1.466-.908-.619.069-.607.069-.607 1.003.07 1.53 1.032 1.53 1.032.893 1.53 2.342 1.088 2.91.832.092-.648.35-1.089.636-1.339-2.22-.253-4.554-1.113-4.554-4.95 0-1.094.39-1.989 1.028-2.688-.102-.254-.445-1.273.099-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.116 2.504.338 1.91-1.296 2.748-1.027 2.748-1.027.544 1.379.2 2.398.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.565 4.943.358.309.678.92.678 1.855 0 1.338-.012 2.417-.012 2.744 0 .267.18.578.687.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-gray-800">
                        {isInternal(project.url) ? (
                          <Link href={project.url} className="hover:text-blue-600 transition">
                            {project.title}
                          </Link>
                        ) : (
                          <a href={project.url} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
                            {project.title}
                          </a>
                        )}
                      </h3>
                      <p className="mb-4 text-gray-600">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        {isInternal(project.url) ? (
                          <Link 
                            href={project.url}
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            View Project
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </Link>
                        ) : (
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            View Project
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project Grid - With improved animations and proper filtering */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key="projects-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              layout
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: idx % 4 * 0.1,
                    layout: { type: "spring", damping: 15 }
                  }}
                  layout
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all h-full flex flex-col"
                >
                  {/* Project image container - unchanged */}
                  <div className="h-40 overflow-hidden relative">
                    {project.img.startsWith("http") ? (
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        src={project.img}
                        alt={project.alt}
                        loading="lazy"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={project.img}
                          alt={project.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          style={{objectFit: 'cover'}}
                        />
                      </div>
                    )}
                    {/* Category badge with z-index */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-block bg-blue-600/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded text-white">
                        {project.category[0]}
                      </span>
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View GitHub repository"
                        className="absolute top-2 right-2 bg-gray-900/70 p-1.5 rounded-full hover:bg-gray-900 transition-all z-10"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.477 2 12a10 10 0 006.84 9.5c.5.092.68-.218.68-.483 0-.237-.01-.868-.014-1.703-2.782.605-3.367-1.343-3.367-1.343-.454-1.159-1.11-1.466-1.11-1.466-.908-.619.069-.607.069-.607 1.003.07 1.53 1.032 1.53 1.032.893 1.53 2.342 1.088 2.91.832.092-.648.35-1.089.636-1.339-2.22-.253-4.554-1.113-4.554-4.95 0-1.094.39-1.989 1.028-2.688-.102-.254-.445-1.273.099-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.116 2.504.338 1.91-1.296 2.748-1.027 2.748-1.027.544 1.379.2 2.398.098 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.565 4.943.358.309.678.92.678 1.855 0 1.338-.012 2.417-.012 2.744 0 .267.18.578.687.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  {/* Card content remains the same */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="mb-2 text-lg font-bold text-gray-800">
                      {isInternal(project.url) ? (
                        <Link href={project.url} className="hover:text-blue-600 transition">
                          {project.title}
                        </Link>
                      ) : (
                        <a href={project.url} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
                          {project.title}
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 flex-1">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 p-4">
                    {isInternal(project.url) ? (
                      <Link 
                        href={project.url}
                        className="inline-flex w-full items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    ) : (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Stats - Updated for light theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8"
          >
            <div className="bg-white rounded-lg p-3 sm:p-4 text-center border border-gray-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Projects</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 text-center border border-gray-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{projects.filter(p => p.category.includes("Web Development")).length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Web Projects</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 text-center border border-gray-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">{projects.filter(p => p.category.includes("IoT")).length}</div>
              <div className="text-xs sm:text-sm text-gray-600">IoT Projects</div>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 text-center border border-gray-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">{projects.filter(p => p.github).length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Open Source</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectList;
