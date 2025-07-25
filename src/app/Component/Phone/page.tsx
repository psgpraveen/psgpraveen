"use client"
import React from 'react';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function Phone() {
  return (
    <motion.div 
      className="fixed bottom-12 right-4 flex flex-col space-y-3 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Phone Button */}
      <motion.a
        href="tel:+917985942726" target='_blank'
        aria-label="Call us"
        className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-full lg:lg-4 p-[1rem] shadow-lg"
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <FaPhoneAlt className="text-white text-xl" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/917985942726" target='_blank'
        aria-label="Chat on WhatsApp"
        className="bg-green-500 rounded-full p-[1rem] lg:p-4 shadow-lg"
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <FaWhatsapp className="text-white text-xl" />
      </motion.a>
    </motion.div>
  );
};
