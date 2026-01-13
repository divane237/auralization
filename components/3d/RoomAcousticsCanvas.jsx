"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import RoomAcousticsScene from "./RoomAcousticsScene";

export default function RoomAcousticsCanvas(props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 50, near: 0.1, far: 200 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#05070f" }}
      >
        <RoomAcousticsScene {...props} />
      </Canvas>
    </div>
  );
}
