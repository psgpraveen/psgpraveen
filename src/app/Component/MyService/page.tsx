"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MyServices: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const data = [
    {
      title: "Interior Design Website",
      description:
        "Explore my professional interior design website that showcases my design skills and portfolio. This website is built with full production readiness in mind, ensuring high performance and reliability.",
      urllink: "https://psgpraveen.github.io/interior-design/",
      img: '/img1/image1.png',
    },
    {
      title: "GHSC Government School",
      description:
        "Explore the GHSC Government School website to learn more about our commitment to providing quality education to students. Our school focuses on holistic development, offering modern facilities and a nurturing environment for academic and personal growth.",
      urllink: "https://ghscschool.vercel.app/",
      img: "/img1/image.png",
    },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % data.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          My Services
        </h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {data.map((service, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8 transition-opacity duration-500 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 relative"
                  : "opacity-30 absolute inset-0"
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={
                index === currentIndex
                  ? { y: 0, opacity: 1 }
                  : { y: 0, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={service.img}
                    alt={`${service.title} Preview`}
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                    priority={index === currentIndex}
                  />
                </motion.div>
              </div>

              {/* Text */}
              <motion.div
                className="w-full md:w-1/2 text-center md:text-left p-6 bg-white rounded-lg shadow-md"
                initial={{ y: 50, opacity: 0 }}
                animate={
                  index === currentIndex
                    ? { y: 0, opacity: 1, scale: 1 }
                    : { y: 0, opacity: 0.3, scale: 0.95 }
                }
                whileHover={index === currentIndex ? { scale: 1.03 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-3xl font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-4 mb-6">
                  {service.description}
                </p>
                <a
                  href={service.urllink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
                >
                  Visit Website
                </a>
                <p className="text-gray-500 mt-4 italic">
                  This website is intended for production use.
                </p>
              </motion.div>
            </motion.div>
          ))}

          {/* Prev / Next Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-gray-700"
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
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-gray-700"
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
      </div>
    </section>
  );
};

export default MyServices;
