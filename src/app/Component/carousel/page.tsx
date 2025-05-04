"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
  { src: "/certificates/ISRO-Certificate.jpg", alt: "ISRO Certificate" },
  { src: "/certificates/UPSDM.jpg", alt: "UPSDM Certificate" },
  { src: "/certificates/Praveen Kumar Gupta_Winter Internship.jpg", alt: "Winter Internship" },
  { src: "/certificates/Ardent Reader.jpg", alt: "Ardent Reader" },
  { src: "/certificates/Bharat Intern .jpg", alt: "Bharat Intern" },
  { src: "/certificates/certificate.jpg", alt: "General Certificate" },
  { src: "/certificates/IIIT Allahabad.jpg", alt: "IIIT Allahabad" },
  { src: "/certificates/Oasis INFOBYTE.jpg", alt: "Oasis INFOBYTE" },
  { src: "/certificates/most aware child.jpg", alt: "Most Aware Child" },
  { src: "/certificates/sunfest 2018.jpg", alt: "Sunfest 2018" },
  { src: "/certificates/Tata Consultancy Services completion_certificate.jpg", alt: "TCS Certificate" },
];

export default function CertificatesGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Create interval only once on component mount
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array ensures the effect only runs once

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <div className="py-3 text-white min-h-[600px] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        My Certificates
      </h2>

      <div style={{ height: "20rem", width: "80%" }} className="relative max-w-3xl overflow-hidden rounded-xl shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={certificates[currentIndex].src}
            className="relative w-full h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={certificates[currentIndex].src}
              alt={certificates[currentIndex].alt}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous Certificate"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full z-10 shadow-md hover:bg-white transition-all ease-in-out"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Certificate"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full z-10 shadow-md hover:bg-white transition-all ease-in-out"
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      <div className="flex mt-6 space-x-2">
        {certificates.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === i ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
