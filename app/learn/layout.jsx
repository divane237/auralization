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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 text-gray-900 dark:text-slate-100 lg:flex-row">
      {/* Sidebar showing content of the course */}
      <aside className="w-full rounded-3xl border border-purple-100/70 bg-white/80 p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-slate-900/70 lg:max-w-xs">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-500 dark:text-purple-300">
          Curriculum
        </p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Chapters</h2>

        {/* Chapter + subchapter tree so learners can jump anywhere */}
        <nav className="mt-6 space-y-5">
          {chapters.map((chapter, index) => {
            const isActiveChapter = getChapterIsActive(chapter);
            const hasSubchapters = Boolean(chapter.subchapters?.length);
            const isChapterOpen = hasSubchapters ? (expandedChapters[chapter.id] ?? isActiveChapter) : false;

            return (
              <div
                key={chapter.id}
                className="rounded-2xl border border-purple-100 bg-white/70 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 dark:border-white/10 dark:bg-slate-900/60"
              >
                <button
                  type="button"
                  onClick={() => hasSubchapters && toggleChapter(chapter.id, isActiveChapter)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left ${hasSubchapters ? "" : "cursor-default"}`}
                  aria-expanded={hasSubchapters ? isChapterOpen : undefined}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-purple-500 dark:text-purple-300">
                      Chapter {index + 1}
                    </p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">{chapter.title}</p>
                  </div>
                  {hasSubchapters ? (
                    <span
                      className={`text-lg text-purple-500 transition ${isChapterOpen ? "rotate-90" : ""}`}
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </button>

                {isChapterOpen ? (
                  <ul className="mt-3 space-y-1 px-4 pb-4 text-sm text-gray-600 dark:text-slate-300">
                    {chapter.subchapters.map((subchapter) => (
                      <li key={subchapter.id}>
                        <Link
                          href={`/learn/${subchapter.fullRoute}`}
                          className={`inline-flex w-full items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-purple-50 hover:text-purple-800 dark:hover:bg-white/10 dark:hover:text-purple-200 ${
                            getSubchapterIsActive(chapter, subchapter)
                              ? "bg-purple-100/80 text-purple-800 dark:bg-white/20 dark:text-purple-100"
                              : ""
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-purple-300 dark:bg-purple-200" />
                          {subchapter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>

      <section className="flex-1">{children}</section>
    </div>
  );
}
