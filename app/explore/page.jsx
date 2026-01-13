"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import to prevent SSR issues with Three.js / WebGL
const Explore3DView = dynamic(() => import("../../components/3d/Explore3DView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading 3D tool...</p>
      </div>
    </div>
  ),
});

function Slider({ label, value, setValue, min, max, step }) {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1">
        {label}: {Number(value).toFixed(2)}
      </label>
      <input
        className="w-full"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}

export default function ExplorePage() {
  // Which 3D tool is selected
  const [mode, setMode] = useState("wave"); // "wave" | "beamforming" | "room"

  // -----------------------
  // 1) WAVE PROPAGATION STATE
  // -----------------------
  const [frequency, setFrequency] = useState(500);
  const [amplitude, setAmplitude] = useState(1);
  const [phaseDeg, setPhaseDeg] = useState(0);
  const [speedOfSound, setSpeedOfSound] = useState(343);
  const [attenuation, setAttenuation] = useState(0.02);

  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);
  const [showDebugCube, setShowDebugCube] = useState(false);

  // Animation loop (only for wave mode)
  useEffect(() => {
    let animationId;
    let last = performance.now();

    if (mode === "wave" && isPlaying) {
      const animate = (now) => {
        const dt = (now - last) / 1000;
        last = now;
        setTime((prev) => prev + dt);
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [mode, isPlaying]);

  // Pause animation when switching tools (nice UX)
  useEffect(() => {
    setIsPlaying(false);
  }, [mode]);

  const waveProps = useMemo(
    () => ({
      frequency,
      amplitude,
      phaseDeg,
      speedOfSound,
      attenuation,
      isPlaying,
      time,
      resetSignal,
      showDebugCube,
    }),
    [
      frequency,
      amplitude,
      phaseDeg,
      speedOfSound,
      attenuation,
      isPlaying,
      time,
      resetSignal,
      showDebugCube,
    ]
  );

  // -----------------------
  // 2) BEAMFORMING STATE
  // -----------------------
  const [micCount, setMicCount] = useState(8);
  const [arrayRadius, setArrayRadius] = useState(2.0);
  const [bfFrequency, setBfFrequency] = useState(800);
  const [steerAzDeg, setSteerAzDeg] = useState(0);
  const [steerElDeg, setSteerElDeg] = useState(0);
  const [patternGain, setPatternGain] = useState(3.5);
  const [sourceAzDeg, setSourceAzDeg] = useState(40);
  const [sourceElDeg, setSourceElDeg] = useState(0);

  const beamProps = useMemo(
    () => ({
      micCount,
      arrayRadius,
      frequency: bfFrequency,
      speedOfSound, // reuse same c slider from wave for consistency
      steerAzDeg,
      steerElDeg,
      patternGain,
      showMics: true,
      showSource: true,
      sourceAzDeg,
      sourceElDeg,
    }),
    [
      micCount,
      arrayRadius,
      bfFrequency,
      speedOfSound,
      steerAzDeg,
      steerElDeg,
      patternGain,
      sourceAzDeg,
      sourceElDeg,
    ]
  );

  // -----------------------
  // 3) ROOM ACOUSTICS STATE
  // -----------------------
  const [roomW, setRoomW] = useState(6);
  const [roomH, setRoomH] = useState(3);
  const [roomD, setRoomD] = useState(8);

  const [srcX, setSrcX] = useState(-1.5);
  const [srcY, setSrcY] = useState(1.2);
  const [srcZ, setSrcZ] = useState(-2.0);

  const [micX, setMicX] = useState(1.8);
  const [micY, setMicY] = useState(1.2);
  const [micZ, setMicZ] = useState(2.2);

  const [showDirect, setShowDirect] = useState(true);
  const [showReflections, setShowReflections] = useState(true);
  const [reflectionGain, setReflectionGain] = useState(0.8);

  const roomProps = useMemo(
    () => ({
      roomW,
      roomH,
      roomD,
      source: { x: srcX, y: srcY, z: srcZ },
      listener: { x: micX, y: micY, z: micZ },
      showDirect,
      showReflections,
      reflectionGain,
    }),
    [
      roomW,
      roomH,
      roomD,
      srcX,
      srcY,
      srcZ,
      micX,
      micY,
      micZ,
      showDirect,
      showReflections,
      reflectionGain,
    ]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          3D Interactive Explorations
        </h1>

        {/* Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setMode("wave")}
            className={`px-5 py-2.5 rounded-lg font-medium shadow ${
              mode === "wave"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          >
            3D Wave Propagation
          </button>

          <button
            onClick={() => setMode("beamforming")}
            className={`px-5 py-2.5 rounded-lg font-medium shadow ${
              mode === "beamforming"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          >
            Microphone Array & Beamforming
          </button>

          <button
            onClick={() => setMode("room")}
            className={`px-5 py-2.5 rounded-lg font-medium shadow ${
              mode === "room"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
          >
            3D Room Acoustics
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Control Panel */}
          <div className="w-80 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-y-auto">
            {mode === "wave" ? (
              <>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Wave Controls
                </h2>

                {/* Animation */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Animation
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => setIsPlaying((v) => !v)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setTime(0);
                        setResetSignal((v) => v + 1);
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Time: {time.toFixed(2)}s
                  </div>
                </div>

                {/* Wave parameters */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Wave Parameters
                  </h3>

                  <div className="mb-3">
                    <label className="block text-sm mb-1">
                      Frequency: {frequency} Hz
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="2000"
                      step="10"
                      value={frequency}
                      onChange={(e) => setFrequency(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-1">
                      Amplitude: {amplitude.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={amplitude}
                      onChange={(e) => setAmplitude(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-1">Phase: {phaseDeg}°</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="5"
                      value={phaseDeg}
                      onChange={(e) => setPhaseDeg(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Medium properties */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Medium Properties
                  </h3>

                  <div className="mb-3">
                    <label className="block text-sm mb-1">
                      Speed of Sound: {speedOfSound} m/s
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="450"
                      step="1"
                      value={speedOfSound}
                      onChange={(e) => setSpeedOfSound(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-1">
                      Attenuation: {attenuation.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="0.25"
                      step="0.005"
                      value={attenuation}
                      onChange={(e) => setAttenuation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Debug */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Debug</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showDebugCube}
                      onChange={(e) => setShowDebugCube(e.target.checked)}
                      className="mr-2"
                    />
                    Show Debug Cube
                  </label>
                </div>
              </>
            ) : mode === "beamforming" ? (
              <>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Beamforming Controls
                </h2>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Microphones: {micCount}</label>
                  <input
                    type="range"
                    min="3"
                    max="24"
                    step="1"
                    value={micCount}
                    onChange={(e) => setMicCount(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Array Radius: {arrayRadius.toFixed(2)}</label>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    value={arrayRadius}
                    onChange={(e) => setArrayRadius(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Frequency: {bfFrequency} Hz</label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="10"
                    value={bfFrequency}
                    onChange={(e) => setBfFrequency(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Reuse speed of sound from wave (shared physical constant) */}
                <div className="mb-4">
                  <label className="block text-sm mb-1">Speed of Sound: {speedOfSound} m/s</label>
                  <input
                    type="range"
                    min="200"
                    max="450"
                    step="1"
                    value={speedOfSound}
                    onChange={(e) => setSpeedOfSound(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Steer Azimuth: {steerAzDeg}°</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={steerAzDeg}
                    onChange={(e) => setSteerAzDeg(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Steer Elevation: {steerElDeg}°</label>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    step="1"
                    value={steerElDeg}
                    onChange={(e) => setSteerElDeg(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Pattern Gain: {patternGain.toFixed(2)}</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.1"
                    value={patternGain}
                    onChange={(e) => setPatternGain(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <hr className="my-4 opacity-40" />

                <div className="mb-4">
                  <label className="block text-sm mb-1">Source Azimuth: {sourceAzDeg}°</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={sourceAzDeg}
                    onChange={(e) => setSourceAzDeg(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Source Elevation: {sourceElDeg}°</label>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    step="1"
                    value={sourceElDeg}
                    onChange={(e) => setSourceElDeg(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </>
            ) : mode === "room" ? (
              <>
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Room Acoustics Controls
                </h2>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Room Width (W): {roomW.toFixed(2)}</label>
                  <input
                    className="w-full"
                    type="range"
                    min="3"
                    max="12"
                    step="0.1"
                    value={roomW}
                    onChange={(e) => setRoomW(Number(e.target.value))}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Room Height (H): {roomH.toFixed(2)}</label>
                  <input
                    className="w-full"
                    type="range"
                    min="2"
                    max="6"
                    step="0.1"
                    value={roomH}
                    onChange={(e) => setRoomH(Number(e.target.value))}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Room Depth (D): {roomD.toFixed(2)}</label>
                  <input
                    className="w-full"
                    type="range"
                    min="3"
                    max="16"
                    step="0.1"
                    value={roomD}
                    onChange={(e) => setRoomD(Number(e.target.value))}
                  />
                </div>

                <hr className="my-4 opacity-40" />

                <div className="mb-3 font-semibold text-gray-700 dark:text-gray-300">Source Position</div>
                <Slider
                  label="Src X"
                  value={srcX}
                  setValue={setSrcX}
                  min={-roomW / 2 + 0.3}
                  max={roomW / 2 - 0.3}
                  step={0.1}
                />
                <Slider
                  label="Src Y"
                  value={srcY}
                  setValue={setSrcY}
                  min={0.3}
                  max={roomH - 0.3}
                  step={0.1}
                />
                <Slider
                  label="Src Z"
                  value={srcZ}
                  setValue={setSrcZ}
                  min={-roomD / 2 + 0.3}
                  max={roomD / 2 - 0.3}
                  step={0.1}
                />

                <hr className="my-4 opacity-40" />

                <div className="mb-3 font-semibold text-gray-700 dark:text-gray-300">Listener Position</div>
                <Slider
                  label="Mic X"
                  value={micX}
                  setValue={setMicX}
                  min={-roomW / 2 + 0.3}
                  max={roomW / 2 - 0.3}
                  step={0.1}
                />
                <Slider
                  label="Mic Y"
                  value={micY}
                  setValue={setMicY}
                  min={0.3}
                  max={roomH - 0.3}
                  step={0.1}
                />
                <Slider
                  label="Mic Z"
                  value={micZ}
                  setValue={setMicZ}
                  min={-roomD / 2 + 0.3}
                  max={roomD / 2 - 0.3}
                  step={0.1}
                />

                <hr className="my-4 opacity-40" />

                <label className="flex items-center mb-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={showDirect}
                    onChange={(e) => setShowDirect(e.target.checked)}
                  />
                  Show Direct Path
                </label>

                <label className="flex items-center mb-3 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    className="mr-2"
                    type="checkbox"
                    checked={showReflections}
                    onChange={(e) => setShowReflections(e.target.checked)}
                  />
                  Show First-Order Reflections
                </label>

                <div className="mb-4">
                  <label className="block text-sm mb-1">
                    Reflection Visibility: {reflectionGain.toFixed(2)}
                  </label>
                  <input
                    className="w-full"
                    type="range"
                    min="0.1"
                    max="0.95"
                    step="0.05"
                    value={reflectionGain}
                    onChange={(e) => setReflectionGain(Number(e.target.value))}
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Controls</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Controls for this tool will appear here once implemented.
                </p>
              </>
            )}
          </div>

          {/* 3D Viewport */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-[600px] min-h-[600px]">
            <Explore3DView mode={mode} waveProps={waveProps} beamProps={beamProps} roomProps={roomProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
