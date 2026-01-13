"use client";

import { useEffect, useMemo, useState } from "react";

const OCTAVE_BAND_PRESETS = [
  { center: 31.5, importance: "Rumble from HVAC systems, distant traffic" },
  { center: 63, importance: "Bass notes, heavy vehicles, mechanical drones" },
  { center: 125, importance: "Fundamental range of many musical instruments" },
  { center: 250, importance: "Warmth and fullness of voices" },
  { center: 500, importance: "Speech clarity foundation, most fundamentals" },
  { center: 1000, importance: "Reference octave, balanced speech energy" },
  { center: 2000, importance: "Consonant intelligibility, spatial cues" },
  { center: 4000, importance: "Perceived brightness, critical HVAC hiss" },
  { center: 8000, importance: "Sibilance, sparkle of cymbals" },
  { center: 16000, importance: "Airiness and subtle details" },
];

const THIRD_OCTAVE_PRESETS = [
  { center: 40, importance: "Low bass from large mechanical equipment" },
  { center: 50, importance: "Impact noise from footsteps, structure-borne rumble" },
  { center: 63, importance: "Bass guitars, subway vibration" },
  { center: 80, importance: "Kick drums, diesel engines" },
  { center: 100, importance: "Warmth of male voices, drum fundamentals" },
  { center: 125, importance: "Body of most musical instruments" },
  { center: 160, importance: "Lower male and alto voice support" },
  { center: 200, importance: "Speech energy in small rooms" },
  { center: 250, importance: "Comb filtering region for small rooms" },
  { center: 315, importance: "Transition between modal and diffuse fields" },
  { center: 400, importance: "Core range for vocal intelligibility" },
  { center: 500, importance: "Reference for sound insulation ratings" },
  { center: 630, importance: "Critical for speech privacy" },
  { center: 800, importance: "Masking of consonants" },
  { center: 1000, importance: "Reference mid band" },
  { center: 1250, importance: "Hearing sensitivity peak" },
  { center: 1600, importance: "Directional cues for localization" },
  { center: 2000, importance: "Consonant clarity" },
  { center: 2500, importance: "Early reflections, intelligibility" },
  { center: 3150, importance: "Sibilance, HVAC hiss" },
  { center: 4000, importance: "Brightness of instruments" },
  { center: 5000, importance: "Speech detail, presence" },
  { center: 6300, importance: "Sharpness perception" },
  { center: 8000, importance: "Sparkle, cymbals" },
  { center: 10000, importance: "Air noise, electronics hiss" },
  { center: 12500, importance: "Spatial detail" },
  { center: 16000, importance: "Very fine high-frequency cues" },
];

const FRACTION_RATIO = {
  octave: Math.sqrt(2),
  third: Math.pow(2, 1 / 6),
};

const TYPE_CONFIG = {
  octave: {
    label: "Octave Bands",
    description: "Broad view of the spectrum. Great for quickly spotting dominant energy regions.",
    data: OCTAVE_BAND_PRESETS,
    fraction: "octave",
  },
  third: {
    label: "Third-Octave Bands",
    description: "Finer resolution (3 bands per octave) used in standardized acoustic reports.",
    data: THIRD_OCTAVE_PRESETS,
    fraction: "third",
  },
};

function formatHz(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 1 : 2)} kHz`;
  }
  return `${value.toFixed(1)} Hz`;
}

function buildBandEntries(defs, fractionKey) {
  const ratio = FRACTION_RATIO[fractionKey];
  return defs.map((item) => {
    const low = item.center / ratio;
    const high = item.center * ratio;
    return {
      ...item,
      id: `${fractionKey}-${item.center}`,
      low,
      high,
    };
  });
}

export default function FrequencyBandExplorer() {
  const [view, setView] = useState("octave");
  const [selectedId, setSelectedId] = useState(null);

  const bands = useMemo(() => {
    const config = TYPE_CONFIG[view];
    return buildBandEntries(config.data, config.fraction);
  }, [view]);

  useEffect(() => {
    setSelectedId((prev) => {
      if (!prev) return bands[0]?.id ?? null;
      return bands.some((band) => band.id === prev) ? prev : bands[0]?.id ?? null;
    });
  }, [bands]);

  const activeBand = bands.find((band) => band.id === selectedId) ?? bands[0];

  return (
    <section className="my-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Frequency Bands</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Explore octave & third-octave bands</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Switch between band resolutions and select a row to inspect its limits and acoustic role.</p>
        </div>
        <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-slate-50 p-1 text-sm dark:border-slate-700 dark:bg-slate-800">
          {Object.entries(TYPE_CONFIG).map(([key, config]) => (
            <button
              key={key}
              type="button"
              onClick={() => setView(key)}
              className={`rounded-full px-4 py-1 font-medium transition ${
                view === key
                  ? "bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{TYPE_CONFIG[view].description}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 text-left uppercase tracking-wider text-[0.7rem] text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Band</th>
                <th className="px-4 py-3">Lower limit</th>
                <th className="px-4 py-3">Upper limit</th>
                <th className="px-4 py-3">Importance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {bands.map((band) => {
                const isActive = band.id === activeBand?.id;
                return (
                  <tr
                    key={band.id}
                    className={`cursor-pointer text-slate-800 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900 ${
                      isActive ? "bg-slate-50/80 dark:bg-slate-900" : ""
                    }`}
                    onClick={() => setSelectedId(band.id)}
                  >
                    <td className="px-4 py-3 font-semibold">{formatHz(band.center)}</td>
                    <td className="px-4 py-3">{formatHz(band.low)}</td>
                    <td className="px-4 py-3">{formatHz(band.high)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{band.importance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Selected band</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{activeBand ? formatHz(activeBand.center) : "--"}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{activeBand?.importance ?? "Pick a band to see why it matters."}</p>
          </div>

          {activeBand && (
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100 dark:bg-slate-950 dark:ring-slate-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Band limits</p>
              <dl className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Lower frequency</dt>
                  <dd className="font-semibold">{formatHz(activeBand.low)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Center frequency</dt>
                  <dd className="font-semibold">{formatHz(activeBand.center)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Upper frequency</dt>
                  <dd className="font-semibold">{formatHz(activeBand.high)}</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="rounded-xl border border-dashed border-slate-300/60 px-4 py-3 text-xs leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-300">
            Octave bands double in frequency at each step. Third-octave bands split each octave into three equal ratios (≈1.26×). Acoustic standards reference these bands for noise measurements, equalization, and auralization workflows.
          </div>
        </div>
      </div>
    </section>
  );
}
