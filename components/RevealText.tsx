"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { scrollState } from "@/lib/scrollState";
import { COLORS, TEXT } from "@/lib/constants";
import { smoothstep } from "@/lib/easing";


export default function RevealText() {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !materialRef.current) return;

    const reveal = smoothstep(
      scrollState.progress,
      TEXT.revealStart,
      TEXT.revealEnd
    );
    materialRef.current.opacity = reveal;

    groupRef.current.visible = reveal > 0.001;

    groupRef.current.position.y =
      TEXT.height + reveal * 0.12 + Math.sin(clock.elapsedTime * 1.2) * 0.035;
  });

  return (
    <group
      ref={groupRef}
      position={[0, TEXT.height, 0]}
      rotation={[-Math.PI / 2 + 0.3, 0, 0]}
      visible={false}
    >
      <Text
        fontSize={TEXT.fontSize}
        letterSpacing={0.12}
        anchorX="center"
        anchorY="middle"
      >
        እንብላ
        <meshBasicMaterial
          ref={materialRef}
          color={COLORS.text}
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
        />
      </Text>
    </group>
  );
}
