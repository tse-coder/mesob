"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CAMERA } from "@/lib/constants";
import CameraRig from "@/components/CameraRig";
import Lights from "@/components/Lights";
import SceneEnvironment from "@/components/Environment";
import Mesob from "@/components/Mesob";
import Particles from "@/components/Particles";
import RevealText from "@/components/RevealText";
export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: CAMERA.fov,
        position: CAMERA.keyframes[0],
        near: 0.1,
        far: 60,
      }}
      gl={{ antialias: true }}
    >
      <CameraRig />
      <Lights />
      <SceneEnvironment />
      <Mesob />
      <Particles />

      <Suspense fallback={null}>
        <RevealText />
      </Suspense>
    </Canvas>
  );
}
