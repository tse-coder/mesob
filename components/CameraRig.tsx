"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/lib/scrollState";
import { CAMERA } from "@/lib/constants";
export default function CameraRig() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        CAMERA.keyframes.map((point) => new THREE.Vector3(...point)),
      ),
    [],
  );

  const scratch = useMemo(
    () => ({
      position: new THREE.Vector3(),
      lookAt: new THREE.Vector3(),
      lookAtStart: new THREE.Vector3(...CAMERA.lookAtStart),
      lookAtEnd: new THREE.Vector3(...CAMERA.lookAtEnd),
    }),
    [],
  );

  useFrame(({ camera }) => {
    const progress = scrollState.progress;

    curve.getPointAt(progress, scratch.position);
    camera.position.copy(scratch.position);

    scratch.lookAt.lerpVectors(
      scratch.lookAtStart,
      scratch.lookAtEnd,
      progress,
    );
    camera.lookAt(scratch.lookAt);
  });

  return null;
}
