import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}

        <a href="#hero">
          <img
            src="ImageFolder/digital hub.jpg"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </a>

        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
          <li>
            <a href="#hero" className="hover:text-yellow-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-yellow-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="#paintTypes" className="hover:text-yellow-400 transition">
              Paint Types
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-yellow-400 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Social / Contact Info */}
        <div className="text-center md:text-right text-sm text-gray-300">
          © {new Date().getFullYear()} Paint Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
