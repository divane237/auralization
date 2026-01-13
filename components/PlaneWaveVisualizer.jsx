"use client";

import { useEffect, useRef, useState } from "react";

const formatNumber = (value, digits = 1) => Number.parseFloat(value).toFixed(digits);

export default function PlaneWaveVisualizer() {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(25);
  const [frequency, setFrequency] = useState(250); // Hz
  const [wavelength, setWavelength] = useState(1.4); // meters
  const [speed, setSpeed] = useState(343); // m/s
  const configRef = useRef({ angle, frequency, wavelength, speed });

  useEffect(() => {
    configRef.current = { angle, frequency, wavelength, speed };
  }, [angle, frequency, wavelength, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let startTime = performance.now();

    const VISUAL_SPEED_FACTOR = 0.2;
    const render = (time) => {
      const elapsedSeconds = (time - startTime) / 1000;
      const width = canvas.clientWidth || 1;
      const height = canvas.clientHeight || 1;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      const { angle: currentAngle, frequency: currentFrequency, wavelength: currentWavelength, speed: currentSpeed } =
        configRef.current;
      const angleRad = (currentAngle * Math.PI) / 180;
      const dirX = Math.cos(angleRad);
      const dirY = Math.sin(angleRad);

      const k = (2 * Math.PI) / Math.max(currentWavelength, 0.05);
      const omega = 2 * Math.PI * currentFrequency;
      const velocityFactor = currentSpeed / 343; // relative to room-temperature air

      // Scale canvas coordinates to a few meters across for a clear pattern.
      const spanMeters = 4;
      const aspect = height / width;
      const halfWidthMeters = spanMeters / 2;
      const halfHeightMeters = (spanMeters * aspect) / 2;

      let idx = 0;
      for (let y = 0; y < height; y += 1) {
        const yMeters = ((y / height) * 2 - 1) * halfHeightMeters;
        for (let x = 0; x < width; x += 1) {
          const xMeters = ((x / width) * 2 - 1) * halfWidthMeters;
          const distanceAlongWave = xMeters * dirX + yMeters * dirY;

          const phase =
            k * distanceAlongWave -
            omega * elapsedSeconds * velocityFactor * VISUAL_SPEED_FACTOR;
          const value = Math.sin(phase);
          const intensity = (value + 1) / 2; // map [-1,1] to [0,1]

          const r = 20 + intensity * 200;
          const g = 60 + intensity * 140;
          const b = 220 - intensity * 140;

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
          idx += 4;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const derivedFrequencyFromSpeed = speed / Math.max(wavelength, 1e-3);
  const waveNumber = (2 * Math.PI) / Math.max(wavelength, 0.05);

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Plane Wave Explorer
          </p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Visualize planar fronts & propagation
          </h3>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          c<sub>input</sub> = {formatNumber(speed, 0)} m/s · λ = {formatNumber(wavelength, 2)} m
        </div>
      </div>

      <div className="relative mb-6 h-72 w-full overflow-hidden rounded-3xl bg-slate-950">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 border border-white/10" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <SliderControl
            label="Propagation angle"
            unit="°"
            min={0}
            max={180}
            step={1}
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
            precision={0}
          />
          <SliderControl
            label="Frequency"
            unit="Hz"
            min={20}
            max={1000}
            step={5}
            value={frequency}
            onChange={(event) => setFrequency(Number(event.target.value))}
            precision={0}
          />
          <SliderControl
            label="Wavelength"
            unit="m"
            min={0.2}
            max={5}
            step={0.1}
            value={wavelength}
            onChange={(event) => setWavelength(Number(event.target.value))}
            precision={2}
          />
          <SliderControl
            label="Speed of sound"
            unit="m/s"
            min={150}
            max={2000}
            step={10}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            precision={0}
          />
        </div>

        <div className="rounded-2xl bg-slate-50/70 p-5 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-200">
          <p className="font-semibold text-slate-900 dark:text-white">Instantaneous insights</p>
          <ul className="mt-3 space-y-2">
            <li className="flex justify-between">
              <span>Wave number k</span>
              <span>{formatNumber(waveNumber, 2)} rad/m</span>
            </li>
            <li className="flex justify-between">
              <span>Phase velocity (slider)</span>
              <span>{formatNumber(speed, 0)} m/s</span>
            </li>
            <li className="flex justify-between">
              <span>f × λ</span>
              <span>{formatNumber(frequency * wavelength, 1)} m/s</span>
            </li>
            <li className="flex justify-between">
              <span>Freq. implied by c and λ</span>
              <span>{formatNumber(derivedFrequencyFromSpeed, 1)} Hz</span>
            </li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Adjust each control to explore how planar wavefront spacing, temporal oscillation,
            and travel speed interact. The animation is qualitative—use the numeric readouts
            to relate to physical values.
          </p>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ label, unit, min, max, step, value, onChange, precision = 0 }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>{label}</span>
        <span className="font-semibold text-slate-900 dark:text-white">
          {formatNumber(value, precision)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-sky-500 dark:bg-slate-700"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{formatNumber(min, precision)}</span>
        <span>{formatNumber(max, precision)}</span>
      </div>
    </label>
  );
}
