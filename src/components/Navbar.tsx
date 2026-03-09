"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className="w-full backdrop-blur bg-gray-50/70 dark:bg-slate-900/70 
                 border-b border-gray-200 dark:border-slate-700 py-4 px-4 
                 sm:px-8 flex flex-col sm:flex-row justify-between items-center transition-colors"
    >
      {/* Logo + mobile controls */}
      <div className="flex justify-between w-full sm:w-auto items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Image Generator</h1>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded-lg border border-gray-300 dark:border-slate-600 text-sm 
                       hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-2xl text-indigo-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`flex flex-col sm:flex-row sm:items-center w-full sm:w-auto gap-3 sm:gap-6 mt-3 sm:mt-0 ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="hover:text-indigo-600 transition-colors"
        >
          Home
        </Link>

        <Link
          href="/#generate"
          onClick={() => setMenuOpen(false)}
          className="hover:text-indigo-600 transition-colors"
        >
          Generate
        </Link>

        <Link
          href="/#features"
          onClick={() => setMenuOpen(false)}
          className="hover:text-indigo-600 transition-colors"
        >
          Features
        </Link>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}