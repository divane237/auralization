"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import BeamformingScene from "./BeamformingScene";

export default function BeamformingCanvas(props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 6, 12], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#05070f" }}
      >
        <BeamformingScene {...props} />
      </Canvas>
    </div>
  );
}
