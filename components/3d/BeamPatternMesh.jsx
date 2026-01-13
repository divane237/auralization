"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

// Far-field array factor for a circular array (uniform weights, phase-steered)
function arrayFactor({ micCount, arrayRadius, k, dir, steerDir }) {
  // mic positions on ring (y=0)
  let re = 0;
  let im = 0;

  for (let i = 0; i < micCount; i++) {
    const a = (i / micCount) * Math.PI * 2;
    const px = arrayRadius * Math.cos(a);
    const pz = arrayRadius * Math.sin(a);

    // phase for direction dir is k * p·dir
    const phaseDir = k * (px * dir[0] + pz * dir[2]);

    // steering phase subtract k * p·steerDir (classic delay-and-sum steering)
    const phaseSteer = k * (px * steerDir[0] + pz * steerDir[2]);

    const ph = phaseDir - phaseSteer;
    re += Math.cos(ph);
    im += Math.sin(ph);
  }

  const mag = Math.sqrt(re * re + im * im) / micCount;
  return mag;
}

export default function BeamPatternMesh({
  micCount = 8,
  arrayRadius = 2.0,
  frequency = 800,
  speedOfSound = 343,
  steerDir = [1, 0, 0],
  gain = 3.5,
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(3, 96, 64);

    const k = (2 * Math.PI * frequency) / speedOfSound; // wavenumber
    const pos = geo.attributes.position;

    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);

      // Direction on unit sphere
      const dir = v.clone().normalize();
      const d = [dir.x, dir.y, dir.z];

      const af = arrayFactor({ micCount, arrayRadius, k, dir: d, steerDir });

      // Scale radius by AF (emphasize with gain)
      const r = 2.2 + gain * af;

      dir.multiplyScalar(r);
      pos.setXYZ(i, dir.x, dir.y, dir.z);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [micCount, arrayRadius, frequency, speedOfSound, steerDir, gain]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        transparent
        opacity={0.55}
        roughness={0.65}
        metalness={0.0}
        emissive={"#223355"}
        emissiveIntensity={1.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
