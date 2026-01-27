"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { chapters } from "@/lib/chapters";

export default function LearnLayout({ children }) {
  const pathname = usePathname();
  const [expandedChapters, setExpandedChapters] = useState({});

  const getChapterIsActive = (chapter) =>
    chapter.subchapters.some((subchapter) => pathname === `/learn/${subchapter.fullRoute}`);

  const getSubchapterIsActive = (chapter, subchapter) => pathname === `/learn/${subchapter.fullRoute}`;

  const toggleChapter = (chapterId, isActiveChapter) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: prev[chapterId] === undefined ? !isActiveChapter : !prev[chapterId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto flex w-full max-w-[1400px] gap-8 px-4 py-8 lg:px-8">

        {/* Sidebar - Table of Contents */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 
                        scrollbar-track-transparent hover:scrollbar-thumb-slate-400 
                        dark:hover:scrollbar-thumb-slate-600">

            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 
                          bg-white/60 dark:bg-slate-900/40 
                          backdrop-blur-sm shadow-sm p-6">

              {/* Header */}
              <div className="mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Table of Contents
                </h2>
              </div>

              {/* Chapter Navigation */}
              <nav className="space-y-2">
                {chapters.map((chapter, index) => {
                  const isActiveChapter = getChapterIsActive(chapter);
                  const hasSubchapters = Boolean(chapter.subchapters?.length);
                  const isChapterOpen = hasSubchapters ? (expandedChapters[chapter.id] ?? isActiveChapter) : false;

                  return (
                    <div key={chapter.id}>
                      <button
                        type="button"
                        onClick={() => hasSubchapters && toggleChapter(chapter.id, isActiveChapter)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all
                          ${isActiveChapter
                            ? 'bg-slate-100 dark:bg-slate-800/60'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                          }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md text-xs font-semibold
                            ${isActiveChapter
                              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            }`}>
                            {index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium leading-snug truncate
                              ${isActiveChapter
                                ? 'text-slate-900 dark:text-slate-100'
                                : 'text-slate-700 dark:text-slate-300'
                              }`}>
                              {chapter.title.replace(/^Module \d+ · /, '')}
                            </p>
                          </div>
                        </div>

                        {hasSubchapters && (
                          <svg
                            className={`w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-200
                              ${isChapterOpen ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </button>

                      {isChapterOpen && (
                        <ul className="mt-1 ml-10 space-y-0.5 pb-2">
                          {chapter.subchapters.map((subchapter) => {
                            const isActive = getSubchapterIsActive(chapter, subchapter);
                            return (
                              <li key={subchapter.id}>
                                <Link
                                  href={`/learn/${subchapter.fullRoute}`}
                                  className={`block rounded-md px-3 py-1.5 text-sm transition-all
                                    ${isActive
                                      ? 'text-slate-900 dark:text-slate-100 font-medium bg-slate-100 dark:bg-slate-800/60'
                                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                    }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <span className={`w-1 h-1 rounded-full flex-shrink-0
                                      ${isActive
                                        ? 'bg-slate-900 dark:bg-slate-100'
                                        : 'bg-slate-300 dark:bg-slate-600'
                                      }`}
                                    />
                                    <span className="leading-relaxed">{subchapter.title}</span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}