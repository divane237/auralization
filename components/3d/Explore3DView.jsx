"use client";

import React from "react";
import WaveCanvas from "./WaveCanvas";
import BeamformingCanvas from "./BeamformingCanvas";
import RoomAcousticsCanvas from "./RoomAcousticsCanvas";

export default function Explore3DView({ mode, waveProps, beamProps, roomProps }) {
  if (mode === "wave") return <WaveCanvas {...waveProps} />;
  if (mode === "beamforming") return <BeamformingCanvas {...beamProps} />;
  if (mode === "room") return <RoomAcousticsCanvas {...roomProps} />;

  return (
    <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-300">
      Select a 3D tool to begin.
    </div>
  );
}
