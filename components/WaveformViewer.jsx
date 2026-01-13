"use client";

import { useEffect, useRef, useState } from "react";

export default function WaveformViewer({
  frequency: initialFrequency = 440,
  amplitude: initialAmplitude = 1,
  phase: initialPhase = 0,
  showGrid = true,
}) {
  const canvasRef = useRef(null);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [amplitude, setAmplitude] = useState(initialAmplitude);
  const [phase, setPhase] = useState(initialPhase);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const animationFrameRef = useRef(null);
  const animationPhaseRef = useRef(0);

  useEffect(() => {
    setFrequency(initialFrequency);
  }, [initialFrequency]);

  useEffect(() => {
    setAmplitude(initialAmplitude);
  }, [initialAmplitude]);

  useEffect(() => {
    setPhase(initialPhase);
  }, [initialPhase]);

  // ---- AUDIO CONTROL ----
  const startAudio = () => {
    if (isPlaying) return;
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = frequency;

    // amplitude is 0–1, keep gain safe
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

  // Update oscillator when frequency/amplitude changes
  useEffect(() => {
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency]);

  useEffect(() => {
    if (audioContextRef.current) {
      const ctx = audioContextRef.current;
      // Very simple: adjust master destination gain by creating a gain node in startAudio
      // We just restart audio when amplitude changes while playing
      if (isPlaying) {
        stopAudio();
        startAudio();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amplitude]);

  // ---- CANVAS DRAWING ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    // Handle high-DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const drawGrid = () => {
      if (!showGrid) return;
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;

      const gridX = 10;
      const gridY = 10;
      for (let x = 0; x <= width; x += gridX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center line
      ctx.strokeStyle = "rgba(0,255,255,0.4)";
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      drawGrid();

      ctx.save();
      ctx.strokeStyle = "rgba(0, 200, 255, 0.9)";
      ctx.lineWidth = 2;

      const mid = height / 2;
      const ampPx = (height / 2 - 10) * amplitude; // amplitude in pixels
      const cyclesOnScreen = Math.min(
        20,
        Math.max(1, frequency / 40)
      ); // more cycles appear as frequency rises
      const totalPhase = cyclesOnScreen * 2 * Math.PI;

      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const t = x / width; // 0 → 1
        const waveformPhase = t * totalPhase + phase + animationPhaseRef.current;
        const y = mid - ampPx * Math.sin(waveformPhase);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // advance for smooth animation
      animationPhaseRef.current += 0.03; // smaller = slower animation

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [frequency, amplitude, phase, showGrid]);

  // Cleanup audio on unmount
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
    <div className="w-full space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-zinc-100">
            Waveform Viewer
          </h2>
          <p className="text-xs text-zinc-400">
            Adjust frequency and amplitude. Watch the waveform and optionally
            listen to the tone.
          </p>
        </div>
        <button
          type="button"
          onClick={isPlaying ? stopAudio : startAudio}
          className={`px-3 py-1.5 rounded-md text-xs font-medium ${
            isPlaying
              ? "bg-red-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          {isPlaying ? "Stop Sound" : "Play Sound"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-xs text-zinc-300 mb-1">
              <span>Frequency</span>
              <span>{frequency.toFixed(1)} Hz</span>
            </label>
            <input
              type="range"
              min={20}
              max={2000}
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

          <div>
            <label className="flex justify-between text-xs text-zinc-300 mb-1">
              <span>Phase Offset</span>
              <span>{((phase * 180) / Math.PI).toFixed(0)}°</span>
            </label>
            <input
              type="range"
              min={-Math.PI}
              max={Math.PI}
              step={0.01}
              value={phase}
              onChange={(e) => setPhase(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="text-[11px] text-zinc-400 space-y-1">
            <p>
              • Higher frequency → more oscillations per second (higher pitch).
            </p>
            <p>• Higher amplitude → taller waveform (perceived as louder).</p>
            <p>• Phase slides the waveform in time without changing its shape.</p>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg bg-black">
          <canvas
            ref={canvasRef}
            className="h-full w-full block"
            aria-label="Sine wave oscilloscope view"
          />
        </div>
      </div>
    </div>
  );
}
