'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import the icons you need:
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer className="footer w-full p-6 md:p-10 bg-blue-400 text-black text-base-content flex flex-col md:flex-row md:justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Contact Section */}
        <section
          className="w-full md:w-1/3 flex flex-col items-center md:items-start"
          aria-label="Contact"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            className="text-black text-xl md:text-2xl my-2 text-center md:text-left"
          >
            Get in touch with me for any inquiries or collaborations!
          </motion.h3>
        </section>

        {/* Menu Section */}
        <section
          className="w-full md:w-1/3 flex flex-col items-center md:items-start space-y-2"
          aria-label="Footer Navigation"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="footer-title text-black underline"
          >
            Menu
          </motion.h4>
          <ul className="list-none space-y-1">
            <li>
              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                href="/port"
                className="link link-hover text-white"
              >
                Home
              </motion.a>
            </li>
            <li>
              <Link href="/project" className="link link-hover text-white">
                Project
              </Link>
            </li>
            <li>
              <Link href="/about" className="link link-hover text-white">
                About us
              </Link>
            </li>
          </ul>
        </section>

        {/* Social Section */}
        <section
          className="w-full md:w-1/3 flex flex-col items-center md:items-start"
          aria-label="Social Links"
        >
          <h4 className="footer-title underline mb-2">Social</h4>
          <ul className="flex flex-row flex-wrap gap-4 justify-center md:justify-start list-none">
            {/* GitHub */}
            <li className="h-5 w-6 z-88">
              <motion.a
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                href="https://github.com/psgpraveen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={24} className="text-black cursor-pointer" />
              </motion.a>
            </li>

            {/* LinkedIn */}
            <li>
              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                href="https://www.linkedin.com/in/psgpraveen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} className="text-blue-700 cursor-pointer" />
              </motion.a>
            </li>

            {/* Twitter */}
            <li>
              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={24} className="text-blue-500 cursor-pointer" />
              </motion.a>
            </li>

            {/* Instagram */}
            <li>
              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                href="https://www.instagram.com/psgpraveen0804/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={24} className="text-pink-500 cursor-pointer" />
              </motion.a>
            </li>
          </ul>
        </section>
      </footer>

      <h4 className="text-center bg-blue-400 py-4 text-sm md:text-base">
        Handcrafted ❤ by PsgPraveen
      </h4>
    </>
  );
}
