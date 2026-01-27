import Link from "next/link";
import { notFound } from "next/navigation";

import ScrollToSubchapter from "@/components/scroll-to-subchapter";
import { chapters } from "@/lib/chapters";

const getChapterAndSubchapter = (slug) => {
  for (const chapter of chapters) {
    const subchapter = chapter.subchapters.find((entry) => entry.fullRoute === slug);
    if (subchapter) {
      return { chapter, subchapter };
    }
  }
  return null;
};

export function generateStaticParams() {
  return chapters.flatMap((chapter) =>
    chapter.subchapters.map((subchapter) => ({ subchapterSlug: subchapter.fullRoute })),
  );
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.subchapterSlug;
  const match = slug ? getChapterAndSubchapter(slug) : null;

  if (!match) {
    return {
      title: "Section not found",
      description: "We could not locate this section inside the requested chapter.",
    };
  }

  const { chapter, subchapter } = match;

  return {
    title: `${subchapter.title} | ${chapter.title} | Digital Signal Processing`,
    description: `Dive into ${subchapter.title} inside ${chapter.title}.`,
  };
}

const getAdjacentSubchapters = (slug) => {
  if (!slug) {
    return { previous: null, next: null };
  }

  const orderedSubchapters = chapters.flatMap((parent) =>
    (parent.subchapters ?? []).map((subchapter) => ({
      chapter: parent,
      subchapter,
    })),
  );

  const index = orderedSubchapters.findIndex((entry) => entry.subchapter.fullRoute === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? orderedSubchapters[index - 1] : null,
    next: index < orderedSubchapters.length - 1 ? orderedSubchapters[index + 1] : null,
  };
};

export default async function ChapterPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.subchapterSlug;
  const match = slug ? getChapterAndSubchapter(slug) : null;

  if (!match) {
    notFound();
  }

  const { chapter, subchapter: activeSubchapter } = match;
  const MDXContent = activeSubchapter.mdx ?? chapter.mdx;

  if (!MDXContent) {
    notFound();
  }

  const { previous, next } = getAdjacentSubchapters(activeSubchapter?.fullRoute);
  const previousSubchapter = previous?.subchapter ?? null;
  const nextSubchapter = next?.subchapter ?? null;

  return (
    <div className="min-h-screen">
      {/* Content Card - E-book style */}
      <article className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 
                        bg-white/80 dark:bg-slate-900/40 
                        backdrop-blur-sm shadow-sm 
                        overflow-hidden">

        {/* Header Section */}
        <header className="px-8 pt-8 pb-6 border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="space-y-3">
            {/* Chapter breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link
                href="/learn"
                className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Learn
              </Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {chapter.title}
              </span>
            </div>

            {/* Current section title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {activeSubchapter?.title || chapter.title}
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-8 py-10">
          {/* Reading progress indicator could go here */}

          {/* MDX Content with optimized reading styles */}
          <div className="prose prose-slate dark:prose-invert 
                        prose-headings:font-semibold 
                        prose-headings:text-slate-900 dark:prose-headings:text-slate-100
                        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200/60 dark:prose-h2:border-slate-800/60
                        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                        prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4
                        prose-p:text-slate-700 dark:prose-p:text-slate-300 
                        prose-p:leading-relaxed prose-p:mb-4
                        prose-a:text-slate-900 dark:prose-a:text-slate-100 
                        prose-a:underline prose-a:decoration-slate-300 dark:prose-a:decoration-slate-700
                        prose-a:underline-offset-2 prose-a:decoration-1
                        hover:prose-a:decoration-slate-500 dark:hover:prose-a:decoration-slate-500
                        prose-strong:text-slate-900 dark:prose-strong:text-slate-100 
                        prose-strong:font-semibold
                        prose-code:text-slate-800 dark:prose-code:text-slate-200 
                        prose-code:bg-slate-100 dark:prose-code:bg-slate-800/60
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                        prose-code:before:content-none prose-code:after:content-none
                        prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 
                        prose-pre:border prose-pre:border-slate-800 dark:prose-pre:border-slate-700
                        prose-pre:shadow-lg
                        prose-ul:my-4 prose-ol:my-4
                        prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:my-1
                        prose-blockquote:border-l-slate-300 dark:prose-blockquote:border-l-slate-700
                        prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
                        prose-blockquote:not-italic prose-blockquote:font-normal
                        prose-img:rounded-lg prose-img:shadow-md
                        prose-hr:border-slate-200 dark:prose-hr:border-slate-800
                        prose-table:text-sm
                        prose-th:text-slate-900 dark:prose-th:text-slate-100
                        prose-td:text-slate-700 dark:prose-td:text-slate-300
                        max-w-none">
            <ScrollToSubchapter anchor={activeSubchapter?.anchor} />
            <MDXContent />
          </div>
        </div>

        {/* Navigation Footer */}
        {(previousSubchapter || nextSubchapter) && (
          <footer className="px-8 py-6 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center justify-between gap-4">
              {/* Previous button */}
              {previousSubchapter ? (
                <Link
                  href={`/learn/${previousSubchapter.fullRoute}`}
                  className="group flex items-center gap-2 px-4 py-3 rounded-lg 
                           bg-white dark:bg-slate-800/60 
                           border border-slate-200 dark:border-slate-700
                           hover:border-slate-300 dark:hover:border-slate-600
                           shadow-sm hover:shadow
                           transition-all"
                >
                  <svg
                    className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Previous</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                      {previousSubchapter.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Next button */}
              {nextSubchapter ? (
                <Link
                  href={`/learn/${nextSubchapter.fullRoute}`}
                  className="group flex items-center gap-2 px-4 py-3 rounded-lg 
                           bg-slate-900 dark:bg-slate-100 
                           hover:bg-slate-800 dark:hover:bg-slate-200
                           shadow-sm hover:shadow-md
                           transition-all"
                >
                  <div className="text-right">
                    <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Next</div>
                    <div className="text-sm font-medium text-white dark:text-slate-900">
                      {nextSubchapter.title}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-white dark:group-hover:text-slate-900 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : null}
            </div>
          </footer>
        )}
      </article>
    </div>
  );
}