
import Link from "next/link";
import { chapters } from "@/lib/chapters";

export default function LearnOverview() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              Auralization
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light">
              Fundamentals of Acoustics and Virtual Sound
            </p>
          </div>

          {/* About the Book */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                About This Book
              </h2>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  This interactive textbook bridges the gap between acoustic theory and practical signal processing.
                  Designed for students, researchers, and practitioners, it combines rigorous fundamentals with
                  hands-on experimentation through browser-based simulations.
                </p>
                <p>
                  Starting from the wave equation and progressing through room acoustics, psychoacoustics, and
                  3D audio rendering, each module integrates mathematical derivations with real-time visualizations.
                  You&apos;ll not only understand the formulas—you&apos;ll hear them in action.
                </p>
                <p>
                  Based on the second edition of <strong>Auralization</strong> by Michael Vorländer, this digital
                  resource enhances the traditional text with interactive tools, Python examples, and immersive
                  demonstrations that bring acoustic concepts to life.
                </p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <blockquote className="relative rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-br from-slate-100/50 to-white/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm p-8 shadow-sm">
              <svg
                className="absolute top-6 left-6 w-8 h-8 text-slate-300 dark:text-slate-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4 pl-8">
                Learning acoustics is not just about formulas—it is about hearing the math.
              </p>
              <footer className="text-right">
                <cite className="text-slate-600 dark:text-slate-400 not-italic font-medium">
                  — Dr. Imran Muhammad
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Chapters List Section */}
      <section className="bg-white dark:bg-slate-900 py-16 md:py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Course Modules
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore the complete curriculum—from wave physics to virtual acoustics
            </p>
          </div>

          {/* Chapters Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {chapters.map((chapter, index) => {
              const firstLesson = chapter.subchapters?.[0];
              const lessonCount = chapter.subchapters?.length || 0;

              return (
                <Link
                  key={chapter.id}
                  href={firstLesson ? `/learn/${firstLesson.fullRoute}` : '/learn'}
                  className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 
                           bg-white dark:bg-slate-900 
                           hover:border-slate-300 dark:hover:border-slate-700
                           hover:shadow-lg
                           transition-all duration-300 overflow-hidden"
                >


                  <div className="relative p-6 md:p-8">
                    {/* Module Badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl 
                                  bg-slate-900 dark:bg-slate-100 
                                  text-white dark:text-slate-900 
                                  font-bold text-lg mb-4
                                  group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 
                                 group-hover:text-slate-700 dark:group-hover:text-slate-300 
                                 transition-colors leading-snug">
                      {chapter.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {chapter.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}</span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 
                                  transform translate-x-2 group-hover:translate-x-0 
                                  transition-all duration-300">
                      <svg className="w-6 h-6 text-slate-400 dark:text-slate-600"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Ready to begin your journey into acoustic signal processing?
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-4 
                       bg-slate-900 dark:bg-slate-100 
                       text-white dark:text-slate-900 
                       rounded-xl font-semibold
                       hover:bg-slate-800 dark:hover:bg-slate-200
                       hover:shadow-lg
                       transition-all duration-300"
            >
              Start Learning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}