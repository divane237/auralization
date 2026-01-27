// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useThemeStore } from "@/stores/useThemeStore";
// import Logo from "./Logo";

// function NavBar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const theme = useThemeStore((state) => state.theme);
//   const toggleTheme = useThemeStore((state) => state.toggleTheme);

//   // Handle scroll for navbar background
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Learn", href: "/learn" },
//     { name: "Explore", href: "/explore" },
//   ];

//   return (
//     <header
//       className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled
//           ? "backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 shadow-lg border-b border-slate-200/60 dark:border-slate-800/60"
//           : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/40"
//         }`}
//     >
//       <nav className="mx-auto w-full max-w-[1400px]">
//         <div className="flex h-20 items-center justify-between gap-4 px-4 lg:px-8">

//           {/* Logo Section - Logo component already has Link */}
//           <div className="flex-shrink-0">
//             <Logo />
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {/* Nav Links */}
//             <div className="flex items-center gap-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="relative text-sm font-semibold uppercase tracking-wider 
//                            text-slate-700 dark:text-slate-300 
//                            transition-colors hover:text-slate-900 dark:hover:text-slate-100
//                            group"
//                 >
//                   {link.name}
//                   {/* Animated underline */}
//                   <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-900 dark:bg-slate-100
//                                  transition-all duration-300 group-hover:w-full" />
//                 </Link>
//               ))}
//             </div>

//             {/* Theme Toggle Button - Desktop */}
//             <button
//               type="button"
//               onClick={toggleTheme}
//               aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//               className="relative flex items-center justify-center w-10 h-10 
//                        rounded-full bg-slate-100 dark:bg-slate-800
//                        border border-slate-200 dark:border-slate-700
//                        transition-all hover:scale-110
//                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400 focus-visible:outline-offset-2"
//             >
//               {/* Sun Icon */}
//               <svg
//                 className={`absolute w-5 h-5 transition-all duration-300 ${theme === "dark"
//                     ? "rotate-90 scale-0 opacity-0"
//                     : "rotate-0 scale-100 opacity-100"
//                   }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>

//               {/* Moon Icon */}
//               <svg
//                 className={`absolute w-5 h-5 transition-all duration-300 ${theme === "dark"
//                     ? "rotate-0 scale-100 opacity-100"
//                     : "-rotate-90 scale-0 opacity-0"
//                   }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             type="button"
//             onClick={toggleMenu}
//             aria-label="Toggle navigation menu"
//             aria-expanded={isMenuOpen}
//             className="md:hidden relative flex h-10 w-10 items-center justify-center 
//                      rounded-full bg-slate-100 dark:bg-slate-800
//                      border border-slate-200 dark:border-slate-700
//                      transition-all hover:scale-110"
//           >
//             {/* Hamburger Icon */}
//             <div className="relative w-6 h-6">
//               <span
//                 className={`absolute left-0 block h-0.5 w-6 bg-slate-900 dark:bg-slate-100
//                           transition-all duration-300 ${isMenuOpen
//                     ? "top-3 rotate-45"
//                     : "top-1.5 rotate-0"
//                   }`}
//               />
//               <span
//                 className={`absolute left-0 top-3 block h-0.5 w-6 bg-slate-900 dark:bg-slate-100
//                           transition-all duration-300 ${isMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
//                   }`}
//               />
//               <span
//                 className={`absolute left-0 block h-0.5 w-6 bg-slate-900 dark:bg-slate-100
//                           transition-all duration-300 ${isMenuOpen
//                     ? "top-3 -rotate-45"
//                     : "top-4.5 rotate-0"
//                   }`}
//               />
//             </div>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//             }`}
//         >
//           <div className="space-y-2 px-4 pb-6 border-t border-slate-200/60 dark:border-slate-800/60 pt-4">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block py-3 px-4 rounded-lg text-center font-semibold uppercase tracking-wider
//                          text-slate-900 dark:text-slate-100
//                          transition-all hover:bg-slate-100 dark:hover:bg-slate-800/60"
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {/* Theme Toggle - Mobile */}
//             <button
//               type="button"
//               onClick={() => {
//                 toggleTheme();
//                 setIsMenuOpen(false);
//               }}
//               className="w-full py-3 px-4 rounded-lg text-center font-semibold uppercase tracking-wider
//                        border-2 border-slate-200 dark:border-slate-700
//                        text-slate-900 dark:text-slate-100
//                        transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
//             >
//               {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default NavBar;
"use client";

import Link from "next/link";
import { useState } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import Logo from "./Logo";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm">
      <nav className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-8">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-300 
                         hover:text-slate-900 dark:hover:text-slate-100 
                         transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle - Desktop */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="relative flex items-center justify-center w-9 h-9 
                       rounded-lg bg-slate-100 dark:bg-slate-800
                       border border-slate-200 dark:border-slate-700
                       hover:bg-slate-200 dark:hover:bg-slate-700
                       transition-all"
            >
              {/* Sun Icon */}
              <svg
                className={`absolute w-[18px] h-[18px] transition-all duration-200 ${theme === "dark"
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>

              {/* Moon Icon */}
              <svg
                className={`absolute w-[18px] h-[18px] transition-all duration-200 ${theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme Toggle - Mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="flex items-center justify-center w-9 h-9 
                       rounded-lg bg-slate-100 dark:bg-slate-800
                       border border-slate-200 dark:border-slate-700"
            >
              {theme === "dark" ? (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className="flex items-center justify-center w-9 h-9 
                       rounded-lg bg-slate-100 dark:bg-slate-800
                       border border-slate-200 dark:border-slate-700"
            >
              <div className="relative w-5 h-4">
                <span className={`absolute left-0 block h-0.5 w-5 bg-slate-900 dark:bg-slate-100
                               transition-all duration-200 ${isMenuOpen ? "top-[7px] rotate-45" : "top-0 rotate-0"}`} />
                <span className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-slate-900 dark:bg-slate-100
                               transition-all duration-200 ${isMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`} />
                <span className={`absolute left-0 block h-0.5 w-5 bg-slate-900 dark:bg-slate-100
                               transition-all duration-200 ${isMenuOpen ? "top-[7px] -rotate-45" : "top-[14px] rotate-0"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-slate-900 dark:text-slate-100 
                           hover:bg-slate-100 dark:hover:bg-slate-800 
                           transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;