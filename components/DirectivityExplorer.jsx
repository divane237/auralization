"use client";

import { useMemo, useState } from "react";

const SAMPLE_COUNT = 200;
const MIN_FOCUS = 0;
const MAX_FOCUS = 1.6;

function buildPolarPattern(focus) {
  const samples = [];
  let totalIntensity = 0;
  let maxIntensity = 0;

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const angle = (i / SAMPLE_COUNT) * Math.PI * 2;
    const cosValue = Math.cos(angle);
    const shape = 1 + focus * cosValue;
    const radius = Math.max(shape, 0.08);
    const intensity = radius * radius;

    samples.push({ angle, radius, intensity });
    totalIntensity += intensity;
    maxIntensity = Math.max(maxIntensity, intensity);
  }

  const avgIntensity = Math.max(totalIntensity / SAMPLE_COUNT, 1e-6);
  const directivityFactor = Math.max(maxIntensity / avgIntensity, 1);

  return { samples, avgIntensity, directivityFactor };
}

function polarPath(samples, radius, center) {
  if (!samples.length) return "";

  const coords = samples.map((sample) => {
    const x = center + Math.cos(sample.angle) * sample.radius * radius;
    const y = center - Math.sin(sample.angle) * sample.radius * radius;
    return { x, y };
  });

  return coords
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ")
    .concat(" Z");
}

export default function DirectivityExplorer() {
  const [focus, setFocus] = useState(0.6);
  const [angle, setAngle] = useState(0);

  const { samples, avgIntensity, directivityFactor } = useMemo(
    () => buildPolarPattern(focus),
    [focus]
  );

  const directivityIndex = 10 * Math.log10(directivityFactor);
  const selectedIndex = Math.min(
    samples.length - 1,
    Math.round(((angle % 360) / 360) * samples.length)
  );
  const selectedSample = samples[selectedIndex] ?? samples[0];
  const relativeLevel = selectedSample
    ? Math.max(selectedSample.intensity / avgIntensity, 1e-6)
    : 1;
  const directionDb = 10 * Math.log10(relativeLevel);
  const svgSize = 260;
  const radius = svgSize / 2 - 16;
  const center = svgSize / 2;
  const patternPath = useMemo(() => polarPath(samples, radius, center), [samples, radius, center]);
  const pointerX = center + Math.cos((angle / 360) * Math.PI * 2) * radius;
  const pointerY = center - Math.sin((angle / 360) * Math.PI * 2) * radius;

  return (
    <section className="my-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Explorer
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Visualizing Source Directivity
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Adjust the focus to concentrate energy in front of the source, and rotate the
            listening angle to watch how SPL predictions change.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <span className="block text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            Directivity Index
          </span>
          <span className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {directivityIndex.toFixed(1)} dB
          </span>
          <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
            Q = {directivityFactor.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <svg viewBox={`0 0 ${svgSize} ${svgSize}`} role="img" aria-label="Directivity polar plot">
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(15,23,42,0.08)"
                strokeDasharray="4 4"
              />
              <circle
                cx={center}
                cy={center}
                r={radius * 0.66}
                fill="none"
                stroke="rgba(15,23,42,0.08)"
                strokeDasharray="3 5"
              />
              <circle
                cx={center}
                cy={center}
                r={radius * 0.33}
                fill="none"
                stroke="rgba(15,23,42,0.04)"
                strokeDasharray="2 4"
              />
              <line
                x1={center}
                y1={center}
                x2={center + radius}
                y2={center}
                stroke="rgba(15,23,42,0.2)"
                strokeWidth={1}
              />
              <line
                x1={center}
                y1={center}
                x2={center}
                y2={center - radius}
                stroke="rgba(15,23,42,0.2)"
                strokeWidth={1}
              />
              <line
                x1={center}
                y1={center}
                x2={pointerX}
                y2={pointerY}
                stroke="rgba(99,102,241,0.8)"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
              <path
                d={patternPath}
                fill="rgba(59,130,246,0.15)"
                stroke="rgba(59,130,246,0.7)"
                strokeWidth={2}
              />
              <text x={16} y={svgSize - 16} className="text-[0.7rem]" fill="rgba(15,23,42,0.45)">
                0°
              </text>
              <text x={svgSize - 24} y={center + 4} className="text-[0.7rem]" fill="rgba(15,23,42,0.45)">
                90°
              </text>
              <text x={16} y={16} className="text-[0.7rem]" fill="rgba(15,23,42,0.45)">
                270°
              </text>
            </svg>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Polar plot reference
            </p>
          </div>
          <div className="lg:mt-0 mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-slate-950">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Focus energy (Q scale)
              </span>
              <input
                type="range"
                min={MIN_FOCUS}
                max={MAX_FOCUS}
                step="0.02"
                value={focus}
                onChange={(event) => setFocus(Number(event.target.value))}
                className="h-2 w-full cursor-pointer accent-slate-900"
              />
              <span className="text-xs text-slate-500">
                0 = omnidirectional; higher values tighten the lobe in front.
              </span>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Listening angle: {angle.toFixed(0)}°
              </span>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={angle}
                onChange={(event) => setAngle(Number(event.target.value))}
                className="h-2 w-full cursor-pointer accent-slate-900"
              />
              <span className="text-xs text-slate-500">
                Observe how the predicted increase or decrease from average changes with angle.
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Sample direction
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
              {directionDb >= 0 ? "+" : ""}
              {directionDb.toFixed(1)} dB
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Level relative to the omnidirectional average at {angle.toFixed(0)}°.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300/70 bg-white/60 p-3 text-xs leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
            The polar plot shows instantaneous intensity with focus tuned along 0°. The directivity
            factor Q compares the largest lobe to the mean energy in space; DI is the same value in
            decibels. Rotating the listening angle reveals how much louder or softer a source sounds in
            any direction.
          </div>
          <div className="space-y-2 rounded-2xl bg-slate-100/70 p-3 text-xs dark:bg-slate-800/60">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Why this matters</p>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              <li>• Targeted energy keeps sound brighter and clearer on axis.</li>
              <li>• Off-axis nulls help avoid unwanted reflections and noise.</li>
              <li>• Directivity filters let auralization engines mimic real loudspeakers.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
