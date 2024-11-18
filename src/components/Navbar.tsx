"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRss, FaFacebook, FaTwitter, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center">
            <Link href="/" className="flex text-2xl font-bold">
              <span className="text-gray-900">NUU</span>
              <span className="text-red-600">NEOI</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/blog"
                  className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                >
                  Blog
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Social Icons and Login Button */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-3 mr-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaRss className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
            <div>
              <Link
                href="/login"
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/blog"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Blog
            </Link>
            <Link
              href="/profile"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Profile
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Login
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-3">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaRss className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
