"use client";

import { useEffect, useRef, useState } from "react";

export default function SineWaveExplorer({
  minFrequency = 20,
  maxFrequency = 2000,
  defaultFrequency = 440,
  defaultAmplitude = 0.8,
}) {
  const [frequency, setFrequency] = useState(defaultFrequency);
  const [amplitude, setAmplitude] = useState(defaultAmplitude);
  const [isPlaying, setIsPlaying] = useState(false);

  const waveformCanvasRef = useRef(null);
  const spectrumCanvasRef = useRef(null);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  // ---- AUDIO CONTROL ----
  const startAudio = () => {
    if (isPlaying) return;
    if (typeof window === "undefined") return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = frequency;

    gain.gain.value = Math.min(Math.max(amplitude, 0), 1) * 0.2;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    oscillatorRef.current = osc;
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (!isPlaying) return;
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency]);

  useEffect(() => {
    if (audioContextRef.current && isPlaying) {
      // simple approach: restart audio with new amplitude
      stopAudio();
      startAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  // ---- DRAW WAVEFORM + SPECTRUM ----
  useEffect(() => {
    const waveformCanvas = waveformCanvasRef.current;
    const spectrumCanvas = spectrumCanvasRef.current;
    if (!waveformCanvas || !spectrumCanvas) return;

    const wfCtx = waveformCanvas.getContext("2d");
    const spCtx = spectrumCanvas.getContext("2d");
    if (!wfCtx || !spCtx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = (canvas, ctx) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width: w, height: h };
    };

    const { width: wfWidth, height: wfHeight } = resizeCanvas(
      waveformCanvas,
      wfCtx
    );
    const { width: spWidth, height: spHeight } = resizeCanvas(
      spectrumCanvas,
      spCtx
    );

    // generate samples of sine wave
    const sampleRate = 8000;
    const N = 512;
    const samples = new Array(N);
    for (let n = 0; n < N; n++) {
      const t = n / sampleRate;
      samples[n] = amplitude * Math.sin(2 * Math.PI * frequency * t);
    }

    // --- Draw waveform ---
    wfCtx.clearRect(0, 0, wfWidth, wfHeight);
    wfCtx.fillStyle = "#020617";
    wfCtx.fillRect(0, 0, wfWidth, wfHeight);

    // grid
    wfCtx.strokeStyle = "rgba(255,255,255,0.06)";
    wfCtx.lineWidth = 1;
    for (let x = 0; x <= wfWidth; x += 20) {
      wfCtx.beginPath();
      wfCtx.moveTo(x, 0);
      wfCtx.lineTo(x, wfHeight);
      wfCtx.stroke();
    }
    for (let y = 0; y <= wfHeight; y += 20) {
      wfCtx.beginPath();
      wfCtx.moveTo(0, y);
      wfCtx.lineTo(wfWidth, y);
      wfCtx.stroke();
    }

    // center line
    wfCtx.strokeStyle = "rgba(56,189,248,0.7)";
    wfCtx.beginPath();
    wfCtx.moveTo(0, wfHeight / 2);
    wfCtx.lineTo(wfWidth, wfHeight / 2);
    wfCtx.stroke();

    // waveform
    wfCtx.strokeStyle = "rgba(96,165,250,0.95)";
    wfCtx.lineWidth = 2;
    wfCtx.beginPath();
    for (let n = 0; n < N; n++) {
      const x = (n / (N - 1)) * wfWidth;
      const y =
        wfHeight / 2 - (samples[n] * (wfHeight / 2 - 10)); // scale amplitude
      if (n === 0) wfCtx.moveTo(x, y);
      else wfCtx.lineTo(x, y);
    }
    wfCtx.stroke();

    // --- Compute simple spectrum (DFT) ---
    const mag = new Array(N / 2).fill(0);
    for (let k = 0; k < N / 2; k++) {
      let re = 0;
      let im = 0;
      for (let n = 0; n < N; n++) {
        const angle = (-2 * Math.PI * k * n) / N;
        re += samples[n] * Math.cos(angle);
        im += samples[n] * Math.sin(angle);
      }
      mag[k] = Math.sqrt(re * re + im * im);
    }

    // normalize
    const maxMag = Math.max(...mag);
    const normMag = mag.map((v) => (maxMag > 0 ? v / maxMag : 0));

    // --- Draw spectrum ---
    spCtx.clearRect(0, 0, spWidth, spHeight);
    spCtx.fillStyle = "#020617";
    spCtx.fillRect(0, 0, spWidth, spHeight);

    // grid
    spCtx.strokeStyle = "rgba(255,255,255,0.06)";
    spCtx.lineWidth = 1;
    for (let x = 0; x <= spWidth; x += 20) {
      spCtx.beginPath();
      spCtx.moveTo(x, 0);
      spCtx.lineTo(x, spHeight);
      spCtx.stroke();
    }
    for (let y = 0; y <= spHeight; y += 20) {
      spCtx.beginPath();
      spCtx.moveTo(0, y);
      spCtx.lineTo(spWidth, y);
      spCtx.stroke();
    }

    // magnitude line
    spCtx.strokeStyle = "rgba(52,211,153,0.95)";
    spCtx.lineWidth = 2;
    spCtx.beginPath();
    for (let k = 0; k < N / 2; k++) {
      const x = (k / (N / 2 - 1)) * spWidth;
      const y = spHeight - normMag[k] * (spHeight - 10);
      if (k === 0) spCtx.moveTo(x, y);
      else spCtx.lineTo(x, y);
    }
    spCtx.stroke();

    // frequency labels (0–sampleRate/2)
    spCtx.fillStyle = "rgba(148,163,184,0.9)";
    spCtx.font = "10px system-ui";
    spCtx.fillText("0 Hz", 4, spHeight - 4);
    spCtx.fillText(`${sampleRate / 2} Hz`, spWidth - 52, spHeight - 4);
  }, [frequency, amplitude]);

  // cleanup audio
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-zinc-100">
            Sine Wave Explorer
          </h2>
          <p className="text-xs text-zinc-400">
            Explore how frequency and amplitude affect the waveform and its
            spectrum.
          </p>
        </div>
        <button
          type="button"
          onClick={isPlaying ? stopAudio : startAudio}
          className={`px-3 py-1.5 rounded-md text-xs font-medium ${
            isPlaying ? "bg-red-600" : "bg-emerald-600"
          } text-white`}
        >
          {isPlaying ? "Stop Sound" : "Play Sound"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Controls */}
        <div className="space-y-4 md:col-span-1">
          <div>
            <label className="flex justify-between text-xs text-zinc-300 mb-1">
              <span>Frequency</span>
              <span>{frequency.toFixed(1)} Hz</span>
            </label>
            <input
              type="range"
              min={minFrequency}
              max={maxFrequency}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs text-zinc-300 mb-1">
              <span>Amplitude</span>
              <span>{amplitude.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="text-[11px] text-zinc-400 space-y-1">
            <p>• Pitch is determined by frequency (Hz).</p>
            <p>• Loudness (roughly) increases with amplitude.</p>
            <p>
              • The spectrum shows a single strong component at the sine
              frequency.
            </p>
          </div>
        </div>

        {/* Waveform */}
        <div className="md:col-span-1 space-y-1">
          <p className="text-[11px] text-zinc-400">Time-domain waveform</p>
          <div className="relative h-32 md:h-36 lg:h-40 rounded-lg overflow-hidden bg-black">
            <canvas
              ref={waveformCanvasRef}
              className="w-full h-full block"
              aria-label="Waveform view"
            />
          </div>
        </div>

        {/* Spectrum */}
        <div className="md:col-span-1 space-y-1">
          <p className="text-[11px] text-zinc-400">Magnitude spectrum</p>
          <div className="relative h-32 md:h-36 lg:h-40 rounded-lg overflow-hidden bg-black">
            <canvas
              ref={spectrumCanvasRef}
              className="w-full h-full block"
              aria-label="Spectrum view"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
