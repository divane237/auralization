"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

function vec3(a) {
  return new THREE.Vector3(a[0], a[1], a[2]);
}

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

// Reflect point across plane x=c, y=c, or z=c
function reflectPointAcrossPlane(p, axis, c) {
  const r = p.clone();
  if (axis === "x") r.x = 2 * c - r.x;
  if (axis === "y") r.y = 2 * c - r.y;
  if (axis === "z") r.z = 2 * c - r.z;
  return r;
}

// Intersect segment (mic -> image) with plane axis=c to get bounce point
function intersectSegmentWithPlane(a, b, axis, c) {
  // a + t(b-a)
  const d = b.clone().sub(a);
  const denom = axis === "x" ? d.x : axis === "y" ? d.y : d.z;
  if (Math.abs(denom) < 1e-9) return null;

  const t = (c - (axis === "x" ? a.x : axis === "y" ? a.y : a.z)) / denom;
  if (t < 0 || t > 1) return null;
  return a.clone().add(d.multiplyScalar(t));
}

export default function ReflectionRays({
  W,
  H,
  D,
  src,
  mic,
  showDirect,
  showReflections,
  reflectionGain = 0.8,
}) {
  const hx = W / 2;
  const hz = D / 2;

  const srcV = useMemo(() => vec3(src), [src]);
  const micV = useMemo(() => vec3(mic), [mic]);

  const { directGeom, reflectionGeom } = useMemo(() => {
    // Direct path geometry
    const directPoints = [srcV, micV];
    const directGeom = new THREE.BufferGeometry().setFromPoints(directPoints);

    // 6 first-order reflections (one per wall plane)
    const walls = [
      { axis: "x", c: -hx, label: "Left wall" },
      { axis: "x", c: +hx, label: "Right wall" },
      { axis: "z", c: -hz, label: "Back wall" },
      { axis: "z", c: +hz, label: "Front wall" },
      { axis: "y", c: 0, label: "Floor" },
      { axis: "y", c: H, label: "Ceiling" },
    ];

    const reflPoints = [];

    for (const w of walls) {
      // Image source method:
      // reflect the SOURCE across the wall plane => image source
      const img = reflectPointAcrossPlane(srcV, w.axis, w.c);

      // The reflection point is where the line (mic -> img) hits the wall plane
      const bounce = intersectSegmentWithPlane(micV, img, w.axis, w.c);
      if (!bounce) continue;

      // Build polyline src -> bounce -> mic
      reflPoints.push(srcV.clone(), bounce, micV.clone());
    }

    const reflectionGeom = new THREE.BufferGeometry().setFromPoints(reflPoints);
    return { directGeom, reflectionGeom };
  }, [W, H, D, hx, hz, srcV, micV]);

  return (
    <group>
      {/* Direct */}
      {showDirect && (
        <line geometry={directGeom}>
          <lineBasicMaterial transparent opacity={0.9} />
        </line>
      )}

      {/* Reflections */}
      {showReflections && (
        <lineSegments geometry={reflectionGeom}>
          <lineBasicMaterial transparent opacity={clamp(reflectionGain, 0.05, 0.95)} />
        </lineSegments>
      )}
    </group>
  );
}
