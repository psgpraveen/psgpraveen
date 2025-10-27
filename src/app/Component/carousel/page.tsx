"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiDownload, FiMaximize, FiPause, FiPlay, FiX } from "react-icons/fi";
import { FaCalendarAlt, FaBuilding, FaTag } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { PanInfo } from "framer-motion";

// Enhanced certificate data with additional information
const certificates = [
  { 
    src: "/certificates/ISRO-Certificate.jpg", 
    alt: "ISRO Certificate", 
    title: "ISRO Space Technology Certification",
    issuer: "Indian Space Research Organisation",
    date: "August 2023",
    category: "Space Technology",
    description: "Certification for completing the advanced training program in space technology applications and satellite communication systems."
  },
  { 
    src: "/certificates/UPSDM.jpg", 
    alt: "UPSDM Certificate",
    title: "UPSDM Skills Development",
    issuer: "UP Skill Development Mission",
    date: "March 2023",
    category: "Government",
    description: "Recognition for successfully completing the skills development program focused on digital technologies."
  },
  { 
    src: "/certificates/Praveen Kumar Gupta_Winter Internship.jpg", 
    alt: "Winter Internship",
    title: "Winter Internship Completion",
    issuer: "Tech Innovations Inc.",
    date: "January 2023",
    category: "Internship",
    description: "Certificate of completion for the winter internship program in software development and web technologies."
  },
  { 
    src: "/certificates/Ardent Reader.jpg", 
    alt: "Ardent Reader",
    title: "Ardent Reader Award",
    issuer: "National Library Association",
    date: "May 2022",
    category: "Achievement",
    description: "Recognition for exceptional dedication to reading and literary knowledge development."
  },
  { 
    src: "/certificates/Bharat Intern .jpg", 
    alt: "Bharat Intern",
    title: "Bharat Intern Certificate",
    issuer: "Bharat Intern Program",
    date: "July 2023",
    category: "Internship",
    description: "Certificate for successfully completing the Bharat Intern program in technology and innovation."
  },
  { 
    src: "/certificates/certificate.jpg", 
    alt: "General Certificate",
    title: "Excellence in Web Development",
    issuer: "Web Technologies Association",
    date: "November 2022",
    category: "Web Development",
    description: "Recognition for demonstrating excellence in modern web development technologies and practices."
  },
  { 
    src: "/certificates/IIIT Allahabad.jpg", 
    alt: "IIIT Allahabad",
    title: "IIIT Allahabad Workshop",
    issuer: "Indian Institute of Information Technology, Allahabad",
    date: "September 2022",
    category: "Education",
    description: "Certificate for participating in the advanced computing workshop at IIIT Allahabad."
  },
  { 
    src: "/certificates/Oasis INFOBYTE.jpg", 
    alt: "Oasis INFOBYTE",
    title: "Oasis Infobyte Training",
    issuer: "Oasis Infobyte Technologies",
    date: "February 2023",
    category: "Technical Training",
    description: "Certification for completing intensive training in software development and data structures."
  },
  { 
    src: "/certificates/most aware child.jpg", 
    alt: "Most Aware Child",
    title: "Most Aware Child Award",
    issuer: "Education Excellence Foundation",
    date: "April 2018",
    category: "Achievement",
    description: "Recognition for demonstrating exceptional awareness and knowledge in academic and current affairs."
  },
  { 
    src: "/certificates/sunfest 2018.jpg", 
    alt: "Sunfest 2018",
    title: "Sunfest 2018 Participation",
    issuer: "Sunfest Cultural Organization",
    date: "October 2018",
    category: "Cultural",
    description: "Certificate of participation in the Sunfest 2018 cultural and technical festival."
  },
  { 
    src: "/certificates/Tata Consultancy Services completion_certificate.jpg", 
    alt: "TCS Certificate",
    title: "TCS Training Completion",
    issuer: "Tata Consultancy Services",
    date: "December 2022",
    category: "Corporate",
    description: "Certificate for successfully completing the TCS professional training program in IT services."
  },
];

// Group categories for filtering
const categories = [...new Set(certificates.map(cert => cert.category))];

export default function CertificatesGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredCertificates, setFilteredCertificates] = useState(certificates);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showDetails, setShowDetails] = useState(true);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // const dragX = useMotionValue(0);
  const controls = useAnimation();
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const thumbnailsToShow = isMobile ? 3 : 5;

  // Handle filtering
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(certificates.filter(cert => cert.category === activeFilter));
    }
    setCurrentIndex(0);
    setImageLoaded(false);
  }, [activeFilter]);

  useEffect(() => {
    if (isPaused || filteredCertificates.length === 0) return;

    // Create interval for auto-advancing
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
      setImageLoaded(false);
    }, 5000);

    // Cleanup interval on component unmount or when paused
    return () => clearInterval(timer);
  }, [isPaused, filteredCertificates.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showModal) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") prevModalSlide();
        if (e.key === "ArrowRight") nextModalSlide();
        return;
      }

      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") setIsPaused(prev => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal, currentIndex, modalIndex, filteredCertificates.length]);

  // Trap focus in modal when open
  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showModal]);

  // Handle slide navigation
  const nextSlide = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
  };

  const prevSlide = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
  };

  // Handle modal navigation
  const nextModalSlide = () => {
    setImageLoaded(false);
    setModalIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevModalSlide = () => {
    setImageLoaded(false);
    setModalIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const openModal = (index: number) => {
    setModalIndex(index);
    setImageLoaded(false);
    setShowModal(true);
    setIsZoomed(false);
    setZoomLevel(1);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setIsZoomed(false);
    setZoomLevel(1);
    document.body.style.overflow = "";
  };

  // Handle swipe gesture

const handleDragEnd = (
  _event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo
) => {
  const threshold = 100;
  if (info.offset.x > threshold) {
    prevSlide();
  } else if (info.offset.x < -threshold) {
    nextSlide();
  }
  controls.start({ x: 0 });
};


  // Calculate progress for progress bar
  const calculateProgress = () => {
    return ((currentIndex + 1) / filteredCertificates.length) * 100;
  };

  // Handle certificate download
  const downloadCertificate = (src: string, title: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to get visible thumbnails for better UX
  const getVisibleThumbnails = () => {
    const half = Math.floor(thumbnailsToShow / 2);
    let start = currentIndex - half;
    let end = currentIndex + half + (thumbnailsToShow % 2);

    if (start < 0) {
      end = Math.min(end - start, filteredCertificates.length);
      start = 0;
    }
    
    if (end > filteredCertificates.length) {
      start = Math.max(0, start - (end - filteredCertificates.length));
      end = filteredCertificates.length;
    }

    return { start, end };
  };

  // Get visible thumbnails for efficient rendering
  const { start, end } = getVisibleThumbnails();
  const visibleThumbnails = filteredCertificates.slice(start, end);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Compact header with smaller text */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              My Certifications
            </h2>
            <p className="text-gray-600 max-w-2xl text-sm md:text-base">
              A collection of certifications and achievements that showcase my professional development.
            </p>
          </div>

          <div className="flex items-center mt-3 md:mt-0 space-x-2">
            <button
              onClick={() => setIsPaused(prev => !prev)}
              className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              title={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? <FiPlay size={16} /> : <FiPause size={16} />}
            </button>

            <div className="relative inline-block">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="bg-gray-100 text-gray-800 rounded-lg py-1.5 pl-3 pr-7 text-sm appearance-none cursor-pointer hover:bg-gray-200 transition-colors"
                aria-label="Filter certificates by category"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <FaTag size={10} />
              </div>
            </div>
          </div>
        </div>

        {/* More compact filter pills */}
        <div className="hidden md:flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeFilter === "All" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeFilter === category 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Gallery - SIGNIFICANTLY REDUCED HEIGHT */}
        {filteredCertificates.length > 0 ? (
          <div ref={galleryRef} className="mb-6">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: `${(currentIndex / filteredCertificates.length) * 100}%` }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: isPaused ? 0 : 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Certificate Carousel - REDUCED HEIGHT */}
            <div className="relative bg-gradient-to-b from-white to-blue-50 border border-gray-200 rounded-xl overflow-hidden shadow-md" 
                style={{ 
                  height: 
                    typeof window !== 'undefined' && window.innerWidth < 480 ? "220px" :
                    isMobile ? "250px" : "350px" 
                }}>
              {/* Current Certificate Info - More Compact */}
              <motion.div 
                className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-100/90 to-transparent pt-3 pb-6 px-3 sm:px-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start">
                  <div className="pr-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                      {filteredCertificates[currentIndex].title}
                    </h3>
                    <div className="flex items-center mt-0.5 text-xs sm:text-sm text-gray-600">
                      <FaBuilding className="mr-1 flex-shrink-0" size={12} />
                      <span className="line-clamp-1">{filteredCertificates[currentIndex].issuer}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="p-1.5 bg-gradient-to-b from-white to-blue-50/90 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
                      aria-label={showDetails ? "Hide details" : "Show details"}
                      title={showDetails ? "Hide details" : "Show details"}
                    >
                      {showDetails ? <FiX size={14} /> : <FaTag size={12} />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main Image Area - REDUCED HEIGHT */}
              <motion.div
                className="relative w-full h-full"
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                animate={controls}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredCertificates[currentIndex].src}
                    className="relative w-full h-full flex items-center justify-center bg-gray-50"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Loading skeleton - smaller spinner */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
                    {/* Better image sizes prop */}
                    <Image
                      src={filteredCertificates[currentIndex].src}
                      alt={filteredCertificates[currentIndex].alt}
                      fill
                      className={`object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, 80vw"
                      priority={true}
                      onLoadingComplete={() => setImageLoaded(true)}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Certificate Details Footer - More Compact */}
              <motion.div 
                className="absolute left-0 right-0 bottom-0 z-10 bg-gradient-to-t from-gray-100/90 to-transparent pb-3 pt-6 px-3 sm:px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-0">
                    <div className="flex items-center text-xs text-gray-600">
                      <FaCalendarAlt className="mr-1" size={10} />
                      <span>{filteredCertificates[currentIndex].date}</span>
                    </div>
                    <div className="py-0.5 px-2 bg-blue-100 rounded-full text-xs font-medium text-blue-700">
                      {filteredCertificates[currentIndex].category}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1.5">
                    <button
                      onClick={() => downloadCertificate(
                        filteredCertificates[currentIndex].src,
                        filteredCertificates[currentIndex].title
                      )}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
                      aria-label="Download certificate"
                      title="Download certificate"
                    >
                      <FiDownload size={14} />
                    </button>
                    <button
                      onClick={() => openModal(currentIndex)}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
                      aria-label="View full size"
                      title="View full size"
                    >
                      <FiMaximize size={14} />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs mt-2 line-clamp-2">
                  {filteredCertificates[currentIndex].description}
                </p>
              </motion.div>

              {/* Smaller Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-700 z-10 transition-colors shadow-md"
                aria-label="Previous certificate"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-700 z-10 transition-colors shadow-md"
                aria-label="Next certificate"
              >
                <FiChevronRight size={18} />
              </button>

              {/* Counter */}
              <div className="absolute top-3 right-3 bg-white/80 text-gray-700 text-xs px-2 py-0.5 rounded-full shadow-sm z-10">
                {currentIndex + 1} / {filteredCertificates.length}
              </div>
            </div>

            {/* Smaller Thumbnail Gallery */}
            <div className="mt-3 flex justify-center overflow-x-auto">
              <div className="flex space-x-1.5 py-1.5 px-1">
                {visibleThumbnails.map((cert, idx) => {
                  const actualIndex = idx + start;
                  return (
                    <motion.div
                      key={cert.src}
                      className={`relative cursor-pointer rounded-md overflow-hidden ${
                        actualIndex === currentIndex ? 'ring-2 ring-blue-500' : 'border border-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setCurrentIndex(actualIndex);
                        setImageLoaded(false);
                      }}
                      style={{ 
                        width: 
                          typeof window !== 'undefined' && window.innerWidth < 480 ? '40px' : 
                          isMobile ? '50px' : '70px', 
                        height: 
                          typeof window !== 'undefined' && window.innerWidth < 480 ? '30px' : 
                          isMobile ? '38px' : '52px'
                      }}
                    >
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 480px) 40px, (max-width: 768px) 50px, 70px"
                      />
                      {actualIndex === currentIndex && (
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                      )}
                    </motion.div>
                  );
                })}

                {filteredCertificates.length > thumbnailsToShow && (
                  <motion.button
                    className="bg-gray-100 text-gray-700 px-1.5 rounded-md flex items-center justify-center text-xs hover:bg-gray-200 border border-gray-200"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      const newIndex = (end) % filteredCertificates.length;
                      setCurrentIndex(newIndex);
                      setImageLoaded(false);
                    }}
                  >
                    +{filteredCertificates.length - visibleThumbnails.length}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center border border-gray-200">
            <p className="text-gray-600 text-base">No certificates match the selected filter.</p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-3 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Show all certificates
            </button>
          </div>
        )}

        {/* Smaller Certificate statistics */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center border border-gray-200">
            <div className="text-blue-600 text-xl sm:text-2xl font-bold">{certificates.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm mt-0.5">Total Certificates</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center border border-gray-200">
            <div className="text-blue-600 text-xl sm:text-2xl font-bold">{categories.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm mt-0.5">Categories</div>
          </div>
        </div>
      </div>

      {/* Full-screen Modal for certificate viewing - adjusted for better visibility */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-b from-white to-blue-50 z-50 flex flex-col justify-center items-center p-4 md:p-8"
            onClick={closeModal}
            tabIndex={0}
          >
            <div 
              className="absolute top-4 right-4 flex space-x-2 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                onClick={() => {
                  if (isZoomed) {
                    setIsZoomed(false);
                    setZoomLevel(1);
                  } else {
                    setIsZoomed(true);
                    setZoomLevel(1.5);
                  }
                }}
              >
                <FiMaximize size={20} />
              </button>
              <button
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                onClick={() => downloadCertificate(
                  certificates[modalIndex].src,
                  certificates[modalIndex].title
                )}
              >
                <FiDownload size={20} />
              </button>
              <button
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                onClick={closeModal}
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div 
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="relative w-full max-w-6xl h-full max-h-[80vh] flex items-center justify-center overflow-hidden"
                style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                onClick={() => {
                  setIsZoomed(!isZoomed);
                  setZoomLevel(isZoomed ? 1 : 1.5);
                }}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                )}
                
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={certificates[modalIndex].src}
                    alt={certificates[modalIndex].alt}
                    fill
                    className={`object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    sizes="100vw"
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                </motion.div>
              </div>
            </div>

            {/* Modal Navigation */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-700 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                prevModalSlide();
              }}
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-3 rounded-full text-gray-700 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                nextModalSlide();
              }}
            >
              <FiChevronRight size={24} />
            </button>

            {/* Certificate Title */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h3 className="text-gray-900 text-xl font-medium">
                {certificates[modalIndex].title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {certificates[modalIndex].issuer} • {certificates[modalIndex].date}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
