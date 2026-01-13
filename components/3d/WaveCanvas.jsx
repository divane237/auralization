"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import WaveScene from "./WaveScene";

export default function WaveCanvas(props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#05070f" }}
      >
        <WaveScene {...props} />
      </Canvas>
    </div>
  );
}
