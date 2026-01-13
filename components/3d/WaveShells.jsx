"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

export default function WaveShells({
  frequency = 200,
  amplitude = 1,
  phaseDeg = 0,
  speedOfSound = 343,
  attenuation = 0.02,
  isPlaying = true,
  time = 0,
  resetSignal = 0,
}) {
  const shellCount = 18;
  const maxRadius = 10; // scene units

  const meshRefs = useRef([]);
  const tInternal = useRef(0);

  // Hard reset internal clock when resetSignal changes
  useEffect(() => {
    tInternal.current = 0;
  }, [resetSignal]);

  const shells = useMemo(() => Array.from({ length: shellCount }, (_, i) => i), []);

  useFrame((_, delta) => {
    if (isPlaying) tInternal.current += delta;
    const t = typeof time === "number" ? time : tInternal.current;

    const f = Math.max(1, frequency);
    const c = Math.max(1, speedOfSound);

    // --- Scaling so it’s not insanely fast ---
    // Convert “m/s-ish” into “scene units per second”
    const expansionSpeed = c / 55; // <-- bigger divisor = slower motion (try 55–120)

    // Wavelength λ=c/f scaled into scene units
    const wavelengthUnits = (c / f) / 70;
    const spacing = clamp(wavelengthUnits * 2.5, 0.12, 2.0);

    const front = (expansionSpeed * t) % maxRadius;
    const phase = (phaseDeg * Math.PI) / 180;

    const amp = clamp(amplitude, 0, 5);
    const alpha = clamp(attenuation, 0, 0.25);

    for (let i = 0; i < shellCount; i++) {
      const mesh = meshRefs.current[i];
      if (!mesh) continue;

      // radius behind front
      let r = front - i * spacing;
      while (r < 0) r += maxRadius;

      // oscillation so phase is visible
      const wave = 0.5 + 0.5 * Math.sin((2 * Math.PI * r) / spacing + phase);

      // attenuation
      const fade = Math.exp(-alpha * r);

      // visual mapping
      const opacity = clamp(0.03 + 0.35 * amp * wave * fade, 0.02, 0.7);
      const emissiveIntensity = clamp(0.2 + 2.6 * amp * wave * fade, 0.1, 7);

      mesh.scale.setScalar(Math.max(0.001, r));

      const mat = mesh.material;
      // color shifts for contrast
      mat.color.setHSL(0.62 - 0.12 * wave, 0.45, 0.35);
      mat.emissive.setHSL(0.62 - 0.12 * wave, 0.9, 0.45);

      mat.opacity = opacity;
      mat.emissiveIntensity = emissiveIntensity;
    }
  });

  return (
    <group>
      {shells.map((i) => (
        <mesh key={i} ref={(el) => (meshRefs.current[i] = el)} frustumCulled={false}>
          <sphereGeometry args={[1, 40, 40]} />
          <meshStandardMaterial
            transparent
            opacity={0.12}
            roughness={0.7}
            metalness={0}
            emissive={"#223355"}
            emissiveIntensity={1}
            side={2 /* THREE.DoubleSide */}
          />
        </mesh>
      ))}
    </group>
  );
}
