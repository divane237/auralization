"use client";

import Link from "next/link";

const footerLinks = [
  { title: "Learn", href: "/learn" },
  { title: "Playground", href: "/explore" },
  { title: "Code", href: "/python" },
];

export default function Footer() {
  return (
    <footer className="mt-16 w-full bg-linear-to-b from-purple-50 via-purple-100/80 to-purple-200/80 px-6 py-12 text-sm text-gray-600 transition-colors dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 dark:text-slate-300">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-purple-500">DSP LAB</p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-slate-100">
            Crafting intuitive journeys through sound, math, and motion.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 text-right text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300 md:text-left">
          {footerLinks.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-purple-900 dark:hover:text-purple-200"
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-4 border-t border-purple-100/60 pt-6 text-xs text-gray-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} DSP Interactive Lab. All rights reserved.</p>
        <div className="flex items-center gap-4 uppercase tracking-widest text-gray-400 dark:text-slate-500">
          <span>Signal</span>
          <span className="h-px w-8 bg-gray-300 dark:bg-white/20" />
          <span>Process</span>
          <span className="h-px w-8 bg-gray-300 dark:bg-white/20" />
          <span>Play</span>
        </div>
      </div>
    </footer>
  );
}
