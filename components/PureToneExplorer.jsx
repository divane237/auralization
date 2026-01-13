"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const MIN_FREQUENCY = 20;
const MAX_FREQUENCY = 16000;
const MIN_SPL = 20;
const MAX_SPL = 100;

const pitchDescriptors = [
  { max: 60, label: "Sub-bass rumble (felt more than heard)" },
  { max: 250, label: "Bass warmth (foundation of rhythm)" },
  { max: 1000, label: "Low-mid range (speech fundamentals)" },
  { max: 3000, label: "Midrange clarity (pitch feels sharp)" },
  { max: 6000, label: "High-end sparkle (sibilance zone)" },
];

const loudnessDescriptors = [
  { max: 35, label: "Near threshold: a quiet whisper" },
  { max: 60, label: "Gentle conversational level" },
  { max: 80, label: "Noticeably loud, like music playback" },
  { max: 95, label: "Very loud, leaning toward discomfort" },
];

const getPitchDescriptor = (frequency) => {
  for (const entry of pitchDescriptors) {
    if (frequency <= entry.max) return entry.label;
  }
  return "Ultra-high pitch, close to the upper limit of hearing";
};

const getLoudnessDescriptor = (spl) => {
  for (const entry of loudnessDescriptors) {
    if (spl <= entry.max) return entry.label;
  }
  return "Extremely loud, avoid prolonged listening";
};

export default function PureToneExplorer() {
  const [frequency, setFrequency] = useState(440);
  const [spl, setSpl] = useState(65);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainRef = useRef(null);

  const levelNormalized = useMemo(
    () => (spl - MIN_SPL) / (MAX_SPL - MIN_SPL),
    [spl]
  );

  const levelGain = useMemo(
    () => Math.min(0.85, Math.max(0.02, levelNormalized * 0.75)),
    [levelNormalized]
  );

  const startTone = () => {
    if (isPlaying || typeof window === "undefined") return;

    if (!audioContextRef.current) {
      audioContextRef.current =
        new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gainNode.gain.value = levelGain;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillatorRef.current = oscillator;
    gainRef.current = gainNode;
    setIsPlaying(true);
  };

  const stopTone = () => {
    if (!isPlaying) return;
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = frequency;
    }
  }, [frequency]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = levelGain;
    }
  }, [levelGain]);

  useEffect(() => {
    return () => {
      stopTone();
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
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">
            Pure Tone Explorer
          </h2>
          <p className="text-xs text-zinc-400">
            Adjust frequency and level to experience how pitch and loudness
            change independently.
          </p>
        </div>
        <button
          type="button"
          onClick={isPlaying ? stopTone : startTone}
          className={`px-3 py-1.5 rounded-md text-xs font-medium ${
            isPlaying ? "bg-red-600" : "bg-emerald-600"
          } text-white`}
        >
          {isPlaying ? "Stop tone" : "Play tone"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <label className="flex justify-between text-[11px] text-zinc-300">
            <span>Frequency</span>
            <span>{frequency.toFixed(frequency < 1000 ? 1 : 0)} Hz</span>
          </label>
          <input
            type="range"
            min={MIN_FREQUENCY}
            max={MAX_FREQUENCY}
            value={frequency}
            onChange={(event) => setFrequency(Number(event.target.value))}
            className="w-full"
            aria-label="frequency slider"
          />
          <p className="text-[11px] text-zinc-400">
            {getPitchDescriptor(frequency)}
          </p>

          <label className="flex justify-between text-[11px] text-zinc-300">
            <span>Level (perceived loudness)</span>
            <span>{Math.round(spl)} dB SPL</span>
          </label>
          <input
            type="range"
            min={MIN_SPL}
            max={MAX_SPL}
            value={spl}
            onChange={(event) => setSpl(Number(event.target.value))}
            className="w-full"
            aria-label="loudness slider"
          />
          <div className="h-2 rounded-full bg-zinc-900">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-150"
              style={{ width: `${Math.round(levelNormalized * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-zinc-400">
            {getLoudnessDescriptor(spl)}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-[11px] text-zinc-300">
          <p className="text-[12px] font-semibold text-zinc-100">
            What to listen for
          </p>
          <ul className="mt-2 space-y-1">
            <li>• Pitch rises as frequency increases from left to right.</li>
            <li>
              • Loudness grows nonlinearly; identical level changes can feel
              different at low vs. high SPL.
            </li>
            <li>
              • Extremely low or high frequencies may sound weaker than mid
              tones even at the same SPL.
            </li>
          </ul>
          <div className="mt-3 space-y-1 text-[10px] text-zinc-500">
            <p>
              Pro tip: Try keeping frequency constant while varying level, then
              reverse. Notice how loudness and pitch remain independent even
              though both arise from the same sine wave.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
