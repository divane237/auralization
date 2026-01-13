"use client";

import { useMemo, useState } from "react";

const P0 = 20e-6; // Pa
const I0 = 1e-12; // W/m^2

const TOOL_TABS = [
  {
    id: "pressure",
    label: "Pressure ↔ SPL",
    description: "Convert between acoustic pressure and decibel SPL.",
  },
  {
    id: "intensity",
    label: "Intensity ↔ Level",
    description: "Go between sound intensity (W/m²) and dB level.",
  },
  {
    id: "addition",
    label: "Add Levels",
    description: "Energy-based addition of multiple decibel values.",
  },
  {
    id: "difference",
    label: "dB Difference",
    description: "Compare two levels and inspect linear ratios.",
  },
];

function formatNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  if ((abs !== 0 && abs < 0.001) || abs >= 1_000_000) {
    return value.toExponential(digits);
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function DecibelCalculator() {
  const [tool, setTool] = useState("pressure");

  const [pressureMode, setPressureMode] = useState("toLevel");
  const [pressureInput, setPressureInput] = useState("0.00002");

  const [intensityMode, setIntensityMode] = useState("toLevel");
  const [intensityInput, setIntensityInput] = useState("0.000000000001");

  const [levelsToAdd, setLevelsToAdd] = useState(["60", "60"]);

  const [differenceInputs, setDifferenceInputs] = useState({ reference: "60", comparison: "70" });

  const pressureResult = useMemo(() => {
    if (pressureInput === "") return null;
    const numeric = Number(pressureInput);
    if (!Number.isFinite(numeric)) return null;

    if (pressureMode === "toLevel") {
      if (numeric <= 0) return null;
      const level = 20 * Math.log10(numeric / P0);
      return {
        level,
        pressure: numeric,
        ratio: numeric / P0,
      };
    }

    const pressure = P0 * 10 ** (numeric / 20);
    return {
      level: numeric,
      pressure,
      ratio: pressure / P0,
    };
  }, [pressureInput, pressureMode]);

  const intensityResult = useMemo(() => {
    if (intensityInput === "") return null;
    const numeric = Number(intensityInput);
    if (!Number.isFinite(numeric)) return null;

    if (intensityMode === "toLevel") {
      if (numeric <= 0) return null;
      const level = 10 * Math.log10(numeric / I0);
      return {
        level,
        intensity: numeric,
        ratio: numeric / I0,
      };
    }

    const intensity = I0 * 10 ** (numeric / 10);
    return {
      level: numeric,
      intensity,
      ratio: intensity / I0,
    };
  }, [intensityInput, intensityMode]);

  const additionResult = useMemo(() => {
    const valid = levelsToAdd
      .map((entry) => Number(entry))
      .filter((value) => Number.isFinite(value));
    if (valid.length === 0) return null;

    const linearSum = valid.reduce((sum, level) => sum + 10 ** (level / 10), 0);
    const combinedLevel = 10 * Math.log10(linearSum);
    const averageLevel = combinedLevel - 10 * Math.log10(valid.length);

    return {
      entries: valid.length,
      combinedLevel,
      linearSum,
      averageLevel,
    };
  }, [levelsToAdd]);

  const differenceResult = useMemo(() => {
    const reference = Number(differenceInputs.reference);
    const comparison = Number(differenceInputs.comparison);
    if (!Number.isFinite(reference) || !Number.isFinite(comparison)) return null;

    const delta = comparison - reference;
    const powerRatio = 10 ** (delta / 10);
    const amplitudeRatio = 10 ** (delta / 20);

    return {
      delta,
      powerRatio,
      amplitudeRatio,
    };
  }, [differenceInputs]);

  const renderPressureTool = () => (
    <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Mode</p>
            <p className="text-base font-medium text-slate-100">{pressureMode === "toLevel" ? "Pressure → SPL" : "SPL → Pressure"}</p>
          </div>
          <div className="inline-flex overflow-hidden rounded-full border border-slate-700">
            <button
              type="button"
              onClick={() => setPressureMode("toLevel")}
              className={`px-3 py-1 text-sm font-medium transition ${
                pressureMode === "toLevel" ? "bg-slate-100 text-slate-900" : "bg-transparent text-slate-300"
              }`}
            >
              Pressure → dB
            </button>
            <button
              type="button"
              onClick={() => setPressureMode("toPressure")}
              className={`px-3 py-1 text-sm font-medium transition ${
                pressureMode === "toPressure" ? "bg-slate-100 text-slate-900" : "bg-transparent text-slate-300"
              }`}
            >
              dB → Pressure
            </button>
          </div>
        </div>

        <label className="block text-xs text-slate-300">
          {pressureMode === "toLevel" ? "Sound pressure (Pa)" : "Sound pressure level (dB SPL)"}
          <input
            type="number"
            step="any"
            value={pressureInput}
            onChange={(event) => setPressureInput(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>

        <p className="text-xs text-slate-400">
          Reference pressure p0 = 20 µPa. Only positive values make sense for the linear form.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-800">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Result</p>
        <p className="mt-2 text-3xl font-semibold text-white">
          {pressureResult ? `${formatNumber(pressureResult.level, 2)} dB` : "—"}
        </p>
        <dl className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <dt>{pressureMode === "toLevel" ? "Input pressure" : "Calculated pressure"}</dt>
            <dd className="font-semibold">{pressureResult ? `${formatNumber(pressureResult.pressure, 5)} Pa` : "—"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Ratio vs. p0</dt>
            <dd className="font-semibold">{pressureResult ? `${formatNumber(pressureResult.ratio, 3)} ×` : "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const renderIntensityTool = () => (
    <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Mode</p>
            <p className="text-base font-medium text-slate-100">{intensityMode === "toLevel" ? "Intensity → Level" : "Level → Intensity"}</p>
          </div>
          <div className="inline-flex overflow-hidden rounded-full border border-slate-700">
            <button
              type="button"
              onClick={() => setIntensityMode("toLevel")}
              className={`px-3 py-1 text-sm font-medium transition ${
                intensityMode === "toLevel" ? "bg-slate-100 text-slate-900" : "bg-transparent text-slate-300"
              }`}
            >
              Intensity → dB
            </button>
            <button
              type="button"
              onClick={() => setIntensityMode("toIntensity")}
              className={`px-3 py-1 text-sm font-medium transition ${
                intensityMode === "toIntensity" ? "bg-slate-100 text-slate-900" : "bg-transparent text-slate-300"
              }`}
            >
              dB → Intensity
            </button>
          </div>
        </div>

        <label className="block text-xs text-slate-300">
          {intensityMode === "toLevel" ? "Sound intensity (W/m²)" : "Sound intensity level (dB)"}
          <input
            type="number"
            step="any"
            value={intensityInput}
            onChange={(event) => setIntensityInput(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </label>

        <p className="text-xs text-slate-400">Reference intensity I0 = 10⁻¹² W/m².</p>
      </div>

      <div className="rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-800">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Result</p>
        <p className="mt-2 text-3xl font-semibold text-white">
          {intensityResult ? `${formatNumber(intensityResult.level, 2)} dB` : "—"}
        </p>
        <dl className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <dt>{intensityMode === "toLevel" ? "Input intensity" : "Calculated intensity"}</dt>
            <dd className="font-semibold">{intensityResult ? `${formatNumber(intensityResult.intensity, 5)} W/m²` : "—"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Ratio vs. I0</dt>
            <dd className="font-semibold">{intensityResult ? `${formatNumber(intensityResult.ratio, 3)} ×` : "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const renderAdditionTool = () => (
    <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Add SPL or power levels correctly by summing their linear values. Enter as many levels as you like and the tool will display the combined decibel level plus the linear energy sum.
        </p>

        <div className="space-y-3">
          {levelsToAdd.map((value, index) => (
            <div key={`level-${index}`} className="flex items-center gap-3">
              <input
                type="number"
                step="any"
                value={value}
                onChange={(event) => {
                  const next = [...levelsToAdd];
                  next[index] = event.target.value;
                  setLevelsToAdd(next);
                }}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Level in dB"
              />
              {levelsToAdd.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLevelsToAdd(levelsToAdd.filter((_, i) => i !== index))}
                  className="rounded-full border border-slate-600 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <button
            type="button"
            onClick={() => setLevelsToAdd([...levelsToAdd, "60"])}
            className="rounded-full border border-slate-600 px-4 py-1 text-slate-200 hover:bg-slate-800"
          >
            + Add another level
          </button>
          <button
            type="button"
            onClick={() => setLevelsToAdd(["60", "60"])}
            className="rounded-full border border-slate-600 px-4 py-1 text-slate-200 hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-800">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Combined level</p>
        <p className="mt-2 text-3xl font-semibold text-white">
          {additionResult ? `${formatNumber(additionResult.combinedLevel, 2)} dB` : "—"}
        </p>
        <dl className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <dt>Contributors</dt>
            <dd className="font-semibold">{additionResult ? additionResult.entries : "—"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Linear sum (power)</dt>
            <dd className="font-semibold">{additionResult ? `${formatNumber(additionResult.linearSum, 3)} × I0` : "—"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Equivalent per-source level</dt>
            <dd className="font-semibold">{additionResult ? `${formatNumber(additionResult.averageLevel, 2)} dB` : "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );

  const renderDifferenceTool = () => (
    <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
      <div className="space-y-4">
        <p className="text-sm text-slate-300">
          Compare two decibel values to see the dB difference plus the corresponding linear ratios for energy and amplitude.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-xs text-slate-300">
            Reference level (dB)
            <input
              type="number"
              step="any"
              value={differenceInputs.reference}
              onChange={(event) =>
                setDifferenceInputs((prev) => ({ ...prev, reference: event.target.value }))
              }
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>
          <label className="text-xs text-slate-300">
            Comparison level (dB)
            <input
              type="number"
              step="any"
              value={differenceInputs.comparison}
              onChange={(event) =>
                setDifferenceInputs((prev) => ({ ...prev, comparison: event.target.value }))
              }
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </label>
        </div>

        <p className="text-xs text-slate-400">
          Positive differences mean the comparison source is louder. Energy ratios use 10^(ΔL/10), while amplitude ratios use 10^(ΔL/20).
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900/70 p-5 ring-1 ring-slate-800">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Difference</p>
        <p className="mt-2 text-3xl font-semibold text-white">
          {differenceResult ? `${formatNumber(differenceResult.delta, 2)} dB` : "—"}
        </p>
        <dl className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-center justify-between">
            <dt>Energy / power ratio</dt>
            <dd className="font-semibold">{differenceResult ? `${formatNumber(differenceResult.powerRatio, 3)} ×` : "—"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Pressure / amplitude ratio</dt>
            <dd className="font-semibold">{differenceResult ? `${formatNumber(differenceResult.amplitudeRatio, 3)} ×` : "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );

  return (
    <section className="w-full space-y-5 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Decibel Toolkit</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Interactive decibel calculator</h2>
          <p className="text-sm text-slate-400">
            Convert between linear quantities and logarithmic levels, add SPL values correctly, and compare sources using the tabs below.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {TOOL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTool(tab.id)}
              className={`rounded-full border px-3 py-1 font-semibold transition ${
                tool === tab.id
                  ? "border-sky-500 bg-sky-500/10 text-sky-200"
                  : "border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-400">{TOOL_TABS.find((item) => item.id === tool)?.description}</p>

      <div className="mt-4 space-y-6">
        {tool === "pressure" && renderPressureTool()}
        {tool === "intensity" && renderIntensityTool()}
        {tool === "addition" && renderAdditionTool()}
        {tool === "difference" && renderDifferenceTool()}
      </div>
    </section>
  );
}
