"use client";

import { useMemo, useState } from "react";

const MIN_FREQ = 50;
const MAX_FREQ = 16000;
const LOG_MIN = Math.log(MIN_FREQ);
const LOG_MAX = Math.log(MAX_FREQ);
const LOG_RANGE = LOG_MAX - LOG_MIN;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const sliderToFrequency = (value) => Math.exp(LOG_MIN + (Number(value) / 100) * LOG_RANGE);
const frequencyToSlider = (freq) =>
  ((Math.log(clamp(freq, MIN_FREQ, MAX_FREQ)) - LOG_MIN) / LOG_RANGE) * 100;

const formatHz = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} kHz`;
  }
  return `${Math.round(value)} Hz`;
};

const formatDb = (value) => `${value.toFixed(1)} dB`;

export default function MaskingExplorer() {
  const [maskerFreq, setMaskerFreq] = useState(1000);
  const [maskerLevel, setMaskerLevel] = useState(85);
  const [targetFreq, setTargetFreq] = useState(1250);
  const [targetLevel, setTargetLevel] = useState(63);
  const [delay, setDelay] = useState(0);

  const derived = useMemo(() => {
    const distanceOctaves = Math.abs(Math.log2(maskerFreq / targetFreq));
    const frequencySpreadDb = Math.max(4, 28 - distanceOctaves * 12);
    const temporalRaw = Math.max(0, 18 - Math.abs(delay) * 0.35);
    const temporalBoost = delay >= 0 ? temporalRaw : temporalRaw * 0.45;
    const maskingThreshold = maskerLevel - frequencySpreadDb + temporalBoost;
    const margin = targetLevel - maskingThreshold;
    const timeLabel =
      delay === 0 ? "Simultaneous masking" : delay > 0 ? "Forward masking" : "Backward masking";
    const timeDescription =
      delay === 0
        ? "Masker and target overlap in time; frequency spacing defines how much energy bleeds into the target."
        : delay > 0
        ? "Masker arrives first, so the system is still saturated when the target starts."
        : "Target starts before the masker; backward masking is weaker but still reduces audibility.";
    const closeness =
      distanceOctaves < 0.25
        ? "Almost identical partials"
        : distanceOctaves < 0.7
        ? "Nearby components inside a critical band"
        : "Distant spectral regions";

    return {
      frequencySpreadDb,
      maskingThreshold,
      margin,
      timeLabel,
      timeDescription,
      closeness,
    };
  }, [maskerFreq, maskerLevel, targetFreq, targetLevel, delay]);

  const statusIsAudible = derived.margin >= 0;
  const statusLabel = statusIsAudible ? "Target audible" : "Target masked";
  const statusColor = statusIsAudible ? "text-emerald-400" : "text-rose-400";
  const gapLabel = `${Math.abs(derived.margin).toFixed(1)} dB ${statusIsAudible ? "headroom" : "below threshold"}`;
  const maskerPosition = frequencyToSlider(maskerFreq);
  const targetPosition = frequencyToSlider(targetFreq);

  const createFrequencyChange = (setter) => (event) => {
    const next = sliderToFrequency(event.target.value);
    setter(next);
  };

  const createFrequencyEdit = (setter) => (event) => {
    const numeric = Number(event.target.value);
    if (!Number.isFinite(numeric)) return;
    setter(clamp(numeric, MIN_FREQ, MAX_FREQ));
  };

  const createLevelChange = (setter, min, max) => (event) => {
    const numeric = Number(event.target.value);
    if (!Number.isFinite(numeric)) return;
    setter(clamp(numeric, min, max));
  };

  const createDelayChange = (event) => {
    const numeric = Number(event.target.value);
    if (!Number.isFinite(numeric)) return;
    setDelay(clamp(numeric, -60, 60));
  };

  return (
    <section className="my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Masking Explorer</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">See how one tone hides another</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Move the controls to compare masker and target frequencies, levels and timing. The status tells you when
            the target gets pulled below the masking threshold.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
          <p className={`text-2xl font-semibold ${statusColor}`}>{statusLabel}</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{gapLabel}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Masker</p>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Frequency</span>
                <span>{formatHz(maskerFreq)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={maskerPosition}
                onChange={createFrequencyChange(setMaskerFreq)}
                className="mt-1 h-1 w-full accent-amber-400"
              />
              <input
                type="number"
                min={MIN_FREQ}
                max={MAX_FREQ}
                step="1"
                value={Math.round(maskerFreq)}
                onChange={createFrequencyEdit(setMaskerFreq)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Level</span>
                <span>{formatDb(maskerLevel)}</span>
              </div>
              <input
                type="range"
                min="60"
                max="110"
                step="1"
                value={maskerLevel}
                onChange={createLevelChange(setMaskerLevel, 60, 110)}
                className="mt-1 h-1 w-full accent-amber-400"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Target tone</p>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Frequency</span>
                <span>{formatHz(targetFreq)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={targetPosition}
                onChange={createFrequencyChange(setTargetFreq)}
                className="mt-1 h-1 w-full accent-sky-400"
              />
              <input
                type="number"
                min={MIN_FREQ}
                max={MAX_FREQ}
                step="1"
                value={Math.round(targetFreq)}
                onChange={createFrequencyEdit(setTargetFreq)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Level</span>
                <span>{formatDb(targetLevel)}</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="1"
                value={targetLevel}
                onChange={createLevelChange(setTargetLevel, 20, 100)}
                className="mt-1 h-1 w-full accent-sky-400"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Timing (ms)</span>
                <span>{delay > 0 ? `+${delay}` : delay}</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                step="1"
                value={delay}
                onChange={createDelayChange}
                className="mt-1 h-1 w-full accent-fuchsia-400"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Masking snapshot
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{formatDb(derived.maskingThreshold)}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Threshold where the masker starts to dominate. Move the target level to compare.
            </p>
          </div>

          <div className="space-y-3 rounded-xl bg-slate-50/80 p-4 text-sm text-slate-700 shadow-inner dark:bg-slate-900/60 dark:text-slate-200">
            <div className="flex items-center justify-between">
              <span>Frequency closeness</span>
              <span className="font-semibold text-slate-900 dark:text-white">{derived.closeness}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Masking mode</span>
              <span className="font-semibold text-slate-900 dark:text-white">{derived.timeLabel}</span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{derived.timeDescription}</p>
            <div className="relative mt-4 h-2 rounded-full bg-slate-900/30">
              <div
                className="absolute top-0 h-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"
                style={{
                  left: `${Math.min(maskerPosition, targetPosition)}%`,
                  width: `${Math.max(2, Math.abs(maskerPosition - targetPosition))}%`,
                }}
              />
              <div
                className="absolute -top-3 h-3 w-3 rounded-full border border-white bg-amber-400 shadow-lg shadow-amber-500/50"
                style={{ left: `${maskerPosition}%` }}
              />
              <div
                className="absolute -top-3 h-3 w-3 rounded-full border border-white bg-sky-400 shadow-lg shadow-sky-500/50"
                style={{ left: `${targetPosition}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The bar visualizes how close the tones sit on the log-frequency axis.
            </p>
          </div>

          <div className="flex justify-between rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/60 p-3 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Masker level</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatDb(maskerLevel)}</p>
            </div>
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Target level</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{formatDb(targetLevel)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
