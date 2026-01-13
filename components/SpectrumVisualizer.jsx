"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WINDOW_OPTIONS = [512, 1024, 2048, 4096];

const PRESETS = [
  { id: "tone", label: "Pure tone 440 Hz" },
  { id: "chord", label: "Dual tone 440 + 660 Hz" },
  { id: "noise", label: "Wideband noise" },
];

function generatePresetBuffer(presetId, sampleRate = 48000, duration = 1.2) {
  const length = Math.floor(sampleRate * duration);
  const data = new Float32Array(length);

  if (presetId === "tone") {
    for (let i = 0; i < length; i += 1) {
      data[i] = 0.7 * Math.sin((2 * Math.PI * 440 * i) / sampleRate);
    }
    return { data, sampleRate };
  }

  if (presetId === "chord") {
    for (let i = 0; i < length; i += 1) {
      const t = i / sampleRate;
      data[i] =
        0.55 * Math.sin(2 * Math.PI * 440 * t) +
        0.35 * Math.sin(2 * Math.PI * 660 * t + Math.PI / 4) +
        0.25 * Math.sin(2 * Math.PI * 880 * t + Math.PI / 2);
    }
    return { data, sampleRate };
  }

  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.45;
  }

  return { data, sampleRate };
}

function extractSegment(source, windowSize) {
  const segment = new Float32Array(windowSize);
  if (!source || source.length === 0) {
    return segment;
  }

  if (source.length <= windowSize) {
    segment.set(source, 0);
    return segment;
  }

  const start = Math.max(0, Math.floor((source.length - windowSize) / 2));
  for (let i = 0; i < windowSize; i += 1) {
    segment[i] = source[start + i];
  }
  return segment;
}

function applyHannWindow(buffer) {
  const n = buffer.length;
  const windowed = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    const w = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
    windowed[i] = buffer[i] * w;
  }
  return windowed;
}

function computeSpectrum(signal, sampleRate) {
  const n = signal.length;
  const usable = Math.floor(n / 2);
  const magnitudesDb = new Float32Array(usable);
  const phases = new Float32Array(usable);
  const freqs = new Float32Array(usable);

  for (let k = 0; k < usable; k += 1) {
    let real = 0;
    let imag = 0;
    for (let i = 0; i < n; i += 1) {
      const angle = (-2 * Math.PI * k * i) / n;
      real += signal[i] * Math.cos(angle);
      imag += signal[i] * Math.sin(angle);
    }
    const magnitude = Math.sqrt(real * real + imag * imag) * (2 / n);
    magnitudesDb[k] = 20 * Math.log10(magnitude + 1e-9);
    phases[k] = Math.atan2(imag, real);
    freqs[k] = (k * sampleRate) / n;
  }

  return { magnitudesDb, phases, freqs };
}

function formatHz(value) {
  if (!Number.isFinite(value)) return "--";
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} kHz`;
  }
  return `${value.toFixed(1)} Hz`;
}

export default function SpectrumVisualizer() {
  const [rawData, setRawData] = useState(null);
  const [sampleRate, setSampleRate] = useState(48000);
  const [windowSize, setWindowSize] = useState(2048);
  const [useLogScale, setUseLogScale] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState("Pick a preset or upload your own sound.");
  const [selectedPreset, setSelectedPreset] = useState("tone");

  const waveformCanvasRef = useRef(null);
  const magnitudeCanvasRef = useRef(null);
  const phaseCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioCtxRef = useRef(null);

  const ensureAudioContext = () => {
    if (audioCtxRef.current) return audioCtxRef.current;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioCtx();
    return audioCtxRef.current;
  };

  const handlePresetSelection = async (presetId) => {
    const { data, sampleRate: sr } = generatePresetBuffer(presetId);
    setSelectedPreset(presetId);
    setSampleRate(sr);
    setRawData(data);
    setStatus(`Loaded ${PRESETS.find((p) => p.id === presetId)?.label ?? "preset"}`);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus("Decoding audio file...");
      const arrayBuffer = await file.arrayBuffer();
      const ctx = ensureAudioContext();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      const channelData = decoded.getChannelData(0);
      const copy = new Float32Array(channelData.length);
      copy.set(channelData, 0);
      setRawData(copy);
      setSampleRate(decoded.sampleRate);
      setSelectedPreset(null);
      setStatus(`Loaded file: ${file.name}`);
    } catch (error) {
      console.error(error);
      setStatus("Unable to decode that file. Try another format.");
    } finally {
      // reset input for future uploads
      event.target.value = "";
    }
  };

  const analyzeSignal = useCallback(() => {
    if (!rawData || rawData.length === 0) {
      setAnalysis(null);
      return;
    }

    const segment = extractSegment(rawData, windowSize);
    const windowed = applyHannWindow(segment);
    const spectrum = computeSpectrum(windowed, sampleRate);

    let peakIndex = 0;
    for (let i = 1; i < spectrum.magnitudesDb.length; i += 1) {
      if (spectrum.magnitudesDb[i] > spectrum.magnitudesDb[peakIndex]) {
        peakIndex = i;
      }
    }

    setAnalysis({
      ...spectrum,
      windowed,
      peakFrequency: spectrum.freqs[peakIndex] ?? 0,
      peakPhase: spectrum.phases[peakIndex] ?? 0,
    });

    const windowMs = ((windowSize / sampleRate) * 1000).toFixed(1);
    setStatus(`Analyzed ${windowSize} samples (${windowMs} ms window)`);
  }, [rawData, windowSize, sampleRate]);

  useEffect(() => {
    analyzeSignal();
  }, [analyzeSignal]);

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

    ctx.fillStyle = "rgba(15,23,42,0.75)";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (!rawData || rawData.length === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "12px Inter, system-ui";
      ctx.fillText("Load audio to see waveform", 16, height / 2);
      return;
    }

    ctx.strokeStyle = "rgba(16, 185, 129, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const samplesToShow = Math.min(rawData.length, sampleRate / 2);
    const step = Math.max(1, Math.floor(samplesToShow / width));
    for (let x = 0; x < width; x += 1) {
      const index = Math.min(rawData.length - 1, x * step);
      const value = rawData[index];
      const y = (1 - (value + 1) / 2) * height;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }, [rawData, sampleRate]);

  const drawSpectrum = useCallback(
    (canvas, values, freqs, options) => {
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
      ctx.fillStyle = "rgba(15,23,42,0.8)";
      ctx.fillRect(0, 0, width, height);

      if (!analysis || !values || values.length === 0) {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = "12px Inter, system-ui";
        ctx.fillText("Spectrum pending...", 16, height / 2);
        return;
      }

      const { logScale = false, valueRange = [-1, 1], stroke = "#38bdf8" } = options;
      const maxFreq = sampleRate / 2;
      const minFreq = 20;

      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.6;
      ctx.beginPath();

      for (let i = 0; i < values.length; i += 1) {
        const freq = freqs[i];
        let xNorm = freq / maxFreq;
        if (logScale) {
          const safeFreq = Math.max(freq, minFreq);
          xNorm = Math.log10(safeFreq / minFreq) / Math.log10(maxFreq / minFreq);
        }
        const x = xNorm * width;

        const [minVal, maxVal] = valueRange;
        const clamped = Math.min(Math.max(values[i], minVal), maxVal);
        const valueNorm = (clamped - minVal) / (maxVal - minVal || 1);
        const y = height - valueNorm * height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    },
    [analysis, sampleRate]
  );

  useEffect(() => {
    drawWaveform();
  }, [drawWaveform]);

  useEffect(() => {
    drawSpectrum(
      magnitudeCanvasRef.current,
      analysis?.magnitudesDb ?? null,
      analysis?.freqs ?? null,
      {
        logScale: useLogScale,
        valueRange: [-120, 0],
        stroke: "rgba(59,130,246,0.9)",
      }
    );
    drawSpectrum(
      phaseCanvasRef.current,
      analysis ? Array.from(analysis.phases, (p) => (p * 180) / Math.PI) : null,
      analysis?.freqs ?? null,
      {
        logScale: useLogScale,
        valueRange: [-180, 180],
        stroke: "rgba(244,114,182,0.9)",
      }
    );
  }, [analysis, drawSpectrum, useLogScale]);

  const summary = useMemo(() => {
    if (!analysis) return null;
    const length = analysis.magnitudesDb.length || 1;
    return {
      peakFrequency: analysis.peakFrequency,
      peakPhaseDeg: (analysis.peakPhase * 180) / Math.PI,
      avgMagnitude: analysis.magnitudesDb.reduce((acc, val) => acc + val, 0) / length,
    };
  }, [analysis]);

  return (
    <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelection(preset.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedPreset === preset.id
                  ? "bg-emerald-500/90 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full bg-indigo-500/80 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Upload audio
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            Window size
            <select
              value={windowSize}
              onChange={(event) => setWindowSize(Number(event.target.value))}
              className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs"
            >
              {WINDOW_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <input
              type="checkbox"
              checked={useLogScale}
              onChange={(event) => setUseLogScale(event.target.checked)}
              className="h-4 w-4 rounded border-slate-600 text-emerald-500"
            />
            Log frequency scale
          </label>

          {analysis && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>{formatHz(sampleRate)} sample rate</span>
              <span>Peak: {formatHz(analysis.peakFrequency)}</span>
              <span>Phase: {analysis.peakPhase.toFixed(2)} rad</span>
            </div>
          )}
        </div>

        <p className="text-xs uppercase tracking-wide text-slate-400">{status}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Waveform</span>
            <span>{rawData ? `${rawData.length} samples` : "No audio"}</span>
          </div>
          <canvas ref={waveformCanvasRef} className="mt-3 h-40 w-full" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Magnitude spectrum ({useLogScale ? "log" : "linear"})</span>
            {summary && <span>Peak at {formatHz(summary.peakFrequency)}</span>}
          </div>
          <canvas ref={magnitudeCanvasRef} className="mt-3 h-40 w-full" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:col-span-2">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Phase response</span>
            {summary && <span>{summary.peakPhaseDeg.toFixed(1)}° @ peak bin</span>}
          </div>
          <canvas ref={phaseCanvasRef} className="mt-3 h-36 w-full" />
          {summary && (
            <div className="mt-3 grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-slate-200">Peak frequency</p>
                <p>{formatHz(summary.peakFrequency)}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">Peak phase</p>
                <p>{summary.peakPhaseDeg.toFixed(1)}°</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">Avg magnitude</p>
                <p>{summary.avgMagnitude.toFixed(1)} dB</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
