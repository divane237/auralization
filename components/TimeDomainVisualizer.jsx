"use client";

import { useMemo, useState } from "react";

const WIDTH = 360;
const HEIGHT = 140;
const PADDING = 12;

const MODES = {
  periodic: {
    label: "Periodic",
    caption: "Smooth, repeating oscillations resemble musical tones or steady vocal vowels.",
  },
  transient: {
    label: "Transient / Noise",
    caption: "Jagged, erratic shapes point to percussive hits, consonants, or broadband noise.",
  },
};

const buildPath = (values) => {
  const step = (WIDTH - PADDING * 2) / (values.length - 1);
  return values
    .map((value, index) => {
      const x = PADDING + index * step;
      const y = HEIGHT / 2 - value * (HEIGHT / 2 - PADDING);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
};

const periodicValues = Array.from({ length: 40 }, (_, index) =>
  Math.sin((index / 39) * Math.PI * 4),
);

const transientValues = [
  0, 0.35, -0.4, 0.22, -0.75, 0.6, -0.1, 0.05, -0.3, 0.8, -0.5, 0.4, -0.9, 0.5, -0.05, 0.3,
  -0.4, 0.1, -0.25, 0.6, -0.7, 0.3, -0.15, 0.45, -0.55, 0.2, -0.1, 0.1, -0.2, 0.35, -0.3, 0.25,
  -0.65, 0.7, -0.2, 0.15, -0.45, 0.55, -0.15, 0.05,
];

export default function TimeDomainVisualizer() {
  const [mode, setMode] = useState("periodic");

  const paths = useMemo(
    () => ({
      periodic: buildPath(periodicValues),
      transient: buildPath(transientValues),
    }),
    [],
  );

  return (
    <section className="my-6 rounded-3xl border border-purple-100/80 bg-white/80 p-6 shadow-sm transition dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex gap-3">
        {Object.entries(MODES).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`flex-1 rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
              mode === key
                ? "border-purple-500 bg-purple-600 text-white shadow"
                : "border-purple-200 bg-white text-purple-700 hover:border-purple-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-purple-100 bg-linear-to-b from-white to-purple-50 p-4 dark:border-white/10 dark:from-slate-950 dark:to-slate-900">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${mode} waveform example`}>
          <line
            x1={PADDING}
            x2={WIDTH - PADDING}
            y1={HEIGHT / 2}
            y2={HEIGHT / 2}
            className="stroke-purple-300 dark:stroke-slate-600"
            strokeDasharray="6 4"
            strokeWidth="1"
          />
          <line
            x1={PADDING}
            x2={PADDING}
            y1={PADDING}
            y2={HEIGHT - PADDING}
            className="stroke-purple-300 dark:stroke-slate-600"
            strokeDasharray="6 4"
            strokeWidth="1"
          />
          <path
            d={paths[mode]}
            className="stroke-purple-600 dark:stroke-purple-300"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={WIDTH - PADDING}
            y={HEIGHT - PADDING / 2}
            className="fill-purple-700 text-[10px] dark:fill-purple-200"
            textAnchor="end"
          >
            time →
          </text>
          <text
            x={PADDING - 2}
            y={HEIGHT / 2}
            className="fill-purple-700 text-[10px] dark:fill-purple-200"
            textAnchor="middle"
            transform={`rotate(-90 ${PADDING - 2} ${HEIGHT / 2})`}
          >
            pressure
          </text>
        </svg>
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-purple-700 dark:text-purple-200">
        {MODES[mode].caption}
      </p>
    </section>
  );
}
