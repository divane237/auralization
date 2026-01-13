import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const highlights = [
  {
    title: "Visual-first explanations",
    body: "Walk through animations and interactive sketches that turn equations into shapes, motion, and color.",
  },
  {
    title: "Hands-on labs",
    body: "Follow guided exercises that let you tweak parameters, capture audio, and see how signals react in real time.",
  },
  {
    title: "Sound design meets science",
    body: "Apply DSP thinking to musical textures, immersive audio, and practical engineering problems.",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 rounded-3xl bg-linear-to-br from-purple-100/80 via-white to-blue-50/90 px-6 py-12 text-center text-gray-900 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-50 dark:ring-white/10 md:flex-row md:items-stretch md:text-left">
        <div className="flex flex-1 flex-col justify-center gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-600 dark:text-purple-300">
            Digital Signal Processing
          </p>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            Transform signals into insight with interactive learning.
          </h1>
          <p className="text-base text-gray-700 dark:text-slate-300 md:text-lg">
            Unpack DSP foundations through guided visuals, audio-first demos, and hands-on exercises that bridge theory with creative exploration.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link
              href="/learn"
              className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-purple-700 hover:shadow-lg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Start Learning
            </Link>
            
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-purple-700 transition hover:text-purple-900 dark:text-purple-200 dark:hover:text-purple-100"
            >
              Explore Examples
              <span className="h-2 w-2 rounded-full bg-purple-500 transition group-hover:scale-125" />
          
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-center ">
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-3xl bg-white/60 shadow-inner dark:bg-slate-950/60">
            <Image
              src="/images/home_image.png"
              alt="Welcome image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px, h-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map(({ title, body }) => (
          <article
            key={title}
            className="rounded-2xl border border-purple-100/70 bg-white/80 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">{body}</p>
          </article>
        ))}
      </section>
      <Footer />
    </div>
  );
}
