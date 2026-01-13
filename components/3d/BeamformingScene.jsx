"use client";

import React from "react";
import { OrbitControls } from "@react-three/drei";
import BeamPatternMesh from "./BeamPatternMesh";

function deg2rad(d) {
  return (d * Math.PI) / 180;
}

export default function BeamformingScene({
  micCount = 8,
  arrayRadius = 2.0,
  frequency = 800,
  speedOfSound = 343,
  steerAzDeg = 0,      // azimuth steering
  steerElDeg = 0,      // elevation steering
  patternGain = 3.5,   // how “tall” the lobe looks
  showMics = true,
  showSource = true,
  sourceAzDeg = 40,
  sourceElDeg = 0,
}) {
  const steerAz = deg2rad(steerAzDeg);
  const steerEl = deg2rad(steerElDeg);

  const srcAz = deg2rad(sourceAzDeg);
  const srcEl = deg2rad(sourceElDeg);

  // Convert (az,el) to direction vector
  const dirFromAngles = (az, el) => {
    const x = Math.cos(el) * Math.cos(az);
    const y = Math.sin(el);
    const z = Math.cos(el) * Math.sin(az);
    return [x, y, z];
  };

  const steerDir = dirFromAngles(steerAz, steerEl);
  const srcDir = dirFromAngles(srcAz, srcEl);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} />

      <gridHelper args={[30, 30]} />
      <axesHelper args={[5]} />

      {/* Microphone ring array */}
      {showMics &&
        Array.from({ length: micCount }, (_, i) => {
          const a = (i / micCount) * Math.PI * 2;
          const x = arrayRadius * Math.cos(a);
          const z = arrayRadius * Math.sin(a);
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.12, 18, 18]} />
              <meshStandardMaterial color={"#aaaaaa"} emissive={"#111111"} />
            </mesh>
          );
        })}

      {/* Center marker */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 18, 18]} />
        <meshStandardMaterial emissive={"#00ff99"} emissiveIntensity={2} color={"#001a10"} />
      </mesh>

      {/* “Source” direction marker (purely illustrative) */}
      {showSource && (
        <mesh position={[srcDir[0] * 6, srcDir[1] * 6, srcDir[2] * 6]}>
          <sphereGeometry args={[0.18, 22, 22]} />
          <meshStandardMaterial emissive={"red"} emissiveIntensity={3} color={"#220000"} />
        </mesh>
      )}

      {/* Beam pattern (array factor lobe) */}
      <BeamPatternMesh
        micCount={micCount}
        arrayRadius={arrayRadius}
        frequency={frequency}
        speedOfSound={speedOfSound}
        steerDir={steerDir}
        gain={patternGain}
      />

      <OrbitControls enableDamping />
    </>
  );
}
