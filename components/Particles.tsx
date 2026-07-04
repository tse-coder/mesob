"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/lib/scrollState";
import { COLORS, LID, PARTICLES } from "@/lib/constants";
import { lidEase, remap, smoothstep } from "@/lib/easing";

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLES.count * 3);
    const seeds = Array.from({ length: PARTICLES.count }, () => ({
      radius: Math.random() * 0.75,
      angle: Math.random() * Math.PI * 2,
      speed: 0.06 + Math.random() * 0.09,
      offset: Math.random(),
      wobblePhase: Math.random() * Math.PI * 2,
    }));
    return { positions, seeds };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current || !geometryRef.current)
      return;

    const lidProgress = remap(scrollState.progress, LID.start, LID.end);
    const openAmount = lidEase(lidProgress);
    const visibility = smoothstep(openAmount, 0.35, 0.7);

    materialRef.current.opacity = visibility * PARTICLES.maxOpacity;
    pointsRef.current.visible = visibility > 0.001;
    if (!pointsRef.current.visible) return;

    const time = clock.elapsedTime;

    for (let i = 0; i < seeds.length; i++) {
      const seed = seeds[i];
      const cycle = (time * seed.speed + seed.offset) % 1;
      const rise = cycle * PARTICLES.riseHeight;
      const sway = Math.sin(time * 0.9 + seed.wobblePhase) * 0.12 * cycle;

      positions[i * 3] = Math.cos(seed.angle) * seed.radius + sway;
      positions[i * 3 + 1] = PARTICLES.emitY + rise;
      positions[i * 3 + 2] = Math.sin(seed.angle) * seed.radius + sway * 0.6;
    }

    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={COLORS.gold}
        size={PARTICLES.size}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
