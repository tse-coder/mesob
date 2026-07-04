"use client";

import { COLORS } from "@/lib/constants";

export default function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.fog, 8, 24]} />

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[40, 64]} />
        <meshStandardMaterial
          color={COLORS.ground}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </>
  );
}
