"use client";

import { COLORS } from "@/lib/constants";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#7d6a58" />

      <directionalLight
        castShadow
        position={[5, 8, 4]}
        intensity={2.6}
        color={COLORS.keyLight}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-near={1}
        shadow-camera-far={25}
      />

      <directionalLight
        position={[-6, 3, -5]}
        intensity={0.5}
        color={COLORS.fillLight}
      />

      <spotLight
        position={[0, 6, -7]}
        intensity={60}
        angle={0.5}
        penumbra={1}
        color={COLORS.rimLight}
      />
    </>
  );
}
