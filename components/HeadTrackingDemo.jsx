"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SOURCE_AZIMUTH = -30; // Fixed world direction so the listener can rotate around it.

const normalizeAngle = (angle) => {
  let normalized = angle % 360;
  if (normalized > 180) {
    normalized -= 360;
  }
  if (normalized <= -180) {
    normalized += 360;
  }
  return normalized;
};

const polarPoint = (angle, radius, center) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad),
  };
};

export default function HeadTrackingDemo() {
  const [yaw, setYaw] = useState(0);
  const [staticRendering, setStaticRendering] = useState(false);
  const [smoothUpdates, setSmoothUpdates] = useState(true);
  const [displayedAzimuth, setDisplayedAzimuth] = useState(0);
  const displayRef = useRef(0);

  const updateDisplayed = useCallback((value) => {
    setDisplayedAzimuth(value);
    displayRef.current = value;
  }, []);

  const targetAzimuth = staticRendering ? 0 : normalizeAngle(SOURCE_AZIMUTH - yaw);

  useEffect(() => {
    if (!smoothUpdates) {
      updateDisplayed(targetAzimuth);
      return;
    }

    let frameId;
    const animate = () => {
      const current = displayRef.current;
      const delta = normalizeAngle(targetAzimuth - current);
      if (Math.abs(delta) < 0.2) {
        updateDisplayed(targetAzimuth);
        return;
      }
      const next = normalizeAngle(current + delta * 0.25);
      updateDisplayed(next);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [smoothUpdates, targetAzimuth, updateDisplayed]);

  const svgSize = 240;
  const center = svgSize / 2;
  const outerRadius = center - 20;
  const headRadius = outerRadius * 0.56;

  const headEndpoint = polarPoint(yaw, outerRadius * 0.75, center);
  const sourceEndpoint = polarPoint(SOURCE_AZIMUTH, outerRadius, center);
  const perceivedEndpoint = polarPoint(displayedAzimuth, outerRadius * 0.85, center);

  const formattedYaw = yaw.toFixed(0);
  const formattedPerceived = displayedAzimuth.toFixed(1);
  const formattedTarget = targetAzimuth.toFixed(1);

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Interactive demo
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Head Tracking Demo</h3>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Source fixed at {SOURCE_AZIMUTH}°
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
        <div className="space-y-2 text-center text-xs text-slate-500 dark:text-slate-400">
          <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="mx-auto block">
            <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="#CBD5F5" strokeWidth="1.5" />
            <circle cx={center} cy={center} r={headRadius} fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            <line
              x1={center}
              y1={center}
              x2={sourceEndpoint.x}
              y2={sourceEndpoint.y}
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx={sourceEndpoint.x} cy={sourceEndpoint.y} r="4" fill="#EF4444" />
            <line
              x1={center}
              y1={center}
              x2={perceivedEndpoint.x}
              y2={perceivedEndpoint.y}
              stroke="#4338CA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <circle cx={perceivedEndpoint.x} cy={perceivedEndpoint.y} r="4" fill="#4338CA" />
            <line
              x1={center}
              y1={center}
              x2={headEndpoint.x}
              y2={headEndpoint.y}
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-red-500">● World source</span>
            <span className="text-sky-600">● Perceived direction</span>
            <span className="text-emerald-500">● Head orientation</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Perceived direction {!smoothUpdates && "jumps straight to the target"}{smoothUpdates && "smoothly follows"}.
          </p>
        </div>

        <div className="space-y-5 rounded-2xl bg-slate-50/70 p-5 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-200">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <span>Yaw rotation</span>
              <span>{formattedYaw}°</span>
            </div>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={yaw}
              onChange={(event) => setYaw(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-500 dark:bg-slate-700"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400">
              <span>-90° (left)</span>
              <span>0° (forward)</span>
              <span>+90° (right)</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={staticRendering}
                onChange={(event) => setStaticRendering(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-500 accent-sky-500 dark:border-slate-600"
              />
              <span>Static rendering (perceived source stays locked to the head)</span>
            </label>
            <label className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={smoothUpdates}
                onChange={(event) => setSmoothUpdates(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-500 accent-sky-500 dark:border-slate-600"
              />
              <span>Smooth updates (interpolate perceived direction)</span>
            </label>
          </div>

          <div className="rounded-2xl bg-white/80 p-3 text-xs text-slate-500 shadow-sm dark:bg-slate-900/60 dark:text-slate-300">
            <p>
              Target direction: <strong className="text-slate-800 dark:text-white">{formattedTarget}°</strong>
            </p>
            <p>
              Displayed direction: <strong className="text-slate-800 dark:text-white">{formattedPerceived}°</strong>
            </p>
            <p className="mt-2">
              Dynamic rendering updates perceive direction when yaw changes. Static rendering freezes the target and makes the source rotate with
              the head, while smoothing keeps the perceptual motion stable between updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
