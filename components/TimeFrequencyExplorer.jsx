"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SAMPLE_RATE = 2048;
const TOTAL_SECONDS = 2;
const WINDOW_SIZE = 256;
const HOP_SIZE = 32;
const MIN_DB = -80;
const MAX_DB = 0;

function createSignal() {
  const length = SAMPLE_RATE * TOTAL_SECONDS;
  const signal = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const base = 0.55 * Math.sin(2 * Math.PI * 220 * t);
    const modulated = 0.35 * Math.sin(2 * Math.PI * (360 + 120 * Math.sin(2 * Math.PI * 0.25 * t)) * t);
    const chirp = 0.2 * Math.sin(2 * Math.PI * (120 + 200 * t) * t + Math.PI / 3);
    signal[i] = base + modulated + chirp;
  }
  return signal;
}

function hannWindow(length) {
  const w = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
  }
  return w;
}

function computeSpectrogram(signal) {
  if (!signal || signal.length === 0) return null;
  const window = WINDOW_SIZE;
  const hop = HOP_SIZE;
  const frames = Math.max(1, Math.floor((signal.length - window) / hop) + 1);
  const freqBins = new Float32Array(window / 2);
  for (let k = 0; k < freqBins.length; k += 1) {
    freqBins[k] = (k * SAMPLE_RATE) / window;
  }
  const windowShape = hannWindow(window);
  const data = new Array(frames);
  const frameTimes = new Float32Array(frames);
  const temp = new Float32Array(window);

  for (let frame = 0; frame < frames; frame += 1) {
    const start = Math.min(frame * hop, Math.max(0, signal.length - window));
    frameTimes[frame] = start / SAMPLE_RATE;
    for (let i = 0; i < window; i += 1) {
      temp[i] = (signal[start + i] ?? 0) * windowShape[i];
    }
    const magnitudes = new Float32Array(window / 2);
    for (let k = 0; k < magnitudes.length; k += 1) {
      let real = 0;
      let imag = 0;
      for (let n = 0; n < window; n += 1) {
        const angle = (-2 * Math.PI * k * n) / window;
        real += temp[n] * Math.cos(angle);
        imag += temp[n] * Math.sin(angle);
      }
      const magnitude = Math.sqrt(real * real + imag * imag) * (2 / window);
      magnitudes[k] = 20 * Math.log10(magnitude + 1e-6);
    }
    data[frame] = magnitudes;
  }

  return { frames: data, freqBins, frameTimes };
}

function dbToColor(db) {
  const norm = Math.min(Math.max((db - MIN_DB) / (MAX_DB - MIN_DB || 1), 0), 1);
  const hue = 240 - norm * 240; // blue -> yellow
  const light = 15 + norm * 55;
  return `hsl(${hue}, 80%, ${light}%)`;
}

function formatHz(value) {
  if (!Number.isFinite(value)) return "--";
  if (value >= 1000) return `${(value / 1000).toFixed(2)} kHz`;
  return `${value.toFixed(1)} Hz`;
}

export default function TimeFrequencyExplorer() {
  const signal = useMemo(() => createSignal(), []);
  const spectrogram = useMemo(() => computeSpectrogram(signal), [signal]);
  const [frameIndex, setFrameIndex] = useState(0);

  const waveformCanvasRef = useRef(null);
  const spectrogramCanvasRef = useRef(null);
  const spectrumCanvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!spectrogram || spectrogram.frames.length === 0) return undefined;
    let lastTime = 0;
    const totalFrames = spectrogram.frames.length;

    const animate = (time) => {
      if (time - lastTime > 1000 / 12) {
        setFrameIndex((prev) => (prev + 1) % totalFrames);
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [spectrogram]);

  const currentSpectrum = useMemo(() => {
    if (!spectrogram || spectrogram.frames.length === 0) return null;
    return spectrogram.frames[frameIndex];
  }, [spectrogram, frameIndex]);

  const peakInfo = useMemo(() => {
    if (!spectrogram || !currentSpectrum) return null;
    let peakIdx = 0;
    for (let i = 1; i < currentSpectrum.length; i += 1) {
      if (currentSpectrum[i] > currentSpectrum[peakIdx]) peakIdx = i;
    }
    return {
      freq: spectrogram.freqBins[peakIdx] ?? 0,
      level: currentSpectrum[peakIdx],
    };
  }, [spectrogram, currentSpectrum]);

  const drawWaveform = useCallback(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(2,6,23,0.9)";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(148,163,184,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (!signal || signal.length === 0) return;
    ctx.strokeStyle = "rgba(94,234,212,0.9)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const step = Math.max(1, Math.floor(signal.length / width));
    for (let x = 0; x < width; x += 1) {
      const index = Math.min(signal.length - 1, x * step);
      const value = signal[index];
      const y = (1 - (value + 1) / 2) * height;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (spectrogram) {
      const highlightStartSample = Math.min(frameIndex * HOP_SIZE, Math.max(0, signal.length - WINDOW_SIZE));
      const highlightEndSample = Math.min(highlightStartSample + WINDOW_SIZE, signal.length);
      const startX = (highlightStartSample / signal.length) * width;
      const highlightWidth = ((highlightEndSample - highlightStartSample) / signal.length) * width;
      ctx.fillStyle = "rgba(56,189,248,0.15)";
      ctx.fillRect(startX, 0, highlightWidth, height);
      ctx.strokeStyle = "rgba(56,189,248,0.6)";
      ctx.strokeRect(startX, 0, highlightWidth, height);
    }
  }, [signal, frameIndex, spectrogram]);

  const drawSpectrogram = useCallback(() => {
    const canvas = spectrogramCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(3,7,18,0.95)";
    ctx.fillRect(0, 0, width, height);

    if (!spectrogram || spectrogram.frames.length === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "12px Inter, system-ui";
      ctx.fillText("Spectrogram data unavailable", 16, height / 2);
      return;
    }

    const columns = spectrogram.frames.length;
    const rows = spectrogram.freqBins.length;
    const cellWidth = width / columns;
    const cellHeight = height / rows;

    for (let col = 0; col < columns; col += 1) {
      const column = spectrogram.frames[col];
      for (let row = 0; row < rows; row += 1) {
        const db = column[row];
        ctx.fillStyle = dbToColor(db);
        const x = col * cellWidth;
        const y = height - (row + 1) * cellHeight;
        ctx.fillRect(x, y, cellWidth + 0.5, cellHeight + 0.5);
      }
    }

    const indicatorX = (frameIndex / columns) * width;
    ctx.strokeStyle = "rgba(248,250,252,0.8)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(indicatorX, 0);
    ctx.lineTo(indicatorX, height);
    ctx.stroke();
  }, [spectrogram, frameIndex]);

  const drawInstantSpectrum = useCallback(() => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(2,6,23,0.9)";
    ctx.fillRect(0, 0, width, height);

    if (!spectrogram || !currentSpectrum) {
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "12px Inter, system-ui";
      ctx.fillText("Instantaneous spectrum unavailable", 16, height / 2);
      return;
    }

    ctx.strokeStyle = "rgba(248,113,113,0.9)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();

    const maxFreq = spectrogram.freqBins[spectrogram.freqBins.length - 1] || SAMPLE_RATE / 2;
    for (let i = 0; i < currentSpectrum.length; i += 1) {
      const freq = spectrogram.freqBins[i];
      const x = (freq / maxFreq) * width;
      const norm = Math.min(Math.max((currentSpectrum[i] - MIN_DB) / (MAX_DB - MIN_DB || 1), 0), 1);
      const y = height - norm * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (peakInfo) {
      const peakX = (peakInfo.freq / maxFreq) * width;
      const peakNorm = Math.min(Math.max((peakInfo.level - MIN_DB) / (MAX_DB - MIN_DB || 1), 0), 1);
      const peakY = height - peakNorm * height;
      ctx.fillStyle = "rgba(250,204,21,0.9)";
      ctx.beginPath();
      ctx.arc(peakX, peakY, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [spectrogram, currentSpectrum, peakInfo]);

  useEffect(() => {
    drawWaveform();
  }, [drawWaveform]);

  useEffect(() => {
    drawSpectrogram();
  }, [drawSpectrogram]);

  useEffect(() => {
    drawInstantSpectrum();
  }, [drawInstantSpectrum]);

  const windowDurationMs = ((WINDOW_SIZE / SAMPLE_RATE) * 1000).toFixed(1);

  return (
    <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl">
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
        <div>
          Sliding FFT window: <span className="font-semibold text-emerald-300">{windowDurationMs} ms</span>
        </div>
        <div>
          Frame:{" "}
          <span className="font-semibold text-slate-100">
            {spectrogram ? frameIndex + 1 : 0}/{spectrogram?.frames.length ?? 0}
          </span>
        </div>
        {peakInfo && (
          <div className="text-amber-300">
            Peak {formatHz(peakInfo.freq)} ({peakInfo.level.toFixed(1)} dB)
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:col-span-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Time-domain view</span>
            <span>Sliding window highlighted</span>
          </div>
          <canvas ref={waveformCanvasRef} className="mt-3 h-36 w-full" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:col-span-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Moving spectrogram</span>
            <span>Window hop: {((HOP_SIZE / SAMPLE_RATE) * 1000).toFixed(1)} ms</span>
          </div>
          <canvas ref={spectrogramCanvasRef} className="mt-3 h-48 w-full" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:col-span-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Instantaneous spectrum & peak tracking</span>
            <span>Max freq ≈ {formatHz(SAMPLE_RATE / 2)}</span>
          </div>
          <canvas ref={spectrumCanvasRef} className="mt-3 h-40 w-full" />
        </div>
      </div>

      <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="font-semibold text-slate-100">What you see</p>
          <ul className="mt-2 space-y-1 text-slate-400">
            <li>• Sliding FFT window over the waveform</li>
            <li>• Spectrogram column updates in real-time</li>
            <li>• Instantaneous spectrum derived from the current window</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="font-semibold text-slate-100">Insights</p>
          <ul className="mt-2 space-y-1 text-slate-400">
            <li>• White line tracks the active frame in the spectrogram</li>
            <li>• Gold marker shows the dominant frequency bin</li>
            <li>• Hop size controls how often the spectrum refreshes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
