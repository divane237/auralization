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

// Pre-build every chapter/subchapter pair so static exports stay in sync
export function generateStaticParams() {
  return chapters.flatMap((chapter) =>
    chapter.subchapters.map((subchapter) => ({ subchapterSlug: subchapter.fullRoute })),
  );
}

// Keep the browser tab / social embeds relevant to the view being rendered
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
    <div className="flex flex-col gap-8 text-gray-900 dark:text-slate-100">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {previousSubchapter ? (
            <Link
              href={`/learn/${previousSubchapter.fullRoute}`}
              className="text-sm font-semibold uppercase tracking-wide text-purple-700 transition hover:text-purple-900 dark:text-purple-200 dark:hover:text-purple-100"
            >
              ← Previous: {previousSubchapter.title}
            </Link>
          ) : null}
          {nextSubchapter ? (
            <Link
              href={`/learn/${nextSubchapter.fullRoute}`}
              className="text-sm font-semibold uppercase tracking-wide text-purple-700 transition hover:text-purple-900 dark:text-purple-200 dark:hover:text-purple-100"
            >
              Next: {nextSubchapter.title} →
            </Link>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-500 dark:text-purple-300">
            Chapter
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {chapter.title}
          </h1>
          {activeSubchapter ? (
            <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">
              Currently reading <strong>{activeSubchapter.title}</strong>.
            </p>
          ) : null}
        </div>
      </header>

      <article className="prose max-w-none prose-h2:text-gray-900 prose-p:text-gray-700 dark:text-slate-300">
        {/* Render the MDX module assigned to this section */}
        <ScrollToSubchapter anchor={activeSubchapter?.anchor} />
        <MDXContent />
      </article>

      {(previousSubchapter || nextSubchapter) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100/40 pt-6 dark:border-white/10">
          {previousSubchapter ? (
            <Link
              href={`/learn/${previousSubchapter.fullRoute}`}
              className="text-sm font-semibold uppercase tracking-wide text-purple-700 transition hover:text-purple-900 dark:text-purple-200 dark:hover:text-purple-100"
            >
              ← Previous: {previousSubchapter.title}
            </Link>
          ) : (
            <span />
          )}
          {nextSubchapter ? (
            <Link
              href={`/learn/${nextSubchapter.fullRoute}`}
              className="text-sm font-semibold uppercase tracking-wide text-purple-700 transition hover:text-purple-900 dark:text-purple-200 dark:hover:text-purple-100"
            >
              Next: {nextSubchapter.title} →
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}
