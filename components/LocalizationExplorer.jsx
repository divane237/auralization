"use client";

import { useMemo, useState } from "react";

const HEAD_DIAMETER = 0.18; // meters, average distance between ears
const SPEED_OF_SOUND = 343; // m/s
const MAX_ITD_US = (HEAD_DIAMETER / SPEED_OF_SOUND) * 1e6; // peak interaural time difference
const MIN_FREQUENCY = 125;
const MAX_FREQUENCY = 12000;
const MIN_BANDWIDTH = 0.2;
const MAX_BANDWIDTH = 1;

const formatHz = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} kHz`;
  }
  return `${Math.round(value)} Hz`;
};

export default function LocalizationExplorer() {
  const [azimuth, setAzimuth] = useState(30);
  const [frequency, setFrequency] = useState(1500);
  const [bandwidth, setBandwidth] = useState(0.8);

  const derived = useMemo(() => {
    const azimuthRad = (azimuth * Math.PI) / 180;
    const itdSeconds = (HEAD_DIAMETER / SPEED_OF_SOUND) * Math.sin(azimuthRad);
    const itdUs = itdSeconds * 1e6;
    const absItdUs = Math.abs(itdUs);
    const sideFactor = Math.pow(Math.abs(Math.sin(azimuthRad)), 1.05);
    const freqNormalized = Math.min(1, frequency / 8000);
    const ild =
      24 * sideFactor * Math.pow(freqNormalized * 0.95 + 0.05, 1.2); // simulate ILD growth with frequency
    const itdNormalized = Math.min(1, absItdUs / MAX_ITD_US);
    const ildNormalized = Math.min(1, ild / 24);
    const reliability = Math.min(1, (itdNormalized + ildNormalized) / 2 * bandwidth);
    const dominantCue = frequency <= 1500 ? "ITD (timing cue)" : "ILD (level cue)";
    const cueMessage =
      frequency <= 1500
        ? "Long wavelengths wrap around the head so arrival time differences dominate."
        : "Short wavelengths are shadowed by the head, creating stronger level cues.";
    const frontBackConfusion =
      Math.abs(Math.abs(azimuth) - 0) < 20 || Math.abs(Math.abs(azimuth) - 180) < 20;
    const hemisphere = Math.abs(azimuth) <= 90 ? "front hemisphere" : "rear hemisphere";
    const cueTrend =
      Math.abs(azimuth) <= 10
        ? "Both ITD and ILD are near zero; pinna cues or head motion resolve location."
        : Math.abs(Math.abs(azimuth) - 180) <= 10
        ? "The rear mirrors the front, so rely on spectral filtering to break the ambiguity."
        : "Pronounced binaural differences make the source easy to place along the horizon.";

    return {
      itdUs,
      ild,
      reliability,
      dominantCue,
      cueMessage,
      frontBackConfusion,
      hemisphere,
      cueTrend,
    };
  }, [azimuth, frequency, bandwidth]);

  const reliabilityPercent = Math.round(derived.reliability * 100);
  const reliabilityText =
    derived.reliability > 0.7
      ? "Binaural cues are strong and align with your intuition."
      : derived.reliability > 0.35
      ? "Cues are usable but best combined with spectral or motion cues."
      : "Binaural cues are weak; head motion or broadband energy is needed.";
  const reliabilityColor =
    derived.reliability > 0.7 ? "bg-emerald-400" : derived.reliability > 0.35 ? "bg-amber-400" : "bg-rose-400";
  const bandwidthLabel = bandwidth < 0.4 ? "Pure tone" : "Broadband";
  const spectralMessage =
    bandwidth < 0.4
      ? "Narrowband sounds lack the pinna notches that resolve elevation and front/back."
      : "Broadband energy provides spectral cues that sharpen vertical and front/back estimates.";

  const svgSize = 160;
  const compassCenter = svgSize / 2;
  const compassRadius = compassCenter - 12;
  const pointerAngleRad = ((azimuth - 90) * Math.PI) / 180;
  const pointerX = compassCenter + Math.cos(pointerAngleRad) * compassRadius;
  const pointerY = compassCenter + Math.sin(pointerAngleRad) * compassRadius;

  return (
    <section className="my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Localization Explorer
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
            Follow ITD, ILD, and spectral cues
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Move the azimuth slider to see how ITD changes across angles, crank the frequency knob to grow ILD,
            and slide the bandwidth control to go from pure tones to broadband energy.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Dominant cue</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{derived.dominantCue}</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{derived.cueMessage}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr,0.95fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">ITD</p>
              <span className="text-xs text-slate-500 dark:text-slate-400">{derived.hemisphere}</span>
            </div>
            <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
              {derived.itdUs >= 0 ? "+" : "−"}
              {Math.abs(derived.itdUs).toFixed(0)} µs
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {derived.itdUs >= 0 ? "Right ear arrives first" : "Left ear arrives first"}
            </p>
            <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-sky-500"
                style={{ width: `${Math.min(1, Math.abs(derived.itdUs) / MAX_ITD_US) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">ILD</p>
              <span className="text-xs text-slate-500 dark:text-slate-400">{formatHz(frequency)}</span>
            </div>
            <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{derived.ild.toFixed(1)} dB</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {azimuth >= 0 ? "Right ear louder" : "Left ear louder"}
            </p>
            <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${Math.min(1, derived.ild / 24) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <svg viewBox={`0 0 ${svgSize} ${svgSize}`} role="img" aria-label="Azimuth reference">
              <circle
                cx={compassCenter}
                cy={compassCenter}
                r={compassRadius}
                fill="none"
                stroke="rgba(15,23,42,0.08)"
                strokeWidth="2"
              />
              <line
                x1={compassCenter}
                y1={compassCenter}
                x2={pointerX}
                y2={pointerY}
                stroke="rgba(59,130,246,0.8)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx={compassCenter} cy={compassCenter} r="6" fill="rgba(15,23,42,0.35)" />
              <text x={compassCenter} y={16} textAnchor="middle" className="text-[0.65rem]" fill="rgba(15,23,42,0.5)">
                0° (front)
              </text>
              <text
                x={svgSize - 14}
                y={compassCenter + 4}
                textAnchor="end"
                className="text-[0.65rem]"
                fill="rgba(15,23,42,0.5)"
              >
                90°
              </text>
              <text x={compassCenter} y={svgSize - 6} textAnchor="middle" className="text-[0.65rem]" fill="rgba(15,23,42,0.5)">
                180°
              </text>
              <text
                x={8}
                y={compassCenter + 4}
                className="text-[0.65rem]"
                fill="rgba(15,23,42,0.5)"
                textAnchor="start"
              >
                270°
              </text>
            </svg>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Azimuth indicator
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Cue reliability</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {reliabilityPercent}% confident
            </p>
            <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
              <div className={`h-full rounded-full ${reliabilityColor}`} style={{ width: `${reliabilityPercent}%` }} />
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{reliabilityText}</p>
            {derived.frontBackConfusion && (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
                Front/back ambiguity &mdash; move your head or use spectral notches.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Azimuth
          </span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{azimuth.toFixed(0)}°</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">Dash across -180° to +180° to observe ITD swings.</p>
          <input
            type="range"
            min={-180}
            max={180}
            step="1"
            value={azimuth}
            onChange={(event) => setAzimuth(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>

        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Frequency
          </span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{formatHz(frequency)}</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">High frequencies accentuate ILD; low frequencies favor ITD.</p>
          <input
            type="range"
            min={MIN_FREQUENCY}
            max={MAX_FREQUENCY}
            step="1"
            value={frequency}
            onChange={(event) => setFrequency(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>

        <label className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Spectral richness
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{bandwidthLabel}</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">{(bandwidth * 100).toFixed(0)}%</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {bandwidthLabel === "Pure tone"
              ? "Pure tones rely solely on ITD/ILD; spectral cues disappear."
              : "Broadband sounds bring pinna notches that resolve front/back and elevation."}
          </p>
          <input
            type="range"
            min={MIN_BANDWIDTH}
            max={MAX_BANDWIDTH}
            step="0.01"
            value={bandwidth}
            onChange={(event) => setBandwidth(Number(event.target.value))}
            className="mt-2 h-1 w-full accent-slate-900"
          />
        </label>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Interpretation</p>
        <p className="mt-2">
          {derived.cueTrend} {spectralMessage}
        </p>
      </div>
    </section>
  );
}
