"use client";

import React from "react";
import { OrbitControls } from "@react-three/drei";
import WaveShells from "./WaveShells";

export default function WaveScene({
  frequency = 200,
  amplitude = 1,
  phaseDeg = 0,
  speedOfSound = 343,
  attenuation = 0.02,
  isPlaying = true,
  time = 0,
  resetSignal = 0,
  showDebugCube = false,
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} />

      <gridHelper args={[30, 30]} />
      <axesHelper args={[5]} />

      {/* Source marker */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial emissive={"red"} emissiveIntensity={3} color={"#220000"} />
      </mesh>

    

      <WaveShells
        frequency={frequency}
        amplitude={amplitude}
        phaseDeg={phaseDeg}
        speedOfSound={speedOfSound}
        attenuation={attenuation}
        isPlaying={isPlaying}
        time={time}
        resetSignal={resetSignal}
      />

      {showDebugCube && (
        <mesh position={[3, -2, 0]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial />
        </mesh>
      )}

      <OrbitControls enableDamping />
    </>
  );
}
