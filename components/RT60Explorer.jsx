"use client";

import { useMemo, useState } from "react";

const ROOM_PRESETS = [
  {
    id: "studio",
    label: "Studio / control room",
    dimensions: { length: 8.5, width: 6, height: 3.2 },
    absorption: 0.33,
    furniture: 0.28,
  },
  {
    id: "lecture",
    label: "Lecture hall",
    dimensions: { length: 22, width: 16, height: 7.5 },
    absorption: 0.14,
    furniture: 0.2,
  },
  {
    id: "auditorium",
    label: "Auditorium",
    dimensions: { length: 35, width: 28, height: 13 },
    absorption: 0.1,
    furniture: 0.18,
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const formatNumber = (value, digits = 2) => {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 1e6 || (Math.abs(value) !== 0 && Math.abs(value) < 0.01)) {
    return value.toExponential(digits);
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: digits });
};

export default function RT60Explorer() {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(8.5);
  const [height, setHeight] = useState(4);
  const [surfaceAbsorption, setSurfaceAbsorption] = useState(0.2);
  const [furnitureContribution, setFurnitureContribution] = useState(0.25);
  const [activePreset, setActivePreset] = useState("custom");

  const updateDimension = (setter, value, min, max) => {
    const numeric = clamp(Number(value), min, max);
    if (Number.isFinite(numeric)) {
      setter(numeric);
      setActivePreset("custom");
    }
  };

  const applyPreset = (preset) => {
    setLength(preset.dimensions.length);
    setWidth(preset.dimensions.width);
    setHeight(preset.dimensions.height);
    setSurfaceAbsorption(preset.absorption);
    setFurnitureContribution(preset.furniture);
    setActivePreset(preset.id);
  };

  const computed = useMemo(() => {
    const volume = length * width * height;
    const surfaceArea = 2 * (length * width + length * height + width * height);
    const effectiveAbsorption = Math.min(0.95, surfaceAbsorption + furnitureContribution * 0.45);
    const totalAbsorption = surfaceArea * effectiveAbsorption;
    const rt60 = totalAbsorption > 0 ? (0.161 * volume) / totalAbsorption : 0;
    return {
      volume,
      surfaceArea,
      effectiveAbsorption,
      totalAbsorption,
      rt60,
    };
  }, [length, width, height, surfaceAbsorption, furnitureContribution]);

  return (
    <section className="space-y-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/70 to-slate-900/60 p-6 ring-1 ring-white/5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">RT60 Explorer</p>
          <h3 className="text-2xl font-semibold text-white">Reverberation intuition</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Sabine estimate</p>
          <p className="text-lg font-semibold text-sky-400">{formatNumber(computed.rt60, 2)} s</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActivePreset("custom")}
          className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
            activePreset === "custom"
              ? "border-sky-400 bg-sky-400/10 text-sky-200"
              : "border-slate-700 text-slate-300 hover:border-slate-500"
          }`}
        >
          Custom
        </button>
        {ROOM_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset)}
            className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
              activePreset === preset.id
                ? "border-sky-400 bg-sky-400/10 text-sky-200"
                : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">Dimensions (meters)</p>
              <p className="text-xs text-slate-400">Room volume drives decay time</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: "Length", value: length, min: 4, max: 40, setter: setLength },
                { label: "Width", value: width, min: 4, max: 30, setter: setWidth },
                { label: "Height", value: height, min: 2.5, max: 10, setter: setHeight },
              ].map((dim) => (
                <label key={dim.label} className="text-xs text-slate-300">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {dim.label}
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={dim.min}
                      max={dim.max}
                      step="0.1"
                      value={dim.value}
                      onChange={(event) => updateDimension(dim.setter, event.target.value, dim.min, dim.max)}
                      className="h-1 w-full flex-1 appearance-none rounded-full bg-slate-700/60 accent-sky-400"
                    />
                    <input
                      type="number"
                      min={dim.min}
                      max={dim.max}
                      step="0.1"
                      value={dim.value}
                      onChange={(event) => updateDimension(dim.setter, event.target.value, dim.min, dim.max)}
                      className="w-16 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">Material tuning</p>
            <div className="text-xs text-slate-400">
              Increase absorption to reduce reverberation. Furniture adds diffuse absorption even if surfaces stay reflective.
            </div>
            <label className="block text-xs text-slate-300">
              Surface absorption (average α)
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="0.02"
                  max="0.9"
                  step="0.01"
                  value={surfaceAbsorption}
                  onChange={(event) => {
                    setSurfaceAbsorption(parseFloat(event.target.value));
                    setActivePreset("custom");
                  }}
                  className="h-1 flex-1 appearance-none rounded-full bg-slate-700/60 accent-sky-400"
                />
                <span className="w-16 text-right font-semibold text-slate-100">
                  {surfaceAbsorption.toFixed(2)}
                </span>
              </div>
            </label>
            <label className="block text-xs text-slate-300">
              Furniture / occupancy impact
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={furnitureContribution}
                  onChange={(event) => {
                    setFurnitureContribution(parseFloat(event.target.value));
                    setActivePreset("custom");
                  }}
                  className="h-1 flex-1 appearance-none rounded-full bg-slate-700/60 accent-sky-400"
                />
                <span className="w-16 text-right font-semibold text-slate-100">
                  {(furnitureContribution * 100).toFixed(0)}%
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Insights</p>
          <p className="mt-4 text-3xl font-semibold text-white">{formatNumber(computed.rt60, 2)} s</p>
          <dl className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <dt>Room volume</dt>
              <dd className="font-semibold">{formatNumber(computed.volume, 1)} m³</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Surface area × α</dt>
              <dd className="font-semibold">{formatNumber(computed.totalAbsorption, 1)} m²</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Effective α</dt>
              <dd className="font-semibold">{(computed.effectiveAbsorption * 100).toFixed(1)}%</dd>
            </div>
          </dl>
          <div className="mt-5 space-y-2 text-xs text-slate-400">
            <p>
              Sabine shows RT60 growing with volume and shrinking with more absorption. Tune both dimensions and materials to meet targets.
            </p>
            <p>
              Look for diminishing returns: doubling absorption yields less effect when surfaces are already heavily treated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
