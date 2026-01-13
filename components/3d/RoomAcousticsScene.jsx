"use client";

import React, { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import ReflectionRays from "./ReflectionRays";

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

export default function RoomAcousticsScene({
  roomW = 6,
  roomH = 3,
  roomD = 8,

  source = { x: -1.5, y: 1.2, z: -2.0 },
  listener = { x: 1.8, y: 1.2, z: 2.2 },

  showAxes = true,
  showGrid = true,
  showDirect = true,
  showReflections = true,
  reflectionGain = 0.8, // visual strength only (0..1)
}) {
  // Keep values sane
  const W = clamp(roomW, 2, 20);
  const H = clamp(roomH, 2, 10);
  const D = clamp(roomD, 2, 20);

  const src = useMemo(() => [source.x, source.y, source.z], [source.x, source.y, source.z]);
  const mic = useMemo(() => [listener.x, listener.y, listener.z], [listener.x, listener.y, listener.z]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} />

      {showGrid && <gridHelper args={[40, 40]} />}
      {showAxes && <axesHelper args={[4]} />}

      {/* Room (shoebox) */}
      <RoomBox W={W} H={H} D={D} />

      {/* Source */}
      <mesh position={src}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial emissive={"red"} emissiveIntensity={3} color={"#220000"} />
      </mesh>

      {/* Listener (microphone/ear) */}
      <mesh position={mic}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial emissive={"#00ff99"} emissiveIntensity={2.5} color={"#001a10"} />
      </mesh>

      {/* Rays */}
      <ReflectionRays
        W={W}
        H={H}
        D={D}
        src={src}
        mic={mic}
        showDirect={showDirect}
        showReflections={showReflections}
        reflectionGain={clamp(reflectionGain, 0, 1)}
      />

      <OrbitControls enableDamping />
    </>
  );
}

function RoomBox({ W, H, D }) {
  // Draw semi-transparent walls so inside is visible
  const wallMat = useMemo(
    () => ({
      transparent: true,
      opacity: 0.12,
      roughness: 0.9,
      metalness: 0.0,
    }),
    []
  );

  // Room centered at origin: x in [-W/2, W/2], y in [0,H], z in [-D/2, D/2]
  const hx = W / 2;
  const hz = D / 2;

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Left wall (x = -hx) */}
      <mesh position={[-hx, H / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Right wall (x = +hx) */}
      <mesh position={[hx, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[D, H]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Back wall (z = -hz) */}
      <mesh position={[0, H / 2, -hz]} rotation={[0, 0, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      {/* Front wall (z = +hz) */}
      <mesh position={[0, H / 2, hz]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>
    </group>
  );
}
