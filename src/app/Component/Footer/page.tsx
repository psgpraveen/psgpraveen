'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaCode,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJs
} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiFirebase } from 'react-icons/si';

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Use current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 to-blue-100 border-t border-blue-200">
      {/* Animated Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 z-40"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Wave SVG separator */}
      <div className="absolute top-0 left-0 w-full transform -translate-y-full h-16 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0,0 C240,95 480,95 720,45 C960,-5 1200,-5 1440,45 L1440,100 L0,100 Z" 
            fill="#EFF6FF" // blue-50
          ></path>
        </svg>
      </div>
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* About/Contact Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-lg transform rotate-6 absolute"></div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg transform -rotate-3 flex items-center justify-center text-white text-xl font-bold relative">
                  P
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Praveen Kumar Gupta</h3>
            </div>
            
            <p className="text-gray-600 text-sm border-l-2 border-blue-500 pl-3 italic">
              Full Stack Developer specializing in creating responsive web applications with React, Next.js, and modern JavaScript frameworks.
            </p>
            
            <ul className="space-y-3 text-gray-600 mt-5">
             
              <li className="flex items-center text-sm hover:text-blue-600 transition-colors group">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-colors">
                  <FaPhoneAlt className="text-blue-600 flex-shrink-0" />
                </span>
                <a href="tel:+917985942726">+91 7985942726</a>
              </li>
              <li className="flex items-center text-sm hover:text-blue-600 transition-colors group">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3 group-hover:bg-blue-200 transition-colors">
                  <FaEnvelope className="text-blue-600 flex-shrink-0" />
                </span>
                <a href="mailto:psgpraveen0804@gmail.com">psgpraveen0804@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 relative inline-block">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded"></span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center text-sm group">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/Project" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center text-sm group">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Projects</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center text-sm group">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span className="group-hover:translate-x-1 transition-transform">About Me</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center text-sm group">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center text-sm group">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 group-hover:w-2 group-hover:h-2 transition-all"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                </Link>
              </li>
            </ul>

            {/* Tech stack icons */}
            <div className="mt-8">
              <h5 className="text-sm font-medium text-gray-700 mb-3 relative inline-block">
                <span className="relative z-10">Tech Stack</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded"></span>
              </h5>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="p-1.5 bg-blue-100 rounded-md text-blue-600 hover:bg-blue-200 transition-colors" title="React">
                  <FaReact size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-gray-800 hover:bg-blue-200 transition-colors" title="Next.js">
                  <SiNextdotjs size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-blue-500 hover:bg-blue-200 transition-colors" title="TypeScript">
                  <SiTypescript size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-yellow-600 hover:bg-blue-200 transition-colors" title="JavaScript">
                  <FaJs size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-green-600 hover:bg-blue-200 transition-colors" title="Node.js">
                  <FaNodeJs size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-green-500 hover:bg-blue-200 transition-colors" title="MongoDB">
                  <SiMongodb size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-blue-800 hover:bg-blue-200 transition-colors" title="Tailwind CSS">
                  <SiTailwindcss size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-orange-600 hover:bg-blue-200 transition-colors" title="HTML5">
                  <FaHtml5 size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-blue-700 hover:bg-blue-200 transition-colors" title="CSS3">
                  <FaCss3Alt size={16} />
                </div>
                <div className="p-1.5 bg-blue-100 rounded-md text-yellow-500 hover:bg-blue-200 transition-colors" title="Firebase">
                  <SiFirebase size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section - Enhanced with visual improvements */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 relative inline-block">
              <span className="relative z-10">Technical Skills</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded"></span>
            </h4>
            
            <div className="space-y-5">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCode className="mr-1.5 text-blue-600" /> 
                  <span>Front-End Technologies</span>
                </h5>
                <div className="flex flex-wrap gap-2 bg-gradient-to-br from-blue-50 to-white p-3 rounded-lg border border-blue-100">
                  {['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind'].map(skill => (
                    <motion.span 
                      key={skill} 
                      className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaDatabase className="mr-1.5 text-green-600" />
                  <span>Back-End Technologies</span>
                </h5>
                <div className="flex flex-wrap gap-2 bg-gradient-to-br from-green-50 to-white p-3 rounded-lg border border-green-100">
                  {['Node.js', 'Express', 'MongoDB', 'SQL', 'Firebase', 'REST API'].map(skill => (
                    <motion.span 
                      key={skill} 
                      className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCode className="mr-1.5 text-gray-600" />
                  <span>Other Skills</span>
                </h5>
                <div className="flex flex-wrap gap-2 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-100">
                  {['Git', 'GitHub', 'VS Code', 'Responsive Design', 'UI/UX', 'SEO'].map(skill => (
                    <motion.span 
                      key={skill} 
                      className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media with enhanced styling */}
        <div className="mt-12 pt-8 border-t border-blue-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-6 sm:mb-0">
              <h5 className="text-gray-800 font-medium mb-4 text-sm relative inline-block">
                <span className="relative z-10">Connect With Me</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded"></span>
              </h5>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/psgpraveen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  className="bg-gray-800 text-white p-2.5 rounded-lg"
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/psgpraveen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  className="bg-blue-700 text-white p-2.5 rounded-lg"
                >
                  <FaLinkedin size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  className="bg-blue-500 text-white p-2.5 rounded-lg"
                >
                  <FaTwitter size={20} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/psgpraveen0804/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  whileHover={{ y: -4, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white p-2.5 rounded-lg"
                >
                  <FaInstagram size={20} />
                </motion.a>
              </div>
            </div>
            
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600 font-medium">
                © {currentYear} Praveen Kumar Gupta
              </p>
              <p className="text-xs text-gray-500 mt-1">
                All rights reserved
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Banner with enhanced design */}
        <div className="mt-8 pt-6 border-t border-blue-200 text-center">
          <motion.div
            className="inline-flex items-center justify-center bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-sm text-gray-600 font-medium flex items-center space-x-1.5">
              <span>Handcrafted with</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5
                }}
                className="text-red-500 inline-block"
              >
                ❤️
              </motion.span>
              <span>by Praveen Kumar Gupta</span>
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
