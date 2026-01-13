import Link from "next/link";

import { chapters } from "@/lib/chapters";
import Callout from "@/components/Callout";

const chapterDescriptions = {
  introduction:
    "Set the stage with acoustics basics, metaphors for wave motion, and the vocabulary you will use everywhere else.",
};

const getPrimarySectionHref = (chapter) => {
  const firstSection = chapter.subchapters?.[0];
  if (!firstSection) {
    return "/learn";
  }
  return `/learn/${firstSection.fullRoute}`;
};

export default function LearnOverview() {
  return (
    <div className="space-y-12 text-gray-900 dark:text-slate-100">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-500 dark:text-purple-300">
          Orientation
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to the Learn Hub</h1>
        <p className="text-base text-gray-700 dark:text-slate-300">
      This Learn Hub is an interactive environment designed to bridge theoretical foundations and hands-on experimentation in acoustic signal processing. Instead of passively reading formulas or static diagrams, you are encouraged to explore concepts by modifying parameters, running simulations, and immediately observing their effects.
        </p>
        <p className="text-base text-gray-700 dark:text-slate-300">
        The platform integrates structured explanations with real-time visualizations, browser-based Python labs, and interactive signal-processing tools. This enables learners to move fluidly between mathematical models, physical intuition, and practical implementation—all within a single interface.
        </p>

        <p className="text-base text-gray-700 dark:text-slate-300">Whether you are revisiting core topics such as waveform representation and Fourier analysis, or exploring advanced concepts like filtering, spatial audio, and beamforming, the Learn Hub is designed to support active learning and conceptual clarity.</p>
      </section>

      <section className="rounded-3xl border border-purple-100/70 bg-white/70 p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How the curriculum is structured</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700 dark:text-slate-300">
          <li>
           Navigate through chapters using the sidebar to follow a structured learning path.
          </li>
          <li>
            Interact with simulations to visualize signals in time, frequency, and spatial domains.
          </li>
          <li>
            Edit and run Python code directly in the browser to experiment with real signal-processing workflows.
          </li>
          <li>
           Use this space as both a learning resource and a sandbox for exploration.
          </li>
        </ul>
      </section>

       <section className="rounded-3xl border border-purple-100/70 bg-white/70 p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Who This Is For</h2>
        <p>This platform is intended for:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-gray-700 dark:text-slate-300">
          <li>
           Students studying acoustics, signal processing, or communications
          </li>
          <li>
            Learners seeking intuitive understanding beyond equations
          </li>
          <li>
           Educators looking for interactive teaching material
          </li>
          <li>
           Anyone interested in exploring how sound can be analyzed, processed, and perceived
          </li>
        </ul>
      </section>

      {/* We reuse the single source of truth from lib/chapters.js so new chapters automatically show up */}
      <section className="rounded-3xl border border-purple-100/70 bg-white/70 p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-slate-900/60">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-500 dark:text-purple-300">
          Start anywhere
        </p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Pick a chapter</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={getPrimarySectionHref(chapter)}
              className="group rounded-2xl border border-purple-100 bg-white/80 px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-950/50"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-300">
                Chapter {index + 1}
              </p>
              <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{chapter.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                {chapterDescriptions[chapter.id] ??
                  "Preview coming soon — the registry already knows about this stop on the journey."}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
                {chapter.subchapters.length} sections · {chapter.pythonExamples.length} Python labs
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-purple-700 dark:text-purple-200">
                Open chapter
                <span className="ml-2 transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>


      <section className="rounded-3xl border border-purple-100/70 bg-white/70 p-6 shadow-sm transition-colors dark:border-white/10 dark:bg-slate-900/60">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Philosophy</h2>

    <Callout title=" The core philosophy of this project is simple" >

    Understanding improves when theory, visualization, and experimentation are tightly coupled.
    </Callout>
    <p>

    By combining explanatory text, interactive graphics, and executable code, the Learn Hub transforms abstract signal-processing concepts into tangible experiences.
    </p>
        
      </section>
    </div>
  );
}
