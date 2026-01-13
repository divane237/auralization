"use client";

import Link from "next/link";
import { useState } from "react";

import { useThemeStore } from "@/stores/useThemeStore";

import Logo from "./Logo";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const modeLabel = theme === "dark" ? "Light Mode" : "Dark Mode";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);



  // Here we are defining the links for Desktop view
  const desktopLinks = (
    <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wide md:flex md:text-base">
      <Link href="/" className="transition hover:text-purple-700 dark:text-slate-100 dark:hover:text-purple-300">
        Home
      </Link>
      <Link href="/learn" className="transition hover:text-purple-700 dark:text-slate-100 dark:hover:text-purple-300">
        Learn
      </Link>
      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={theme === "dark"}
        className="rounded-full border border-gray-800/40 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900 transition hover:bg-gray-800/10 dark:border-white/50 dark:text-slate-100 dark:hover:bg-white/10 md:text-sm"
      >
        {modeLabel}
      </button>
    </nav>
  );


  // Here we define the links for mobile view
  const mobileLinks = (
    <div
      className={`flex flex-col items-center gap-4 border-t border-white/30 text-sm font-semibold uppercase tracking-wide transition-all duration-200 dark:border-white/10 md:hidden ${
        isMenuOpen ? "mt-3 pt-3 opacity-100" : "max-h-0 overflow-hidden opacity-0"
      }`}
    >
      <Link href="/" className="w-full text-center transition hover:text-purple-700 dark:text-slate-100 dark:hover:text-purple-300">
        Home
      </Link>
      <Link href="/learn" className="w-full text-center transition hover:text-purple-700 dark:text-slate-100 dark:hover:text-purple-300">
        Learn
      </Link>
      <button
        type="button"
        onClick={() => {
          toggleTheme();
          setIsMenuOpen(false);
        }}
        aria-pressed={theme === "dark"}
        className="w-full rounded-full border border-gray-800/40 px-4 py-2 text-xs tracking-wide text-gray-900 transition hover:bg-gray-800/10 dark:border-white/50 dark:text-slate-100 dark:hover:bg-white/10"
      >
        {modeLabel}
      </button>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b border-white/20 bg-white/20 px-6 py-3 text-base text-gray-900 shadow-lg backdrop-blur-lg transition-colors dark:border-white/5 dark:bg-slate-950/80 dark:text-slate-100 sm:text-lg">
      <div className="flex h-12 items-center justify-between gap-4 md:h-16">

        {/* Top Left section with LOGO */}
        <div className="flex-1 text-center text-lg font-bold uppercase tracking-wide md:text-left md:text-2xl">
          <Logo />
        </div>

        {/* List of the desktop links */}
        {desktopLinks}
        {/* List ends here */}

        {/* Hamburger logo for menu in mobile view */}
        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-gray-800/40 transition hover:bg-gray-800/10 dark:border-white/40 dark:text-white dark:hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span
            className={`block h-0.5 w-6 transform bg-gray-900 transition-all duration-200 dark:bg-white ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 transform bg-gray-900 transition-all duration-200 dark:bg-white ${
              isMenuOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 transform bg-gray-900 transition-all duration-200 dark:bg-white ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      {mobileLinks}
    </div>
  );
}

export default NavBar;
