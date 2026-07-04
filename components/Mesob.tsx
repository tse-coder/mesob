"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/lib/scrollState";
import { COLORS, GLOW, LID, MESOB } from "@/lib/constants";
import { lidEase, remap, smoothstep } from "@/lib/easing";

function createCoiledLathe(
  controlPoints: [number, number][],
  coils: number,
  rippleDepth: number,
): THREE.LatheGeometry {
  const curve = new THREE.SplineCurve(
    controlPoints.map(([radius, height]) => new THREE.Vector2(radius, height)),
  );
  const samples = curve.getPoints(160);

  const profile = samples.map((point, index) => {
    const t = index / (samples.length - 1);
    const ripple = Math.sin(t * coils * Math.PI * 2) * rippleDepth;
    return new THREE.Vector2(Math.max(0.001, point.x + ripple), point.y);
  });

  return new THREE.LatheGeometry(profile, 96);
}

function createWeaveTexture(): THREE.CanvasTexture {
  const width = 256;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#c9a05c";
  ctx.fillRect(0, 0, width, height);

  const bands: { from: number; to: number; color: string }[] = [
    { from: 0.05, to: 0.09, color: "#7a1f1f" },
    { from: 0.15, to: 0.18, color: "#2f5d3a" },
    { from: 0.24, to: 0.32, color: "#a3441f" },
    { from: 0.38, to: 0.41, color: "#5b2a6e" },
    { from: 0.48, to: 0.56, color: "#7a1f1f" },
    { from: 0.63, to: 0.66, color: "#2f5d3a" },
    { from: 0.73, to: 0.8, color: "#c97a2f" },
    { from: 0.88, to: 0.91, color: "#7a1f1f" },
  ];
  for (const band of bands) {
    ctx.fillStyle = band.color;
    ctx.fillRect(0, band.from * height, width, (band.to - band.from) * height);
  }

  ctx.fillStyle = "rgba(50, 25, 8, 0.35)";
  const grooveCount = 40;
  for (let i = 0; i < grooveCount; i++) {
    ctx.fillRect(0, (i / grooveCount) * height, width, 2);
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  for (let x = 0; x < width; x += 8) {
    ctx.fillRect(x, 0, 2, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(8, 1);
  texture.anisotropy = 4;
  return texture;
}

export default function Mesob() {
  const bodyGeometry = useMemo(
    () =>
      createCoiledLathe(
        [
          [0.0, 0.0],
          [0.72, 0.0],
          [0.86, 0.1],
          [0.66, 0.55],
          [0.62, 0.85],
          [1.02, 1.25],
          [1.1, 1.5],
          [1.06, 1.6],
        ],
        26,
        0.012,
      ),
    [],
  );

  const lidGeometry = useMemo(
    () =>
      createCoiledLathe(
        [
          [1.06, 0.0],
          [1.02, 0.1],
          [0.86, 0.34],
          [0.55, 0.62],
          [0.28, 0.82],
          [0.12, 0.92],
          [0.13, 1.02],
          [0.07, 1.1],
          [0.0, 1.14],
        ],
        16,
        0.012,
      ),
    [],
  );

  const weaveTexture = useMemo(() => createWeaveTexture(), []);

  useEffect(() => {
    return () => {
      bodyGeometry.dispose();
      lidGeometry.dispose();
      weaveTexture.dispose();
    };
  }, [bodyGeometry, lidGeometry, weaveTexture]);

  const hingeRef = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!hingeRef.current || !glowMaterialRef.current || !lightRef.current)
      return;

    const lidProgress = remap(scrollState.progress, LID.start, LID.end);
    const openAmount = lidEase(lidProgress);

    hingeRef.current.rotation.x = -openAmount * LID.maxAngle;

    const glow = smoothstep(openAmount, GLOW.start, 1);
    glowMaterialRef.current.opacity = glow;
    lightRef.current.intensity = glow * GLOW.maxLightIntensity;
  });

  return (
    <group>
      <mesh geometry={bodyGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={weaveTexture}
          roughness={0.85}
          metalness={0}
          bumpMap={weaveTexture}
          bumpScale={0.15}
        />
      </mesh>

      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[0.98, 0.92, 0.56, 48, 1, true]} />
        <meshStandardMaterial
          color="#1a1109"
          roughness={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, MESOB.interiorFloorY, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.94, 48]} />
        <meshStandardMaterial color="#120b06" roughness={1} />
      </mesh>

      <mesh
        position={[0, MESOB.interiorFloorY + 0.02, 0]}
        rotation-x={-Math.PI / 2}
      >
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color={COLORS.emberGlow}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 1.45, 0]}
        color={COLORS.emberGlow}
        intensity={0}
        distance={5}
        decay={2}
      />

      <group ref={hingeRef} position={[0, MESOB.rimHeight, -MESOB.rimRadius]}>
        <mesh
          geometry={lidGeometry}
          position={[0, 0, MESOB.rimRadius]}
          castShadow
        >
          <meshStandardMaterial
            map={weaveTexture}
            roughness={0.85}
            metalness={0}
            bumpMap={weaveTexture}
            bumpScale={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
