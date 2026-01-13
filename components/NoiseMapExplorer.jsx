"use client";

import { useMemo, useState } from "react";

const GROUND_TYPES = [
  { id: "hard", label: "Hard/reflective", attenuation: 0 },
  { id: "soft", label: "Soft/vegetated", attenuation: 3 },
];

const SAMPLE_DISTANCES = [10, 25, 50, 100, 200, 400];

const formatDb = (value) => {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(1)} dB`;
};

const computeLevel = (sourceLevel, distance, barrierHeight, groundAttenuation) => {
  const safeDistance = Math.max(distance, 1);
  const distanceLoss = 20 * Math.log10(safeDistance);
  const barrierEffect = barrierHeight > 0 ? Math.min(barrierHeight * 3.5, 18) : 0;
  return sourceLevel - distanceLoss - barrierEffect - groundAttenuation;
};

export default function NoiseMapExplorer() {
  const [sourceLevel, setSourceLevel] = useState(110);
  const [receiverDistance, setReceiverDistance] = useState(65);
  const [barrierHeight, setBarrierHeight] = useState(2.5);
  const [groundType, setGroundType] = useState("hard");
  const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
  const createUpdater = (setter, min, max) => (event) => {
    const numeric = Number(event.target.value);
    if (!Number.isFinite(numeric)) return;
    setter(clampValue(numeric, min, max));
  };

  const groundAttenuation = useMemo(() => {
    const match = GROUND_TYPES.find((entry) => entry.id === groundType);
    return match ? match.attenuation : 0;
  }, [groundType]);

  const receiverLevel = useMemo(
    () => computeLevel(sourceLevel, receiverDistance, barrierHeight, groundAttenuation),
    [sourceLevel, receiverDistance, barrierHeight, groundAttenuation]
  );

  const contourData = useMemo(() => {
    const points = SAMPLE_DISTANCES.map((distance) => {
      const level = computeLevel(sourceLevel, distance, barrierHeight, groundAttenuation);
      return { distance, level };
    });
    const levels = points.map((entry) => entry.level);
    const maxLevel = Math.max(...levels);
    const minLevel = Math.min(...levels);
    const range = maxLevel - minLevel || 1;
    return points.map((entry) => ({
      ...entry,
      width: Math.max(12, ((entry.level - minLevel) / range) * 100),
    }));
  }, [sourceLevel, barrierHeight, groundAttenuation]);

  return (
    <section className="space-y-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/70 to-slate-900/60 p-6 ring-1 ring-white/5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Noise Map Explorer</p>
          <h3 className="text-2xl font-semibold text-white">Understand outdoor spreading</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Receiver level estimate</p>
          <p className="text-lg font-semibold text-amber-300">{formatDb(receiverLevel)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">Source & receiver</p>
            <label className="text-xs text-slate-300">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Source level (dB)
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="70"
                  max="120"
                  step="1"
                  value={sourceLevel}
                  onChange={createUpdater(setSourceLevel, 70, 120)}
                  className="h-1 flex-1 appearance-none rounded-full bg-slate-700/60 accent-amber-400"
                />
                <input
                  type="number"
                  min="70"
                  max="120"
                  step="1"
                  value={sourceLevel}
                  onChange={createUpdater(setSourceLevel, 70, 120)}
                  className="w-16 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </label>

            <label className="text-xs text-slate-300">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Receiver distance (m)
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={receiverDistance}
                  onChange={createUpdater(setReceiverDistance, 5, 500)}
                  className="h-1 flex-1 appearance-none rounded-full bg-slate-700/60 accent-amber-400"
                />
                <input
                  type="number"
                  min="5"
                  max="500"
                  step="5"
                  value={receiverDistance}
                  onChange={createUpdater(setReceiverDistance, 5, 500)}
                  className="w-16 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </label>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">Mitigation features</p>
            <label className="text-xs text-slate-300">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Barrier height (m)
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={barrierHeight}
                  onChange={createUpdater(setBarrierHeight, 0, 10)}
                  className="h-1 flex-1 appearance-none rounded-full bg-slate-700/60 accent-amber-400"
                />
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={barrierHeight}
                  onChange={createUpdater(setBarrierHeight, 0, 10)}
                  className="w-16 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-right text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </label>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Ground type</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {GROUND_TYPES.map((ground) => (
                  <button
                    key={ground.id}
                    type="button"
                    onClick={() => setGroundType(ground.id)}
                    className={`rounded-full border px-4 py-1 text-xs font-semibold transition ${
                      groundType === ground.id
                        ? "border-amber-400 bg-amber-400/10 text-amber-200"
                        : "border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {ground.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Predicted map</p>
          <p className="mt-3 text-3xl font-semibold text-white">{formatDb(receiverLevel)}</p>
          <p className="text-sm text-slate-400">
            Includes geometric spreading (6 dB per doubling) plus barrier and ground losses.
          </p>

          <div className="mt-5 space-y-3">
            {contourData.map((entry) => (
              <div key={entry.distance} className="space-y-1 text-xs text-slate-300">
                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                  <span>{entry.distance} m</span>
                  <span>{formatDb(entry.level)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 transition-all"
                    style={{ width: `${entry.width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 rounded-2xl border border-dashed border-slate-800 p-3 text-xs text-slate-400">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Explorer tips
            </p>
            <ul className="space-y-1 pl-4 text-xs text-slate-300">
              <li>Increase distance to feel the ~6 dB per doubling drop.</li>
              <li>Raise the barrier to carve a sharper shadow zone.</li>
              <li>Soft ground adds absorption and keeps propagation muted.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
