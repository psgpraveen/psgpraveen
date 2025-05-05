"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

const projects = [
  {
    title: "linktree",
    img: "/img/linktree.png",
    alt: "Linktree Clone Project",
    url: "https://linktree-psgpraveen.vercel.app",
    github: "https://github.com/psgpraveen/Linktree",
  },
  {
    title: "BulkEmail-Sender",
    img: "/img/bulkemail.jpg",
    alt: "Bulk Email Sender App",
    url: "https://bulkemails.vercel.app",
    github: "",
  },
  {
    title: "FormBuilder",
    img: "https://www.svgrepo.com/show/217145/forms-document.svg",
    alt: "Form Builder Web Application",
    url: "https://forms-creater.vercel.app/",
    github: "https://github.com/psgpraveen/FormBuilder",
  },
  {
    title: "Movies-Blocks",
    img: "/img/Movies-Blocks.jpeg",
    alt: "Movies Blocks UI",
    url: "https://psgpraveen.github.io/Movies-Blocks/",
    github: "https://github.com/psgpraveen/Movies-Blocks.git",
  },
  {
    title: "E-Commerce",
    img: "https://i.pinimg.com/736x/0a/1c/1b/0a1c1b70ebccc6ee21d0a5d8b40cec95.jpg",
    alt: "E-Commerce Website UI",
    url: "https://psgpraveen.github.io/E-commerce-website-/",
    github: "https://github.com/psgpraveen/E-commerce-website-.git",
  },
  {
    title: "News Website",
    img: "/img/news.webp",
    alt: "News Website UI",
    url: "https://psgpraveen.github.io/News-Hub/",
    github: "https://github.com/psgpraveen/News-Hub.git",
  },
  {
    title: "Live Chatting Web-APP",
    img: "/img/image.png",
    alt: "Live Chat App UI",
    url: "https://psgpraveen.github.io/chat/",
    github: "https://github.com/psgpraveen/chat.git",
  },
  {
    title: "Video Conferencing",
    img: "https://pluspng.com/img-png/video-conferencing-png-assemble-communication-conference-consult-discuss-meeting-video-conference-icon-512.png",
    alt: "Video Conferencing App",
    url: "https://psgpraveen.github.io/video_/",
    github: "https://github.com/psgpraveen/video_.git/",
  },
  {
    title: "Robotic Arm",
    img: "/img/ROBOTIC ICON.png",
    alt: "Robotic Arm IoT Project",
    url: "/ROBO",
    github: "",
  },
  {
    title: "Wireless Electric Transmission (Tesla Coil)",
    img: "/img/tesla-coil.jpg",
    alt: "Wireless Electricity Tesla Coil Project",
    url: "/Tesla",
    github: "",
  },
  {
    title: "Street Light",
    img: "/img/Ldr icone.png",
    alt: "Automatic Street Light Using LDR",
    url: "/Ldr",
    github: "",
  },
];

const isInternal = (url: string) => url.startsWith("/");

const Index = () => (
  <>
    <Head>
      <meta
        name="description"
        content="Explore the whole collection text-white of my projects and its show my skill and proficiency level"
      />
      <link rel="canonical" href="https://webwalebhai.vercel.app/#project" />
    </Head>

    <section id="project" className="overflow-hidden">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } }}
            viewport={{ once: true }}
            className="mb-4 text-4xl tracking-tight text-white font-extrabold text-gray-900 dark:text-white"
          >
            My Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
            className="font-light text-green-500 sm:text-xl dark:text-gray-400"
          >
            Explore the whole collection of my projects and its show my skill and proficiency level
          </motion.p>
        </div>

        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0, transition: { duration: 1, delay: idx * 0.08 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              className="text-center text-gray-500 dark:text-gray-400"
            >
              {isInternal(project.url) ? (
                <Link href={project.url} aria-label={`View ${project.title} internal project`}>
                  <Image
                    src={project.img}
                    alt={project.alt}
                    width={144}
                    height={144}
                    className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                    loading="lazy"
                  />
                </Link>
              ) : (
                <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} live demo`}>
                  {project.img.startsWith("http") ? (
                    <img
                      className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                      src={project.img}
                      alt={project.alt}
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={project.img}
                      alt={project.alt}
                      width={144}
                      height={144}
                      className="mx-auto mb-4 w-36 h-36 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                </a>
              )}

              <h3 className="mb-1 text-2xl font-bold tracking-tight text-green-400">
                {isInternal(project.url) ? (
                  <Link href={project.url}>{project.title}</Link>
                ) : (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                )}
              </h3>

              {project.github && (
                <ul className="flex justify-center mt-4 space-x-4">
                  <li>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Index;
