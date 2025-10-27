"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MyServices: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [,setProgressWidth] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Enhanced data with tags and related projects
  const data = [
    {
      title: "Interior Design Website",
      description:
        "Explore my professional interior design website that showcases my design skills and portfolio. This website is built with full production readiness in mind, ensuring high performance and reliability.",
      urllink: "https://psgpraveen.github.io/interior-design/",
      img: "/img1/image1.png",
      tags: ["Web Design", "UI/UX", "React"],
      year: "2023",
      relatedProjects: [1],
    },
    {
      title: "GHSC Government School",
      description:
        "Explore the GHSC Government School website to learn more about our commitment to providing quality education to students. Our school focuses on holistic development, offering modern facilities and a nurturing environment for academic and personal growth.",
      urllink: "https://ghscschool.vercel.app/",
      img: "/img1/image.png",
      tags: ["Education", "Next.js", "Tailwind CSS"],
      year: "2024",
      relatedProjects: [0],
    },
  ];

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  const nextSlide = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setProgressWidth(0);
    setIsTouched(true);
    resetAutoSlide();
  };

  const prevSlide = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setProgressWidth(0);
    setIsTouched(true);
    resetAutoSlide();
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setImageLoaded(false);
    setCurrentIndex(index);
    setProgressWidth(0);
    setIsTouched(true);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    setTimeout(() => {
      setIsTouched(false);
    }, 5000);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle touch events for slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      setIsHovered(true);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      setIsHovered(false);

      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
    };

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Handle automatic slide transition and progress bar
  useEffect(() => {
    if (isHovered || isTouched) {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      return;
    }

    setProgressWidth(0);
    const progressInterval = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 0;
        }
        return prev + (100 / SLIDE_DURATION) * 50;
      });
    }, 50);

    intervalRef.current = setTimeout(nextSlide, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [currentIndex, isHovered, isTouched]);

  return (
    <section
      className="py-12 sm:py-16 md:py-20 "
      aria-label="My services and project showcase"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header with Badge */}
        <div className="mb-10 sm:mb-16 relative">
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full inline-flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              Featured Projects
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            My Projects
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore my recent work and digital creations
          </motion.p>
        </div>

        {/* Project Slider - Enhanced with loading state and project counter */}
        <div ref={sliderRef} className="relative mb-16">
          {/* Project Counter */}
          <div className="absolute -top-10 right-0 flex items-center text-sm text-gray-500 font-medium z-10">
            <span className="text-blue-600">{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{data.length}</span>
          </div>

          {/* Slides Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {data.map((project, index) =>
                index === currentIndex ? (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Project Content Layout */}
                    <div className="flex flex-col md:flex-row">
                      {/* Enhanced Browser-style Image Container */}
                      <div className="w-full md:w-3/5 relative">
                        {/* Enhanced Browser Chrome Mockup */}
                        <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-1 hidden sm:flex">
                          <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          {/* Enhanced URL bar with favicon */}
                          <div className="mx-auto bg-white rounded-md px-2 py-1 text-xs text-gray-500 flex items-center">
                            <svg
                              className="w-3 h-3 mr-1 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="truncate max-w-[180px]">
                              {project.urllink.replace(/(^\w+:|^)\/\//, "")}
                            </span>
                          </div>
                          {/* Browser actions */}
                          <div className="flex space-x-1">
                            <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Project Screenshot with loading state */}
                        <div className="h-60 sm:h-72 md:h-96 relative bg-gray-50">
                          {/* Loading Skeleton */}
                          {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                              <svg
                                className="w-10 h-10 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                          <Image
                            src={project.img}
                            alt={`${project.title} Preview`}
                            fill
                            className={`object-cover object-top transition-opacity duration-500 ${
                              imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            sizes="(max-width: 768px) 100vw, 60vw"
                            priority={true}
                            onLoadingComplete={() => setImageLoaded(true)}
                          />
                        </div>

                        {/* Added a year badge */}
                        <div className="absolute top-12 sm:top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-gray-700">
                          {project.year}
                        </div>
                      </div>

                      {/* Enhanced Content Section */}
                      <div className="w-full md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                        {/* Project tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-8 text-sm sm:text-base">
                          {project.description}
                        </p>

                        {/* Enhanced Visit Website Button */}
                        <div className="mt-auto space-y-4">
                          <a
                            href={project.urllink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all group"
                          >
                            <span>Visit Website</span>
                            <svg
                              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>

                          {/* Enhanced Production Ready Indicator */}
                          <div className="bg-green-50 rounded-lg p-3 flex items-start">
                            <svg
                              className="w-5 h-5 mt-0.5 mr-2 text-green-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <p className="font-medium text-green-800 text-sm">
                                Production-ready website
                              </p>
                              <p className="text-green-700 text-xs mt-0.5">
                                Optimized for performance and SEO
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation Buttons with hover effect */}
          <button
            onClick={prevSlide}
            aria-label="Previous project"
            className="absolute left-2 sm:-left-4 md:-left-12 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next project"
            className="absolute right-2 sm:-right-4 md:-right-12 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Enhanced Pagination with Labels */}
        <div className="flex justify-center items-center mb-12 flex-wrap gap-2">
          {data.map((project, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to ${project.title}`}
              className={`flex items-center px-3 py-1.5 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs font-medium`}
            >
              {currentIndex === index && (
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {project.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Related Projects Section */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Related Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data[currentIndex].relatedProjects.map((relatedIndex) => (
              <motion.div
                key={relatedIndex}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
                whileHover={{ y: -4 }}
                onClick={() => goToSlide(relatedIndex)}
              >
                <div className="h-40 relative">
                  <Image
                    src={data[relatedIndex].img}
                    alt={data[relatedIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">
                    {data[relatedIndex].title}
                  </h4>
                  <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                    {data[relatedIndex].description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden shadow-lg mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="px-6 py-10 sm:px-10 sm:py-12 text-center sm:text-left sm:flex items-center justify-between">
            <div className="sm:max-w-xl mb-6 sm:mb-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Interested in working together?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Let&apos;s discuss how I can help bring your project to life.
              </p>
            </div>
            <Link
              href="/Contact"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span>Contact Me</span>
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyServices;
