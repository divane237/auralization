
import Link from "next/link";
import { chapters } from "@/lib/chapters";

// Helper function to get first section of a chapter
const getPrimarySectionHref = (chapter) => {
  const firstSection = chapter.subchapters?.[0];
  if (!firstSection) return "/learn";
  return `/learn/${firstSection.fullRoute}`;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* Hero Section - Heading & About */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="text-center space-y-6">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Auralization
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light">
              Fundamentals of Acoustics, Modelling, Simulation, Algorithms and Acoustic Virtual Reality
            </p>

            {/* Author */}
            <p className="text-lg text-slate-500 dark:text-slate-500">
              by <span className="font-semibold text-slate-700 dark:text-slate-300">Michael Vorländer</span>
            </p>

            {/* About the Book */}
            <div className="mt-12 mx-auto max-w-3xl">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  About This Book
                </h2>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 text-left">
                  <p>
                    This interactive digital edition explores the fascinating world of acoustic signal processing
                    and auralization. Through a combination of theoretical foundations and practical applications,
                    you&apos;ll gain deep insights into how sound can be modeled, simulated, and experienced in virtual environments.
                  </p>
                  <p>
                    Unlike traditional textbooks, this platform provides interactive simulations, real-time visualizations,
                    and hands-on exercises that bring acoustic principles to life. Each chapter builds upon the previous,
                    creating a comprehensive learning journey from basic concepts to advanced implementations.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
              >
                Start Reading
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Chapters List */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Table of Contents
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Navigate directly to any chapter and begin your learning journey
            </p>
          </div>

          {/* Chapters Grid */}
          <div className="grid gap-4 md:gap-5">
            {chapters.map((chapter, index) => {
              const sectionCount = chapter.subchapters?.length || 0;
              const labCount = chapter.pythonExamples?.length || 0;

              return (
                <Link
                  key={chapter.id}
                  href={getPrimarySectionHref(chapter)}
                  className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg"
                >
                  {/* Chapter Number Badge */}
                  <div className="absolute -left-3 top-6 flex items-center justify-center w-12 h-12 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  <div className="ml-12">
                    {/* Chapter Title */}
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {chapter.title}
                    </h3>

                    {/* Chapter Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      {sectionCount > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
                        </span>
                      )}
                      {labCount > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          {labCount} {labCount === 1 ? 'lab' : 'labs'}
                        </span>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 transition-transform group-hover:translate-x-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <figure className="text-center">
            <blockquote className="text-2xl md:text-3xl font-light text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &ldquo;Learning acoustics is not just about formulas—it is about hearing the math.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-lg text-slate-500 dark:text-slate-400">
              — Dr. Imran Muhammad
            </figcaption>
          </figure>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Interactive Digital Edition</p>
          <p className="mt-2">© {new Date().getFullYear()} • Technische Universität Ilmenau</p>
        </div>
      </footer>
    </div>
  );
}