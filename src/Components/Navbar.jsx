// src/Components/Navbar.jsx
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim().toLowerCase());
    }
  };

  const handleNavClick = () => {
    setIsOpen(false); // close menu when a nav link is clicked
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      {/* Logo */}

      <a href="#hero">
        <img
          src="ImageFolder/digital hub.jpg"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </a>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <a
            href="#hero"
            onClick={handleNavClick}
            className="hover:text-yellow-400 transition"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={handleNavClick}
            className="hover:text-yellow-400 transition"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#paintTypes"
            onClick={handleNavClick}
            className="hover:text-yellow-400 transition"
          >
            Paint Types
          </a>
        </li>
        <li>
          <a
            href="#all-in-one-videos"
            onClick={handleNavClick}
            className="hover:text-yellow-400 transition"
          >
            All-in-1 Videos
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={handleNavClick}
            className="hover:text-yellow-400 transition"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Search bar (desktop) */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center space-x-2 bg-white rounded px-2 py-1"
      >
        <input
          type="text"
          placeholder="Search paints..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-2 py-1 rounded text-black outline-none"
        />
        <button
          type="submit"
          className="text-blue-900 hover:text-yellow-500 transition"
        >
          <a href="#paintTypes">
            <Search size={20} onClick={handleNavClick} />
          </a>
        </button>
      </form>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-blue-800 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-[200%] opacity-0 cursor-pointer"
        }`}
      >
        <ul className="flex flex-col space-y-4 px-6 py-6">
          <li>
            <a
              href="#hero"
              onClick={handleNavClick}
              className="block hover:text-yellow-400 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={handleNavClick}
              className="block hover:text-yellow-400 transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#paintTypes"
              onClick={handleNavClick}
              className="block hover:text-yellow-400 transition"
            >
              Paint Types
            </a>
          </li>
          <li>
            <a
              href="#all-in-one-videos"
              onClick={handleNavClick}
              className="block hover:text-yellow-400  transition"
            >
              All-in-1 Videos
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="block hover:text-yellow-400 transition"
            >
              Contact
            </a>
          </li>
          <li>
            {/* Mobile search bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center space-x-2 bg-white rounded px-2 py-1"
            >
              <input
                type="text"
                placeholder="Search paints..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-2 py-1 rounded text-black outline-none w-full"
              />
              <button
                type="submit"
                className="text-blue-900 hover:text-yellow-500 transition"
              >
                <Search size={20} id="#paintTypes" />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
