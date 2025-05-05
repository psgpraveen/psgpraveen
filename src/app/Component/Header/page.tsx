"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      {/* Primary Navigation */}
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900"
        aria-label="Primary"
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            href="/"
            className="flex items-center cursor-pointer space-x-3 rtl:space-x-reverse"
            title="Go to homepage"
          >
            <Image
              src="/images/psglogo.png"
              className="h-12"
              alt="PSG Praveen Logo"
              width={48}
              height={48}
              priority
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Psgpraveen
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="tel:7985942726"
              className="text-sm text-gray-500 dark:text-white hover:underline"
              title="Call Praveen"
            >
              +91 7985942726
            </a>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <nav
        className="bg-gray-50 dark:bg-gray-700 lg:mb-[5rem]"
        aria-label="Secondary"
      >
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-900 lg:text-xl dark:text-white hover:underline"
                  aria-current="page"
                  title="Home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/Project"
                  className="text-gray-900 lg:text-xl dark:text-white hover:underline"
                  title="Projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="text-gray-900 lg:text-xl dark:text-white hover:underline"
                  title="Services"
                >
                  Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
