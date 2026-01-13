"use client";

import { useMemo, useState } from "react";

const MIN_DRR = -15;
const MAX_DRR = 15;
const MIN_REFLECTION = 0;
const MAX_REFLECTION = 22;
const MIN_LATE_REVERB = 0;
const MAX_LATE_REVERB = 22;
const MIN_REVERB_TIME = 0.2;
const MAX_REVERB_TIME = 2.3;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const formatDb = (value) => `${value >= 0 ? "+" : ""}${value.toFixed(1)} dB`;
const formatSeconds = (value) => `${value.toFixed(2)} s`;

export default function SpatialPerceptionExplorer() {
  const [drr, setDrr] = useState(6);
  const [earlyReflections, setEarlyReflections] = useState(12);
  const [lateReverb, setLateReverb] = useState(11);
  const [reverbTime, setReverbTime] = useState(1.3);

  const derived = useMemo(() => {
    const normalizedDrr = clamp((drr - MIN_DRR) / (MAX_DRR - MIN_DRR), 0, 1);
    const normalizedEarly = clamp(
      (earlyReflections - MIN_REFLECTION) / (MAX_REFLECTION - MIN_REFLECTION),
      0,
      1,
    );
    const normalizedLate = clamp((lateReverb - MIN_LATE_REVERB) / (MAX_LATE_REVERB - MIN_LATE_REVERB), 0, 1);
    const normalizedReverbTime = clamp(
      (reverbTime - MIN_REVERB_TIME) / (MAX_REVERB_TIME - MIN_REVERB_TIME),
      0,
      1,
    );

    const perceivedDistanceMeters = 0.6 + (1 - normalizedDrr) * 5 + normalizedLate * 1.2;
    const perceivedDistanceLabel =
      normalizedDrr > 0.75
        ? "Intimate"
        : normalizedDrr > 0.4
        ? "Medium"
        : "Far";

    const externalizationScore = clamp(normalizedEarly * 0.6 + normalizedDrr * 0.4, 0, 1);
    const externalizationLabel =
      externalizationScore > 0.75
        ? "Clearly externalized"
        : externalizationScore > 0.35
        ? "Partially externalized"
        : "Weak externalization";

    const envelopmentScore = clamp((normalizedLate + normalizedReverbTime) / 2, 0, 1);
    const envelopmentLabel =
      envelopmentScore > 0.7
        ? "Immersive"
        : envelopmentScore > 0.35
        ? "Moderate"
        : "Dry";

    const earlyReflectionNotes =
      earlyReflections > 14
        ? "Early energy is strong—externalization becomes stable even if the source shifts."
        : "Early reflections are light; the source feels more in your head.";

    const drrNotes =
      drr > 6
        ? "A high DRR keeps the source close but can expose a lack of room."
        : "Low DRR makes distance cues dominant and can push the source outward.";

    const lateNotes =
      lateReverb > 13
        ? "Late energy bathes the listener, reinforcing envelopment."
        : "Late reverberation is subtle; envelopment leans on early cues instead.";

    return {
      perceivedDistanceMeters,
      perceivedDistanceLabel,
      externalizationScore,
      externalizationLabel,
      envelopmentScore,
      envelopmentLabel,
      earlyReflectionNotes,
      drrNotes,
      lateNotes,
    };
  }, [drr, earlyReflections, lateReverb, reverbTime]);

  const distancePercent = Math.min(100, Math.max(0, (1 - (derived.perceivedDistanceMeters - 0.6) / 6.2) * 100));

  return (
    <section className="my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Spatial Perception Explorer
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Play with distance, reflections, and envelopment
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Balance DRR, early energy, and late reverberation to feel how distance, externalization, and
            envelopment emerge together.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Distance</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            {derived.perceivedDistanceLabel}
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            ~{derived.perceivedDistanceMeters.toFixed(1)} m
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Distance feel</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">{derived.perceivedDistanceLabel}</p>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${distancePercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{derived.drrNotes}</p>
        </div>

        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Externalization
          </p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">{derived.externalizationLabel}</p>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${(derived.externalizationScore * 100).toFixed(0)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{derived.earlyReflectionNotes}</p>
        </div>

        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Envelopment</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">{derived.envelopmentLabel}</p>
          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{ width: `${(derived.envelopmentScore * 100).toFixed(0)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{derived.lateNotes}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Direct-to-Reverberant Ratio
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{formatDb(drr)}</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatDb(drr)}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            High DRR keeps the source close; lower values push your perception outward.
          </p>
          <input
            type="range"
            min={MIN_DRR}
            max={MAX_DRR}
            step="0.5"
            value={drr}
            onChange={(event) => setDrr(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>

        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Early reflections
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{formatDb(earlyReflections)}</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatDb(earlyReflections)}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Bring reflections up to anchor the source outside the head.
          </p>
          <input
            type="range"
            min={MIN_REFLECTION}
            max={MAX_REFLECTION}
            step="0.5"
            value={earlyReflections}
            onChange={(event) => setEarlyReflections(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>

        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Late reverberation
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{formatDb(lateReverb)}</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatDb(lateReverb)}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Late energy feeds envelopment, blending with room size cues.
          </p>
          <input
            type="range"
            min={MIN_LATE_REVERB}
            max={MAX_LATE_REVERB}
            step="0.5"
            value={lateReverb}
            onChange={(event) => setLateReverb(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>

        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Reverb time
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{formatSeconds(reverbTime)}</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatSeconds(reverbTime)}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Longer decay supports envelopment but can mask clarity if unchecked.
          </p>
          <input
            type="range"
            min={MIN_REVERB_TIME}
            max={MAX_REVERB_TIME}
            step="0.05"
            value={reverbTime}
            onChange={(event) => setReverbTime(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Listening cues</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex gap-2 text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">1.</span>
            {`Dropping DRR pushes you farther away, especially when late energy stays high.`}
          </li>
          <li className="flex gap-2 text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">2.</span>
            {`Early reflections anchor the source outside the head and keep externalization steady.`}
          </li>
          <li className="flex gap-2 text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">3.</span>
            {`Raising late reverberation and decay time drives envelopment—the room feels wider.`}
          </li>
        </ul>
      </div>
    </section>
  );
}
